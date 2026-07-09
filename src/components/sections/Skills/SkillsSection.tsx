import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills.data";
import { experience } from "@/data/experience.data";
import { SkillCategoryCard } from "./SkillCategoryCard";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function SkillsSection() {
  return (
    <section id="skills" aria-label="Skills and Experience" className="py-24 md:py-32 overflow-x-hidden">
      <Container>
        <SectionHeading
          eyebrow="Expertise"
          title="Skills & Experience"
          subtitle="Technologies I work with and my professional journey."
        />

        {/* Skill Categories */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <SkillCategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <h3 className="mb-10 text-2xl font-display font-semibold text-zinc-900 dark:text-zinc-100">
            Experience
          </h3>
          <ExperienceTimeline items={experience} />
        </div>
      </Container>
    </section>
  );
}
