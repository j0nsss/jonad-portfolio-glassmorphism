import { PageWrapper } from "@/components/layout/PageWrapper";
import { Hero } from "@/components/sections/Hero/Hero";
import { ProjectsSection } from "@/components/sections/Projects/ProjectsSection";
import { SkillsSection } from "@/components/sections/Skills/SkillsSection";
import { ContactSection } from "@/components/sections/Contact/ContactSection";

function App() {
  return (
    <PageWrapper>
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </PageWrapper>
  );
}

export default App;
