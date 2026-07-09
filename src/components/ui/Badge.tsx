import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-glass-light dark:bg-glass-dark backdrop-blur-sm border border-glass-light-border dark:border-glass-dark-border text-zinc-700 dark:text-zinc-300",
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
