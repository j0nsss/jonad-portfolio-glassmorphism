import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-t border-zinc-200 dark:border-zinc-700/50",
        className,
      )}
    />
  );
}
