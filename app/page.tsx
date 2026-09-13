import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session) {
    redirect("/write");
  }

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent/30 flex flex-col relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"></div>
      <div className="fixed bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex items-center justify-between z-20">
        <span className="font-serif text-2xl tracking-[0.25em] text-text-primary">
          ELEGY
        </span>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/wall" className="text-text-muted hover:text-text-primary transition-colors hidden sm:block">
            Dinding Pelepasan
          </Link>
          <Link href="/login" className="text-text-muted hover:text-text-primary transition-colors">
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 bg-accent/15 border border-accent/40 text-accent rounded-full hover:bg-accent hover:text-background transition-all duration-300 font-medium text-xs sm:text-sm"
          >
            Daftar Akun
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-12 pb-24 max-w-4xl mx-auto z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/80 bg-surface/50 text-text-muted text-xs font-mono mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Ruang kontemplasi & refleksi diri AI
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-text-primary via-text-primary to-text-muted">
          Melepas Siapa Kamu Dulu. <br />
          <span className="italic font-light text-accent">Menyambut Dirimu Yang Baru.</span>
        </h1>

        <p className="max-w-xl text-text-muted font-sans font-light text-base sm:text-lg leading-relaxed mb-12">
          Tuliskan fase hidup atau versi diri yang ingin kamu lepaskan. Biarkan AI merangkai elegi perpisahan yang hangat dan cermin refleksi yang jujur.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20">
          <Link
            href="/register"
            className="px-9 py-4 bg-accent text-background font-medium rounded-full hover:bg-accent/90 transition-all duration-300 shadow-[0_0_30px_rgba(138,122,96,0.3)] text-center"
          >
            Mulai Menulis Elegi
          </Link>
          <Link
            href="/wall"
            className="px-9 py-4 bg-surface/60 border border-border/80 text-text-primary rounded-full hover:border-accent/50 hover:bg-surface backdrop-blur-sm transition-all duration-300 text-center"
          >
            Jelajahi Dinding Pelepasan
          </Link>
        </div>

        {/* Card Interactive Preview Showcase */}
        <div className="w-full text-left bg-surface/30 backdrop-blur-md border border-border/60 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/40">
            <span className="w-3 h-3 rounded-full bg-accent/40"></span>
            <span className="text-xs font-mono text-text-muted/70 uppercase tracking-widest">Preview Refleksi</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-accent text-xs font-serif italic flex items-center gap-2">
                <span className="w-6 h-px bg-accent/40"></span> Versi Lama
              </span>
              <p className="text-sm font-light text-text-primary/80 leading-relaxed italic">
                "Dulu saya selalu takut berkata tidak dan merasa bertanggung jawab atas kebahagiaan semua orang..."
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-accent text-xs font-serif italic flex items-center gap-2">
                <span className="w-6 h-px bg-accent/40"></span> Elegi AI
              </span>
              <p className="font-serif italic text-base text-text-primary/95 leading-relaxed">
                "Selamat jalan pada kegelisahan yang dulu mendikte langkahmu. Keberadaan versi itu tidak sia-sia, ia adalah benih dari ketenanganmu hari ini."
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3 Core Pillars Section */}
      <section className="w-full bg-surface/20 border-t border-border/40 py-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-accent">
              Bagaimana Elegy Bekerja?
            </h2>
            <p className="text-text-muted font-light text-sm sm:text-base">
              Proses tiga langkah sederhana untuk berdamai dengan perjalanan hidupmu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-serif mb-6 text-lg">
                1
              </div>
              <h3 className="font-serif text-xl mb-3 text-text-primary">Tulis Diri Dulu & Sekarang</h3>
              <p className="text-sm font-light text-text-muted leading-relaxed">
                Deskripsikan siapa kamu di masa lalu dan apa yang telah berubah dalam dirimu saat ini secara jujur.
              </p>
            </div>

            <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-serif mb-6 text-lg">
                2
              </div>
              <h3 className="font-serif text-xl mb-3 text-text-primary">Elegi & Cermin AI</h3>
              <p className="text-sm font-light text-text-muted leading-relaxed">
                AI merangkai puisi perpisahan yang puitis dan analisis cermin prosa yang objektif tentang pertumbuhanmu.
              </p>
            </div>

            <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-serif mb-6 text-lg">
                3
              </div>
              <h3 className="font-serif text-xl mb-3 text-text-primary">Kapsul Waktu & Dinding</h3>
              <p className="text-sm font-light text-text-muted leading-relaxed">
                Simpan secara pribadi, segel sebagai kapsul waktu untuk masa depan, atau bagikan secara anonim di Dinding Pelepasan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 py-12 px-6 text-center text-xs text-text-muted/60 font-mono z-10">
        <p className="mb-2">ELEGY — Every ending is a quiet beginning.</p>
        <p>&copy; {new Date().getFullYear()} Elegy App. All rights reserved.</p>
      </footer>
    </div>
  );
}
