# 🚀 Project Orello: E-Commerce React Architecture & Design Blueprint

## 🏗️ 1. Tech Stack & Architecture
*   **Framework:** Next.js (App Router). *Crucial for Server-Side Rendering (SSR) to ensure Google instantly indexes product details and massive imagery.*
*   **Styling:** Tailwind CSS (for layout/utility) + Custom CSS Modules (for complex grid/sticky math).
*   **Animations:** GSAP (ScrollTrigger & Flip) + `@studio-freight/react-lenis`.
*   **State Management:** Zustand (Perfect for lightweight, global state handling of the Slide-Out Shopping Cart).

## 🔍 2. SEO & Performance Standards
Selling luxury requires a site that loads instantly despite heavy media.
*   **Image Optimization:** All imagery must use Next.js `<Image />` component, formatted to WebP, with `priority` tags on Hero and PDP top-fold images.
*   **Video Hosting:** Videos must be compressed (under 5MB if possible), hosted on a fast CDN (like Mux or AWS CloudFront), and never loaded directly from the local bundle.
*   **Structured Data (JSON-LD):** Every Product Detail Page must inject Schema.org/Product structured data into the `<head>`, including price, stock status, and material (e.g., Hand-Knotted Wool) so it appears as a rich snippet in Google Shopping.
*   **Dynamic Meta Tags:** Title tags must dynamically pull the rug name (e.g., `<title>Orello | The [Pattern Name] Rug in Deep Indigo</title>`).

---

## 🎨 3. Global Design System (Inspired by Kasthall)
*   **Primary Headings (Heritage):** `Playfair Display`, `PP Editorial New`, or `Ogg`. (Massive, high-contrast, tight tracking).
*   **UI & Body (Modern):** `Inter` or `Neue Montreal`. (Clean, wide tracking for uppercase: `0.05em`).
*   **Colors:**
    *   Background (Raw Canvas): `#F9F8F6`
    *   Primary Text (Deep Charcoal): `#1A1A1A`
    *   Secondary Text (Muted Stone): `#757575`
    *   Accents: Sage Green (`#8A9A86`), Raw Umber (`#B86B5D`)

---

## ✨ 4. Animation & Physics Specs
*   **Core Scroll:** Lenis (`lerp: 0.05` for weightless drift).
*   **Global GSAP Behavior:** No snapping. Use `ease: "power3.out"`. 
*   **Entrance Rule:** Elements entering the viewport fade in (`opacity: 0` to `1`) and drift upward (`y: 50` to `y: 0`).

---

## 🧩 5. Core Marketing Components
*   **Header:** Transparent, fixed top bar (`z-index: 50`).
*   **Navigation Drawer:** Full-height left drawer (`100vh`). Links stagger-fade in.
*   **Hero (Split-Screen):** 50/50 CSS Grid. Left side macro-video, right side lifestyle video. Videos start at `scale: 1.1` and ease to `1`.
*   **About Us (Split Scroll):** Left side text (stagger fade-up), right side looping video with GSAP `scrub: true` for parallax depth.
*   **Texture Showcase (Overlap):** Interchanging grid. Foreground images have `yPercent: -50` to scroll faster than background typography (Zero-Gravity effect).
*   **Brutalist Footer:** Split-level. "WE [VIDEO] BUILD / DIFFERENT" inline video typography.

---

## 🛒 6. E-Commerce & Conversion Pages

### 6.1 The Product Listing Page (PLP / Catalog)
*   **Layout:** A rigid, masonry-style grid (3 columns on desktop, 1 on mobile) inspired by Kasthall’s clean catalog. 
*   **Filters:** Sticky left sidebar or a top-level dropdown that slides down smoothly.
*   **Interaction:** 
    *   Hovering over a grid item subtly zooms the rug image (`scale: 1.03`) and reveals the price underneath.
    *   When a filter is clicked, the grid items re-sort using GSAP Flip plugin for a seamless, floating reshuffle instead of a hard reload.

### 6.2 The Product Detail Page (PDP)
*   **Layout:** The "Sticky Scroll" split. 
    *   *Left Side (Media):* Vertically scrolling column of massive, ultra-high-res images (full, macro, fringe, lifestyle).
    *   *Right Side (Buy Box):* Contains title, price, size selector, and "Add to Bag". Uses `position: sticky; top: 100px;` so it stays pinned while the user scrolls the images on the left.
*   **Antigravity Feature (The Magnifier):** A custom React cursor tracking component tied to the left-side gallery. On hover, the default cursor hides and is replaced by a circular div showing a 300% zoomed-in view of the knots.

### 6.3 Slide-Out Shopping Bag
*   **Layout:** Full-height right-side drawer, utilizing a React Portal to render above the entire DOM.
*   **Content:** Thumbnail, subtotal, and a high-contrast black checkout button.
*   **Antigravity Feature (The Add-to-Cart Arc):** 
    *   Trigger: User clicks "Add to Bag" on the PDP.
    *   Action: A small cloned image of the rug arcs across the screen using GSAP bezier curves, landing in the top-right cart icon. 
    *   Result: The cart drawer immediately slides open (`x: '100%'` to `x: 0`).

### 6.4 The Bespoke Form (Custom Sizing)
*   **Layout:** A two-column interactive React component. Left side is the form input; Right side is the visualizer.
*   **The Flow:** Step 1: Base Pattern -> Step 2: Dimensions -> Step 3: Swatch Request.
*   **Antigravity Feature (Live Scaling):** As the user types dimensions into the width/length inputs, an SVG wireframe of the rug on the right side dynamically scales and morphs in real-time to match the aspect ratio.

### 6.5 Rug Care & Sustainability Guide
*   **Layout:** Magazine-style editorial page. 
*   **Media:** Looping videos of the washing and sun-drying process embedded directly into the text paragraphs.
*   **Interaction:** Smooth CSS accordion dropdowns for treating specific stains (coffee, dirt, etc.). The accordion icon (+) smoothly rotates to an (x) when opened.

## 7. Developed Webpages
The following pages have been implemented in the application architecture:
*   **`/` (Landing Page):** The primary entry point featuring the Hero video, Infinite Marquee, Curated Collections (Shop By Room), and Texture Showcase.
*   **`/shop` (Product Listing Page):** The catalog view with a sticky left-sidebar filtering system and a dynamic responsive product grid.
*   **`/shop/[id]` (Product Detail Page):** The immersive "Sticky Scroll" split page featuring high-res imagery, interactive variant selectors, and the Antigravity Magnifier cursor.
*   **`/bespoke` (Custom Sizing):** The interactive two-column form for requesting custom dimensions with a live-scaling SVG visualizer.
*   **`/faq` (Care & Sustainability Guide):** The editorial-style information page featuring dynamic expanding accordion sections for rug care instructions.
*   **`/cart` (Checkout):** The full-page order review and checkout flow linked from the global slide-out shopping bag.