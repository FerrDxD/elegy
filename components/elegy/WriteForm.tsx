"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "../ui/LoadingDots";

function DictationButton({ isListening, toggleListen }: { isListening: boolean; toggleListen: () => void }) {
  return (
    <button
      type="button"
      onClick={toggleListen}
      className={`px-3 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-2 text-xs font-mono ${
        isListening
          ? "border-red-500/60 bg-red-500/10 text-red-400 animate-pulse"
          : "border-border/80 text-text-muted hover:border-accent/60 hover:text-accent bg-surface/40"
      }`}
      title="Bicara untuk mengetik"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
      {isListening ? "Mendengarkan..." : "Dikte Suara"}
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

  const [activeSpeechField, setActiveSpeechField] = useState<'past' | 'present' | null>(null);
  const recognitionRef = useRef<any>(null);

  const toggleListen = (field: 'past' | 'present') => {
    if (activeSpeechField === field) {
      recognitionRef.current?.stop();
      setActiveSpeechField(null);
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser Anda tidak mendukung fitur perekam suara.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "id-ID";
    recognitionRef.current = recognition;

    const setter = field === 'past' ? setPastSelf : setPresentSelf;
    const initialVal = field === 'past' ? pastSelf : presentSelf;
    let finalTranscript = initialVal ? initialVal + " " : "";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript + " ";
        else interimTranscript += event.results[i][0].transcript;
      }
      setter(finalTranscript + interimTranscript);
    };

    recognition.onerror = () => setActiveSpeechField(null);
    recognition.onend = () => setActiveSpeechField(null);

    recognition.start();
    setActiveSpeechField(field);
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
          unlockDate: unlockDate ? new Date(unlockDate).toISOString() : null,
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
        <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded-xl text-center text-sm animate-fade-in">
          {error}
        </div>
      )}

      {/* Field 1: Past Self */}
      <div className="bg-surface/30 backdrop-blur-md border border-border/60 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-accent/30 transition-colors">
        <div className="flex justify-between items-center">
          <label htmlFor="pastSelf" className="block text-2xl font-serif text-text-primary">
            Siapa kamu dulu?
          </label>
          <DictationButton
            isListening={activeSpeechField === 'past'}
            toggleListen={() => toggleListen('past')}
          />
        </div>
        <p className="text-text-muted font-light text-sm">
          Ceritakan tentang fase, kebiasaan, atau versi dirimu yang kini telah berlalu. Cukup deskripsikan tanpa penyesalan.
        </p>
        <textarea
          id="pastSelf"
          value={pastSelf}
          onChange={(e) => setPastSelf(e.target.value)}
          placeholder="Dulu saya selalu merasa harus menyenangkan semua orang..."
          className="w-full h-44 bg-background/50 border border-border/70 rounded-2xl p-5 text-text-primary focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none placeholder:text-text-muted/30 font-light leading-relaxed shadow-inner text-base"
          disabled={isLoading}
        />
        <div className="flex justify-end text-xs font-mono text-text-muted/60 pt-1">
          <span className={pastSelf.length > 0 && pastSelf.length < 10 ? "text-red-400 font-medium" : ""}>
            {pastSelf.length}/10 karakter min.
          </span>
        </div>
      </div>

      {/* Field 2: Present Self */}
      <div className="bg-surface/30 backdrop-blur-md border border-border/60 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-accent/30 transition-colors">
        <div className="flex justify-between items-center">
          <label htmlFor="presentSelf" className="block text-2xl font-serif text-text-primary">
            Siapa kamu sekarang?
          </label>
          <DictationButton
            isListening={activeSpeechField === 'present'}
            toggleListen={() => toggleListen('present')}
          />
        </div>
        <p className="text-text-muted font-light text-sm">
          Jujur dan tanpa filter. Apa yang telah berubah? Apa yang kamu rasakan hari ini tentang dirimu?
        </p>
        <textarea
          id="presentSelf"
          value={presentSelf}
          onChange={(e) => setPresentSelf(e.target.value)}
          placeholder="Sekarang saya lebih banyak diam. Saya belajar berkata tidak..."
          className="w-full h-44 bg-background/50 border border-border/70 rounded-2xl p-5 text-text-primary focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none placeholder:text-text-muted/30 font-light leading-relaxed shadow-inner text-base"
          disabled={isLoading}
        />
        <div className="flex justify-end text-xs font-mono text-text-muted/60 pt-1">
          <span className={presentSelf.length > 0 && presentSelf.length < 10 ? "text-red-400 font-medium" : ""}>
            {presentSelf.length}/10 karakter min.
          </span>
        </div>
      </div>

      {/* Options Panel */}
      <div className="p-6 sm:p-8 bg-surface/30 backdrop-blur-md border border-border/60 rounded-3xl space-y-6">
        <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-text-muted border-b border-border/40 pb-3">
          Opsi Refleksi
        </h3>

        {/* Public Wall */}
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-border bg-background text-accent focus:ring-accent accent-accent cursor-pointer"
          />
          <div className="flex-1">
            <label htmlFor="isPublic" className="text-text-primary cursor-pointer block text-sm font-medium">
              Bagikan di Dinding Pelepasan
            </label>
            <p className="text-xs text-text-muted font-light mt-1 leading-relaxed">
              Elegi Anda akan ditampilkan secara anonim (tanpa nama) di halaman publik agar bisa dibaca dan disaksikan pengguna lain.
            </p>
          </div>
        </div>

        {/* Time Capsule */}
        <div className="flex items-start gap-4 pt-2">
          <div className="flex-1">
            <label htmlFor="unlockDate" className="text-text-primary block text-sm font-medium">
              Segel Sebagai Kapsul Waktu (Opsional)
            </label>
            <p className="text-xs text-text-muted font-light mt-1 mb-3 leading-relaxed">
              Jika diisi, Elegi Anda akan dikunci dan baru bisa dibaca kembali setelah tanggal pembukaan ini tiba.
            </p>
            <input
              type="date"
              id="unlockDate"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-background/80 border border-border/80 text-text-primary text-xs font-mono rounded-xl focus:ring-accent focus:border-accent block p-3 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading || pastSelf.length < 10 || presentSelf.length < 10}
          className="group relative px-10 py-4 bg-accent text-background font-medium rounded-full overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_0_30px_rgba(138,122,96,0.35)] flex items-center gap-3 text-sm"
        >
          <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
          <span className="relative z-10 flex items-center gap-3">
            {isLoading ? (
              <>
                Menulis Elegi <LoadingDots />
              </>
            ) : (
              "Rangkai Elegi & Cermin"
            )}
          </span>
        </button>
      </div>

      {/* Loading Modal Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-fade-in transition-all">
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent pointer-events-none animate-pulse-glow"></div>
          <LoadingDots className="text-accent h-12 w-12 mb-6" />
          <p className="text-2xl font-serif text-text-primary animate-pulse">Menghubungkan masa lalu dan sekarang...</p>
          <p className="text-xs font-mono text-text-muted mt-3">Merangkai elegi puitis dan cermin refleksi AI</p>
        </div>
      )}
    </form>
  );
}
