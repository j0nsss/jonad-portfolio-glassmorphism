import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeuContainer } from "@/components/ui/NeuContainer";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { type Project } from "@/types/project.types";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpen, index }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      layout={reducedMotion ? false : true}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group relative"
    >
      <button
        onClick={() => onOpen(project)}
        className="w-full text-left"
        aria-label={`View details for ${project.title}`}
      >
        <NeuContainer
          variant="raised"
          className="relative overflow-hidden"
        >
          {/* Thumbnail area */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/20 dark:to-brand-800/10 sm:h-56">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl opacity-30">
                  {project.category[0] === "web"
                    ? "🌐"
                    : project.category[0] === "mobile"
                      ? "📱"
                      : project.category[0] === "design"
                        ? "🎨"
                        : "⚡"}
                </span>
              </div>
            )}

            {/* Hover overlay — hoverable devices only */}
            <GlassPanel
              blur="md"
              className={cn(
                "absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300",
                "hoverable:group-hover:opacity-100",
              )}
            >
              <p className="line-clamp-3 text-sm text-zinc-700 dark:text-zinc-300">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <Badge key={tech.name}>{tech.name}</Badge>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                {project.liveUrl && (
                  <span className="flex items-center gap-1 text-xs text-brand-500">
                    <ExternalLink size={12} /> Live
                  </span>
                )}
                {project.repoUrl && (
                  <span className="flex items-center gap-1 text-xs text-brand-500">
                    <Code2 size={12} /> Code
                  </span>
                )}
              </div>
            </GlassPanel>
          </div>

          {/* Card body */}
          <div className="p-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech.name}>{tech.name}</Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge>+{project.techStack.length - 3}</Badge>
              )}
            </div>
          </div>
        </NeuContainer>
      </button>
    </motion.div>
  );
}
