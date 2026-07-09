import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassBlur = "sm" | "md" | "lg" | "xl";

interface GlassPanelProps {
  blur?: GlassBlur;
  border?: boolean;
  className?: string;
  children: ReactNode;
}

const blurStyles: Record<GlassBlur, string> = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

export function GlassPanel({
  blur = "md",
  border = true,
  className,
  children,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-glass-light dark:bg-glass-dark",
        blurStyles[blur],
        border &&
          "border border-glass-light-border dark:border-glass-dark-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
