export default function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-[bounce_1.4s_infinite_ease-in-out_both]"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-[bounce_1.4s_infinite_ease-in-out_both_0.16s]"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-[bounce_1.4s_infinite_ease-in-out_both_0.32s]"></span>
    </span>
  );
}
