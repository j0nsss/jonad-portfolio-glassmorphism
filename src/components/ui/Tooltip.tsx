import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-lg bg-zinc-800 dark:bg-zinc-200 px-2.5 py-1 text-xs font-medium text-white dark:text-zinc-900 shadow-lg pointer-events-none",
            position === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
            position === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2",
          )}
        >
          {content}
        </span>
      )}
    </div>
  );
}
