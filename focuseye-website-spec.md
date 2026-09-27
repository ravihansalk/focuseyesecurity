# FocusEye Security — Website Build Spec

> **Purpose of this file:** Feed this whole document to an AI coding agent (Claude Code, Cursor, etc.) with the instruction:
> "Build a responsive multi-page HTML/CSS/JS website from this spec." It contains brand assets, layout structure (modeled on vspsolutions.com.au), content, and copy for every section.

---

## 1. Project Overview

- **Company:** FocusEye Security
- **Industry:** CCTV & security equipment — sells **security combo kits/bundles** (camera + NVR/DVR + accessories packaged together), plus individual components, to installers, businesses, and homeowners.
- **Reference UI/UX:** Layout, navigation pattern, and page structure should follow **vspsolutions.com.au** (VSP Security Wholesale) — a clean, corporate, product-distributor style site with: top utility bar, sticky nav, hero banner, category grid, brand/partner logo strip, news/blog cards, dual CTA banner (register/support), multi-location footer.
- **Tone:** Professional, trustworthy, tech-forward. "Smarter Security. Safer Tomorrow."
- **Output:** Static multi-page website — `index.html`, `products.html`, `combos.html`, `brands.html`, `about.html`, `contact.html` — shared `styles.css`, `script.js`.
- **Tech stack:** Plain HTML5 + CSS3 (flexbox/grid) + vanilla JS. No frameworks required unless the agent prefers Tailwind (optional, keep to core utility classes only).

---

## 2. Brand Identity (from provided homepage image)

### Logo
- Wordmark: **"FOCUS"** in dark navy, **"EYE"** in teal, stacked above small-caps **"SECURITY"** in navy.
- Icon: a stylized eye/lens circle integrated into the "O" of FOCUS (concentric circles, camera-lens look) in navy + teal.
- Logo also appears as a small badge printed on the physical dome camera in the hero photo — reuse the same wordmark for a "watermark on product" treatment in imagery if generating mockups.

### Color Palette (extracted from image)
| Role | Hex (approx) | Usage |
|---|---|---|
| Primary Navy | `#0B2340` | Headlines, nav text, logo "FOCUS" |
| Accent Teal | `#1EB4C4` | Logo "EYE", headline highlight word, links, buttons, small-caps labels |
| Deep Teal (hover) | `#158A97` | Button hover state |
| Sky Blue (gradient bg) | `#BFD9EC` → `#E9F3F8` | Hero background gradient (dawn sky) |
| Sunset Gold | `#F2C879` | Accent for skyline glow / secondary highlights |
| Body Text Gray-Navy | `#33455A` | Paragraph text |
| White | `#FFFFFF` | Card backgrounds, nav bg |
| Light Gray | `#F5F7F9` | Section alternate background |

### Typography
- Headings: a rounded/geometric sans-serif, bold — e.g. **"Poppins"** or **"Montserrat"** (Google Fonts).
- Body: **"Inter"** or **"Open Sans"**, regular weight.
- Small-caps label style (e.g. "SMARTER SECURITY. SAFER TOMORROW.") — letter-spacing: 0.15em, uppercase, teal, small size (13–14px).

### Imagery Style
- Wide cityscape/skyline photography at dusk/dawn with a security camera in foreground (as in the uploaded homepage image) — use similar stock photography style across hero banners (city skylines, modern buildings, CCTV domes/bullet cameras).
- Product photography: clean white/transparent background for camera and combo-kit images.

---

## 3. Site Structure & Navigation

**Top utility bar** (thin, dark navy background):
- Left: tagline — "Smarter Security. Safer Tomorrow."
- Right: `Support` link · `Login/Register` link · Phone number (placeholder: `0800 FOCUSEYE`)

**Main nav** (sticky, white background, logo left):
- Logo (FocusEye Security)
- Nav links: `Home` · `Products` · `Combo Kits` · `Brands` · `About` · `Contact`
- Right side: search icon, cart icon (if selling online), `Get a Quote` button (teal, rounded)

**Footer** (dark navy, multi-column, same pattern as VSP):
- Column 1: Company blurb + social icons (Facebook, YouTube, LinkedIn)
- Column 2: **About Us** — News, Contact
- Column 3: **Support** — Tech Support, Apply for Trade Account
- Column 4: **Locations** — list of branches/regions
- Column 5: **Shipping/Legal** — Terms of Trade, Delivery & Returns, Privacy Policy
- Bottom bar: payment icons + copyright line

---

## 4. Page-by-Page Content

### 4.1 Home (`index.html`)

**Hero Section** (use the uploaded homepage image as the hero banner background/graphic)
- Small-caps eyebrow: `SMARTER SECURITY. SAFER TOMORROW.`
- H1 (two-tone): `Advanced CCTV & Security` (navy) / `Solutions for Your Business` (teal)
- Subtext: "Protect what matters most with reliable, intelligent and scalable security systems. From CCTV and access control to networked surveillance, FocusEye Security keeps you connected, in control and one step ahead."
- CTA buttons: `Shop Combo Kits` (primary teal) · `Get a Free Quote` (outline navy)
- Background: sunrise skyline photo with dome camera overlay (matches uploaded image)

**Trust strip** (logos or stats row directly under hero):
- "Trusted by businesses and installers across New Zealand" + 3–4 stat callouts (e.g. "10,000+ Cameras Installed", "24/7 Monitoring Support", "5-Year Warranty")

**Our Range / Categories grid** (icon + label cards, mirrors VSP's "Our Range"):
- CCTV Cameras
- Combo Security Kits
- NVR / DVR Recorders
- Access Control
- Alarm Systems
- Intercoms
- Cabling & Accessories
- Cloud & Remote Monitoring
- Each links to a filtered products page. Include "View all →" link top-right of section.

**Featured Combo Kits** (product card carousel/grid, 3–4 cards):
- Card: product image, name, short spec line, price, "View Kit" button.
- Example kits to populate:
  1. **StarterGuard 4-Camera Combo** — 4x 4MP dome cameras + 8-ch NVR + 2TB HDD + cabling
  2. **BusinessShield 8-Camera Combo** — 8x 5MP bullet cameras + 16-ch NVR + 4TB HDD + PoE switch
  3. **HomeWatch 2-Camera Wi-Fi Combo** — 2x wireless cameras + smart hub + app monitoring
  4. **WarehousePro 16-Camera Combo** — 16x 4K cameras + 32-ch NVR + 8TB HDD + rack cabinet

**Why Choose Us section** (3–4 columns with icons):
- Quality Certified Equipment
- Expert Installation Support
- Scalable for Any Business Size
- Local NZ-Based Support Team

**Brand/Partner logos strip**: "Supplying world-leading brands" — placeholder logo slots (Hikvision, Dahua, Axis, Ubiquiti, etc. — swap with actual supplier logos company carries)

**News/Updates section** (3 cards): Latest company news, product launches, promotions — title, image, excerpt, "Read more"

**Dual CTA banner** (two-column, split background):
- Left (teal bg): "Don't have a trade account? Register now for wholesale pricing." + button
- Right (navy bg): "Need expert advice? Talk to our support team." + button

**Locations / Find Us section**: branch cards with address, phone, embedded map placeholder (iframe)

**Footer** as described in section 3.

---

### 4.2 Products (`products.html`)
- Left sidebar filter: Category, Brand, Price range, Resolution
- Main grid: product cards (image, name, price, "Add to Quote"/"View Details")
- Top: breadcrumb + sort dropdown (Popularity / Price / Newest)

### 4.3 Combo Kits (`combos.html`)
- Grid of combo packages (as listed in 4.1) with bigger cards: "What's included" bullet list, total value vs. bundle price, "Customize Kit" and "Buy Now" buttons.
- Optional: interactive "Build Your Own Combo" configurator (camera count → NVR size → storage → accessories).

### 4.4 Brands (`brands.html`)
- Grid of supplier/brand logos, click-through to brand-specific product listings.

### 4.5 About (`about.html`)
- Company story, mission ("Smarter Security. Safer Tomorrow."), team/values, certifications, timeline.

### 4.6 Contact (`contact.html`)
- Contact form (Name, Email, Phone, Message, "I'm interested in: [dropdown of categories]")
- Branch list with maps (reuse footer location data)
- Live chat / support hours

---

## 5. Component Specs (for the AI agent)

- **Buttons:** Primary = teal `#1EB4C4` bg, white text, 8px border-radius, hover darkens to `#158A97`. Secondary/outline = navy border + navy text, transparent bg, hover fills navy with white text.
- **Cards:** white bg, 12px radius, subtle shadow (`0 4px 12px rgba(11,35,64,0.08)`), hover lift (translateY(-4px) + shadow increase).
- **Section spacing:** 80–100px vertical padding on desktop, 48px on mobile.
- **Responsive breakpoints:** Mobile ≤ 640px, Tablet ≤ 1024px, Desktop ≥ 1025px. Nav collapses to hamburger menu below 1024px.
- **Icons:** Use a lightweight icon set (Lucide/Feather) via CDN for category icons, social icons, UI icons (search, cart, phone).
- **Fonts:** Load via Google Fonts CDN — Poppins (headings), Inter (body).
- **Accessibility:** semantic HTML5 tags, alt text on all images, sufficient color contrast, focus states on interactive elements.

---

## 6. Assets Checklist (to supply or placeholder)

- [ ] FocusEye Security logo (SVG/PNG, transparent bg) — extract from uploaded homepage image if no separate file exists
- [ ] Hero skyline + camera photo (uploaded `Homepage.png` can be reused/cropped)
- [ ] Product photography for combo kits (placeholder stock images acceptable initially)
- [ ] Supplier/brand logos
- [ ] Real branch addresses & phone numbers
- [ ] Company registration / contact email

---

## 7. Instructions for the AI Coding Agent

When generating the site:
1. Build all pages listed in Section 3 with shared header/footer.
2. Use the color palette and typography in Section 2 as CSS custom properties (`:root` variables).
3. Populate Home page fully per Section 4.1 using the placeholder copy given (company can swap real copy later).
4. Make it fully responsive (mobile-first CSS or media queries).
5. Use placeholder images (e.g. via `https://placehold.co/` or unsplash-style URLs) for product/brand images not yet supplied, clearly marked with `<!-- TODO: replace with real image -->`.
6. Keep all code in clean, commented, well-indented HTML/CSS/JS — no build tools required, should run by opening `index.html` directly.
7. Do not use any copyrighted third-party brand logos as actual images — use text labels or generic placeholder badges unless real logo files are provided.
