import Link from "next/link";

export default function ArchiveList({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const isLocked = item.unlockDate && new Date(item.unlockDate) > new Date();

        return (
          <div 
            key={item.id} 
            className="group relative bg-surface/40 backdrop-blur-md border border-border/60 rounded-2xl p-7 hover:border-accent/50 transition-all duration-300 flex flex-col animate-fade-in hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 overflow-hidden justify-between"
            style={{ animationDelay: `${(index % 10) * 0.08}s` }}
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/40">
                <div className="text-xs text-text-muted/70 font-mono">
                  {new Date(item.createdAt || Date.now()).toLocaleDateString("id-ID", {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </div>
                {isLocked && (
                  <div className="text-xs text-accent font-mono flex items-center gap-1.5 bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Kapsul Tersegel
                  </div>
                )}
              </div>
              
              <div className="space-y-4 relative z-10">
                {isLocked ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center space-y-2 opacity-70">
                    <p className="text-sm font-serif text-text-primary">Kapsul Waktu</p>
                    <p className="text-xs font-light text-text-muted">
                      Terbuka pada: <br/>
                      <span className="font-mono text-accent mt-1 block">
                        {new Date(item.unlockDate!).toLocaleDateString("id-ID", {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-accent/70 text-[10px] uppercase tracking-[0.2em] block mb-1 font-mono">Masa Lalu</span>
                      <p className="text-xs font-light text-text-primary/70 line-clamp-2 leading-relaxed">
                        {item.pastSelf}
                      </p>
                    </div>
                    
                    <div className="bg-background/50 p-4 rounded-xl border-l-2 border-accent/40 group-hover:border-accent transition-colors duration-300">
                      <p className="text-sm font-serif italic text-text-muted group-hover:text-text-primary/90 transition-colors duration-300 line-clamp-3 leading-relaxed">
                        "{item.eulogyText}"
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <Link 
              href={`/result/${item.id}`}
              className="mt-6 text-xs font-mono text-accent group-hover:text-accent/80 transition-colors flex items-center justify-between pt-4 border-t border-border/30"
            >
              <span>{isLocked ? "Lihat Status Kapsul" : "Baca Refleksi Lengkap"}</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
