import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation.data";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { IconButton } from "@/components/ui/IconButton";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const direction = useScrollDirection();
  const activeSection = useActiveSection();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hidden = direction === "down" && scrolled;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: hidden ? -96 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          scrolled
            ? "bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-glass-light-border dark:border-glass-dark-border"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
          <a
            href="#hero"
            className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Jonad
          </a>

          {isDesktop ? (
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                      isActive
                        ? "text-brand-500"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-brand-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </nav>
          ) : (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <IconButton
                icon={<Menu size={18} />}
                label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded={mobileMenuOpen}
              />
            </div>
          )}
        </div>
      </motion.header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
