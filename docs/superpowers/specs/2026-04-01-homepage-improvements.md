# Homepage Improvements - Design Spec

**Date:** 2026-04-01
**Status:** Approved

## Changes

### 1. New "Why Gary" Authority Section

**Position:** Between Credentials and Practice Areas.
**Background:** Dark (bg-gq-dark-gradient).

Left side: Gary's photo (gary2.jpg) in a rounded card with subtle gold border accent.

Right side: 3-4 compact authority statements, each with a gold icon/accent:
- "Wrote the LexisNexis bar treatise on Oklahoma construction law"
- "Published author of the industry-standard Mechanics Lien Book"
- "Trained 100+ Oklahoma attorneys through CLE courses"
- "13 years of Fortune 500 business experience before law"

Below the statements, a single standout line in serif italic:
"Your opponent's attorney may have attended one of Gary's training seminars."

Link to About page at the bottom.

GSAP scroll-reveal entrance.

### 2. Lien Predictor Section Redesign

**Position:** Same location (after Practice Areas).
**Background:** Light/cream (existing).

Replace the current vague "predictive framework" marketing copy with concrete tool showcase.

Left side: simplified visual showing a mini gauge result and 2-3 factor checkmarks. Static illustration, not the actual interactive component.

Right side:
- Headline: "Evaluate Your Claim in 2 Minutes"
- 3-step process: "Answer 4 questions about your project" / "Get your statutory compliance assessment" / "Share results with Gary's team"
- CTA button linking to /lien-predictor

Remove the "Completely Confidential / Data-Driven Analysis" footer text. Remove the massive section symbol watermark.

### 3. New Resources Preview Section

**Position:** Between Testimonials and Contact.
**Background:** Dark (bg-gq-dark-gradient).

Section title: "Resources & Insights"
Subtitle: "Legal guides, checklists, and Oklahoma statute references from 34 years of practice."

3 featured resource cards in a row. Pull from resources-data.ts. Each card: type badge, title, excerpt (truncated), arrow link to /resources/[slug].

"View All Resources" link below the cards pointing to /resources.

GSAP stagger entrance.

### What NOT to change

- Hero section (working well)
- Credentials bar (working well)
- Practice Areas accordion (working well, just added Contract Law)
- Testimonials carousel (working well)
- Contact form functionality (working, connected to Supabase)

### Style Rules

- No em dashes
- Match existing design language (dark browns, gold, cream, Playfair Display + Inter)
- GSAP ScrollTrigger animations, once: true
- Mobile responsive
