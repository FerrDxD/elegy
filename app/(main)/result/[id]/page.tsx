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
            {new Date(elegy.createdAt || "").toLocaleDateString("id-ID", {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </header>

        <ResultCard elegy={elegy} />

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
