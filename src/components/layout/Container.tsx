import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: "div" | "section" | "article";
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  id,
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
