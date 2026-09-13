"use client";

import { useState } from "react";

interface ExportCardProps {
  eulogyText: string;
  mirrorText: string;
}

export default function ExportCardButton({ eulogyText, mirrorText }: ExportCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCard = () => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 1080;
      const height = 1350; // Instagram Portrait Aspect Ratio 4:5
      canvas.width = width;
      canvas.height = height;

      // Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#0F0F12");
      gradient.addColorStop(0.5, "#18171E");
      gradient.addColorStop(1, "#0A0A0C");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle Decorative Ring
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 450, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(138, 122, 96, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Brand Title
      ctx.fillStyle = "#8A7A60";
      ctx.font = "bold 28px serif";
      ctx.textAlign = "center";
      ctx.fillText("E L E G Y", width / 2, 120);

      // Divider line
      ctx.strokeStyle = "rgba(138, 122, 96, 0.3)";
      ctx.beginPath();
      ctx.moveTo(width / 2 - 40, 150);
      ctx.lineTo(width / 2 + 40, 150);
      ctx.stroke();

      // Eulogy Section Title
      ctx.fillStyle = "rgba(240, 240, 240, 0.5)";
      ctx.font = "18px sans-serif";
      ctx.fillText("E L E G I", width / 2, 280);

      // Helper function to wrap text
      const wrapText = (text: string, x: number, startY: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(" ");
        let line = "";
        let y = startY;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, y);
            line = words[n] + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), x, y);
        return y + lineHeight;
      };

      // Quote Quote Mark
      ctx.fillStyle = "rgba(138, 122, 96, 0.2)";
      ctx.font = "italic 120px serif";
      ctx.fillText("“", width / 2, 380);

      // Eulogy Content
      ctx.fillStyle = "#F3F4F6";
      ctx.font = "italic 36px serif";
      const endEulogyY = wrapText(eulogyText, width / 2, 440, 840, 56);

      // Mirror Section Divider
      const mirrorStartY = Math.max(endEulogyY + 60, 800);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.moveTo(width / 2 - 100, mirrorStartY);
      ctx.lineTo(width / 2 + 100, mirrorStartY);
      ctx.stroke();

      // Mirror Title
      ctx.fillStyle = "#8A7A60";
      ctx.font = "18px sans-serif";
      ctx.fillText("C E R M I N", width / 2, mirrorStartY + 60);

      // Mirror Content
      ctx.fillStyle = "rgba(240, 240, 240, 0.85)";
      ctx.font = "300 26px sans-serif";
      wrapText(mirrorText, width / 2, mirrorStartY + 110, 800, 44);

      // Footer
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.font = "16px sans-serif";
      ctx.fillText("elegy.app", width / 2, height - 80);

      // Trigger Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `elegy-reflection-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Export error:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generateCard}
      disabled={isGenerating}
      className="px-6 py-2.5 bg-surface border border-border/80 text-text-primary rounded-full hover:border-accent hover:text-accent transition-all duration-300 flex items-center justify-center gap-2 text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      {isGenerating ? "Membuat Card..." : "Unduh Card Gambar"}
    </button>
  );
}
