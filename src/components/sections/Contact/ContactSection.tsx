import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import { ContactInfoCard } from "./ContactInfoCard";

export function ContactSection() {
  return (
    <section id="contact" aria-label="Contact" className="py-24 md:py-32 overflow-x-hidden">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind? Let's build something great."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <ContactForm />
          <ContactInfoCard />
        </div>
      </Container>
    </section>
  );
}
