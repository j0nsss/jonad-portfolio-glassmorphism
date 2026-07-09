import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Code2, Calendar } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { type Project } from "@/types/project.types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function FocusTrap({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      container.querySelectorAll<HTMLElement>(focusableSelector);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) focusable[0].focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useLockBodyScroll(!!project);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Project details: ${project.title}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg"
          >
            <FocusTrap>
              <GlassPanel className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h2>
                    <span className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                      <Calendar size={14} />
                      {project.year}
                    </span>
                  </div>
                  <IconButton
                    icon={<X size={18} />}
                    label="Close modal"
                    onClick={onClose}
                  />
                </div>

                {/* Thumbnail */}
                <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/20 dark:to-brand-800/10 h-48 sm:h-56 flex items-center justify-center">
                  <span className="text-5xl opacity-30">
                    {project.category[0] === "web"
                      ? "🌐"
                      : project.category[0] === "mobile"
                        ? "📱"
                        : project.category[0] === "design"
                          ? "🎨"
                          : "⚡"}
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.longDescription || project.description}
                </p>

                {/* Tech stack */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Tech Stack
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech.name}>{tech.name}</Badge>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Categories
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.category.map((cat) => (
                      <Badge key={cat}>{cat}</Badge>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <Button
                      variant="primary"
                      icon={<ExternalLink size={16} />}
                      iconPosition="right"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button
                      variant="glass"
                      icon={<Code2 size={16} />}
                      iconPosition="right"
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </GlassPanel>
            </FocusTrap>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
