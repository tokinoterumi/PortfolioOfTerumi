# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. The Prime Directive (Core Project Context)

**Project Context & Style Guide:**

You are a senior front-end developer specializing in minimalist, high-impact design using SvelteKit.

* **Tech Stack:** SvelteKit, Tailwind CSS, Motion One for animations.
* **Core Style:** Minimalist, modern, architectural, with a light monochrome base (off-white/light gray, e.g., #f5f5f4). The primary inspiration is high-end art magazines and brands like "NOT A HOTEL".
* **Layout Philosophy:** Asymmetrical layouts are strongly preferred. Avoid centered, symmetrical designs. Generous whitespace is critical.
* **Typography System:**
    * **Hero Headline (`Hero.svelte`):** Use **Bebas Neue**.
    * **All Other Text (Headings, Body, UI):** Use **IBM Plex Sans JP**. This single font family will be used for both English and Japanese text, leveraging its different weights to create hierarchy.
* **Aesthetic Firewall (Strictly Forbidden):**
    * **NO rounded corners** (`rounded-*` classes). All elements must be sharp and geometric.
    * **NO box-shadows** (`shadow-*` classes). Depth is created through layout and color, not shadows.
    * **NO gradients** (e.g., `bg-gradient-*`). Use solid colors only.
    * **NO bouncy, playful, or shaky animations.** All transitions must be subtle and smooth (e.g., fades, slides).
    * **NO carousels/sliders.** Use grids or lists for multiple items.
    * **NO generic, pill-shaped buttons with solid backgrounds.**
* **Color Palette:** The base is monochrome. Accent colors are used sparingly as "sub tones".
    * `Darkroom Red (#B22222)`: Primary CTAs, critical hints.
    * `Polaroid Yellow (#E3B23C)`: Nostalgic, story-driven sections.
    * `Cyanotype Blue (#1D4E89)`: Professional, technical, footer elements.
    * `Silver Halide Grey (#AAB2BD)`: Subtle UI states, secondary text.


## 2. Component-Specific Guidelines

### Buttons
**Primary CTA:** Use the "Outlined Button" style. This is a transparent button with a sharp, 1px solid border. On hover, the background fills with an accent color (e.g., Darkroom Red) and the text becomes white.

**Text Links:** For secondary actions, use plain text links that change color or gain a subtle underline on hover.

### Animations
Use the Motion One library for any sequenced or complex animations.

Simple transitions should rely on Tailwind's built-in transition and duration utilities.

All animations must respect the prefers-reduced-motion media query.

### Images
All images should be wrapped in our OptimizedImage.svelte component, which handles lazy loading and blurhash placeholders.

## 3. Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run dev -- --open` - Start dev server and open in browser
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run Prettier check and ESLint
- `npm run format` - Format code with Prettier

## 4. Architecture

### Directory Structure
- `src/routes/` - SvelteKit pages and layouts using file-based routing
  - `+layout.svelte/+layout.js` - Root layout and data
  - `+page.svelte/+page.js` - Homepage
  - `about/` - About page
  - `gallery/` - Photography gallery with server-side data fetching
  - `projects/` - Project hub and individual project pages via `[slug]/`
  - `api/contact/` - Contact form API endpoint
- `src/lib/` - Organized into specific domains:
  - `components/ui/` - Reusable UI components (Navigation, Button, OptimizedImage, etc.)
  - `components/layout/` - Layout-specific components (Header, Footer, PageTransition)
  - `components/sections/` - Page section components (Hero, WhatIDo, SelectedWorks, etc.)
  - `data/` - Static data files (projects.js, about.js, site.js, navigation.js)
  - `utils/` - Utility functions (image.js, animation.js, scroll.js, constants.js)
  - `stores/` - Svelte stores for state management (menu.js, lightbox.js)
- `static/` - Static assets (favicon.ico, hero-photo.jpg, grain-texture.png)
- `src/app.css` - Global styles and Tailwind imports
- `src/app.html` - HTML template

### Key Files
- `+layout.svelte` - Root layout component that wraps all pages
- `+page.svelte` - Page components for each route
- `+page.server.js` - Server-side data loading (used in gallery for Unsplash API)
- `svelte.config.js` - SvelteKit configuration with adapter-auto
- `vite.config.js` - Vite configuration with Tailwind and SvelteKit plugins
- `tailwind.config.js` - Tailwind configuration
- `playwright.config.js` - End-to-end testing configuration

### Styling
Uses Tailwind CSS v4 with the new Vite plugin. Styles are processed through the @tailwindcss/vite plugin configuration.

### Asset Handling
Assets in `src/lib/assets/` can be imported using the `$lib/` alias. Static files go in the `static/` directory.