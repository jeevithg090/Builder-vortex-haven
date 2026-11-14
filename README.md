# The Agency — Animated Agency Landing Page

A single-page marketing site for a fictional creative studio, "The Agency".
It's built to show off motion design: a multi-phase intro loader, a WebGL
ripple layer that follows the cursor, scroll-driven video and parallax
sections, interactive galleries, and a dark/light theme. It's built with
React, TypeScript, Vite and Tailwind CSS.

**Live site:** https://builder-vortex-haven.vercel.app/

## Features

| Section            | What it does                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Intro loader       | A linear progress bar that "breaks" into an L shape and wipes away to reveal the page                       |
| Navigation         | Sticky, blurred navbar with a mobile menu (Escape closes it) and a dark/light theme toggle                  |
| Hero               | Gradient hero with animated blobs and calls to action                                                       |
| Ripple background  | WebGL fragment-shader ripples that follow the cursor, with a CSS fallback when WebGL isn't there            |
| Testimonials       | Scroll-phased testimonial layouts with ratings                                                              |
| Client carousel    | Auto-advancing image grid with previous/next controls                                                       |
| Pricing            | Plan cards with a highlighted "popular" tier                                                                |
| Scroll video       | A video that grows as you scroll, with timed overlays (testimonial, stats, action panel) and a modal player |
| Brand kits & stats | Feature cards with animated counters                                                                        |
| Parallax vision    | Layered parallax scrolling                                                                                  |
| Showcase           | Project carousel plus a full-gallery modal with project details                                             |
| Team & about       | Team grid with a profile modal, company stats and values                                                    |
| Interactive field  | A field of shapes that react to the cursor with spring physics                                              |
| Contact            | Validated enquiry form (see [Contact form](#contact-form)), contact details and FAQ                         |

Across the whole site:

- Responsive layouts from 320 px phones up to wide desktops.
- Accessibility basics: semantic landmarks, one `<h1>` per page, labelled
  form fields with inline errors, `aria-*` state on toggles and menus, modals
  that close with Escape, and a `prefers-reduced-motion` override.
- An error boundary that shows a reload screen instead of a blank page, and
  a themed 404 page.
- A page title, meta description, Open Graph tags and an SVG favicon.

## Tech stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 6** for the dev server and production build
- **React Router 7** for client-side routing
- **Tailwind CSS 3** with CSS-variable design tokens and `tailwindcss-animate`
- **Framer Motion** for animation and scroll-linked effects
- **next-themes** for the theme switcher
- **Zod** for contact-form validation
- **lucide-react** for icons
- **Vitest** + **Testing Library** (jsdom) for tests
- **ESLint 9** (typescript-eslint, react-hooks, jsx-a11y) + **Prettier**

## Architecture

```
index.html ─► src/main.tsx ─► App
                               ├─ ThemeProvider (next-themes, class strategy)
                               ├─ ErrorBoundary
                               └─ BrowserRouter
                                   ├─ "/"  → pages/Index     (loader → full landing page)
                                   └─ "*"  → pages/NotFound
```

- **`pages/Index.tsx`** shows the `Loader` first, then the navigation, the
  hero and one `<section id=…>` for each content component.
- **`lib/navigation.ts`** is the single list of section ids and labels. The
  navbar builds its links from it, and a test checks that every link points
  at a real section.
- **Logic is kept out of components** in `src/lib/` (validation, mailto
  building, loader timing, scroll-overlay zones, small hooks), where it is
  unit-tested without rendering any UI.
- **Styling** uses Tailwind utilities. Theme colours are HSL CSS variables in
  `src/index.css` (`:root` and `.dark`), and brand colours (`deep-purple`,
  `brand-purple`, `light-purple`) live in `tailwind.config.ts`.

### Contact form

The form is validated in the browser with Zod. What happens on submit depends
on how the site is configured:

1. **`VITE_CONTACT_ENDPOINT` is set:** the enquiry is sent as JSON in a `POST`
   to that URL. This works with any form backend that accepts JSON, such as
   Formspree, Getform or your own serverless function. Network errors and
   non-2xx responses show an error message in the form.
2. **No endpoint set (the default):** the visitor's email app opens with a
   pre-filled message addressed to `VITE_CONTACT_EMAIL`. No backend is needed.

## Getting started

### Prerequisites

- Node.js **20.19+** (verified on Node 22)
- npm 10+

### Install and run

```bash
git clone https://github.com/jeevithg090/Builder-vortex-haven.git
cd Builder-vortex-haven
npm ci
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:8080
```

### Environment variables

All variables are optional and are baked into the bundle at build time.
Anything prefixed `VITE_` is public, so never put secrets in them.

| Variable                | Default               | Purpose                                                              |
| ----------------------- | --------------------- | -------------------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT` | _(empty)_             | HTTPS URL that receives contact-form submissions as JSON             |
| `VITE_CONTACT_EMAIL`    | `hello@theagency.com` | Address shown in the contact section and used by the mailto fallback |

## Scripts

| Command             | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR on port 8080                  |
| `npm run build`     | Build the production bundle into `dist/`                         |
| `npm run preview`   | Serve the production build locally                               |
| `npm run typecheck` | Type-check the app and config files (`tsc -b`)                   |
| `npm run lint`      | Run ESLint (`npm run lint:fix` fixes what it can)                |
| `npm run format`    | Format the codebase with Prettier (`format:check` only checks)   |
| `npm test`          | Run the test suite once (`npm run test:watch` re-runs on change) |
| `npm run check`     | Typecheck, lint, format check, tests and build, in that order    |

## Testing

```bash
npm test
```

Tests sit next to the code they cover (`*.spec.ts` / `*.spec.tsx`):

- **`src/lib/`**: contact validation, mailto encoding, env config and
  submission (including network and HTTP failures); loader progress maths;
  section/nav consistency; scroll-overlay zones and dismissal; the page-title
  and Escape-key hooks; and the `cn` class helper.
- **Components**: the navigation (links, mobile menu, theme toggle), the
  contact form (inline errors, focus handling, service toggles), the error
  boundary and the 404 page.

## Deployment

The build output is a static site in `dist/`, so it can be hosted on any
static host.

- **Vercel**: import the repo. It detects Vite on its own (build command
  `npm run build`, output folder `dist`). `vercel.json` rewrites every path to
  `index.html` so client-side routes such as the 404 page work on a reload.
- **Netlify / Cloudflare Pages / others**: use the same build command and
  output folder, and add an SPA fallback rule (for example `/* /index.html 200`
  in Netlify's `_redirects`).

Set any `VITE_*` variables in the host's dashboard **before** building.

## Project structure

```
.
├── index.html               # HTML shell, metadata, favicon
├── public/                  # Static assets served as-is (favicon, robots.txt)
├── src/
│   ├── main.tsx             # Entry point
│   ├── App.tsx              # Providers, error boundary and routes
│   ├── index.css            # Tailwind layers, theme variables, global styles
│   ├── pages/
│   │   ├── Index.tsx        # Landing page (loader, hero, all sections)
│   │   └── NotFound.tsx     # 404 page
│   ├── components/          # One file per page section, plus Loader, Navigation, ErrorBoundary
│   ├── lib/                 # Framework-free logic and small hooks, each with a .spec file
│   └── test/setup.ts        # Vitest/jsdom setup (jest-dom, browser API mocks)
├── eslint.config.js
├── tailwind.config.ts
├── vite.config.ts           # Vite + Vitest config
├── vercel.json              # SPA rewrite for Vercel
└── .env.example
```

## Credits

The photos come from [Pexels](https://www.pexels.com/) and are loaded from
their CDN. The sample video is _Big Buck Bunny_ (© Blender Foundation, CC BY
3.0), loaded from Google's public sample bucket. Company names, people,
testimonials and figures on the site are placeholder content.
