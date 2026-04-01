# Phase 1: Foundation & Quick Win — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the preloader for speed, fix page transitions for smoothness, and connect the contact form to Supabase so leads actually get delivered.

**Architecture:** Replace the 3.2s preloader with asset-aware loading (~1s). Centralize page transition variants in a shared module so all pages animate consistently. Add `@supabase/supabase-js` client and wire the existing contact form to a `contact_submissions` table with Zod validation.

**Tech Stack:** React 19, GSAP, Framer Motion, Supabase (client SDK + database), Zod

**Working directory:** `~/Projects/GQLaw-v9`

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/lib/transitions.ts` | Shared Framer Motion page transition variants |
| Create | `src/lib/supabase.ts` | Supabase client singleton |
| Create | `src/lib/contact.ts` | Contact form validation schema (Zod) + submit function |
| Modify | `src/components/Preloader.tsx` | Simplified asset-aware preloader |
| Modify | `src/App.tsx` | Clean ScrollTrigger lifecycle, remove 150ms hack |
| Modify | `src/pages/Home.tsx` | Use shared transition variants |
| Modify | `src/pages/About.tsx` | Use shared transition variants |
| Modify | `src/pages/Contact.tsx` | Use shared transition variants |
| Modify | `src/pages/ConstructionLaw.tsx` | Use shared transition variants |
| Modify | `src/pages/RealEstateLaw.tsx` | Use shared transition variants |
| Modify | `src/pages/OilAndGasLaw.tsx` | Use shared transition variants |
| Modify | `src/pages/MergersAndAcquisitions.tsx` | Use shared transition variants |
| Modify | `src/pages/LienBook.tsx` | Use shared transition variants |
| Modify | `src/sections/Contact.tsx` | Wire to Supabase, add Zod validation, error states |

---

### Task 1: Create Shared Page Transition Variants

**Files:**
- Create: `src/lib/transitions.ts`

- [ ] **Step 1: Create the transition variants module**

```ts
// src/lib/transitions.ts
import type { Variants, Transition } from 'framer-motion';

export const pageTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // ease-smooth
};

export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
```

- [ ] **Step 2: Verify it compiles**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/lib/transitions.ts
git commit -m "feat: add shared page transition variants module"
```

---

### Task 2: Apply Shared Transitions to All Pages

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Contact.tsx` (the page, not the section)
- Modify: `src/pages/ConstructionLaw.tsx`
- Modify: `src/pages/RealEstateLaw.tsx`
- Modify: `src/pages/OilAndGasLaw.tsx`
- Modify: `src/pages/MergersAndAcquisitions.tsx`
- Modify: `src/pages/LienBook.tsx`

Each page currently defines its own inline `initial`/`animate`/`exit` props on `motion.div`. Replace them all with the shared variants.

- [ ] **Step 1: Update Home.tsx**

Replace the `motion.div` props:
```tsx
// Before:
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
>

// After:
import { pageVariants, pageTransition } from '../lib/transitions';
// ...
<motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
>
```

- [ ] **Step 2: Update About.tsx**

This page currently uses `initial={{ opacity: 0, scale: 0.98 }}` — a different pattern. Normalize to the shared variants (the scale was causing layout recalculation jank):
```tsx
import { pageVariants, pageTransition } from '../lib/transitions';
// Replace: initial={{ opacity: 0, scale: 0.98 }}  animate={{ opacity: 1, scale: 1 }}  exit={{ opacity: 0 }}
// With:
variants={pageVariants}
initial="initial"
animate="animate"
exit="exit"
transition={pageTransition}
```

- [ ] **Step 3: Update ConstructionLaw.tsx, RealEstateLaw.tsx, OilAndGasLaw.tsx, MergersAndAcquisitions.tsx**

All four follow the same pattern. For each:
```tsx
import { pageVariants, pageTransition } from '../lib/transitions';
// Replace inline initial/animate/exit with:
variants={pageVariants}
initial="initial"
animate="animate"
exit="exit"
transition={pageTransition}
```

- [ ] **Step 4: Update LienBook.tsx and Contact.tsx (page)**

Same pattern as above:
```tsx
import { pageVariants, pageTransition } from '../lib/transitions';
// Replace inline initial/animate/exit with:
variants={pageVariants}
initial="initial"
animate="animate"
exit="exit"
transition={pageTransition}
```

- [ ] **Step 5: Verify compilation and build**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit && npm run build`
Expected: Clean compilation, build succeeds

- [ ] **Step 6: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/pages/Home.tsx src/pages/About.tsx src/pages/Contact.tsx src/pages/ConstructionLaw.tsx src/pages/RealEstateLaw.tsx src/pages/OilAndGasLaw.tsx src/pages/MergersAndAcquisitions.tsx src/pages/LienBook.tsx
git commit -m "refactor: normalize all page transitions to shared variants"
```

---

### Task 3: Fix ScrollTrigger Lifecycle in App.tsx

**Files:**
- Modify: `src/App.tsx`

The current `useEffect` on `location.pathname` uses a 150ms `setTimeout` to call `ScrollTrigger.refresh()`. This causes visible layout jumps during transitions. The fix: kill all ScrollTrigger instances on route change, let pages re-create them on mount.

- [ ] **Step 1: Replace the setTimeout hack with clean ScrollTrigger lifecycle**

In `src/App.tsx`, replace:
```tsx
// Refresh ScrollTrigger and fix layout jumps on route change
useEffect(() => {
  // Slight delay to allow new page to mount and DOM to calculate heights
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
  return () => clearTimeout(timer);
}, [location.pathname]);
```

With:
```tsx
// Clean ScrollTrigger on route change — pages re-create their own triggers on mount
useEffect(() => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  ScrollTrigger.refresh();
}, [location.pathname]);
```

- [ ] **Step 2: Add scroll-lock during page transitions**

In the `AppContent` component, add a `isTransitioning` state and pass `onExitComplete` to `AnimatePresence`:

```tsx
const [isTransitioning, setIsTransitioning] = useState(false);

// Add effect to lock scroll during transition
useEffect(() => {
  if (isTransitioning) {
    document.body.style.overflow = 'hidden';
  } else if (!showPreloader) {
    document.body.style.overflow = '';
  }
}, [isTransitioning, showPreloader]);
```

Update the `AnimatePresence` in the JSX:
```tsx
<AnimatePresence
  mode="wait"
  onExitComplete={() => setIsTransitioning(false)}
>
  <Routes location={location} key={location.pathname}>
```

Update `ScrollToTop` to also trigger the transitioning state via a callback, or more simply — set `isTransitioning` to true inside the route-change `useEffect`:

```tsx
useEffect(() => {
  setIsTransitioning(true);
  ScrollTrigger.getAll().forEach(t => t.kill());
  ScrollTrigger.refresh();
}, [location.pathname]);
```

- [ ] **Step 3: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/App.tsx
git commit -m "fix: clean ScrollTrigger lifecycle on route change, add scroll-lock during transitions"
```

---

### Task 4: Rework the Preloader

**Files:**
- Modify: `src/components/Preloader.tsx`

Replace the 2.2s fixed timeout + logo flight animation with asset-aware loading and a simple fade-out.

- [ ] **Step 1: Rewrite Preloader.tsx**

Replace the entire contents of `src/components/Preloader.tsx` with:

```tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const MAX_WAIT_MS = 1500;

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Wait for hero video readiness OR max timeout
  useEffect(() => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      setIsReady(true);
    };

    const video = document.querySelector<HTMLVideoElement>('#hero video');
    if (video) {
      if (video.readyState >= 3) {
        // Video already has enough data
        settle();
        return;
      }
      video.addEventListener('canplay', settle, { once: true });
    }

    const timer = setTimeout(settle, MAX_WAIT_MS);

    return () => {
      clearTimeout(timer);
      video?.removeEventListener('canplay', settle);
    };
  }, []);

  // Fade out when ready
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete,
    });
  }, [isReady, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1510] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] bg-[#C5A869]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative h-20 sm:h-24 md:h-28 flex justify-center items-center overflow-visible pointer-events-none">
          <img
            src="/logo-gwinnett.png"
            alt="GQ Law"
            className="h-full w-auto object-contain relative z-10"
            style={{ filter: 'drop-shadow(0px 0px 15px rgba(197, 168, 105, 0.15))' }}
          />

          {/* Masked shine effect */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              maskImage: 'url("/logo-gwinnett.png")',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: 'url("/logo-gwinnett.png")',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          >
            <motion.div
              className="absolute top-[-50%] bottom-[-50%] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
              style={{ transform: 'skewX(-20deg)', filter: 'blur(4px)' }}
              initial={{ left: '-20%' }}
              animate={{ left: '120%' }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Preloader;
```

Key changes from original:
- Replaced 2.2s `setTimeout` with hero video `canplay` event (max 1.5s fallback)
- Removed entire logo-to-nav flight animation (fragile coordinate math)
- Removed `AnimatePresence` wrapper (unnecessary — parent controls mount/unmount)
- Removed `logoWrapperRef` and `logoRef` refs (no longer needed for flight)
- Exit animation is now a simple 400ms GSAP opacity fade
- Kept the logo display and shine effect (they're nice, just faster)

- [ ] **Step 2: Verify compilation and build**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit && npm run build`
Expected: Clean compilation, build succeeds

- [ ] **Step 3: Manual test**

Run: `cd ~/Projects/GQLaw-v9 && npx vite --open`
Verify:
- Preloader shows logo with shine
- Fades out quickly (~1-1.5s on fast connection)
- No console errors
- Page content renders correctly after preloader dismisses

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/components/Preloader.tsx
git commit -m "feat: rework preloader with asset-aware loading and fast fade-out"
```

---

### Task 5: Install Supabase Client and Create Config

**Files:**
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Install @supabase/supabase-js**

```bash
cd ~/Projects/GQLaw-v9 && npm install @supabase/supabase-js
```

- [ ] **Step 2: Create the Supabase client module**

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
);
```

- [ ] **Step 3: Create .env.local template**

Create `.env.local` with placeholder values (this file is gitignored):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Also create `.env.example` (committed, shows required vars):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

- [ ] **Step 4: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/lib/supabase.ts .env.example
git commit -m "feat: add Supabase client configuration"
```

---

### Task 6: Create Supabase Table for Contact Submissions

**Files:**
- Supabase dashboard or MCP tool

- [ ] **Step 1: Create the `contact_submissions` table**

Use the Supabase MCP tool or dashboard to run this SQL:

```sql
CREATE TABLE contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  matter_type text NOT NULL DEFAULT 'other',
  description text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (no reads/updates/deletes from client)
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

- [ ] **Step 2: Verify table exists**

Use the Supabase MCP tool:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contact_submissions'
ORDER BY ordinal_position;
```

Expected: 8 columns (id, name, email, phone, matter_type, description, status, created_at)

- [ ] **Step 3: Document the table**

No commit needed — this is infrastructure, not code.

---

### Task 7: Create Contact Form Validation and Submit Logic

**Files:**
- Create: `src/lib/contact.ts`

- [ ] **Step 1: Create the validation schema and submit function**

```ts
// src/lib/contact.ts
import { z } from 'zod/v4';
import { supabase } from './supabase';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  matterType: z.string().min(1, 'Please select a matter type'),
  description: z.string().optional().default(''),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitResult> {
  // Validate
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid form data';
    return { success: false, error: firstError };
  }

  // Submit to Supabase
  const { error } = await supabase.from('contact_submissions').insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    matter_type: parsed.data.matterType,
    description: parsed.data.description || null,
  });

  if (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: 'Something went wrong. Please try calling us directly.' };
  }

  return { success: true };
}
```

- [ ] **Step 2: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`
Expected: No errors (note: Zod v4 uses `zod/v4` import path — verify this matches the installed version)

If `zod/v4` import fails, check the installed version:
```bash
cd ~/Projects/GQLaw-v9 && node -e "console.log(require('zod/package.json').version)"
```
If v3.x, use `import { z } from 'zod'` and `z.string().email()` instead of `z.email()`.

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/lib/contact.ts
git commit -m "feat: add contact form validation schema and Supabase submit function"
```

---

### Task 8: Wire Contact Section to Supabase

**Files:**
- Modify: `src/sections/Contact.tsx`

Replace the simulated `handleSubmit` with the real Supabase-backed submission, add error state display, and add a cooldown after successful submission.

- [ ] **Step 1: Update imports and state**

At the top of `src/sections/Contact.tsx`, add:
```tsx
import { submitContactForm, contactSchema } from '@/lib/contact';
```

Add error state alongside existing states:
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
```

- [ ] **Step 2: Replace handleSubmit**

Replace the existing `handleSubmit` function:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  // Client-side validation
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    setSubmitError(parsed.error.issues[0]?.message ?? 'Please check your input');
    setIsSubmitting(false);
    return;
  }

  const result = await submitContactForm(formData);

  setIsSubmitting(false);

  if (result.success) {
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', matterType: '', description: '' });
  } else {
    setSubmitError(result.error);
  }
};
```

- [ ] **Step 3: Add error display in the JSX**

Add an error message just above the submit `Button`, inside the form:
```tsx
{submitError && (
  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
    {submitError}
  </div>
)}
```

- [ ] **Step 4: Verify compilation and build**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit && npm run build`
Expected: Clean compilation, build succeeds

- [ ] **Step 5: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/sections/Contact.tsx
git commit -m "feat: wire contact form to Supabase with Zod validation and error handling"
```

---

### Task 9: Configure Supabase Credentials and Test End-to-End

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Get Supabase project credentials**

From the Supabase dashboard (or MCP), get:
- Project URL (e.g., `https://xxxx.supabase.co`)
- Anon public key

Update `.env.local` with real values.

- [ ] **Step 2: Also set the env vars in Vercel**

In the Vercel dashboard for this project, add:
- `VITE_SUPABASE_URL` = your project URL
- `VITE_SUPABASE_ANON_KEY` = your anon key

These are public keys (anon), safe for client-side use.

- [ ] **Step 3: Test locally**

Run: `cd ~/Projects/GQLaw-v9 && npx vite --open`

1. Navigate to the contact section
2. Fill out the form with test data
3. Submit
4. Verify success message appears
5. Check Supabase dashboard — the submission should appear in `contact_submissions`

- [ ] **Step 4: Test error states**

1. Submit with empty name — should show validation error
2. Submit with invalid email — should show validation error
3. Verify errors clear when user corrects and resubmits

- [ ] **Step 5: Push all changes**

```bash
cd ~/Projects/GQLaw-v9
git push origin main
```

Vercel will automatically build and deploy. Verify the live site's contact form works.

---

## Post-Phase 1 Verification Checklist

- [ ] Preloader loads in ~1-1.5s (not 3.2s)
- [ ] Page transitions are smooth with no layout jumps
- [ ] All 8 pages use identical transition variants
- [ ] No visible scroll jump when navigating between pages
- [ ] Contact form submits to Supabase successfully
- [ ] Validation errors display correctly
- [ ] Form data appears in Supabase `contact_submissions` table
- [ ] Build passes with zero errors
- [ ] Live Vercel deployment works
