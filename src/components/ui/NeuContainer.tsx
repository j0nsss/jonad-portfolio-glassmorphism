import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type NeuVariant = "raised" | "pressed" | "flat";

interface NeuContainerProps {
  variant: NeuVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<NeuVariant, string> = {
  raised: "shadow-neu-flat dark:shadow-neu-dark-flat",
  pressed: "shadow-neu-pressed dark:shadow-neu-dark-pressed",
  flat: "shadow-neu-sm dark:shadow-neu-dark-sm",
};

export function NeuContainer({
  variant,
  as: Tag = "div",
  className,
  children,
}: NeuContainerProps) {
  return (
    <Tag
      className={cn(
        "rounded-3xl bg-surface-light dark:bg-surface-dark",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
