import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "rounded-2xl px-4 py-3 text-sm bg-surface-light dark:bg-surface-dark shadow-neu-pressed dark:shadow-neu-dark-pressed text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 resize-y min-h-[120px] focus-visible:outline-none focus-visible:shadow-focus-ring focus-visible:shadow-neu-sm dark:focus-visible:shadow-neu-dark-sm",
            error &&
              "ring-2 ring-red-400 dark:ring-red-500",
            className,
          )}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            aria-live="polite"
            className="text-xs text-red-500 dark:text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
