import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ProjectFilter } from "@/types/project.types";

interface ProjectFilterBarProps {
  categories: ProjectFilter[];
  activeCategory: ProjectFilter;
  onChange: (category: ProjectFilter) => void;
}

const labels: Record<ProjectFilter, string> = {
  all: "All",
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  fullstack: "Full Stack",
};

export function ProjectFilterBar({
  categories,
  activeCategory,
  onChange,
}: ProjectFilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="tablist">
      {categories.map((cat) => {
        const isActive = cat === activeCategory;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={cn(
              "relative rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 min-h-[44px]",
              isActive
                ? "text-white"
                : "text-zinc-600 dark:text-zinc-400 bg-surface-light dark:bg-surface-dark shadow-neu-pressed dark:shadow-neu-dark-pressed hover:text-zinc-900 dark:hover:text-zinc-100",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-filter"
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{labels[cat]}</span>
          </button>
        );
      })}
    </div>
  );
}
