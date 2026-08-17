# ShopSphere Light-First Design System (DESIGN.md)

## 1. Visual Theme & Atmosphere
ShopSphere is a **premium modern e-commerce platform** combining high fashion presentation, flagship technology, clean editorial layouts, and subtle 3D interactive storytelling.
- **Aesthetic**: Bright, spacious, editorial luxury (inspired by Apple product presentation & Nike editorial commerce).
- **Vibe**: Light-first, crisp, confident, spacious, commerce-focused, intelligent.
- **Ratio**: 70-80% Light background surfaces (`#F7F9FC` / `#FFFFFF`), 20-30% selective dark/accent sections.

---

## 2. Color Palette & Roles

| Token Name | Semantic Role | Light Mode Value | Dark Mode Value |
| :--- | :--- | :--- | :--- |
| `--color-background` | Primary Page Background | `#F7F9FC` (Cool Crisp Slate) | `#0B1220` |
| `--color-surface` | Card & Section Surface | `#FFFFFF` (Pure White) | `#111827` |
| `--color-text-primary` | Main Headings & Body | `#0F172A` (Slate 900) | `#F8FAFC` |
| `--color-text-secondary` | Muted Subtext | `#64748B` (Slate 500) | `#94A3B8` |
| `--color-primary` | Main Brand Blue | `#0B8FD3` (Electric Blue) | `#38BDF8` |
| `--color-primary-hover` | Primary Hover State | `#0878B5` | `#0B8FD3` |
| `--color-secondary` | Accent Indigo | `#6366F1` | `#8B5CF6` |
| `--color-violet` | Accent Violet | `#8B5CF6` | `#A78BFA` |
| `--color-border` | Clean Subtle Dividers | `rgba(226, 232, 240, 0.8)` | `rgba(255, 255, 255, 0.12)` |

---

## 3. Navbar Rules
- Background: `#FFFFFF` / `rgba(255, 255, 255, 0.9)` with backdrop blur `12px`.
- Border: 1px solid `rgba(226, 232, 240, 0.8)`.
- No heavy dark glowing pills or futuristic circular buttons; clean icon treatment with badge counters.

---

## 4. Hero Composition Rules
- **Layout**: Balanced 2-column split (75–85vh height desktop).
- **Left**:
  - Eyebrow: `NEW SEASON • CURATED FOR YOU`
  - Headline: `Discover what's next.`
  - Copy: `Explore premium technology, fashion, lifestyle essentials, and everyday products — all in one place.`
  - CTAs: `Explore Products` (Primary), `View Trending` (Secondary).
  - Minimal Trust Strip: `★★★★★ 4.9/5 (10K+ Reviews)` • `Free shipping • Secure checkout • Easy returns`.
- **Right (3D Product Collage)**:
  - Curated group of 3-4 products (Headphones, Smartwatch, Sneaker, Luxury Watch) overlapping with realistic depth, ambient lighting, and gentle mouse parallax.
  - Maximum 2 small floating info chips.

---

## 5. Homepage Visual Rhythm
1. Clean Light Navbar
2. Bright Split Hero with 3D Product Collage
3. Trending Now (Immediate 5-card product rail)
4. Shop by Category (Large visual category cards)
5. "Designed to be Experienced" (Dedicated interactive 3D section)
6. New Arrivals (Product Grid)
7. Editorial Banner ("Made for your everyday")
8. Best Sellers (Curated product rail)
9. Deals & Offers ("Upgrade your everyday" - Save up to 40%)
10. You Might Like (Recommendation rail)
11. Continue Exploring (Recently viewed rail)
12. Newsletter & Footer
