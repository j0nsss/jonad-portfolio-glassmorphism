import { type ReactNode } from "react";

export type SkillProficiency = "foundational" | "proficient" | "expert";

export interface Skill {
  id: string;
  name: string;
  icon: ReactNode;
  proficiency: SkillProficiency;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate: string | "Present";
  summary: string;
  achievements: string[];
}
