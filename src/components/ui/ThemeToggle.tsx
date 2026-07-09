import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconButton } from "./IconButton";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  return (
    <IconButton
      icon={
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={reducedMotion ? false : { opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex"
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.span>
        </AnimatePresence>
      }
      label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={toggleTheme}
    />
  );
}
