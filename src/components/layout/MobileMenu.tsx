import { useRef, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navLinks } from "@/data/navigation.data";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { IconButton } from "@/components/ui/IconButton";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

function FocusTrap({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      container.querySelectorAll<HTMLElement>(focusableSelector);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) focusable[0].focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

import type { Variants } from "framer-motion";

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3, ease: "easeOut" } as const,
  }),
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] md:hidden"
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-glass-light dark:bg-glass-dark backdrop-blur-xl border-l border-glass-light-border dark:border-glass-dark-border"
          >
            <FocusTrap>
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">
                    Menu
                  </span>
                  <IconButton
                    icon={<X size={18} />}
                    label="Close menu"
                    onClick={onClose}
                  />
                </div>

                <nav
                  className="flex flex-col gap-2"
                  aria-label="Mobile navigation"
                >
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={onClose}
                      className="rounded-2xl px-4 py-3 text-lg font-medium text-zinc-800 dark:text-zinc-100 hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-auto pt-8 flex justify-center">
                  <ThemeToggle />
                </div>
              </div>
            </FocusTrap>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
