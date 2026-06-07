import { db } from "@/lib/db";
import { elegies } from "@/lib/db/schema";
import { desc, eq, and, or, isNull, lte } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0; // Disable cache so wall is always fresh

export default async function WallPage() {
  // Fetch public elegies that are NOT locked by time capsule
  const publicElegies = await db.query.elegies.findMany({
    where: and(
      eq(elegies.isPublic, true),
      or(
        isNull(elegies.unlockDate),
        lte(elegies.unlockDate, new Date())
      )
    ),
    orderBy: [desc(elegies.createdAt)],
    limit: 50
  });

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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {publicElegies.map((item, i) => (
            <div 
              key={item.id} 
              className="break-inside-avoid bg-surface/30 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover:border-accent/40 transition-colors duration-500 shadow-sm animate-fade-in opacity-0"
              style={{ animationDelay: `${(i % 10) * 0.1}s` }}
            >
              <div className="text-xs text-text-muted/60 font-mono mb-4">
                {new Date(item.createdAt || Date.now()).toLocaleDateString("id-ID", {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}
              </div>
              
              <p className="font-serif italic text-text-primary/90 leading-relaxed mb-4 text-lg">
                "{item.eulogyText}"
              </p>

              <div className="pt-4 border-t border-border/40 mt-4">
                <span className="text-accent/50 text-[10px] uppercase tracking-[0.2em] block mb-2 font-medium">Dari masa lalunya</span>
                <p className="text-xs font-light text-text-muted line-clamp-3 leading-relaxed">
                  {item.pastSelf}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-20 text-center">
        <Link 
          href="/write" 
          className="inline-block px-8 py-3 bg-accent/10 text-accent border border-accent/30 rounded-full hover:bg-accent hover:text-background transition-all duration-300"
        >
          Tulis Elegimu Sendiri
        </Link>
      </div>
    </div>
  );
}
