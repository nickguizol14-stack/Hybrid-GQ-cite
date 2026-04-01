# Lien Predictor Tool - Design Spec

**Date:** 2026-04-01
**Status:** Approved

## Purpose

A genuine, educational, multi-step assessment tool that helps Oklahoma contractors, subcontractors, and suppliers evaluate the viability of a Mechanics & Materialmen's lien claim. Not legal advice. A structured intake that surfaces relevant statutory requirements, calculates deadlines, scores compliance, and motivates consultation with Gary.

**Legal basis:** Oklahoma Title 42, Sections 141-153. The tool encodes objective, procedural requirements of the statute (deadlines, notice requirements, claimant tiers). No subjective legal judgment.

## Design Decisions

- **Assessment type:** Claim strength scorer. Visual strength indicator (Strong / Moderate / At Risk) based on objective statutory compliance factors.
- **UX pattern:** Dark card stack wizard matching the GQ Law brand (dark browns, gold accents, Playfair Display + Inter). Each step is an animated card. Progress bar at top. Peek of next step below current card.
- **Results visibility:** Full results immediately visible. Optional "Save & Share With Gary" collects contact info and stores assessment in Supabase for Gary's reference.
- **Results layout:** Gauge + key metrics side-by-side (2-column), deadline progress bar (not a timeline), 2-column factor analysis grid with statute citations, horizontal CTA.
- **Scoring logic:** Client-side TypeScript. Pure functions. No backend dependency for calculations. Supabase only used when user opts to save.
- **Route:** `/lien-predictor` (dedicated page)

## Typography and Style Notes

- Clean font hierarchy. Minimal visual noise. Consistent weight/size system.
- No em dashes anywhere in the tool.
- CTA language: "Ready to Protect Your Rights?" / "Share this assessment with Gary Quinnett's team. He'll review your specific situation and advise on the strongest path to recovery."
- Disclaimer: "This assessment is for educational purposes only and does not constitute legal advice. Every situation has unique facts that may affect your rights under Oklahoma law. Consult an attorney for advice specific to your situation."

---

## Wizard Steps

### Step 1: Your Role

Determines notice requirements and filing deadlines per statute.

**Inputs:**
- Role (radio selection):
  - General Contractor (original contractor - direct contract with owner)
  - Subcontractor
  - Material Supplier
  - Laborer
  - Design Professional (architect/engineer)
  - Equipment Rental Company

**Logic impact:**
- General Contractor: 4-month filing deadline, no pre-lien notice required
- All others: 90-day filing deadline, pre-lien notice required within 75 days

### Step 2: Project Details

Determines lien eligibility and applicable rules.

**Inputs:**
- Project type (radio selection):
  - Commercial
  - Residential (not owner-occupied)
  - Residential (owner-occupied)
  - Public / Government
- County (dropdown of Oklahoma's 77 counties)
- Approximate contract/PO value (currency input)

**Logic impact:**
- Public projects: immediately show "M&M liens are not available on public property" message with redirect to contact Gary about payment bond claims. Wizard ends early.
- Owner-occupied residential: pre-lien notice is always mandatory regardless of claim amount (per 42 O.S. Section 142.6)
- Non-owner-occupied residential (4 or fewer units): exempt from pre-lien notice requirement
- Commercial: standard rules apply
- Contract value under $10,000 on non-owner-occupied: exempt from pre-lien notice (per 2025 amendment)

### Step 3: Payment Status

Establishes claim amount and starts the deadline clock.

**Inputs:**
- Total contract/PO amount (currency input, pre-filled from Step 2 if entered)
- Amount paid to date (currency input)
- Last date of work or materials delivered (date picker)

**Derived values:**
- Outstanding amount = total - paid
- Days since last furnishing = today - last work date
- Filing deadline = last work date + 90 days (sub) or + 4 calendar months (GC). Note: "4 months" means calendar months per the statute, not 120 days. Use date-fns `addMonths` for GC calculations.
- Days remaining = filing deadline - today

### Step 4: Notice and Compliance

The make-or-break procedural requirements.

**Inputs (conditional based on role from Step 1):**

If role is General Contractor:
- "Did you have a written contract with the property owner?" (yes/no)
- "Have you signed any lien waivers?" (yes - partial / yes - full / no)

If role is NOT General Contractor:
- "Did you send a pre-lien notice?" (yes / no / not sure)
  - If yes: "When was it sent?" (date picker)
  - If yes: "Who did you send it to?" (two checkboxes: General Contractor / Property Owner)
- "Did you have a written contract?" (yes/no)
- "Have you signed any lien waivers?" (yes - partial / yes - full / no)

**Logic impact:**
- Pre-lien notice: must be within 75 days of last furnishing, must go to both GC and owner
- Notice sent after 75 days: factor fails
- Notice only to GC (not owner) or vice versa: factor warns
- "Not sure" on notice: factor warns with recommendation to verify
- Lien waiver (full): significant negative factor
- Lien waiver (partial): moderate warning, reduces enforceable amount

---

## Scoring Algorithm

The strength assessment is based on 5 objective factors. Each factor is scored as PASS, WARN, or FAIL.

### Factor 1: Filing Deadline Status

| Condition | Score |
|-----------|-------|
| 30+ days remaining | PASS |
| 15-29 days remaining | WARN |
| 1-14 days remaining | WARN (urgent) |
| Deadline expired | FAIL |

### Factor 2: Pre-Lien Notice Compliance

For General Contractors: automatic PASS (not required).

For all others:

| Condition | Score |
|-----------|-------|
| Sent within 75 days to both GC and owner | PASS |
| Sent within 75 days but only to one party | WARN |
| Sent but after 75 days | FAIL |
| Not sent | FAIL |
| Not sure | WARN |
| Exempt (non-owner-occupied residential 4 or fewer units, or claim under $10K) | PASS |

### Factor 3: Written Contract

| Condition | Score |
|-----------|-------|
| Written contract exists | PASS |
| Oral agreement only | WARN |

Note: Oklahoma explicitly permits liens under oral contracts (42 O.S. Section 141), so oral is WARN not FAIL.

### Factor 4: Lien Waivers

| Condition | Score |
|-----------|-------|
| No waivers signed | PASS |
| Partial waiver signed | WARN |
| Full waiver signed | FAIL |

### Factor 5: Project Eligibility

| Condition | Score |
|-----------|-------|
| Private commercial | PASS |
| Private residential (any type) | PASS |
| Public / government | FAIL (wizard ends early at Step 2) |

### Overall Strength Rating

| Rating | Criteria |
|--------|----------|
| **Strong** | 0 FAIL, 0-1 WARN |
| **Moderate** | 0 FAIL, 2+ WARN |
| **At Risk** | 1+ FAIL |

---

## Results Page Layout

### Top Section (2-column grid)

**Left: Gauge Card**
- Semi-circular gauge with needle position based on overall rating
- Large text: "Strong" / "Moderate" / "At Risk" with color coding (green / amber / red)
- Subtext: "X of 5 factors favorable"

**Right: Key Metrics**
- Days to File (with deadline date, color-coded by urgency)
- Claim Amount (outstanding balance)
- Deadline progress bar: "X% of filing window elapsed" with gradient fill (green to amber)

### Middle Section: Factor Analysis (2-column grid)

Each factor as a compact card:
- Color-coded left border (green/amber/red)
- Factor name + status badge
- One-line plain-English explanation
- Statute citation (abbreviated: "42 O.S. Section 142")

### Bottom: CTA Section (horizontal layout)

- Left: "Ready to Protect Your Rights?" heading + description text
- Right: "Save & Share With Gary" button + phone number fallback

### Footer: Disclaimer

Single line, small text, centered.

---

## "Save & Share" Flow

When user clicks "Save & Share With Gary":

1. Modal/drawer slides up asking for contact info:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - "Anything else Gary should know?" (optional textarea)

2. On submit, store to Supabase `lien_assessments` table:
   - `id` (uuid)
   - `name`, `email`, `phone` (contact info)
   - `role` (from Step 1)
   - `project_type` (from Step 2)
   - `county` (from Step 2)
   - `contract_value` (from Step 2)
   - `amount_paid` (from Step 3)
   - `amount_outstanding` (derived)
   - `last_work_date` (from Step 3)
   - `filing_deadline` (derived)
   - `days_remaining` (derived)
   - `pre_lien_notice_sent` (from Step 4)
   - `notice_date` (from Step 4)
   - `notice_recipients` (from Step 4)
   - `written_contract` (from Step 4)
   - `lien_waivers` (from Step 4)
   - `overall_rating` (Strong/Moderate/At Risk)
   - `factors_passed` (count)
   - `notes` (optional user notes)
   - `created_at` (timestamptz)

3. Show confirmation: "Assessment shared. Gary's team will review and reach out within 24 hours."

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/pages/LienPredictor.tsx` | Page wrapper, route, page transition |
| `src/components/lien-predictor/PredictorWizard.tsx` | Wizard container, step management, progress bar |
| `src/components/lien-predictor/steps/RoleStep.tsx` | Step 1: role selection |
| `src/components/lien-predictor/steps/ProjectStep.tsx` | Step 2: project details |
| `src/components/lien-predictor/steps/PaymentStep.tsx` | Step 3: payment status |
| `src/components/lien-predictor/steps/ComplianceStep.tsx` | Step 4: notice and compliance |
| `src/components/lien-predictor/ResultsView.tsx` | Full results page (gauge, metrics, factors, CTA) |
| `src/components/lien-predictor/SaveShareModal.tsx` | Contact info collection modal |
| `src/components/lien-predictor/GaugeChart.tsx` | SVG gauge component |
| `src/lib/lien-scoring.ts` | Pure scoring functions, deadline calculations, factor evaluation |
| `src/lib/lien-types.ts` | TypeScript types for assessment data, factors, ratings |
| `src/lib/oklahoma-counties.ts` | List of 77 Oklahoma counties |

---

## Navigation Integration

- Add route `/lien-predictor` in `App.tsx`
- Update the homepage "Strategic Claim Assessment" section (`src/sections/LienPredictor.tsx`) CTA to link to `/lien-predictor`
- Update nav link: "Lien Predictor" already points to `/#lien-predictor` (homepage section). Keep this, but also add the tool as a subpage accessible from the section's CTA.

---

## Out of Scope

- PDF export of results
- Email delivery of results (save to Supabase only)
- Multi-state support (Oklahoma only)
- Attorney review workflow / dashboard
- User accounts or saved history
