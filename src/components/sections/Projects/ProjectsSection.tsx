import { useState, useMemo, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects.data";
import { type ProjectFilter } from "@/types/project.types";
import { ProjectFilterBar } from "./ProjectFilterBar";
import { ProjectCard } from "./ProjectCard";

const ProjectModal = lazy(() =>
  import("./ProjectModal").then((m) => ({ default: m.ProjectModal })),
);

const categories: ProjectFilter[] = [
  "all",
  "web",
  "mobile",
  "design",
  "fullstack",
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects)[number]>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section id="projects" aria-label="Projects" className="py-24 md:py-32 overflow-x-hidden">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="A selection of projects I've built, from web apps to design systems."
        />

        <ProjectFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-10">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={setSelectedProject}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-zinc-500 dark:text-zinc-400">
            No projects found in this category.
          </p>
        )}
      </Container>

      <Suspense fallback={null}>
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Suspense>
    </section>
  );
}
