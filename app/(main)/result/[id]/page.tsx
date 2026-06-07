import { db } from "@/lib/db";
import { elegies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import ResultCard from "@/components/elegy/ResultCard";
import Link from "next/link";

export default async function ResultPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const { id } = params;

  try {
    const result = await db.select().from(elegies).where(eq(elegies.id, id));
    const elegy = result[0];

    if (!elegy) {
      notFound();
    }

    if (elegy.userId !== session.user.id) {
      redirect("/archive");
    }

    return (
      <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto animate-fade-in pb-24">
        <header className="mb-12 flex justify-between items-center border-b border-border pb-6">
          <Link href="/archive" className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
            <span>&larr;</span> Kembali
          </Link>
          <div className="text-text-muted font-mono text-sm">
            {new Date(elegy.createdAt || Date.now()).toLocaleDateString("id-ID", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </header>

        {elegy.unlockDate && new Date(elegy.unlockDate) > new Date() ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 rounded-full border border-border/50 bg-surface/30 flex items-center justify-center animate-pulse-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 className="text-3xl font-serif text-text-primary">Kapsul Waktu Tersegel</h2>
            <p className="text-text-muted font-light max-w-md mx-auto leading-relaxed">
              Perpisahanmu telah diabadikan dan dikunci untuk masa depan. Elegi ini baru bisa dibaca kembali pada:
            </p>
            <div className="text-lg md:text-xl font-mono text-accent bg-accent/10 px-8 py-4 rounded-2xl border border-accent/20 shadow-[0_0_30px_rgba(138,122,96,0.1)]">
              {new Date(elegy.unlockDate).toLocaleDateString("id-ID", {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </div>
          </div>
        ) : (
          <ResultCard elegy={elegy} />
        )}

        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Link 
            href="/write" 
            className="px-8 py-3 bg-surface border border-border text-text-primary text-center rounded-full hover:border-accent transition-all duration-300"
          >
            Tulis refleksi baru
          </Link>
          <Link 
            href="/archive" 
            className="px-8 py-3 bg-accent text-background font-medium text-center rounded-full hover:bg-accent/90 transition-all duration-300 shadow-[0_0_20px_rgba(138,122,96,0.2)]"
          >
            Lihat semua arsip
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
