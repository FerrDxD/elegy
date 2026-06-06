export default function ResultCard({ elegy }: { elegy: any }) {
  return (
    <div className="space-y-16">
      <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-sm tracking-[0.2em] uppercase text-text-muted border-b border-border/50 pb-4 mb-6">Yang Kamu Tulis</h2>
        <div className="grid md:grid-cols-2 gap-6 relative">
          <div className="bg-surface/30 backdrop-blur-sm p-8 rounded-2xl border border-border/60 hover:border-accent/30 transition-colors duration-500 shadow-sm">
            <h3 className="text-accent text-sm mb-5 font-serif italic flex items-center gap-2">
              <span className="w-8 h-px bg-accent/50"></span> Dulu
            </h3>
            <p className="font-light text-text-primary/80 leading-relaxed whitespace-pre-wrap">{elegy.pastSelf}</p>
          </div>
          <div className="bg-surface/30 backdrop-blur-sm p-8 rounded-2xl border border-border/60 hover:border-accent/30 transition-colors duration-500 shadow-sm">
            <h3 className="text-accent text-sm mb-5 font-serif italic flex items-center gap-2">
              <span className="w-8 h-px bg-accent/50"></span> Sekarang
            </h3>
            <p className="font-light text-text-primary/80 leading-relaxed whitespace-pre-wrap">{elegy.presentSelf}</p>
          </div>
        </div>
      </section>

      <section className="space-y-8 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-6 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
          <h2 className="text-sm tracking-[0.3em] uppercase text-accent">Elegi</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
        </div>
        
        <div className="px-4 md:px-16 py-10 md:py-12 relative">
          <div className="absolute top-0 left-0 md:-left-4 text-accent/10 font-serif text-6xl md:text-8xl leading-none">"</div>
          <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-text-muted whitespace-pre-wrap text-center relative z-10 px-4 md:px-8">
            {elegy.eulogyText}
          </p>
          <div className="absolute bottom-[-10px] md:bottom-[-20px] right-0 md:-right-4 text-accent/10 font-serif text-6xl md:text-8xl leading-none rotate-180">"</div>
        </div>
      </section>

      <section className="space-y-8 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-sm tracking-[0.2em] uppercase text-text-muted border-b border-border/50 pb-4">Cermin</h2>
        <div className="p-10 md:p-12 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-sm rounded-3xl border border-border/60 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          <p className="font-sans font-light text-lg md:text-xl leading-relaxed text-text-primary/90 whitespace-pre-wrap">
            {elegy.mirrorText}
          </p>
        </div>
      </section>
    </div>
  );
}
