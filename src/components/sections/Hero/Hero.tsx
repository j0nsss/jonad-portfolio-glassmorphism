import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NeuContainer } from "@/components/ui/NeuContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  heroStaggerParent,
  heroItem,
  heroItemFade,
  heroScale,
  staticHeroItem,
  staticFadeIn,
} from "@/lib/animations";
import { HeroBackground } from "./HeroBackground";
import { HeroCTA } from "./HeroCTA";

const roleTexts = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const reducedMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roleTexts.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const checkHeight = () => {
      setShowScrollIndicator(window.innerHeight >= 700);
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  const parentVariant = reducedMotion ? staticFadeIn : heroStaggerParent;
  const itemVariant = reducedMotion ? staticHeroItem : heroItem;
  const fadeVariant = reducedMotion ? staticFadeIn : heroItemFade;
  const scaleVariant = reducedMotion ? staticHeroItem : heroScale;

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-x-hidden py-24 md:py-32"
    >
      <HeroBackground />

      <Container className="relative z-10">
        <motion.div
          variants={parentVariant}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left Column — Text & CTA */}
          <motion.div
            variants={itemVariant}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.span
              variants={fadeVariant}
              className="text-xs font-semibold uppercase tracking-widest text-brand-500"
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1
              variants={itemVariant}
              className="mt-4 text-4xl font-display font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="text-brand-500">Jonad</span>
            </motion.h1>

            <motion.p
              variants={fadeVariant}
              className="mt-2 h-8 text-lg font-medium text-zinc-500 dark:text-zinc-400 sm:text-xl"
            >
              <motion.span
                key={roleTexts[roleIndex]}
                initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {roleTexts[roleIndex]}
              </motion.span>
            </motion.p>

            <motion.p
              variants={fadeVariant}
              className="mt-6 max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
            >
              I craft digital experiences that blend clean code with thoughtful
              design. Passionate about building products that make a difference.
            </motion.p>

            <motion.div variants={itemVariant} className="mt-8">
              <HeroCTA />
            </motion.div>
          </motion.div>

          {/* Right Column — Photo Frame */}
          <motion.div
            variants={scaleVariant}
            className="flex justify-center lg:justify-end"
          >
            <NeuContainer
              variant="raised"
              className="relative h-72 w-72 overflow-hidden sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/20">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-500/20 text-4xl">
                    👋
                  </div>
                  <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                    Your photo here
                  </span>
                </div>
              </div>
            </NeuContainer>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll-down indicator */}
      {showScrollIndicator && (
        <motion.div
          variants={staticFadeIn}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown
              size={24}
              className="text-zinc-400 dark:text-zinc-500"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
