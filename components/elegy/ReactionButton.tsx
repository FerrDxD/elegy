"use client";

import { useState } from "react";

export default function ReactionButton({ elegyId, initialCount }: { elegyId: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [hasReacted, setHasReacted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReact = async () => {
    if (hasReacted || isLoading) return;
    setIsLoading(true);
    setCount((prev) => prev + 1);
    setHasReacted(true);

    try {
      const res = await fetch(`/api/elegy/${elegyId}/react`, { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCount(data.count);
    } catch (e) {
      setCount((prev) => prev - 1);
      setHasReacted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleReact}
      disabled={hasReacted || isLoading}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
        hasReacted
          ? "bg-accent/20 border-accent/40 text-accent font-medium"
          : "bg-surface/40 border-border text-text-muted hover:border-accent/40 hover:text-text-primary"
      }`}
      title="Bersaksi atas elegi ini"
    >
      <span>🕯️</span>
      <span>{hasReacted ? "Telah Bersaksi" : "Bersaksi"}</span>
      {count > 0 && <span className="font-mono ml-0.5 opacity-80">({count})</span>}
    </button>
  );
}
