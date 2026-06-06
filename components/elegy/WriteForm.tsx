"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "../ui/LoadingDots";

export default function WriteForm() {
  const [pastSelf, setPastSelf] = useState("");
  const [presentSelf, setPresentSelf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
        body: JSON.stringify({ pastSelf, presentSelf }),
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
        <label htmlFor="pastSelf" className="block text-2xl font-serif text-text-primary">
          Siapa kamu dulu?
        </label>
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
        <label htmlFor="presentSelf" className="block text-2xl font-serif text-text-primary">
          Siapa kamu sekarang?
        </label>
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

      <div className="flex justify-end pt-8">
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
