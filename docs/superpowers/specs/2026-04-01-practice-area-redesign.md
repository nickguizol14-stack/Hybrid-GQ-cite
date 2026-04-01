# Practice Area Page Redesign - Design Spec

**Date:** 2026-04-01
**Status:** Approved

## Purpose

Rebuild all 4 practice area pages from thin 4-section templates into full, authoritative 9-section pages that reflect Gary Quinnett's unique position as Oklahoma's foremost construction and business law authority. Each page should feel intentional, visually impressive, and content-rich.

## Design Principles

- **Gary is not a generic lawyer.** He wrote the LexisNexis treatise. He wrote the Lien Book. He trains other attorneys. Every page must reflect this.
- **"Authority + Edge" tone.** Lead with Gary's unique credentials, back it up with Oklahoma-specific legal knowledge, close with aggressive positioning.
- **Match the existing site's design language.** Dark browns (#2d2418, #2a2219), champagne gold (#C5A869), burgundy CTAs (#9B2D3D), cream sections (#FAF6F0). Playfair Display headings, Inter body. GSAP scroll-triggered animations throughout.
- **No wireframe energy.** Every section must look like it belongs on this premium site. Proper animations, proper spacing, proper typography hierarchy.
- **SEO-driven content.** Each page targets specific keywords. FAQ sections with schema markup. 1,500+ words per page.
- **No em dashes anywhere.**

## Section Architecture (all 4 pages)

### 1. Hero
- Dark gradient background with parallax background image
- Breadcrumb: "Practice Areas / [Area Name]"
- Large serif H1 with keyword-optimized text
- 1-2 sentence subtitle referencing Gary's authority
- Primary CTA button
- GSAP entrance animations (staggered title reveal)

### 2. Authority Strip
- Reuses the visual pattern from the homepage Credentials section
- 4 columns: "34 Years Focused" / "LexisNexis Treatise Author" / "[practice-specific credential]" / "100+ Attorneys Trained"
- Dark background, gold accents, number count-up animations
- The 3rd credential changes per page:
  - Construction: "Published / M&M Lien Book"
  - Real Estate: "13 Years / Fortune 500 Business"
  - Oil & Gas: "Since 1982 / Industry Landman"
  - M&A: "13 Years / Fortune 500 Business"

### 3. Practice Overview
- Light/cream background section
- 2-column layout: left is educational text (3-4 paragraphs, 400+ words), right is a dark card with "Who We Represent" list (similar to current)
- Text references specific Oklahoma statutes naturally
- Written in Gary's voice: authoritative, direct, not generic

### 4. Services Grid
- Light background
- 6 cards in a 2x3 or 3x2 grid
- Each card: icon, title, 1-2 sentence description, relevant statute reference where applicable
- Cards have hover effects (existing card-3d pattern from the site)
- GSAP stagger entrance on scroll

### 5. How It Works
- Dark background section
- 4 steps in a horizontal row (collapses to vertical on mobile)
- Each step: numbered circle, title, short description
- Connected by a subtle line/dots between steps
- Conveys Gary's process: Consultation > Strategy > Execution > Resolution

### 6. Practice-Specific Testimonials
- Light/cream background
- 1-2 testimonials filtered to this practice area from existing testimonial data
- Large quote typography, author + location
- Same visual treatment as the homepage testimonial cards

### 7. FAQ Section
- Light background
- 4-6 questions per page targeting long-tail SEO keywords
- Expandable accordion or visible list
- Each answer references Oklahoma statutes where relevant
- JSON-LD FAQPage schema markup added to the page's SEO component
- Questions are written as people actually search them

### 8. Related Practice Areas
- Dark background
- 3 cards linking to the other practice areas
- Each card: practice name, one-line description, arrow link
- Helps with internal linking for SEO

### 9. CTA Section
- Dark background with subtle burgundy gradient
- "Ready to [action]?" headline (varies per page)
- 1-2 sentence description
- Primary button: "Schedule a Consultation"
- Phone number below

## Per-Page Content

### Construction Law (`/construction-law`)
**Target keywords:** "oklahoma construction lawyer", "mechanics lien attorney oklahoma", "OKC construction lawyer"
**Hero H1:** "Oklahoma Construction Law."
**Hero subtitle:** "From bid to closeout, Gary Quinnett protects contractors, owners, and design professionals. He wrote the book on Oklahoma lien law. Literally."
**Services (6):** Contract Drafting & Review, Mechanics Lien Claims, Payment Bond Claims, Construction Defect Litigation, OSHA Defense & Compliance, Dispute Resolution
**Who We Represent:** General Contractors, Subcontractors, Material Suppliers, Property Owners, Architects & Engineers, Equipment Rental Companies
**FAQ questions:**
1. How do I file a mechanics lien in Oklahoma?
2. What is the deadline for filing a lien in Oklahoma?
3. Do I need a lawyer to file a mechanics lien?
4. Can I file a lien on a public project in Oklahoma?
5. What happens if I miss the pre-lien notice deadline?
6. How much does it cost to file a mechanics lien?
**CTA:** "Ready to Protect Your Project?"

### Real Estate Law (`/real-estate-law`)
**Target keywords:** "oklahoma real estate attorney", "oklahoma commercial real estate lawyer", "quiet title action oklahoma"
**Hero H1:** "Oklahoma Real Estate Law."
**Hero subtitle:** "34 years of protecting what you've built. From complex acquisitions to title disputes, with the business acumen of 13 years in the Fortune 500."
**Services (6):** Purchase & Sale Agreements, Commercial Leasing, Title Review & Curative Work, Land Use & Zoning, Quiet Title Actions, Real Estate Dispute Resolution
**Who We Represent:** Commercial Developers, Property Investors, Landlords & Tenants, Homebuilders, Land Owners, HOAs & Property Managers
**FAQ questions:**
1. What is a quiet title action in Oklahoma?
2. How long does a commercial real estate closing take in Oklahoma?
3. What should I look for in a commercial lease review?
4. Do I need a lawyer for a real estate transaction in Oklahoma?
**CTA:** "Ready to Secure Your Investment?"

### Oil & Gas Law (`/oil-and-gas-law`)
**Target keywords:** "oil and gas attorney oklahoma", "oklahoma oil and gas title opinion", "OCC spacing pooling attorney"
**Hero H1:** "Oklahoma Oil & Gas Law."
**Hero subtitle:** "Gary has worked in Oklahoma's energy industry since 1982, first as a landman, then as the attorney operators and mineral owners trust with their most complex matters."
**Services (6):** Lease Negotiation, Surface Damage Claims, Drilling & Division Order Title Opinions, OCC Regulatory (Spacing, Pooling, Location Exceptions), Joint Operating Agreements, Royalty Disputes
**Who We Represent:** Operators, Mineral Owners, Surface Owners, Royalty Interest Holders, Service Companies, Working Interest Partners
**FAQ questions:**
1. What is an OCC spacing and pooling application?
2. How are surface damages calculated in Oklahoma?
3. What is a division order title opinion?
4. Do I need a lawyer for an oil and gas lease in Oklahoma?
**CTA:** "Ready to Protect Your Interests?"

### Mergers & Acquisitions (`/mergers-and-acquisitions`)
**Target keywords:** "oklahoma mergers acquisitions lawyer", "buy sell agreement attorney oklahoma", "oklahoma business attorney"
**Hero H1:** "Mergers & Acquisitions."
**Hero subtitle:** "Buying or selling a business is one of the most consequential decisions you'll make. Gary brings 13 years of Fortune 500 business experience and 34 years of legal precision to every deal."
**Services (6):** Deal Structuring (Asset vs. Stock), Due Diligence Review, Risk Allocation & Indemnification, Non-Compete & Employment Agreements, Corporate Governance, Post-Closing Integration
**Who We Represent:** Business Sellers, Business Buyers, Private Equity Groups, Family-Owned Businesses, Management Teams, Corporate Boards
**FAQ questions:**
1. What is the difference between an asset purchase and a stock purchase?
2. How long does the M&A due diligence process take?
3. What is a representation and warranty in an acquisition?
4. Do I need a lawyer to sell my business in Oklahoma?
**CTA:** "Ready to Close Your Deal?"

## Implementation Approach

All 4 pages should be built from a shared component system (not copy-pasted). Create reusable section components that accept props for content variation:
- `PracticeHero` - hero with parallax, breadcrumb, title, subtitle, CTA
- `AuthorityStrip` - 4-column credentials (accepts array of credential objects)
- `PracticeOverview` - 2-column text + card layout
- `ServicesGrid` - 6-card grid with icons
- `ProcessSteps` - 4-step horizontal process
- `PracticeTestimonials` - filtered testimonial display
- `PracticeFAQ` - accordion with schema markup
- `RelatedPractices` - 3-card cross-link grid
- `PracticeCTA` - final conversion section

Each practice area page becomes a thin data file that feeds content into these shared components. This keeps the code DRY and ensures visual consistency.

## Out of Scope

- Case results section (Gary needs to provide specific data)
- Attorney profile section (can be added later)
- Blog/news integration
- Downloadable resources beyond the existing Lien Book
