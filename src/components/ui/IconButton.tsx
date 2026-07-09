import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function IconButton({
  icon,
  label,
  type = "button",
  disabled = false,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-glass-light dark:bg-glass-dark backdrop-blur-md border border-glass-light-border dark:border-glass-dark-border text-zinc-700 dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light dark:focus-visible:ring-offset-surface-dark disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        "min-h-[48px] min-w-[48px] h-12 w-12",
        className,
      )}
    >
      <span aria-hidden="true">{icon}</span>
    </motion.button>
  );
}
