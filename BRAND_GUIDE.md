# Brand Identity & Design System

This document serves as the official brand guide for the **Responsive Student Portfolio & Academic Management Website**. It outlines the visual structure, color palette, typography, and interactive standards required to maintain UI consistency across all pages — **directly inspired by the MIVA Open University official website** (miva.edu.ng).

---

## 1. Color Palette

Drawn directly from MIVA Open University's official web presence, the palette centers on a deep navy blue primary brand color, with clean whites, sophisticated grays, and a warm gold accent for interactive elements.

| Visual Layer | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| **Primary (Brand Navy)** | `#09314F` | Headers, footers, navigation bars, primary headings, and CTA buttons. |
| **Primary Hover** | `#0D4875` | Hover state for dark cards, navigation backgrounds on hover. |
| **Accent (Action Gold)** | `#C89B4F` | Active navigation links, interactive buttons, borders, and highlights. |
| **Accent Hover** | `#A8813E` | Darkened hover state for gold accent buttons. |
| **Background** | `#F7F9FC` | Core page body backdrop — crisp, bright, and highly legible. |
| **Surface (Card)** | `#FFFFFF` | Project panels, data tables, planner containers. |
| **Text (Primary)** | `#09314F` | Main headings and important labels (same as brand navy). |
| **Text (Body)** | `#677487` | Paragraphs, descriptions, secondary copy — matches MIVA's exact body text color. |
| **Text (Muted)** | `#94A3B8` | Placeholders, empty states, captions. |
| **Success State** | `#10B981` | Completed tasks, valid form feedback alerts. |
| **Error State** | `#EF4444` | Validation failures, error messages. |

---

## 2. Typography & Hierarchy

Matching MIVA Open University's primary web font choice, this project uses **Manrope** as its principal typeface — a clean, modern, geometric sans-serif available via Google Fonts. A secondary serif accent using **Afacad** may be used for display headings.

* **Primary Font (Headings & UI):** `Manrope` (weights: 500, 600, 700, 800)
* **Secondary Font (Body Text):** `Manrope` (weights: 400, 500) — unified for cohesion
* **Fallback:** `system-ui, -apple-system, sans-serif`

### System Font Scaling
* `h1` (Hero Displays): `2.5rem` (40px) — weight 800
* `h2` (Section Headers): `1.75rem` (28px) — weight 700
* `h3` (Cards & Sub-labels): `1.25rem` (20px) — weight 600
* `p` / `span` (Body Copy): `1rem` (16px) — weight 400

---

## 3. Interactive Animations & Micro-Interactions

Transitions and animations enrich user experiences without disrupting core content readability.

### A. The "Smooth Floating" Task Entrance
When adding a task item to the **Academic Planner**, the item transitions into layout position smoothly using a slide-up fade.
* **Animation Property:** `slideIn 0.3s ease-out forwards`
* **Keyframes Framework:**
```css
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
```

### B. Dynamic Project Card Hover
On the **Projects Page**, hovering over a showcase card subtly elevates the item while projecting a soft drop shadow to communicate interactability — inspired by MIVA's programme cards.
* **Base Styling:** `transition: transform 0.2s ease, box-shadow 0.2s ease;`
* **Hover State:** `transform: translateY(-6px); box-shadow: 0 12px 24px rgba(9, 49, 79, 0.12);`
* **Hover Background:** Card dark background shifts to `#0D4875` (matching MIVA's `data-dce-background-hover-color`)

### C. Tactile Button Scale Response
Interactive controls provide responsive feedback on touch or mouse interaction.
* **Hover State:** Background color darkens to `#A8813E` for gold buttons, `#0D4875` for navy buttons.
* **Active (Click) State:** `transform: scale(0.97);`

### D. Navigation Border Grow
Links embedded in the global navigation expand a sleek underline outward from the center item baseline on user cursor focus.
* **Mechanism:** An `:after` pseudo-element with `transform: scaleX(0); transition: transform 0.25s ease;` that switches to `scaleX(1)` upon hover.

---

## 4. UI Elements & Layout Consistency
* **Border Radius:** `8px` for buttons and input elements; `12px` for project grid cards and dashboard containers.
* **Grid Framework:** Build symmetric horizontal rhythm using unified margin-padding increments: `8px`, `16px`, `24px`, `48px`, `64px`.
* **Card Dark Variant:** For cards placed on dark/navy backgrounds, use white headings (`#FFFFFF`) and muted body text (`#677487`) — as seen on MIVA's programme carousel.
* **Shadows:** Use `rgba(9, 49, 79, 0.1)` tinted shadows (brand-colored) instead of generic black shadows for a cohesive premium feel.