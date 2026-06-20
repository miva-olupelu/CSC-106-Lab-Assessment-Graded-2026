# Brand Identity & Design System

This document serves as the official brand guide for the **Responsive Student Portfolio & Academic Management Website**[cite: 1]. It outlines the visual structure, color palette, typography, and interactive standards required to maintain UI consistency across all pages[cite: 1].

---

## 1. Color Palette

To reflect a premium, professional academic platform, the site leverages a deep blue primary base paired with sophisticated neutral surfaces and a warm accent hue[cite: 1].

| Visual Layer | Hex Code | Purpose & Application |
| :--- | :--- | :--- |
| **Primary (Brand)** | `#0D2C54` | Headers, footers, primary headings, nav backgrounds. |
| **Accent (Action)** | `#C19A6B` | Active navigation links, interactive buttons, borders. |
| **Background** | `#F8FAFC` | Core page body backdrop (crisp, highly legible). |
| **Surface (Card)**| `#FFFFFF` | Project panels, data tables, planner containers. |
| **Text (Primary)** | `#1E293B` | Main body paragraphs, layout descriptions. |
| **Success State** | `#10B981` | Completed tasks, valid form feedback alerts. |

---

## 2. Typography & Hierarchy

The interface utilizes clean, highly readable modern sans-serif typefaces to ensure complete legibility across mobile and desktop display formats[cite: 1].

*   **Primary Font (Headings):** `Inter` or `Cabinet Grotesk`
*   **Secondary Font (Body Text):** `Plus Jakarta Sans` or standard system-ui

### System Font Scaling
*   `h1` (Hero Displays): `2.5rem` (40px)
*   `h2` (Section Headers): `1.75rem` (28px)
*   `h3` (Cards & Sub-labels): `1.25rem` (20px)
*   `p` / `span` (Body Copy): `1rem` (16px)

---

## 3. Interactive Animations & Micro-Interactions

As mandated by the project criteria, transitions and animations must enrich user experiences without disrupting core content readability[cite: 1].

### A. The "Smooth Floating" Task Entrance
When adding a task item to the **Academic Planner**, the item transitions into layout position smoothly using a slide-up fade[cite: 1].
*   **Animation Property:** `slideIn 0.3s ease-out forwards`
*   **Keyframes Framework:** 
```css
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    ```

### B. Dynamic Project Card Hover
On the **Projects Page**, hovering over a showcase card subtly elevates the item while projecting a soft drop shadow to communicate interactability[cite: 1].
*   **Base Styling:** `transition: transform 0.2s ease, box-shadow 0.2s ease;`
*   **Hover State:** `transform: translateY(-6px); box-shadow: 0 10px 20px rgba(13, 44, 84, 0.1);`

### C. Tactile Button Scale Response
Interactive controls (Form Submit buttons, planner operational inputs) provide responsive haptic feedback on touch or mouse interaction[cite: 1].
*   **Hover State:** Background colors transition smoothly to a 10% darker variant.
*   **Active (Click) State:** `transform: scale(0.97);`

### D. Navigation Border Grow
Links embedded in the global navigation expand a sleek underline outward from the center item baseline on user cursor focus[cite: 1].
*   **Mechanism:** An `:after` pseudo-element with `transform: scaleX(0); transition: transform 0.25s ease;` that switches to `scaleX(1)` upon hover.

---

## 4. UI Elements & Layout Consistency
*   **Border Radius:** Keep a unified rounding structure across the platform using `8px` for buttons/input elements and `12px` for project grid cards[cite: 1].
*   **Grid Framework:** Build symmetric horizontal rhythm across views by establishing unified margin-padding increments (e.g., `8px`, `16px`, `24px`, `48px`, `64px`)[cite: 1].