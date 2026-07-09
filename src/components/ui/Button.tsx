import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "glass" | "neu" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500",
  glass:
    "bg-glass-light dark:bg-glass-dark border border-glass-light-border dark:border-glass-dark-border backdrop-blur-md text-zinc-800 dark:text-zinc-100 hover:bg-white/60 dark:hover:bg-white/10",
  neu: "shadow-neu-flat dark:shadow-neu-dark-flat bg-surface-light dark:bg-surface-dark text-zinc-800 dark:text-zinc-100 active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed",
  ghost:
    "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button({
  variant,
  size = "md",
  type = "button",
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  onClick,
  className,
  children,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light dark:focus-visible:ring-offset-surface-dark disabled:pointer-events-none disabled:opacity-50 min-h-[48px] cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        icon &&
        iconPosition === "left" && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <span>{isLoading ? "Loading..." : children}</span>
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
