import {
  Atom,
  FileCode,
  Triangle,
  Paintbrush,
  Zap,
  Server,
  Terminal,
  Database,
  Network,
  GitBranch,
  Container,
  PenTool,
  Code2,
} from "lucide-react";
import { type SkillCategory } from "@/types/skill.types";

const i = (Icon: typeof Atom) => <Icon size={14} />;

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Building beautiful, responsive interfaces",
    skills: [
      { id: "sk-react", name: "React", icon: i(Atom), proficiency: "expert" },
      {
        id: "sk-typescript",
        name: "TypeScript",
        icon: i(FileCode),
        proficiency: "expert",
      },
      {
        id: "sk-nextjs",
        name: "Next.js",
        icon: i(Triangle),
        proficiency: "proficient",
      },
      { id: "sk-tailwind", name: "Tailwind CSS", icon: i(Paintbrush), proficiency: "expert" },
      { id: "sk-framer", name: "Framer Motion", icon: i(Zap), proficiency: "proficient" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Scalable APIs and server-side logic",
    skills: [
      {
        id: "sk-nodejs",
        name: "Node.js",
        icon: i(Server),
        proficiency: "expert",
      },
      {
        id: "sk-python",
        name: "Python",
        icon: i(Terminal),
        proficiency: "proficient",
      },
      {
        id: "sk-postgresql",
        name: "PostgreSQL",
        icon: i(Database),
        proficiency: "proficient",
      },
      { id: "sk-graphql", name: "GraphQL", icon: i(Network), proficiency: "foundational" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    description: "Version control, CI/CD, and collaboration",
    skills: [
      { id: "sk-git", name: "Git", icon: i(GitBranch), proficiency: "expert" },
      { id: "sk-docker", name: "Docker", icon: i(Container), proficiency: "proficient" },
      { id: "sk-figma", name: "Figma", icon: i(PenTool), proficiency: "proficient" },
      { id: "sk-vscode", name: "VS Code", icon: i(Code2), proficiency: "expert" },
    ],
  },
];
