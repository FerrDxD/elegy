import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session) {
    redirect("/write");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden selection:bg-accent/30">
      {/* Decorative gradient blob */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/15 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse-glow"></div>

      <h1 className="text-7xl md:text-9xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-muted tracking-wide animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>Elegy</h1>
      <p className="text-xl md:text-3xl font-serif italic text-text-muted mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
        a space to grieve who you used to be
      </p>
      
      <p className="max-w-lg text-text-muted/80 mb-14 font-sans font-light leading-relaxed animate-fade-in opacity-0 text-base md:text-lg" style={{ animationDelay: '0.5s' }}>
        Tuliskan siapa kamu dulu dan siapa kamu sekarang. Izinkan AI merangkai elegi perpisahan untuk versi lamamu, dan sebuah cermin untuk melihat dirimu yang baru.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
        <Link 
          href="/login" 
          className="group relative px-8 py-3.5 bg-accent text-background font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(138,122,96,0.4)]"
        >
          <span className="relative z-10">Mulai Menulis</span>
          <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
        </Link>
        <a 
          href="#about"
          className="px-8 py-3.5 border border-border/60 text-text-primary rounded-full hover:bg-surface/50 hover:border-accent/50 backdrop-blur-sm transition-all duration-500"
        >
          Pelajari lebih lanjut
        </a>
      </div>

      <div id="about" className="mt-40 max-w-2xl text-left pt-20 pb-20 animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-16"></div>
        <h2 className="text-4xl font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-accent">Mengapa Elegy?</h2>
        <div className="space-y-6 text-lg">
          <p className="text-text-muted/90 leading-relaxed font-light">
            Kita seringkali terlalu sibuk bergerak maju hingga lupa mengucapkan selamat tinggal pada versi diri kita yang tertinggal. Versi yang mungkin pernah terluka, naif, atau penuh harapan berbeda.
          </p>
          <p className="text-text-muted/90 leading-relaxed font-light">
            Elegy hadir bukan untuk menghakimi masa lalumu, melainkan untuk memberikan ruang bagi perpisahan yang hangat, dan menyambut pertumbuhanmu dengan jujur.
          </p>
        </div>
      </div>
    </div>
  );
}
