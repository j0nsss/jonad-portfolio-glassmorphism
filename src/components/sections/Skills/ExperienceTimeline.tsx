import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { type ExperienceItem } from "@/types/skill.types";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

function formatDate(date: string): string {
  if (date === "Present") return "Present";
  const [year, month] = date.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[Number(month) - 1]} ${year}`;
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-700"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            className="relative flex gap-6"
          >
            {/* Timeline node */}
            <div className="relative flex-shrink-0">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-glass-light dark:bg-glass-dark backdrop-blur-sm border border-glass-light-border dark:border-glass-dark-border">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              </div>
            </div>

            {/* Content card */}
            <div className="flex-1 pb-2">
              <GlassPanel className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.role}
                    </h3>
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-brand-500 hover:text-brand-600"
                      >
                        {item.company}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {item.company}
                      </p>
                    )}
                  </div>
                  <span className="mt-1 shrink-0 text-xs text-zinc-400 dark:text-zinc-500 sm:mt-0">
                    {formatDate(item.startDate)} — {formatDate(item.endDate)}
                  </span>
                </div>

                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.summary}
                </p>

                {item.achievements.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {item.achievements.map((achievement, ai) => (
                      <li
                        key={ai}
                        className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </GlassPanel>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
