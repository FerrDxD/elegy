"use client";

import { useState } from "react";
import ReactionButton from "./ReactionButton";

interface WallCardProps {
  id: string;
  createdAt: Date | null;
  eulogyText: string;
  mirrorText: string;
  pastSelf: string;
  reactionsCount: number;
}

export default function WallCard({
  id,
  createdAt,
  eulogyText,
  mirrorText,
  pastSelf,
  reactionsCount,
}: WallCardProps) {
  const [showMirror, setShowMirror] = useState(false);

  return (
    <div className="break-inside-avoid mb-6 bg-surface/40 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover:border-accent/40 transition-all duration-300 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-text-muted/60 font-mono">
            {new Date(createdAt || Date.now()).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <ReactionButton elegyId={id} initialCount={reactionsCount} />
        </div>

        <p className="font-serif italic text-text-primary/95 leading-relaxed mb-4 text-lg">
          "{eulogyText}"
        </p>

        <div className="pt-4 border-t border-border/40 mt-4">
          <span className="text-accent/60 text-[10px] uppercase tracking-[0.2em] block mb-2 font-medium">
            Dari masa lalunya
          </span>
          <p className="text-xs font-light text-text-muted line-clamp-3 leading-relaxed">
            {pastSelf}
          </p>
        </div>

        {showMirror && (
          <div className="mt-4 pt-4 border-t border-accent/20 bg-accent/5 p-4 rounded-xl animate-fade-in">
            <span className="text-accent text-[10px] uppercase tracking-[0.2em] block mb-2 font-medium">
              Cermin Refleksi
            </span>
            <p className="text-xs font-light text-text-primary/90 leading-relaxed italic font-sans">
              {mirrorText}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowMirror(!showMirror)}
        className="mt-4 text-xs text-accent/80 hover:text-accent font-medium self-start transition-colors flex items-center gap-1"
      >
        <span>{showMirror ? "Sembunyikan Cermin" : "Baca Cermin Refleksi"}</span>
        <span>{showMirror ? "↑" : "↓"}</span>
      </button>
    </div>
  );
}
