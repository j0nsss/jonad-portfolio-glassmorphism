import { motion } from "framer-motion";
import { NeuContainer } from "@/components/ui/NeuContainer";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { type SkillCategory } from "@/types/skill.types";

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    >
      <NeuContainer variant="raised" className="p-6 h-full">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {category.title}
        </h3>
        {category.description && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {category.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <Badge key={skill.id} icon={skill.icon}>
              {skill.name}
            </Badge>
          ))}
        </div>
      </NeuContainer>
    </motion.div>
  );
}
