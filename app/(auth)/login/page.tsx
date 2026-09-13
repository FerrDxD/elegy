import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-text-primary relative overflow-hidden selection:bg-accent/30">
      {/* Background ambient lighting */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"></div>

      {/* Brand Header Link */}
      <Link href="/" className="font-serif text-3xl tracking-[0.3em] text-text-primary hover:text-accent transition-colors mb-10">
        ELEGY
      </Link>

      <div className="w-full max-w-md bg-surface/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-border/70 shadow-[0_10px_40px_rgba(0,0,0,0.4)] animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2 text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-muted">
            Selamat Datang Kembali
          </h1>
          <p className="text-text-muted font-light text-sm">Masuk ke ruang refleksi pribadimu.</p>
        </div>
        <LoginForm />
      </div>

      <p className="text-xs text-text-muted/60 font-mono mt-12">
        &copy; {new Date().getFullYear()} Elegy. All rights reserved.
      </p>
    </div>
  );
}
