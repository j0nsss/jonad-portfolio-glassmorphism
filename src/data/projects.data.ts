import { type Project } from "@/types/project.types";

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with real-time inventory, payment processing, and admin dashboard.",
    category: ["fullstack", "web"],
    techStack: [
      { name: "React" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "Stripe" },
    ],
    thumbnail: "",
    featured: true,
    year: 2025,
  },
  {
    id: "proj-2",
    slug: "fitness-tracker-app",
    title: "Fitness Tracker App",
    description:
      "Cross-platform mobile app for tracking workouts, nutrition, and progress with social features.",
    category: ["mobile", "fullstack"],
    techStack: [
      { name: "React Native" },
      { name: "TypeScript" },
      { name: "Firebase" },
    ],
    thumbnail: "",
    featured: true,
    year: 2025,
  },
  {
    id: "proj-3",
    slug: "design-system-library",
    title: "Design System Library",
    description:
      "A comprehensive component library with Storybook documentation, theming, and accessibility built-in.",
    category: ["design", "web"],
    techStack: [
      { name: "React" },
      { name: "Storybook" },
      { name: "Tailwind CSS" },
    ],
    thumbnail: "",
    featured: true,
    year: 2024,
  },
  {
    id: "proj-4",
    slug: "ai-chat-interface",
    title: "AI Chat Interface",
    description:
      "Real-time chat interface powered by LLMs with streaming responses, context management, and multi-modal input.",
    category: ["web"],
    techStack: [
      { name: "Next.js" },
      { name: "WebSocket" },
      { name: "OpenAI" },
    ],
    thumbnail: "",
    featured: false,
    year: 2024,
  },
  {
    id: "proj-5",
    slug: "task-management-app",
    title: "Task Manager",
    description:
      "Kanban-style project management tool with drag-and-drop, real-time collaboration, and analytics.",
    category: ["fullstack", "web"],
    techStack: [
      { name: "Vue.js" },
      { name: "Django" },
      { name: "Redis" },
    ],
    thumbnail: "",
    featured: false,
    year: 2024,
  },
  {
    id: "proj-6",
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description:
      "Beautiful weather visualization app with 7-day forecasts, historical data, and location-based alerts.",
    category: ["web", "mobile"],
    techStack: [
      { name: "React" },
      { name: "D3.js" },
      { name: "GraphQL" },
    ],
    thumbnail: "",
    featured: false,
    year: 2023,
  },
  {
    id: "proj-7",
    slug: "brand-identity-redesign",
    title: "Brand Identity Redesign",
    description:
      "Complete brand overhaul including logo, typography system, color palette, and brand guidelines document.",
    category: ["design"],
    techStack: [{ name: "Figma" }, { name: "Illustrator" }],
    thumbnail: "",
    featured: false,
    year: 2023,
  },
];
