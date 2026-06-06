"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "../ui/LoadingDots";

function DictationButton({ onResult, isListening, toggleListen }: { onResult: (text: string) => void, isListening: boolean, toggleListen: () => void }) {
  return (
    <button
      type="button"
      onClick={toggleListen}
      className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center gap-2 text-xs ${
        isListening 
          ? "border-red-500/50 bg-red-500/10 text-red-400 animate-pulse" 
          : "border-border text-text-muted hover:border-accent hover:text-accent"
      }`}
      title="Bicara untuk mengetik"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
      {isListening ? "Mendengarkan..." : "Rekam Suara"}
    </button>
  );
}

export default function WriteForm() {
  const [pastSelf, setPastSelf] = useState("");
  const [presentSelf, setPresentSelf] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [unlockDate, setUnlockDate] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Voice Recognition states
  const [listeningPast, setListeningPast] = useState(false);
  const [listeningPresent, setListeningPresent] = useState(false);
  const recognitionRef = useRef<any>(null);

  const initSpeechRecognition = () => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "id-ID";
        return recognition;
      }
    }
    return null;
  };

  const toggleListen = (field: 'past' | 'present') => {
    if (field === 'past') {
      if (listeningPast) {
        recognitionRef.current?.stop();
        setListeningPast(false);
      } else {
        if (listeningPresent) {
          recognitionRef.current?.stop();
          setListeningPresent(false);
        }
        startListening(field, setPastSelf, pastSelf);
      }
    } else {
      if (listeningPresent) {
        recognitionRef.current?.stop();
        setListeningPresent(false);
      } else {
        if (listeningPast) {
          recognitionRef.current?.stop();
          setListeningPast(false);
        }
        startListening(field, setPresentSelf, presentSelf);
      }
    }
  };

  const startListening = (field: 'past' | 'present', setter: any, currentValue: string) => {
    const recognition = initSpeechRecognition();
    if (!recognition) {
      alert("Browser Anda tidak mendukung fitur perekam suara.");
      return;
    }

    recognitionRef.current = recognition;
    let finalTranscript = currentValue ? currentValue + " " : "";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setter(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      if (field === 'past') setListeningPast(false);
      if (field === 'present') setListeningPresent(false);
    };

    recognition.onend = () => {
      if (field === 'past') setListeningPast(false);
      if (field === 'present') setListeningPresent(false);
    };

    recognition.start();
    if (field === 'past') setListeningPast(true);
    if (field === 'present') setListeningPresent(true);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pastSelf.length < 10 || presentSelf.length < 10) {
      setError("Setiap bagian harus berisi minimal 10 karakter.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/elegy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          pastSelf, 
          presentSelf, 
          isPublic, 
          unlockDate: unlockDate ? new Date(unlockDate).toISOString() : null 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat elegi");
      }

      router.push(`/result/${data.id}`);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded-lg text-center animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label htmlFor="pastSelf" className="block text-2xl font-serif text-text-primary">
            Siapa kamu dulu?
          </label>
          <DictationButton 
            isListening={listeningPast} 
            toggleListen={() => toggleListen('past')} 
            onResult={setPastSelf} 
          />
        </div>
        <p className="text-text-muted font-light text-sm">
          Ceritakan tentang fase, kebiasaan, atau versi dirimu yang kini telah berlalu. Jangan menghakimi, cukup deskripsikan.
        </p>
        <textarea
          id="pastSelf"
          value={pastSelf}
          onChange={(e) => setPastSelf(e.target.value)}
          placeholder="Dulu saya selalu merasa harus menyenangkan semua orang..."
          className="w-full h-40 bg-surface/50 border border-border rounded-xl p-6 text-text-primary focus:outline-none focus:border-accent focus:bg-surface focus:ring-1 focus:ring-accent/50 transition-all duration-500 resize-none placeholder:text-text-muted/30 font-light leading-relaxed backdrop-blur-sm shadow-inner"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label htmlFor="presentSelf" className="block text-2xl font-serif text-text-primary">
            Siapa kamu sekarang?
          </label>
          <DictationButton 
            isListening={listeningPresent} 
            toggleListen={() => toggleListen('present')} 
            onResult={setPresentSelf} 
          />
        </div>
        <p className="text-text-muted font-light text-sm">
          Jujur dan tanpa filter. Apa yang berubah? Apa yang kamu rasakan hari ini tentang dirimu?
        </p>
        <textarea
          id="presentSelf"
          value={presentSelf}
          onChange={(e) => setPresentSelf(e.target.value)}
          placeholder="Sekarang saya lebih banyak diam. Saya belajar berkata tidak..."
          className="w-full h-40 bg-surface/50 border border-border rounded-xl p-6 text-text-primary focus:outline-none focus:border-accent focus:bg-surface focus:ring-1 focus:ring-accent/50 transition-all duration-500 resize-none placeholder:text-text-muted/30 font-light leading-relaxed backdrop-blur-sm shadow-inner"
          disabled={isLoading}
        />
      </div>

      {/* New Features Toggle */}
      <div className="p-6 bg-surface/30 backdrop-blur-sm border border-border rounded-xl space-y-6">
        <h3 className="text-sm tracking-[0.2em] uppercase text-text-muted border-b border-border/50 pb-3">Opsi Tambahan</h3>
        
        {/* Public Wall */}
        <div className="flex items-center gap-4">
          <input 
            type="checkbox" 
            id="isPublic" 
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-5 h-5 rounded border-border bg-background text-accent focus:ring-accent accent-accent cursor-pointer"
          />
          <div className="flex-1">
            <label htmlFor="isPublic" className="text-text-primary cursor-pointer block">Bagikan di Dinding Pelepasan</label>
            <p className="text-xs text-text-muted font-light mt-1">Elegi Anda akan ditampilkan secara anonim (tanpa nama) di halaman publik agar bisa dibaca orang lain.</p>
          </div>
        </div>

        {/* Time Capsule */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label htmlFor="unlockDate" className="text-text-primary block">Kunci sebagai Kapsul Waktu</label>
            <p className="text-xs text-text-muted font-light mt-1 mb-3">Jika diisi, Elegi Anda akan disegel dan hanya bisa dibuka setelah tanggal ini terlewati.</p>
            <input 
              type="date" 
              id="unlockDate"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-background border border-border text-text-primary text-sm rounded-lg focus:ring-accent focus:border-accent block p-2.5 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading || pastSelf.length < 10 || presentSelf.length < 10}
          className="group relative px-10 py-4 bg-accent text-background font-medium rounded-full overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_0_30px_rgba(138,122,96,0.3)] flex items-center gap-3"
        >
          <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
          <span className="relative z-10 flex items-center gap-3">
          {isLoading ? (
            <>
              Menulis Elegi <LoadingDots />
            </>
          ) : (
            "Tulis Elegi"
          )}
          </span>
        </button>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-fade-in transition-all">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent pointer-events-none animate-pulse-glow"></div>
          <LoadingDots className="text-accent h-12 w-12 mb-6" />
          <p className="text-xl font-serif text-text-primary animate-pulse">Menghubungkan masa lalu dan sekarang...</p>
        </div>
      )}
    </form>
  );
}
