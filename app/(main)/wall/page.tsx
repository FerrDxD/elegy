import { db } from "@/lib/db";
import { elegies } from "@/lib/db/schema";
import { desc, eq, and, or, isNull, lte } from "drizzle-orm";
import Link from "next/link";
import WallCard from "@/components/elegy/WallCard";

export const revalidate = 0; // Disable cache so wall is always fresh

export default async function WallPage() {
  // Fetch public elegies that are NOT locked by time capsule
  const publicElegies = await db
    .select()
    .from(elegies)
    .where(
      and(
        eq(elegies.isPublic, true),
        or(
          isNull(elegies.unlockDate),
          lte(elegies.unlockDate, new Date())
        )
      )
    )
    .orderBy(desc(elegies.createdAt))
    .limit(50);

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto animate-fade-in relative">
      <header className="mb-16 border-b border-border pb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">Dinding Pelepasan</h1>
        <p className="text-text-muted font-light leading-relaxed">
          Ruang tanpa nama di mana kita saling bersaksi atas kepergian versi lama diri kita. 
          Setiap elegi di sini adalah bukti bahwa kita tidak sendirian dalam proses bertumbuh.
        </p>
      </header>

      {publicElegies.length === 0 ? (
        <div className="text-center py-20 text-text-muted italic font-serif">
          Belum ada elegi yang dibagikan. Jadilah yang pertama melepaskan.
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {publicElegies.map((item) => (
            <WallCard
              key={item.id}
              id={item.id}
              createdAt={item.createdAt}
              eulogyText={item.eulogyText}
              mirrorText={item.mirrorText}
              pastSelf={item.pastSelf}
              reactionsCount={item.reactionsCount || 0}
            />
          ))}
        </div>
      )}

      <div className="mt-20 text-center relative z-10">
        <Link 
          href="/write" 
          className="inline-block px-8 py-3 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent hover:text-background transition-all duration-300 font-medium"
        >
          Tulis Elegimu Sendiri
        </Link>
      </div>
    </div>
  );
}
