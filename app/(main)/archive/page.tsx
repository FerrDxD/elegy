import { db } from "@/lib/db";
import { elegies } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ArchiveList from "@/components/elegy/ArchiveList";

export default async function ArchivePage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const userElegies = await db.select().from(elegies).where(eq(elegies.userId, session.user.id)).orderBy(desc(elegies.createdAt));

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-border pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-serif">Arsip Refleksi</h1>
          <p className="text-text-muted mt-2 font-light">Jejak langkah yang pernah kamu ambil.</p>
        </div>
        <Link 
          href="/write" 
          className="px-6 py-2.5 bg-accent text-background font-medium rounded-full hover:bg-accent/90 transition-all duration-300 shadow-[0_0_15px_rgba(138,122,96,0.2)]"
        >
          Tulis refleksi baru
        </Link>
      </header>

      {userElegies.length === 0 ? (
        <div className="text-center py-24 bg-surface rounded-2xl border border-border">
          <h2 className="text-2xl font-serif mb-4 text-text-muted">Ruang arsip masih kosong</h2>
          <p className="font-light text-text-muted mb-8 max-w-md mx-auto">
            Kamu belum menulis refleksi apapun. Mulailah dengan menulis tentang siapa kamu di masa lalu dan siapa kamu sekarang.
          </p>
          <Link 
            href="/write" 
            className="text-accent hover:underline"
          >
            Mulai menulis &rarr;
          </Link>
        </div>
      ) : (
        <ArchiveList items={userElegies} />
      )}
    </div>
  );
}
