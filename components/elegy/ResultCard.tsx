export default function ResultCard({ elegy }: { elegy: any }) {
  return (
    <div className="space-y-16">
      {/* SECTION 1: Input text past vs present */}
      <section className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xs tracking-[0.25em] uppercase text-text-muted/80 border-b border-border/40 pb-3 font-mono">
          Refleksi Yang Ditulis
        </h2>
        <div className="grid md:grid-cols-2 gap-6 relative">
          <div className="bg-surface/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border/60 hover:border-accent/30 transition-all duration-500 shadow-sm overflow-hidden">
            <h3 className="text-accent text-xs tracking-wider uppercase mb-4 font-mono flex items-center gap-2">
              <span className="w-6 h-px bg-accent/40"></span> Masa Lalu
            </h3>
            <p className="font-light text-text-primary/85 leading-relaxed whitespace-pre-wrap text-sm sm:text-base break-words">
              {elegy.pastSelf}
            </p>
          </div>
          <div className="bg-surface/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-border/60 hover:border-accent/30 transition-all duration-500 shadow-sm overflow-hidden">
            <h3 className="text-accent text-xs tracking-wider uppercase mb-4 font-mono flex items-center gap-2">
              <span className="w-6 h-px bg-accent/40"></span> Masa Sekarang
            </h3>
            <p className="font-light text-text-primary/85 leading-relaxed whitespace-pre-wrap text-sm sm:text-base break-words">
              {elegy.presentSelf}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI Eulogy */}
      <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/60"></div>
          <h2 className="text-xs tracking-[0.3em] uppercase text-accent font-mono">Elegi Perpisahan</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/60"></div>
        </div>
        
        <div className="px-4 md:px-12 py-10 relative bg-surface/20 rounded-3xl border border-accent/20 backdrop-blur-md overflow-hidden">
          <div className="absolute top-2 left-4 text-accent/15 font-serif text-6xl md:text-8xl leading-none select-none pointer-events-none">&ldquo;</div>
          <p className="font-serif text-xl md:text-3xl lg:text-4xl italic leading-relaxed text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-text-muted whitespace-pre-wrap text-center relative z-10 px-4 md:px-8 break-words">
            {elegy.eulogyText}
          </p>
          <div className="absolute bottom-2 right-4 text-accent/15 font-serif text-6xl md:text-8xl leading-none rotate-180 select-none pointer-events-none">&rdquo;</div>
        </div>
      </section>

      {/* SECTION 3: AI Mirror */}
      <section className="space-y-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-xs tracking-[0.25em] uppercase text-text-muted/80 border-b border-border/40 pb-3 font-mono">
          Cermin Refleksi
        </h2>
        <div className="p-6 md:p-12 bg-gradient-to-b from-surface/70 to-surface/30 backdrop-blur-md rounded-3xl border border-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden">
          <p className="font-sans font-light text-base md:text-lg leading-relaxed text-text-primary/90 whitespace-pre-wrap break-words">
            {elegy.mirrorText}
          </p>
        </div>
      </section>
    </div>
  );
}
