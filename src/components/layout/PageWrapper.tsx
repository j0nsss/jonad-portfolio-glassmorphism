import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTopButton } from "./BackToTopButton";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}
