import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-12 md:mb-16",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
