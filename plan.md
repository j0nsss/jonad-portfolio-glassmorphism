# MASTER ENGINEERING BLUEPRINT — Premium Portfolio Website
**Target:** React + TypeScript + Tailwind CSS + Framer Motion
**Aesthetic:** Neumorphism (structure) × Glassmorphism (interaction)
**Execution Agent:** OpenCode
**Document Version:** 1.0

---

## SECTION 0 — AGENT OPERATING RULES (Read First, Always)

These rules are non-negotiable and apply to every phase below.

1. Read this entire document before writing any code. Do not start generating files from Section 3 alone.
2. Execute phases in strict numerical order. Do not begin Phase N+1 until every item in Phase N's "Exit Criteria" is satisfied.
3. Stack lock: React + TypeScript + Tailwind CSS + Framer Motion + the libraries listed in Phase 1 only. Do not introduce Chakra, MUI, Ant Design, styled-components, or any competing styling/animation system.
4. Every component is a typed functional component with an explicit `Props` interface (even if empty — use `type XProps = Record<string, never>` rather than omitting typing).
5. `any` is forbidden. If a type is genuinely unknown, use `unknown` and narrow it.
6. All color, spacing, radius, and shadow values must resolve to a token defined in Section 2's `tailwind.config.js`. No arbitrary inline hex/px values except one-off SVG path coordinates.
7. Mobile-first CSS only: write unprefixed (base/mobile) utility classes first, then layer `sm:` / `md:` / `lg:` / `xl:` / `2xl:` / `3xl:` on top. Never write a desktop-first override.
8. Every Framer Motion animation must respect `prefers-reduced-motion` (see Section 3, Phase 4).
9. No new UI library for icons beyond `lucide-react` (already scoped in Phase 1).
10. After completing each checklist item in Section 3, treat it as immutable — do not silently refactor completed phases while working on a later one. If a change is required, note it and apply it explicitly.

---

## SECTION 1 — SYSTEM ARCHITECTURE & DIRECTORY TREE

### 1.1 Stack & Tooling

| Layer | Choice |
|---|---|
| Bundler | Vite (`npm create vite@latest portfolio -- --template react-ts`) |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS v3.4+ |
| Motion | Framer Motion |
| Icons | lucide-react |
| Form handling | react-hook-form + zod + @hookform/resolvers |
| Class merging | clsx + tailwind-merge (combined into a `cn()` utility) |
| Linting/Formatting | ESLint (typescript-eslint) + Prettier + prettier-plugin-tailwindcss |

Routing note: this build is a **single-page, anchor-scrolled application**. Do not install `react-router-dom` unless Phase 5 (stretch) explicitly calls for individual project case-study pages. Introducing routing prematurely is an architectural error.

### 1.2 Directory Tree

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── types/
│   │   ├── project.types.ts
│   │   ├── skill.types.ts
│   │   ├── navigation.types.ts
│   │   ├── contact.types.ts
│   │   └── index.ts
│   │
│   ├── data/
│   │   ├── projects.data.ts
│   │   ├── skills.data.ts
│   │   ├── experience.data.ts
│   │   └── navigation.data.ts
│   │
│   ├── context/
│   │   ├── ThemeContext.ts
│   │   └── ThemeProvider.tsx
│   │
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useScrollDirection.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useActiveSection.ts
│   │   ├── useLockBodyScroll.ts
│   │   └── useReducedMotion.ts
│   │
│   ├── lib/
│   │   ├── utils.ts            # cn() helper
│   │   ├── animations.ts       # shared Framer Motion variants
│   │   └── constants.ts        # breakpoints, section ids, etc.
│   │
│   └── components/
│       ├── ui/                 # GLOBAL PRIMITIVES — generic, no page-specific logic
│       │   ├── Button.tsx
│       │   ├── IconButton.tsx
│       │   ├── NeuContainer.tsx
│       │   ├── GlassPanel.tsx
│       │   ├── Badge.tsx
│       │   ├── Input.tsx
│       │   ├── TextArea.tsx
│       │   ├── SectionHeading.tsx
│       │   ├── Divider.tsx
│       │   ├── Tooltip.tsx
│       │   └── ThemeToggle.tsx
│       │
│       ├── layout/              # STRUCTURAL WRAPPERS — one instance per app
│       │   ├── Navbar.tsx
│       │   ├── MobileMenu.tsx
│       │   ├── Footer.tsx
│       │   ├── PageWrapper.tsx
│       │   ├── Container.tsx
│       │   └── BackToTopButton.tsx
│       │
│       └── sections/            # FEATURE-SPECIFIC — composed of ui/ + data/
│           ├── Hero/
│           │   ├── Hero.tsx
│           │   ├── HeroBackground.tsx
│           │   └── HeroCTA.tsx
│           ├── Projects/
│           │   ├── ProjectsSection.tsx
│           │   ├── ProjectCard.tsx
│           │   ├── ProjectFilterBar.tsx
│           │   └── ProjectModal.tsx
│           ├── Skills/
│           │   ├── SkillsSection.tsx
│           │   ├── SkillCategoryCard.tsx
│           │   └── ExperienceTimeline.tsx
│           └── Contact/
│               ├── ContactSection.tsx
│               ├── ContactForm.tsx
│               └── ContactInfoCard.tsx
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

### 1.3 Separation-of-Concerns Contract

| Folder | Rule |
|---|---|
| `components/ui/` | Fully generic, prop-driven, zero imports from `data/`. Must be reusable in a different project with no changes. |
| `components/layout/` | Structural only. Renders once per app. May import from `data/navigation.data.ts` and `context/`. |
| `components/sections/` | Feature-specific. May import `data/`, `types/`, and compose `ui/` primitives. Must NOT define new raw styled `<div>` soup — build from `ui/` primitives wherever a primitive exists. |
| `hooks/` | Pure reusable logic, no JSX. |
| `lib/` | Pure functions/constants, no React imports except `animations.ts` (which exports `Variants` objects, not components). |

### 1.4 Path Aliases

Configure in both `tsconfig.json` and `vite.config.ts`:

```json
// tsconfig.json (compilerOptions)
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"],
  "@/components/*": ["src/components/*"],
  "@/hooks/*": ["src/hooks/*"],
  "@/lib/*": ["src/lib/*"],
  "@/types/*": ["src/types/*"],
  "@/data/*": ["src/data/*"],
  "@/context/*": ["src/context/*"]
}
```

```typescript
// vite.config.ts
import path from "path";
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") },
}
```

---

## SECTION 2 — DESIGN TOKENS & TAILWIND CONFIG

### 2.1 Color Palette

Neutral base uses `zinc`/`slate`; accent is a single sharp violet-indigo used sparingly (CTAs, active states, focus rings, gradient accents only — never as a body-text color on light backgrounds).

| Token | Hex | Usage | Approx. Contrast |
|---|---|---|---|
| `brand-500` | `#6366F1` | Primary accent, gradients | ~4.6:1 on white (large text/UI only) |
| `brand-600` | `#4F46E5` | Accent on white surfaces, primary buttons | ~7:1 on white (AA/AAA body text) |
| `brand-400` | `#818CF8` | Accent on dark surfaces | ~5.5:1 on `#1A1D24` |
| `surface-light` | `#E9EDF5` | Base neumorphic background (light mode) | — |
| `surface-light-elevated` | `#F3F6FB` | Raised card background (light mode) | — |
| `surface-dark` | `#1A1D24` | Base neumorphic background (dark mode) | — |
| `surface-dark-elevated` | `#22262F` | Raised card background (dark mode) | — |
| `zinc-900` / `zinc-100` | Tailwind default | Primary body text (dark mode / light mode) | ≥7:1 |
| `zinc-500` | Tailwind default | Secondary/muted text | ≥4.5:1 on both surfaces |

> Verify all final text/background pairings with a contrast checker (e.g. WebAIM) before shipping — treat the ratios above as design-time targets, not a substitute for verification.

### 2.2 `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px", // large desktop / small 4K
      "4xl": "2560px", // true 4K verification breakpoint
    },
    extend: {
      colors: {
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        surface: {
          light: "#E9EDF5",
          "light-elevated": "#F3F6FB",
          dark: "#1A1D24",
          "dark-elevated": "#22262F",
        },
        glass: {
          light: "rgba(255,255,255,0.55)",
          "light-border": "rgba(255,255,255,0.40)",
          dark: "rgba(24,26,32,0.45)",
          "dark-border": "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Clash Display"', "Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        // NEUMORPHISM — light mode (base #E9EDF5)
        "neu-sm": "4px 4px 8px #c7cbd3, -4px -4px 8px #ffffff",
        "neu-flat": "8px 8px 16px #c7cbd3, -8px -8px 16px #ffffff",
        "neu-float": "12px 12px 28px #c7cbd3, -12px -12px 28px #ffffff",
        "neu-pressed": "inset 4px 4px 8px #c7cbd3, inset -4px -4px 8px #ffffff",

        // NEUMORPHISM — dark mode (base #1A1D24)
        "neu-dark-sm": "4px 4px 8px #101216, -4px -4px 8px #262a33",
        "neu-dark-flat": "8px 8px 16px #101216, -8px -8px 16px #262a33",
        "neu-dark-float": "12px 12px 28px #101216, -12px -12px 28px #262a33",
        "neu-dark-pressed": "inset 4px 4px 8px #101216, inset -4px -4px 8px #262a33",

        // GLASSMORPHISM — crisp thin borders simulated via layered shadow
        "glass-sm": "0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)",
        "glass-lg": "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",

        // Focus ring (accessibility)
        "focus-ring": "0 0 0 3px rgba(99,102,241,0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.97)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        blob: "blob 12s infinite ease-in-out",
        "gradient-x": "gradient-x 6s ease infinite",
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [],
};
```

### 2.3 `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-surface-light text-zinc-800 antialiased dark:bg-surface-dark dark:text-zinc-100;
  }
  ::selection {
    @apply bg-brand-500/30 text-zinc-900 dark:text-white;
  }
  *:focus-visible {
    @apply outline-none ring-2 ring-brand-500 ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    @apply rounded-full bg-zinc-400/50 dark:bg-zinc-600/50;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 2.4 Dark Mode Strategy

Class-based (`darkMode: "class"`), driven by a custom `ThemeContext` (not `next-themes`, which is Next.js-only):
- On load: read `localStorage.theme`; if absent, fall back to `window.matchMedia("(prefers-color-scheme: dark)")`.
- Toggle writes `class="dark"` to `<html>` and persists choice to `localStorage`.
- `ThemeToggle.tsx` (in `ui/`) is a glass icon button that animates a sun/moon icon swap via Framer Motion.

---

## SECTION 3 — STEP-BY-STEP IMPLEMENTATION ROADMAP

### PHASE 1 — Setup & Primitives

**Objective:** Scaffold the project and build every reusable `ui/` primitive before any section exists.

1. Scaffold: `npm create vite@latest portfolio -- --template react-ts`
2. Install dependencies:
```bash
   npm install framer-motion clsx tailwind-merge lucide-react react-hook-form zod @hookform/resolvers
   npm install -D tailwindcss postcss autoprefixer prettier prettier-plugin-tailwindcss eslint-config-prettier
   npx tailwindcss init -p
```
3. Apply `tailwind.config.js` (Section 2.2) and `globals.css` (Section 2.3). Import `globals.css` once in `main.tsx`.
4. Configure path aliases (Section 1.4) in both `tsconfig.json` and `vite.config.ts`.
5. Build `lib/utils.ts`:
```typescript
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
```
6. Build `ThemeContext.ts` + `ThemeProvider.tsx` + `useTheme.ts` per Section 2.4. Wrap `<App />` in `ThemeProvider` inside `main.tsx`.
7. Build `ui/` primitives, in this order, each with a strict `Props` interface (see Section 4 for exact contracts):
   - `NeuContainer.tsx` — variant: `raised | pressed | flat`; renders neumorphic surface, swaps shadow tokens by dark-mode context automatically via Tailwind `dark:` variants.
   - `GlassPanel.tsx` — renders `backdrop-blur-md`, `bg-glass-light dark:bg-glass-dark`, `border border-glass-light-border dark:border-glass-dark-border`.
   - `Button.tsx` — variants: `primary | glass | neu | ghost`.
   - `IconButton.tsx` — circular, glass by default, min touch target 48×48px.
   - `Badge.tsx` — small glass pill, used for tech-stack tags and skill chips.
   - `Input.tsx`, `TextArea.tsx` — neumorphic inset style at rest, focus state lifts to a subtle glass glow ring using `focus-ring` shadow token.
   - `SectionHeading.tsx` — takes `eyebrow`, `title`, `subtitle`; consistent heading rhythm across all sections.
   - `Divider.tsx`, `Tooltip.tsx`, `ThemeToggle.tsx`.

**Mobile vs Desktop for primitives:** every primitive must render correctly at 320px width with no horizontal overflow (`overflow-x-hidden` audit) before Phase 1 is marked complete.

**Exit Criteria:** All `ui/` primitives render in an isolated scratch page (temporary route in `App.tsx`, deleted in Phase 2) at 320px, 768px, and 1440px with no visual breakage, no console errors, dark mode toggle working.

---

### PHASE 2 — Global Layout & Theme

**Objective:** Build the structural shell every section will sit inside.

1. `lib/constants.ts` — define `SECTION_IDS = ['hero','projects','skills','contact'] as const` and breakpoint constants.
2. `data/navigation.data.ts` — array of `NavLink` (see Section 4) pointing to `#hero`, `#projects`, `#skills`, `#contact`.
3. `hooks/useScrollDirection.ts` — returns `'up' | 'down'`, debounced via `requestAnimationFrame`.
4. `hooks/useActiveSection.ts` — `IntersectionObserver` across all section refs; returns current active section id for nav highlighting.
5. Build `layout/Navbar.tsx`:
   - Sticky, `position: fixed top-0`.
   - Transparent at scroll position 0; transitions to `GlassPanel` styling (`backdrop-blur-md`, bottom border) once scrolled past 24px.
   - **Desktop (≥768px):** horizontal link row, active link gets an animated underline (Framer Motion `layoutId` shared element).
   - **Mobile (<768px):** logo + hamburger `IconButton` (48×48px min) only. Hamburger opens `MobileMenu.tsx`.
   - Hide-on-scroll-down / reveal-on-scroll-up using `useScrollDirection`.
6. Build `layout/MobileMenu.tsx`:
   - Full-screen `GlassPanel` overlay, `AnimatePresence` mount/unmount.
   - Staggered link entrance (`staggerChildren` in a shared variant from `lib/animations.ts`).
   - Trap focus while open; `Escape` key and backdrop click close it; body scroll locked via `useLockBodyScroll`.
   - `aria-expanded` on the trigger button, `aria-hidden` toggled on the panel.
7. Build `layout/Footer.tsx` — neumorphic top divider, social icon buttons (glass), copyright line, secondary nav link repeat.
8. Build `layout/BackToTopButton.tsx` — fixed bottom-right, glass circular `IconButton`, fades in after 400px scroll (`AnimatePresence`), `aria-label="Back to top"`.
9. Build `layout/Container.tsx` (max-width + responsive horizontal padding) and `layout/PageWrapper.tsx` (composes Navbar + `<main>` + Footer + BackToTopButton).

**Exit Criteria:** Navbar sticky/glass/hide-on-scroll behavior confirmed at mobile and desktop widths; mobile menu keyboard-operable end to end; dark mode toggle affects Navbar/Footer correctly.

---

### PHASE 3 — Main Sections (build in this exact order)

#### 3.1 Hero Section
- **Desktop (≥1024px):** two-column grid — left: eyebrow + name + animated role text + two CTAs (`Button variant="primary"` + `variant="glass"`); right: `NeuContainer` "photo frame" card (shadow `neu-float`) with an animated gradient blob (`HeroBackground.tsx`, uses `animate-blob`) behind it.
- **Mobile (<1024px):** single column, centered text, photo card stacks below CTAs, blob background scaled down and opacity-reduced to avoid overpowering small screens.
- CTA row: buttons stack full-width on mobile (`flex-col`), inline on desktop (`sm:flex-row`), min touch height 48px.
- Staggered entrance animation on mount (`lib/animations.ts` → `fadeUpStagger` variant).
- Scroll-down indicator (animated chevron, `motion.div` with a looping y-translate) — hidden on screens under 700px height to avoid crowding.

#### 3.2 Featured Projects (with filter states)
- `data/projects.data.ts` typed as `Project[]` (Section 4).
- `ProjectFilterBar.tsx`: pill buttons per category (`all | web | mobile | design | fullstack`). Active pill = solid `brand` gradient; inactive = `NeuContainer variant="pressed"`. Selected state uses a `layoutId` shared-element highlight for a smooth sliding pill effect.
- `ProjectsSection.tsx`: holds `activeCategory` state; filtered list via `useMemo`; wrap the grid in `AnimatePresence mode="popLayout"` so cards animate out/in on filter change without layout jank.
- **Grid:** `grid-cols-1` mobile → `sm:grid-cols-2` tablet → `lg:grid-cols-3` desktop → `3xl:grid-cols-4` ultra-wide.
- `ProjectCard.tsx`: `NeuContainer variant="raised"` at rest; on hover/focus (desktop, `(hover: hover)` media feature only) a `GlassPanel` overlay slides up from the bottom revealing description + tech `Badge` list + repo/live icon links; image scales subtly (`scale-105`) inside an `overflow-hidden` wrapper. On touch devices, tapping the card opens `ProjectModal.tsx` directly instead of relying on hover.
- `ProjectModal.tsx`: `GlassPanel` dialog, `role="dialog" aria-modal="true"`, focus-trapped, `Escape`/backdrop-click to close, body scroll locked.

#### 3.3 Skills / Experience Grid
- `data/skills.data.ts` typed as `SkillCategory[]`; `data/experience.data.ts` typed as `ExperienceItem[]`.
- `SkillCategoryCard.tsx`: `NeuContainer` housing a category title + wrapped row of `Badge` chips (icon + name). Grid: `grid-cols-1` mobile → `md:grid-cols-2` → `lg:grid-cols-3`.
- `ExperienceTimeline.tsx`: vertical timeline both mobile and desktop (a neumorphic vertical line with glass "node" dots); each entry is a `GlassPanel` card revealed via `whileInView` (once: true, margin trigger ~ `-100px`).

#### 3.4 Contact Form
- `ContactForm.tsx`: `react-hook-form` + `zod` schema (`name`, `email`, `message` — all required, `email` validated as email format).
- Fields use `ui/Input.tsx` / `ui/TextArea.tsx` (neumorphic inset, top-aligned `<label>` tied via `htmlFor`/`id`).
- Inline error text under each field, `aria-live="polite"` on the error region, `aria-invalid` toggled on the input.
- Submit `Button` shows `idle → loading → success/error` states via an icon swap (`AnimatePresence`); success shows a `GlassPanel` confirmation card replacing the form (or above it).
- `ContactInfoCard.tsx`: alongside the form on desktop (`lg:grid-cols-2`), stacked below on mobile — glass icon buttons linking to email/LinkedIn/GitHub, each `aria-label`'d.

#### 3.5 Footer
- Already built in Phase 2; verify it's included in `PageWrapper` and displays correctly after all sections are in place.

**Mobile vs Desktop summary (applies to every section above):**
| Aspect | Mobile | Desktop |
|---|---|---|
| Layout | Single column, stacked | Multi-column grid |
| Touch targets | ≥48×48px on every interactive element | Standard, precise hover states enabled |
| Hover effects | Disabled/replaced with tap-to-reveal (use `(hover: hover) and (pointer: fine)` media query) | Full hover micro-interactions |
| Overflow | `overflow-x-hidden` on section wrappers; decorative blobs clipped | Full decorative background visible |
| Spacing | Tighter vertical rhythm (`py-16`) | Generous rhythm (`py-24`/`py-32`) |

**Exit Criteria:** All four sections render inside `PageWrapper` in the specified order, anchor navigation from the Navbar scrolls correctly to each `id`, filter state and form validation both function with keyboard only.

---

### PHASE 4 — Animations & Fine-Tuning

1. Centralize all Framer Motion variants in `lib/animations.ts` (e.g., `fadeUpStagger`, `scaleIn`, `slideOverlay`) — sections import from here rather than defining ad hoc inline variant objects.
2. Build `hooks/useReducedMotion.ts` wrapping Framer Motion's `useReducedMotion`; every section-level variant must branch to a near-static (opacity-only) fallback when `true`.
3. Audit every `motion.*` element: animations must only touch `transform` and `opacity` (never `width`/`height`/`top`/`left`) to stay off the main thread and avoid layout thrash.
4. Add page-load choreography: Navbar fades in first, then Hero content staggers in beneath it.
5. Add scroll-triggered reveals (`whileInView`, `viewport={{ once: true, margin: "-80px" }}`) to Projects grid, Skills cards, and Experience timeline entries.
6. Polish cursor affordances on desktop: pointer cursor + subtle `whileHover={{ scale: 1.02 }}` / `whileTap={{ scale: 0.97 }}` on all clickable primitives.
7. Verify dark-mode transition itself is animated (a short `transition-colors duration-300` on `body` and major surfaces) rather than an abrupt flash.

**Exit Criteria:** Toggling OS-level "reduce motion" strips all decorative animation while keeping content fully usable; no animation causes layout shift (verify via Chrome DevTools Performance panel, no purple "layout" bars during scroll).

---

## SECTION 4 — COMPONENT SPECS & TYPING

### 4.1 Core Data Types

```typescript
// types/project.types.ts
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
```

```typescript
// types/skill.types.ts
export type SkillProficiency = "foundational" | "proficient" | "expert";

export interface Skill {
  id: string;
  name: string;
  icon: string;
  proficiency: SkillProficiency;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;   // ISO date
  endDate: string | "Present";
  summary: string;
  achievements: string[];
}
```

```typescript
// types/navigation.types.ts
export interface NavLink {
  id: string;
  label: string;
  href: `#${string}`;
}
```

```typescript
// types/contact.types.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message is too short"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

### 4.2 Key Component Prop Contracts

```typescript
// ui/Button.tsx
interface ButtonProps {
  variant: "primary" | "glass" | "neu" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}
```

```typescript
// ui/NeuContainer.tsx
interface NeuContainerProps {
  variant: "raised" | "pressed" | "flat";
  as?: keyof JSX.IntrinsicElements; // polymorphic root, default "div"
  className?: string;
  children: React.ReactNode;
}
```

```typescript
// ui/GlassPanel.tsx
interface GlassPanelProps {
  blur?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

```typescript
// layout/Navbar.tsx
interface NavbarProps {
  navLinks: NavLink[];
}
```

```typescript
// sections/Projects/ProjectCard.tsx
interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

// sections/Projects/ProjectFilterBar.tsx
interface ProjectFilterBarProps {
  categories: ProjectFilter[];
  activeCategory: ProjectFilter;
  onChange: (category: ProjectFilter) => void;
}
```

```typescript
// sections/Skills/SkillCategoryCard.tsx
interface SkillCategoryCardProps {
  category: SkillCategory;
}
```

```typescript
// sections/Contact/ContactForm.tsx
type ContactFormProps = Record<string, never>; // no external props; fully self-contained
```

**Typing rules recap:** discriminated unions for all `variant`/`state` props (never loose `string`), all optional props marked with `?`, all event handlers explicitly typed (no implicit `any` from untyped callbacks), all data files (`data/*.ts`) exported `as const` where the shape is fixed, then cast to the relevant interface array.

---

## SECTION 5 — QA & VERIFICATION CHECKLIST

### 5.1 Viewport Test Matrix

Verify no horizontal scrollbar, no overlapping text, no clipped content, and no touch target under 48×48px at each width:

| Width | Device Class | Check |
|---|---|---|
| 320px | Smallest phone | Navbar collapses to hamburger, Hero stacks, Project grid 1-col |
| 375px / 390px / 414px | Standard phones | Same as above, verify text doesn't overflow cards |
| 768px | Tablet portrait | Navbar may switch to full desktop nav or stay mobile — confirm intentional breakpoint choice; Project grid → 2-col |
| 1024px | Tablet landscape / small laptop | Full desktop Navbar, Hero two-column, Project grid → 3-col |
| 1280px – 1440px | Standard desktop | Confirm max-width `Container` centers content, no excessive whitespace imbalance |
| 1920px | Full HD desktop | Confirm typography scale doesn't look sparse; background blobs scale proportionally |
| 2560px+ | 4K / ultra-wide | `3xl`/`4xl` breakpoints engage — Project grid → 4-col, `Container` max-width caps line length so text doesn't stretch edge-to-edge |

### 5.2 Interaction & Input Method Checks
- All hover-only interactions gated behind `(hover: hover) and (pointer: fine)` so touch devices get tap-equivalent behavior instead of a "stuck hover" state.
- Every interactive element reachable via `Tab` in a logical order matching visual order.
- `Escape` closes Mobile Menu and Project Modal from any focus state inside them.
- Focus is trapped inside open Mobile Menu / Modal and returned to the triggering element on close.

### 5.3 Accessibility Checklist
- Landmarks present: `<header>`, `<nav>`, `<main>`, `<section aria-label="...">` per section, `<footer>`.
- One skip-to-content link as the first focusable element on the page.
- All images have descriptive `alt` text; purely decorative images (blobs, background shapes) use `alt=""` / `aria-hidden="true"`.
- Active nav link marked `aria-current="page"` (or `"true"` for anchor sections).
- Mobile menu trigger has `aria-expanded` synced to open state.
- Form: every input has an associated `<label>`, error messages wired via `aria-describedby` and announced through `aria-live="polite"`.
- Color contrast verified for every text/background pairing against Section 2.1 targets using an actual contrast-checking tool, not estimation.
- All decorative motion (blobs, gradient shifts, parallax) disabled under `prefers-reduced-motion: reduce`; content-bearing transitions degrade to opacity-only fades rather than disappearing entirely.

### 5.4 Performance Checklist
- Images served as WebP/AVIF with explicit `width`/`height` attributes to prevent layout shift; below-the-fold images use `loading="lazy"`.
- `ProjectModal` (and any heavy, rarely-shown component) is `React.lazy` + `Suspense`-loaded.
- Framer Motion imported as named exports only (`import { motion } from "framer-motion"`) to preserve tree-shaking.
- Scroll listeners (`useScrollDirection`) throttled via `requestAnimationFrame`, never firing unthrottled on the `scroll` event.
- Filtered project list computed via `useMemo`, keyed on `activeCategory` and the raw data array.
- Font loading uses `font-display: swap`.
- Run a production build (`vite build`) and check the bundle report for unexpectedly large chunks before calling the project done.

### 5.5 Final Definition of Done
- [ ] All Phase 1–4 Exit Criteria met and not silently reverted by later work.
- [ ] Lighthouse (mobile + desktop): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- [ ] Zero TypeScript errors under `strict: true`; zero ESLint errors.
- [ ] Zero `any` in the codebase (grep to confirm).
- [ ] Dark mode verified across every section, not just the Navbar.
- [ ] Full keyboard-only pass from page load to a submitted contact form with zero mouse use.
- [ ] Viewport matrix (Section 5.1) manually verified at every listed width.