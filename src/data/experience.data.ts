import { type ExperienceItem } from "@/types/skill.types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Frontend Developer",
    company: "Tech Corp",
    startDate: "2023-01",
    endDate: "Present",
    summary:
      "Leading frontend architecture for a SaaS platform serving 50k+ users.",
    achievements: [
      "Migrated legacy codebase to React + TypeScript, reducing bugs by 40%",
      "Built a reusable component library adopted by 3 product teams",
      "Improved Lighthouse performance score from 65 to 95",
    ],
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    startDate: "2021-06",
    endDate: "2022-12",
    summary:
      "Built and shipped MVP features for an early-stage fintech startup.",
    achievements: [
      "Developed real-time payment processing system handling $2M+ monthly",
      "Designed and implemented RESTful APIs serving 10k+ daily requests",
      "Reduced deployment time by 60% with Docker + CI/CD pipelines",
    ],
  },
  {
    id: "exp-3",
    role: "Junior Developer",
    company: "Web Agency",
    startDate: "2019-09",
    endDate: "2021-05",
    summary:
      "Delivered responsive websites and web applications for diverse clients.",
    achievements: [
      "Delivered 20+ client projects on time and within budget",
      "Introduced modern tooling (Webpack, ESLint, Prettier) to the team",
      "Mentored 3 junior developers in React fundamentals",
    ],
  },
];
