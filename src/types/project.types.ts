export type ProjectCategory = "web" | "mobile" | "design" | "fullstack";
export type ProjectFilter = "all" | ProjectCategory;

export interface ProjectTechStack {
  name: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory[];
  techStack: ProjectTechStack[];
  thumbnail: string;
  images?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
}
