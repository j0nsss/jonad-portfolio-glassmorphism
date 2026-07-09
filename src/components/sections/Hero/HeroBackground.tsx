import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  className?: string;
}

export function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden opacity-60 md:opacity-100",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute -top-24 -right-24 h-72 w-72 animate-blob rounded-full bg-brand-400/20 blur-3xl md:h-96 md:w-96" />
      <div className="absolute -bottom-32 -left-16 h-64 w-64 animate-blob rounded-full bg-brand-300/15 blur-3xl md:h-80 md:w-80" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 left-1/3 h-48 w-48 animate-blob rounded-full bg-brand-500/10 blur-3xl md:h-64 md:w-64" style={{ animationDelay: "4s" }} />
    </div>
  );
}
