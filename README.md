# jonad-portfolio-glassmorphism

A premium portfolio website built with **React + TypeScript + Tailwind CSS v3.4 + Framer Motion**, featuring a **Neumorphism × Glassmorphism** design system.

> **Status:** Under active development — scaffold and primitive components in progress.

---

## Tech Stack

| Layer        | Choice                                                        |
| ------------ | ------------------------------------------------------------- |
| Bundler      | Vite                                                          |
| Language     | TypeScript (strict mode)                                      |
| Styling      | Tailwind CSS v3.4+                                            |
| Motion       | Framer Motion                                                 |
| Icons        | lucide-react                                                  |
| Forms        | react-hook-form + zod + @hookform/resolvers                   |
| Utilities    | clsx + tailwind-merge (composed as `cn()` helper)             |
| Linting      | ESLint (typescript-eslint) + Prettier + prettier-plugin-tailwindcss |

---

## Design System

| Principle      | Implementation                                                              |
| -------------- | --------------------------------------------------------------------------- |
| Neumorphism    | Soft extruded lighting via custom `neu-*` box-shadows (light & dark modes) |
| Glassmorphism  | Frosted-glass panels with `backdrop-blur` and glass color tokens            |
| Dark Mode      | Class-based toggle persisted to `localStorage`, respects OS preference      |
| Responsive     | Mobile-first, breakpoints from `xs` (375px) to `4xl` (2560px)              |
| Accessibility  | Keyboard-navigable, `prefers-reduced-motion` respected, aria attributes     |
| Typography     | Inter (body) + Clash Display (headings)                                    |

### Color Palette

- **Brand:** Indigo-violet (`#6366F1` — `#4F46E5`) — used sparingly for CTAs, active states, accents.
- **Surface:** Warm neutral base (`#E9EDF5` light / `#1A1D24` dark) with elevated variants.
- **Glass:** Semi-transparent overlays with subtle borders.

### Custom Shadows

```css
/* Neumorphism — light */
neu-sm, neu-flat, neu-float, neu-pressed

/* Neumorphism — dark */
neu-dark-sm, neu-dark-flat, neu-dark-float, neu-dark-pressed

/* Glassmorphism */
glass-sm, glass-lg

/* Focus ring (accessibility) */
focus-ring
```

---

## Project Structure

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
│   ├── styles/
│   │   └── globals.css
│   ├── types/           # TypeScript interfaces & zod schemas
│   ├── data/            # Static content (projects, skills, experience, nav)
│   ├── context/         # ThemeContext + ThemeProvider
│   ├── hooks/           # Reusable logic (useTheme, useScrollDirection, etc.)
│   ├── lib/             # Pure utilities (cn, animations, constants)
│   └── components/
│       ├── ui/          # Global primitives (Button, GlassPanel, Input, etc.)
│       ├── layout/      # Structural wrappers (Navbar, Footer, etc.)
│       └── sections/    # Feature sections (Hero, Projects, Skills, Contact)
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Features

### Sections
- **Hero** — Animated gradient blob background, photo frame, staggered entrance, scroll-down indicator.
- **Projects** — Category filter bar with shared-element animation, responsive grid (1–4 columns), hover overlay with tech badges, project detail modal.
- **Skills & Experience** — Category cards with Badge chips, vertical timeline with scroll-reveal.
- **Contact** — Zod-validated form with loading/success/error states, glass info card with social links.

### Interactions
- Sticky navbar with hide-on-scroll-down, glass transition, animated active-link underline.
- Full-screen mobile menu with staggered entrance, focus trap, body scroll lock.
- Back-to-top button with fade-in threshold.
- Scroll-triggered reveal animations (`whileInView`, `once: true`).
- Dark mode toggle with sun/moon icon swap animation.

### Accessibility
- Landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Skip-to-content link, `aria-current` on active nav, `aria-expanded` on menu trigger.
- Form inputs with associated labels, inline errors via `aria-describedby`, `aria-live="polite"`.
- All animations respect `prefers-reduced-motion: reduce`.
- Minimum touch targets: 48×48px on all interactive elements.
- Focus trapping in modals and mobile menu.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/j0nsss/jonad-portfolio-glassmorphism.git

# Navigate into the project
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Browser Support

Verified at the following viewport widths:

| Width      | Device Class         |
| ---------- | -------------------- |
| 320px      | Smallest phone       |
| 375–414px  | Standard phones      |
| 768px      | Tablet portrait      |
| 1024px     | Tablet landscape     |
| 1280–1440px| Standard desktop     |
| 1920px     | Full HD desktop      |
| 2560px+    | 4K / ultra-wide      |

---

## QA Targets

| Metric            | Target  |
| ----------------- | ------- |
| Lighthouse Perf   | ≥ 90    |
| Accessibility     | ≥ 95    |
| Best Practices    | ≥ 95    |
| SEO               | ≥ 90    |
| TypeScript errors | 0       |
| ESLint errors     | 0       |
| `any` usage       | 0       |

---

## License

MIT © Jonad
