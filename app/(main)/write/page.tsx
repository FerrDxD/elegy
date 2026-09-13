import WriteForm from "@/components/elegy/WriteForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WritePage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const displayName = session.user.name || "Penjelajah Waktu";

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto animate-fade-in relative pb-24">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"></div>

      <header className="mb-12 md:mb-16 border-b border-border/40 pb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono text-accent uppercase tracking-[0.25em] block mb-3">
          Ruang Refleksi
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-muted mb-3">
          Selamat Datang, {displayName}
        </h1>
        <p className="text-text-muted font-light text-sm md:text-base leading-relaxed">
          Ungkapkan cerita masa lalumu tanpa penghakiman. Biarkan perpisahan ini berlangsung dengan hangat.
        </p>
      </header>

      <WriteForm />
    </div>
  );
}
