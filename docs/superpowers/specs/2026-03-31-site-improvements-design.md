# GQ Law v9 — Site Improvements Design Spec

**Date:** 2026-03-31
**Status:** Approved
**Approach:** Parallel Tracks (C) — UX overhaul, functionality, and SEO in interleaved tracks

## Context

GQ Law (gq-law.com) is a law firm website for Gary David Quinnett, PLLC — an Oklahoma City attorney with 34 years specializing in construction law, M&A, real estate, and oil & gas. The site is a React 19 SPA (Vite, Tailwind, GSAP, Framer Motion) deployed on Vercel.

The site has a strong homepage design foundation but needs: functional features that generate leads, UX polish across all pages and devices, and SEO infrastructure to drive organic traffic.

**Audience:** Mixed — urgent payment dispute seekers, business owners researching attorneys, and referrals confirming contact info. The site must serve all three.

---

## Track 1: Core UX Overhaul

### 1.1 — Preloader Rework

**Current state:** Hard-coded 2.2s `setTimeout` followed by a GSAP logo-to-nav flight animation (~1s). Total perceived load: ~3.2s. The delay is arbitrary and doesn't correlate with actual asset readiness. The flight animation relies on fragile cross-breakpoint DOM coordinate math.

**Design:**
- Replace fixed timer with asset readiness detection: wait for the hero video's `canplay` event OR a 1.5s max timeout (whichever comes first)
- Replace logo flight animation with a simple, fast fade-out (~400ms)
- Remove the coordinate calculation logic (`getBoundingClientRect` comparisons, `transformOrigin` hacks)
- Result: perceived load drops from ~3.2s to ~1s on fast connections, and the animation never breaks across screen sizes

### 1.2 — Page Transitions

**Current state:** Framer Motion `AnimatePresence` with basic opacity fade. Janky feel caused by: old page fading out, a 150ms `setTimeout` for `ScrollTrigger.refresh()` causing layout jumps, and scroll position changing mid-transition.

**Design:**
- Coordinated exit/enter: old page fades out (200ms), new page fades in (300ms). No spatial transforms (slides cause layout recalc issues with ScrollTrigger)
- Add scroll-lock during transition: set `overflow: hidden` on body during the exit/enter window, release after enter completes
- Clean ScrollTrigger lifecycle: kill all ScrollTrigger instances in the exiting page's cleanup, then let the new page create fresh ones on mount. Remove the 150ms `setTimeout` hack in App.tsx
- Each page component handles its own ScrollTrigger setup/teardown via `gsap.context()` (most already do this correctly)

### 1.3 — Mobile Audit & Fixes

**Target breakpoints:** 375px (iPhone SE), 390px (iPhone 14/15), 768px (iPad)

**Known issues to address:**
- Hero `h1` at `text-[3.5rem]` may overflow on small screens — audit and cap with `clamp()` or tighter mobile breakpoint
- Practice Areas accordion: vertical collapse on mobile feels abrupt. Add smooth height animation and better touch target sizing (min 44px)
- TopBar: truncated address still takes vertical space on mobile. Evaluate hiding entirely below `sm` to save space
- Contact form: field sizing and submit button need touch-friendly spacing
- Lien Book page: checkout card stacking on mobile needs spacing review
- All interactive elements: verify 44px minimum touch targets

**Approach:** Systematic section-by-section audit at 375px width using Chrome DevTools or Playwright. Fix issues per-section.

### 1.4 — Subpage UI Consistency

**Current state:** Practice area pages (Construction Law, Real Estate, Oil & Gas, M&A), About page, and Contact page each use different layout patterns, spacing scales, animation styles, and hero treatments. They feel disconnected from the polished homepage.

**Design:**
- Create a shared `SubpageLayout` component that provides:
  - Consistent dark hero banner (matching LienBook's approach: dark gradient, centered text, `pt-56 pb-20`)
  - Consistent section spacing via `section-padding` utility class
  - Consistent scroll-reveal animation pattern (GSAP `fromTo` with `scrollTrigger`, `start: 'top 85%'`, `once: true`)
  - Consistent content container widths (`container-gq`)
- Each practice area page keeps its unique content (services, descriptions, CTAs) but inherits structural consistency
- About page gets the same treatment with its bio content
- Contact page (standalone `/contact` route): same hero pattern, then the existing contact form component

---

## Track 2: Functionality

### 2.1 — Contact Form Backend (Supabase)

**Current state:** Form captures name, email, phone, matter type, description. `handleSubmit` does a fake `setTimeout`. No data goes anywhere.

**Design:**
- Create a `contact_submissions` table in Supabase:
  - `id` (uuid, PK)
  - `name` (text, required)
  - `email` (text, required)
  - `phone` (text, optional)
  - `matter_type` (text — construction, ma, realestate, oilgas, other)
  - `description` (text, optional)
  - `status` (text, default 'new' — for future lead tracking)
  - `created_at` (timestamptz, default now())
- Frontend: replace fake submit with Supabase client insert. Show success/error states.
- Email notification: use a Supabase database webhook or Edge Function to send an email to gary@gq-law.com on each new submission. Include all form fields in the email body.
- Rate limiting: add a simple client-side cooldown (disable submit for 30s after success) and consider Supabase RLS policies to prevent abuse.
- Validation: use Zod (already in dependencies) for client-side validation. Required fields: name, email. Email format validation.

### 2.2 — Lien Predictor Tool

**Purpose:** A genuine, educational, multi-step assessment tool that helps Oklahoma contractors, subcontractors, and suppliers evaluate the viability of a Mechanics & Materialmen's lien claim. Not legal advice — a structured intake that surfaces relevant statutory requirements and motivates consultation.

**Legal basis:** Oklahoma Title 42, Sections 141-153. The tool encodes the objective, procedural requirements of the statute (deadlines, notice requirements, claimant tiers) — not subjective legal judgment.

**User flow (5 steps):**

1. **Your Role** — General contractor, subcontractor (tier 1-3), supplier, laborer, design professional. This determines notice requirements and filing deadlines per the statute.

2. **Project Details** — Project type (residential, commercial, public), county, approximate contract value. Public projects use payment bond claims (Miller Act / Oklahoma equivalent), not M&M liens — the tool should detect this and redirect appropriately.

3. **Payment Status** — Total contract/PO amount, amount paid to date, amount outstanding, last date of work or materials delivered. This establishes the claim amount and starts the deadline clock.

4. **Notice & Compliance** — Did you send a pre-lien notice? When? To whom (owner, GC, both)? Was your contract in writing? Did you file a lien waiver for any portion? These are the make-or-break procedural requirements.

5. **Timeline Review** — Based on role + last work date, calculate the statutory deadline for filing. Show how many days remain (or if the deadline has passed). Factor in the 90-day (subcontractor) vs. 120-day (GC) filing windows per Oklahoma statute.

**Output — Claim Assessment Report:**
- Visual strength indicator (strong / moderate / needs review / deadline concern) based on:
  - Filing deadline status (days remaining, or expired)
  - Pre-lien notice compliance
  - Claimant tier and corresponding requirements met
  - Contract documentation status
- Specific statutory callouts: "Under 42 O.S. Section 142, subcontractors must file within 90 days of last furnishing labor or materials"
- Clear factors working for and against the claim
- Prominent CTA: "Schedule a consultation with Gary Quinnett to review your specific situation"
- Disclaimer: "This assessment is for educational purposes only and does not constitute legal advice. Every situation has unique facts that may affect your rights."

**Visual design:**
- Full dedicated page at `/lien-predictor`
- Step-by-step wizard with progress indicator
- Each step on its own card/panel with clear inputs
- The assessment output should feel authoritative — clean typography, structured layout, color-coded strength indicators
- Mobile-first responsive design
- Animations should be subtle and purposeful (step transitions, result reveal)

**Data handling:**
- Store completed assessments in Supabase for Gary's reference (links back to contact form if they schedule a consultation)
- No PII required for the assessment itself — contact info only collected if they choose to schedule

### 2.3 — Analytics (GA4)

**Design:**
- Add GA4 via `gtag.js`, loaded async with `defer` to avoid blocking
- Track these events:
  - `page_view` — on each route change (React Router listener)
  - `form_submit` — contact form successfully submitted
  - `lien_assessment_complete` — lien predictor tool finished
  - `lien_assessment_step` — each step of the predictor (funnel analysis)
  - `outbound_click` — PayPal purchase buttons on Lien Book page
  - `phone_click` — tel: link clicks
  - `email_click` — mailto: link clicks
- GA4 measurement ID to be provided by Caleb/Gary
- Implementation: create a thin `analytics.ts` utility with `trackEvent(name, params)` function. Components call it at interaction points.

---

## Track 3: SEO & Meta

### 3.1 — Technical SEO

**Per-page meta tags:**
- Use `react-helmet-async` for client-side meta tag management (Googlebot renders JS, so this works for search. Social media crawlers may not render JS — if OG previews are critical for deep links, consider Vercel edge middleware or a pre-rendering service later)
- Each route gets unique `<title>` and `<meta name="description">`:
  - Home: "GQ Law | Oklahoma Construction & Business Attorney | Gary Quinnett"
  - Construction Law: "Oklahoma Construction Lawyer | Lien Claims & Contract Disputes | GQ Law"
  - (etc. — keywords informed by Oklahoma legal search volume)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) on all pages
- Twitter card meta tags

**Structured data (JSON-LD):**
- `Attorney` schema on the About page
- `LegalService` schema on practice area pages
- `LocalBusiness` schema site-wide (name, address, phone, hours, geo coordinates)
- `Product` schema on the Lien Book page (name, price, description)
- `FAQPage` schema on pages that get FAQ sections

**Sitemap & robots:**
- Static `sitemap.xml` listing all routes with appropriate `changefreq` and `priority`
- `robots.txt` allowing all crawlers, pointing to sitemap
- Both placed in `public/` for Vite to serve statically

**Canonical URLs:**
- Add `<link rel="canonical">` on each page pointing to the canonical URL
- Set `base` in vite.config to `'/'` (currently `'./'` which generates relative paths — not ideal for canonical URLs and social sharing)

### 3.2 — Performance (Core Web Vitals)

**Code splitting:**
- Lazy-load all route-level page components with `React.lazy()` + `Suspense`
- Keep Home page components in the main bundle (it's the landing page)
- Practice area pages, About, Contact, Lien Book, Lien Predictor all become separate chunks
- Target: main JS bundle under 300KB (currently 742KB)

**Hero video:**
- Set `preload="metadata"` (currently no preload attribute, defaults to browser heuristic)
- Ensure poster image (`hero-image.jpg`) is optimized and compressed
- Consider offering WebM format alongside MP4 for smaller file size in supporting browsers

**Font loading:**
- Add `&display=swap` to Google Fonts URL (may already be there — verify)
- Evaluate self-hosting Inter and Playfair Display for eliminating the render-blocking Google Fonts request

### 3.3 — Content SEO

**FAQ sections:**
- Add to Construction Law page (most searched practice area): "How do I file a mechanics lien in Oklahoma?", "What is the deadline for filing a lien?", "Do I need a lawyer to file a lien?"
- Add to Lien Book page: "What is a mechanics and materialmen's lien?", "Who can file an M&M lien in Oklahoma?"
- Use `FAQPage` structured data schema

**Internal linking:**
- Practice area pages link to related services within other practice areas
- Construction Law page links to the Lien Predictor and Lien Book
- Lien Predictor results page links to Construction Law and contact form
- Footer quick links updated to use proper routes (currently uses hash anchors)

**Image alt text:**
- Add descriptive alt text to all images (logo, Gary's photo, award badges, book cover)

---

## Implementation Sequence

1. **Track 1.1 + 1.2** — Preloader rework + page transitions (foundation)
2. **Track 1.3** — Mobile audit & fixes
3. **Track 2.1** — Contact form backend (quick win, leads start flowing)
4. **Track 1.4** — Subpage UI consistency (needed before building lien predictor page)
5. **Track 2.2** — Lien Predictor tool (biggest feature, built on polished foundation)
6. **Track 2.3** — Analytics (track what the new features are doing)
7. **Track 3.1 + 3.2** — Technical SEO + performance
8. **Track 3.3** — Content SEO (last, when all content is finalized)

---

## Out of Scope

- CMS or admin dashboard for Gary
- Blog or news section
- Client portal or document sharing
- Appointment scheduling integration (Calendly, etc.) — could be a future addition
- Multi-language support
