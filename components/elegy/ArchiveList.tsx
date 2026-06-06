import Link from "next/link";

export default function ArchiveList({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="group relative bg-surface/40 backdrop-blur-md border border-border/60 rounded-2xl p-7 hover:border-accent/40 transition-all duration-500 flex flex-col animate-fade-in opacity-0 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 overflow-hidden"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Subtle glow effect on hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="text-xs text-text-muted/70 font-mono mb-6 pb-4 border-b border-border/40">
            {new Date(item.createdAt).toLocaleDateString("id-ID", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <div className="flex-1 space-y-5 relative z-10">
            <div>
              <span className="text-accent/60 text-[10px] uppercase tracking-[0.2em] block mb-2 font-medium">Dulu</span>
              <p className="text-sm font-light text-text-primary/70 line-clamp-2 leading-relaxed">
                {item.pastSelf.substring(0, 60)}...
              </p>
            </div>
            
            <div className="bg-background/40 p-4 rounded-xl border-l-2 border-accent/40 group-hover:border-accent transition-colors duration-500">
              <p className="text-sm font-serif italic text-text-muted group-hover:text-text-primary/80 transition-colors duration-500 line-clamp-3 leading-relaxed">
                "{item.eulogyText.substring(0, 100)}..."
              </p>
            </div>
          </div>
          
          <Link 
            href={`/result/${item.id}`}
            className="mt-6 text-sm text-accent group-hover:text-accent/80 transition-colors flex items-center gap-2"
          >
            Baca selengkapnya <span>&rarr;</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
