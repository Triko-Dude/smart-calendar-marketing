# Smart Calendar -- Marketing Website Implementation Prompt

> **You are building the marketing and download website for Smart Calendar.**
> This is a **separate Next.js 15 project** from the app codebase. Do not modify the main app.
> You have full access to this new repo. Read every section of this prompt before writing any code.
> **Animation fluidity is paramount.** The website is the first taste of the product -- if it does not feel like the app, the website fails.

---

## Section 1: Agent Context

### What You're Building
A single-purpose marketing site whose only job is to make the right people download Smart Calendar with quiet confidence. Not a CRM. Not a content hub. Not a community. A download page that tells the truth beautifully.

### Tech Stack
- **Next.js 15+** (App Router, RSC where possible)
- **TypeScript** strict mode
- **Tailwind CSS 4** with custom design tokens matching the app
- **Framer Motion** for component-level animation
- **GSAP + ScrollTrigger** for scroll-orchestrated sequences
- **Lenis** for smooth scroll (lerp 0.1, normalize wheel)
- **shadcn/ui** for primitives (button, dialog, tabs)
- **next/font** for Inter and JetBrains Mono
- Hosted on **Vercel** with edge functions for OS detection

### Key Reference Files (from the main app, copy values only)
```
lib/motionPresets.ts   -- SPRING_REFLOW, SPRING_GRAB, TASK_CARD_STAGGER values to mirror
app/globals.css        -- color tokens (--background #13132B, category accents)
```

You do not import from the app. You **recreate** its visual language faithfully in this fresh codebase so the website feels like the app's continuation.

---
## Section 2: Design Philosophy

The research is clear. The websites that feel premium share four principles (Stripe, Linear, Vercel, Raycast all do this):

| Principle | What It Means Here |
|-----------|-------------------|
| **High contrast** | Near-white text on the deep indigo background. No muddy mid-greys. Eyes know where to look immediately. |
| **Generous whitespace** | Take the spacing that feels like enough, then double it. Whitespace is the air the design breathes. |
| **Monochrome base with one accent** | The deep indigo dominates. One category accent (blue) does 80% of the punctuation work. The other accents (emerald, coral, violet, amber) appear only inside feature visualizations of the actual app. |
| **Sharp typography** | Inter or Geist. Tight tracking on display sizes. Geometric, slightly cold. Nothing rounded or friendly-looking. |

### Reference Sites (study these specifically)
- **linear.app** -- engineering-first minimal, single-sentence hero, dense product surface below
- **stripe.com** -- restrained tech-editorial, deliberate type pairing, gradient as cultural moment
- **vercel.com** -- high-contrast editorial, stark black-and-white, generous type sizes
- **raycast.com** -- productivity dark mode template, cinematic ambient background, multi-CTA hero
- **amie.so** -- calendar-specific direct competitor, concrete numbers in headlines
- **arc.net** -- sensory storytelling, scroll-driven product reveal
- **apple.com** -- hierarchy, whitespace, confident typography, micro-interactions that support content

### Do
- Real product visuals (the actual app interface, not abstract mockups or 3D renders)
- Animation that mirrors the app's spring cadence (SPRING_REFLOW timing carries through)
- Deep indigo backgrounds across the whole site, never break into bright surfaces
- One CTA per section (per landing page conversion research)
- Specific numbers and concrete behaviors over abstract claims

### Don't
- Stock photos, illustrations, 3D abstractions, gradient mesh blobs
- Multiple competing CTAs in the hero
- A traditional nav menu -- removing nav lifts conversion 10-15% (Unbounce research)
- Loud carousels, video autoplay with sound, scroll-jacking
- Words like "revolutionary," "world-class," "game-changing," "unleash"
- Newsletter pop-ups or exit-intent modals (they cheapen the brand)

---
## Section 3: Tone of Voice -- Consultant + Emotionally Intelligent

This is the most important section. Get this wrong and the site reads like every other SaaS landing page.

### The Posture
- **Quiet confidence**, not enthusiasm.
- **Specific behaviors**, not promises.
- **Honest about scope**, not apologetic about limits.
- **Speaks to people who already know what they want**, not people who need to be convinced.

### How to Phrase Things

| Don't Write | Write Instead |
|-------------|---------------|
| "The world's most intelligent calendar" | "A weekly calendar for focused work" |
| "Revolutionize your productivity" | "Plan your week in five minutes" |
| "Game-changing AI scheduling" | "It schedules your tasks. You do the work." |
| "Unleash your full potential" | "Protect time for what matters" |
| "Best-in-class user experience" | "Designed for people who care how software feels" |
| "Trusted by thousands" (if untrue) | "Built quietly. Shipped carefully." |

### Words to Embrace
calm, considered, fluid, intentional, honest, specific, protected, quiet, careful, the actual work

### Words to Avoid
revolutionary, world-class, game-changing, unleash, transform, supercharge, 10x, cutting-edge, seamless, best-in-class, next-generation, paradigm shift

### The Consultant Layer
A consultant respects the reader's time and intelligence. They don't pitch. They diagnose, then offer.

> "Most calendars treat time as a sequence of empty boxes you must heroically fill, then they confuse scheduled with done. Smart Calendar is the opposite. It assumes you already know what matters. Its job is to protect the time and stay out of the way."

That's the tone. Three sentences. A diagnosis. A pivot. A promise about restraint.

### The Emotional Intelligence Layer
The reader is probably tired. They have probably tried four other calendars. They are skeptical. Acknowledge this without naming it -- by being honest about what the product is not (Section 6.6), by showing the actual interface instead of mockups, by not asking for an email before letting them download.

---
## Section 4: The Story and Vision (Ground Truth Copy)

Use this verbatim or paraphrased throughout the site. This is what the product means.

**Opening narrative** (used in the Story section after the hero):

> Most calendars were built for meetings. They treat your week as a grid of empty boxes you are expected to fill, then they applaud you when the grid is full. They confuse a scheduled hour with a completed one. They optimize for the appearance of progress, not the doing of the work.

> Smart Calendar is built around a different idea. There is time in your week that belongs to you -- protected hours when the only job is to do focused work. We call these focus zones. You decide what they are. You tell the app what you want to work on. It handles the boring planning: which task goes where, how to spread hours across days, what to do when a deadline is at risk. You handle the part that matters, which is showing up.

> Everything in the product flows from this posture. The auto-fill places tasks intelligently and gets out of the way. When you drag something, the rest of the calendar reflows in a quiet cascade -- not because animation is a feature, but because abrupt jumps are a small disrespect to your attention. Goals fill like water as you complete sessions. Widgets sit in a dock and do their work. The cloud syncs without asking you to think about it.

> Smart Calendar is for people who want to do focused work and are willing to protect the time it requires. If that sounds like you, the download is below.

This is the voice. Use it everywhere.

---

## Section 5: Information Architecture

```
/                       -- Home (single long-scroll page, hero through final CTA)
/download               -- OS-detected download page with platform-specific instructions
/changelog              -- Markdown-driven changelog, auto-updates from /content/changelog.md
/privacy                -- Privacy policy
/terms                  -- Terms of service
/(optional later) /blog -- Editorial home for future writing
```

**No** /features page (the home page handles this).
**No** /pricing page (pricing lives on the home page -- visitors should not have to click to see what they pay).
**No** /about page in v1 (the story section on the home page handles this).
**No** sign-up flow (downloads are free; account creation happens in the app on first launch).

---
## Section 6: Home Page Anatomy (Section by Section)

### 6.1 Sticky Minimal Header

- **Left**: Smart Calendar wordmark (logo + name in Inter SemiBold, slightly tighter tracking)
- **Right**: A single "Download" button (ghost outline style, links to `#download` or `/download`)
- **No nav menu.** No "Features / Pricing / Login" -- none of it.
- **Behavior**: solid background appears only after 80px of scroll (use Framer Motion `useScroll`). Above 80px the header floats transparently over the hero.
- **Height**: 64px desktop, 56px mobile.

### 6.2 Hero Section

**Background**: Deep indigo (#13132B) with an ambient animated gradient at very low opacity (5-8% blue tint) that drifts slowly. Use CSS animated gradient or a Canvas implementation matching the app's goal-water ticker philosophy -- never more than 1% CPU.

**Headline** (huge, tight tracking, Inter or Geist):

> A calmer way to plan your week.

**Subheadline** (60% white, max 60 chars per line):

> Smart Calendar is a weekly calendar for focused work. It schedules your tasks, protects your time, and gets out of your way.

**Primary CTA**: `Download` (filled button, blue accent, anchors to `#download` section or links to `/download`)

**Secondary CTA**: `See how it works` (ghost, scroll-anchors to the first feature section)

**Platform availability strip** (below CTAs, very small caps, 50% opacity):

> Available for macOS, Windows, Linux, iOS, Android, Web

**No** "Trusted by Apple" logo wall. **No** rating stars. **No** "X downloads" counter unless it's real and over 5,000. Trust comes from the design, not borrowed credibility.

### 6.3 The Hero Animation

This is non-negotiable: **the visual must be the real app, animated**.

Implementation:
- Render a real Smart Calendar grid as a static React component styled to match the app exactly (deep indigo, category accents, calendar blocks, Inter typography).
- Above the grid, choreograph a loop using Framer Motion `layout` animation and the same `SPRING_REFLOW` values from the app's `lib/motionPresets.ts` (stiffness 300, damping 28, mass 0.8).
- The loop: three tasks float in from the sidebar, drop into a focus zone, then the auto-fill cascade ripples through -- exactly as the app does it.
- Loop duration: ~6 seconds with a 1.5s pause at the resolved state before resetting.
- The cascade must use the same staggered ~50ms delay between blocks as the app.

**Optional but encouraged**: a thin live cursor (Raycast-style) that traces the drop path during the animation, giving the impression of a real user planning their week.

Pause animation when the user has `prefers-reduced-motion: reduce`. Show the resolved state as a static image instead.

### 6.4 Story Section

Quiet editorial layout. Large typography. Black background. No images.

Use the narrative from Section 4, broken into the four paragraphs. Each paragraph appears at most 70 characters wide (about 12 words per line for serious readability). Generous vertical rhythm -- 32px between paragraphs.

Headline above the story: **A different posture toward time.**

Animate paragraphs in on scroll with a soft staggered fade and 8px upward translate. Use `whileInView` with a spring transition (stiffness 100, damping 25).

### 6.5 Feature Showcases

Six feature sections, each its own viewport-sized panel. Each follows the same structure:

```
+-----------------------------------------+
|  small label (category color, uppercase)|
|                                         |
|  Big headline (tight tracking)          |
|                                         |
|  Short subheadline (max 2 lines)        |
|                                         |
|  +-----------------------------------+  |
|  |                                   |  |
|  |   Live product visualization      |  |
|  |   (animated on scroll into view)  |  |
|  |                                   |  |
|  +-----------------------------------+  |
+-----------------------------------------+
```

#### Feature 1: Focus Zones

- **Label**: `Focus`
- **Headline**: Protected time for the work that matters.
- **Sub**: Mark hours on your calendar as focus zones. Put tasks in. The app handles the rest -- scheduling, spreading, protecting boundaries.
- **Visualization**: Animate the act of creating a focus zone (a 3-hour block appears on the grid), then 4 tasks dropping in and arranging themselves automatically.

#### Feature 2: The Auto-Fill Cascade

- **Label**: `Cascade`
- **Headline**: A ripple, not a jump.
- **Sub**: When you move a task, every other task makes room with a gentle spring. Nothing jumps. Nothing disappears. The week reshapes itself the way you would, if you had the patience.
- **Visualization**: The showpiece. A task gets dragged onto an occupied slot; the displaced blocks ripple across the day with staggered SPRING_REFLOW timing. Loop with a 2s rest.

#### Feature 3: Goals That Track Themselves

- **Label**: `Goals`
- **Headline**: Progress, made visible.
- **Sub**: Set a weekly target -- read 5 hours, gym 4 times. As you complete sessions, the goal card fills like water. Quiet, ambient, never demanding.
- **Visualization**: Recreate the goal water canvas. A sine-wave liquid surface rises as a counter ticks up (3 of 5 hours complete). Champagne bubbles rise and pop. Use Canvas + GSAP ticker exactly as the app does.

#### Feature 4: Widgets That Belong

- **Label**: `Widgets`
- **Headline**: Information without intrusion.
- **Sub**: Weather, email, a timer, your social feed -- docked at the edge, expandable when wanted, invisible when not. The web's noise, tamed to a single column.
- **Visualization**: Show the floating widget dock with the four widgets (Weather, Timer, Gmail, Instagram) in their collapsed states. Hover over each one in sequence to show its expanded card.

#### Feature 5: Sync That Just Works

- **Label**: `Sync`
- **Headline**: Your calendar, everywhere.
- **Sub**: Two-way sync with Google Calendar and Outlook. Subscribe via .ics in Apple Calendar. A single sync indicator tells you everything is up to date -- or what is not.
- **Visualization**: The sync button transitioning through its states (idle to syncing rotation to checkmark). Then show the same event appearing in mockups of Google Calendar and Outlook side by side.

#### Feature 6: Built For Every Surface

- **Label**: `Everywhere`
- **Headline**: One calendar. Every device.
- **Sub**: Web app installable as PWA. Native iOS and Android. Desktop apps for macOS, Windows, and Linux. Your week follows you, identically.
- **Visualization**: A trio of device frames -- laptop, phone, tablet -- showing the same calendar rendered. The cascade animation plays in all three, synced.

### 6.6 The "Honest About What It Is Not" Section

This is the emotionally intelligent move. After six feature sections, the reader is wondering if it's the right tool. Tell them honestly when it is not.

**Headline**: A few things this is not.

Three short cards:

> **Not a project management tool.**
> No tickets, no boards, no Gantt charts. If you need Jira, you need Jira.

> **Not a team collaboration suite.**
> Smart Calendar is for one person planning one week. No shared workspaces, no @-mentions, no permissions matrix.

> **Not a CRM, journal, or note-taking app.**
> We do one thing -- protect your time and schedule your focused work. Notion, Obsidian, and the rest are excellent at the rest.

This builds more trust in one section than ten testimonials.

### 6.7 From the Maker

Replace fake social proof with a single quiet section. A small portrait if you want, two paragraphs of personal motivation, signed.

**Suggested copy (paraphrase as needed)**:

> I built Smart Calendar because every calendar I tried treated my time as boxes to fill. None of them respected the actual work -- the act of sitting down, getting into something hard, and finishing it.

> This is the calendar I wanted. If it ends up being the one you wanted too, I'm grateful.

> -- [Your name]

### 6.8 Pricing

Simple. Three tiers. Annual emphasized. No dark patterns.

| Free | Pro | Lifetime |
|------|-----|----------|
| Full app | Everything in Free | Everything in Pro |
| Single device | Multi-device sync | Forever, no renewal |
| Local data | Push sync to Google + Outlook | Future updates included |
| Up to 2 widgets | All widgets including connected ones | |
| $0 | $4/month or $36/year | $99 one-time |
| `Download` | `Get Pro` | `Buy lifetime` |

Below the table, one line:

> Pro is a 7-day free trial. No card required. No auto-charge. You decide at the end.

This sentence alone outperforms most pricing pages.

### 6.9 FAQ

10 questions, all honest. Use shadcn/ui Accordion component.

1. **Is my data private?** Yes. Calendar data is encrypted at rest and in transit. The only third parties who see your events are the ones you connect (Google, Outlook). We do not sell, share, or analyze your data. Read the privacy policy for specifics.

2. **Does it work offline?** Yes. The app is offline-first. Make changes anywhere -- they sync when you reconnect.

3. **What happens to my events if I cancel Pro?** Nothing. Your data is yours. The app keeps working with a single device. Cloud sync pauses until you reactivate.

4. **Can I import from Google Calendar?** Yes. Connect Google, pick a calendar, and your existing events appear. Push sync keeps both sides in lockstep.

5. **What about Apple Calendar?** Apple users can subscribe to a live .ics feed that Apple Calendar refreshes as often as every 5 minutes. We are watching Apple's API roadmap for direct sync.

6. **Why does it cost money?** Because we charge users instead of selling them. Servers, push sync infrastructure, and ongoing development have to be paid for somehow. A paid model is the most honest way to do that.

7. **Is there a discount for students?** Yes. Email a `.edu` (or equivalent) address to [contact] and we'll send a 50% code.

8. **What if I find a bug?** Email [contact] or open an issue on the public roadmap. Fixes ship weekly.

9. **Can I use it for teams?** Not yet. Smart Calendar is built for one person's week. Team features are not on the near roadmap.

10. **What if I don't like it?** Use it free. Cancel Pro before the trial ends. There is no friction either way.

### 6.10 Final CTA

```
+-----------------------------------+
|                                   |
|       Ready when you are.         |
|                                   |
|        [ Download Smart Calendar ]|
|                                   |
|   macOS, Windows, Linux, iOS,     |
|   Android, Web                    |
|                                   |
+-----------------------------------+
```

One line. One button. The same platform strip. Nothing else.

### 6.11 Footer

Minimal. Three columns, mostly empty space.

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Smart Calendar | Download | hello@smartcalendar.app |
| The quiet calendar. | Changelog | Twitter |
| | Privacy | (optional) GitHub |
| | Terms | |

Bottom line: copyright 2026 Smart Calendar. Made with care.

No newsletter signup. No social CTAs. No "follow us" plea.

---
## Section 7: Download Page

URL: `/download`

OS detection happens server-side via Vercel Edge (read the `User-Agent` header). The detected platform is hero-positioned with a large primary button. Other platforms appear below as secondary cards.

```
+----------------------------------------------+
|                                              |
|  Detected: macOS                             |
|                                              |
|  +----------------------------------------+  |
|  |  Smart Calendar for Mac                |  |
|  |  Apple Silicon and Intel               |  |
|  |                                        |  |
|  |  [ Download for macOS ]   ~38 MB       |  |
|  |                                        |  |
|  |  Requires macOS 13 or later            |  |
|  +----------------------------------------+  |
|                                              |
|  Install in three steps:                     |
|  1. Open the .dmg file.                      |
|  2. Drag Smart Calendar to Applications.     |
|  3. Open it and sign in.                     |
|                                              |
|  ---------- Other platforms ----------       |
|                                              |
|  [ Windows ] [ Linux (.deb / .AppImage) ]    |
|  [ iOS App Store ] [ Google Play ]           |
|  [ Web App (no install) ]                    |
|                                              |
+----------------------------------------------+
```

For users who want to verify a download, show SHA-256 checksums below each desktop binary in a collapsible details element labeled "Verify the download."

---

## Section 8: Animation Specifications

| Surface | Animation | Library | Reduced Motion |
|---------|-----------|---------|----------------|
| Page scroll | Lenis smooth scroll, lerp 0.1 | Lenis | Disabled (native scroll) |
| Header reveal | Spring slide-down at 80px scroll | Framer Motion | Instant |
| Hero ambient bg | Slow gradient drift, 30s loop | CSS animation | Static gradient |
| Hero product loop | Cascade replay every 6s | Framer Motion layout | Static end-state image |
| Section reveals | Stagger fade + 8px translate on whileInView | Framer Motion | Instant |
| Feature visualizations | ScrollTrigger pin and play | GSAP | Show static end-state |
| Goal water canvas | GSAP ticker, sine surface, bubbles | GSAP + Canvas | Single still frame |
| Button hover | Scale 1.02 with spring | Framer Motion (whileHover) | None |
| Button press | Scale 0.98 with spring | Framer Motion (whileTap) | None |
| Pricing card hover | Border glow, slight lift | CSS transition | None |
| FAQ open | Height + opacity spring | Framer Motion AnimatePresence | Instant |

**Critical**: every animation respects `prefers-reduced-motion: reduce`. Do not make this a polish task -- implement it as you build each section.

**Performance**: animations must run at 60fps on mid-range devices. Use `transform` and `opacity` only. Avoid animating `width`, `height`, `top`, `left`. Use `will-change: transform` sparingly during active animation.

---
## Section 9: Typography

| Use | Font | Size | Weight | Tracking | Line Height |
|-----|------|------|--------|----------|-------------|
| Hero display | Inter | 96px desktop / 56px mobile | 600 | -0.04em | 1.0 |
| Section headlines | Inter | 64px / 40px | 600 | -0.03em | 1.05 |
| Feature headlines | Inter | 48px / 32px | 600 | -0.025em | 1.1 |
| Subheadlines | Inter | 22px / 18px | 400 | -0.01em | 1.4 |
| Body | Inter | 17px / 16px | 400 | normal | 1.6 |
| Small caps labels | Inter | 13px | 600 | 0.12em uppercase | 1.0 |
| Pricing numbers | Inter | 56px | 600 | -0.03em | 1.0 |
| Mono (codes, shortcuts) | JetBrains Mono | 14px | 500 | normal | 1.5 |

Type scale ratio: 1.25 (major third). Maximum line length: 70 characters for prose, 60 for emphasized statements. Use `text-wrap: balance` on headlines, `text-wrap: pretty` on body.

---

## Section 10: Color Palette

```
/* Tokens -- define in tailwind.config + app/globals.css */

--background:           #13132B   /* matches the app exactly */
--background-elevated:  #1A1A38   /* cards, feature panels */
--background-overlay:   #0E0E22   /* footer, contrasting bands */

--text-primary:         rgba(255, 255, 255, 0.95)
--text-secondary:       rgba(255, 255, 255, 0.60)
--text-tertiary:        rgba(255, 255, 255, 0.40)

--border:               rgba(255, 255, 255, 0.08)
--border-strong:        rgba(255, 255, 255, 0.16)

/* Accents (from the app's category palette) */
--accent-blue:          #4A8FFF   /* dominant accent -- buttons, links, hero glow */
--accent-emerald:       #34D399   /* used inside Goals feature only */
--accent-coral:         #FB7185   /* used inside Cascade feature only */
--accent-violet:        #A78BFA   /* used inside Widgets feature only */
--accent-amber:         #FBBF24   /* used inside warnings, never as primary */
```

**Rule**: outside of feature visualizations, only `--accent-blue` appears. The other accents live inside the product mockups -- they are part of the app's visual identity, not the marketing site's chrome.

---
## Section 11: Performance Requirements

| Metric | Target | Why |
|--------|--------|-----|
| LCP (Largest Contentful Paint) | < 1.5s | First impression. Slow sites feel cheap regardless of design. |
| CLS (Cumulative Layout Shift) | < 0.05 | Any shift breaks the calm feel. |
| INP (Interaction to Next Paint) | < 200ms | Buttons must feel responsive. |
| TTI (Time to Interactive) | < 2s on 4G | Visitors won't wait. |
| Initial JS bundle | < 150KB gzipped | Stay lean. Lazy-load GSAP and Lenis. |
| Hero animation FPS | 60 sustained | Drop below 55 = bug. |
| Lighthouse score | 95+ all categories | Required for launch. |

Implementation discipline:
- All images via `next/image` with explicit width/height
- Video: `<video autoplay muted playsInline loop>` with a poster image fallback
- Fonts via `next/font` with `display: swap`
- Defer Lenis and GSAP until after first paint (`use client` + dynamic import with `ssr: false` for hero animation only)
- No third-party analytics on initial load (load PostHog or Plausible after `requestIdleCallback`)

---

## Section 12: SEO and Metadata

```typescript
// app/layout.tsx metadata
export const metadata: Metadata = {
  title: "Smart Calendar -- A calmer way to plan your week",
  description: "A weekly calendar for focused work. Schedules your tasks, protects your time, and gets out of your way. macOS, Windows, Linux, iOS, Android, Web.",
  openGraph: {
    title: "Smart Calendar",
    description: "A calmer way to plan your week.",
    images: ["/og-image.png"],  // 1200x630, calendar with cascade paused mid-motion
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Calendar",
    description: "A calmer way to plan your week.",
    images: ["/og-image.png"],
  },
};

// JSON-LD structured data
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Smart Calendar",
  "operatingSystem": "macOS, Windows, Linux, iOS, Android, Web",
  "applicationCategory": "ProductivityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

Sitemap.xml and robots.txt at the root. Submit to Google Search Console at launch.

---
## Section 13: Implementation Phases

```
Phase 1: Foundation (Week 1)
  +-- Next.js 15 + TypeScript + Tailwind 4 + shadcn/ui setup
  +-- Custom design tokens (matching the app)
  +-- Inter + JetBrains Mono via next/font
  +-- Layout, header, footer
  +-- Lenis smooth scroll wrapper

Phase 2: Hero + Story (Week 1-2)
  +-- Hero section with ambient background
  +-- Hero animation (real calendar grid + cascade loop)
  +-- Story section with quiet editorial layout
  +-- Reduced motion paths

Phase 3: Feature Sections (Week 2-3)
  +-- All six feature panels
  +-- ScrollTrigger orchestration for each
  +-- Goal water canvas recreation
  +-- Widget dock visualization
  +-- Sync button state sequence
  +-- Multi-device frame composition

Phase 4: Trust, Pricing, FAQ, CTA (Week 3-4)
  +-- "Not for everyone" section
  +-- "From the maker" section
  +-- Pricing table
  +-- FAQ accordion
  +-- Final CTA
  +-- Footer

Phase 5: Download Page + Polish (Week 4)
  +-- Edge OS detection
  +-- Platform-specific download cards
  +-- Install instructions
  +-- Optional checksums
  +-- Changelog page from markdown
  +-- Privacy + Terms pages
  +-- SEO, OG image, structured data
  +-- Performance audit
  +-- Reduced motion sweep
```

---

## Section 14: Testing Checklist

### Design
- [ ] Matches the app's animation cadence (SPRING_REFLOW timing visibly the same)
- [ ] Deep indigo dominates; only blue accent outside feature panels
- [ ] No stock photos, no abstract 3D, no gradient mesh blobs
- [ ] Whitespace feels generous -- pages breathe

### Copy
- [ ] Headline reads as quiet confidence, not enthusiasm
- [ ] No banned words present (revolutionary, game-changing, world-class, etc.)
- [ ] "Not for everyone" section is present and honest
- [ ] All FAQ answers are factual; nothing oversold
- [ ] Pricing is transparent with no dark patterns

### Animation
- [ ] Hero loop matches app cascade (real timings, real spring values)
- [ ] All section reveals respect prefers-reduced-motion
- [ ] Goal water canvas runs at 60fps
- [ ] No layout shift during any animation
- [ ] Lenis smooth scroll feels right (lerp 0.1 settles correctly)

### Performance
- [ ] Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO
- [ ] LCP under 1.5s
- [ ] CLS under 0.05
- [ ] First JS bundle under 150KB gzipped
- [ ] No CLS from font loading (next/font handles this)

### Download Flow
- [ ] OS detection works on macOS, Windows, Linux, iOS, Android
- [ ] All download links resolve to real binaries
- [ ] Install instructions are accurate per platform
- [ ] Checksums (if shown) match the actual files

### Cross-Browser
- [ ] Safari (macOS + iOS) -- animations, blur effects, fonts
- [ ] Chrome / Edge / Firefox -- full parity
- [ ] Mobile Safari -- touch interactions, reduced motion
- [ ] Reduced motion preference fully respected on all browsers

### SEO
- [ ] Meta title, description, OG image render correctly
- [ ] Structured data validates (Google Rich Results test)
- [ ] Sitemap.xml accessible at root
- [ ] robots.txt allows crawling

---

## Reminders for the Agent

1. **The website is the first taste of the product.** If it doesn't feel like the app, the website fails.
2. **Real product visuals, not abstractions.** The calendar grid that appears on this site IS the calendar grid from the app.
3. **One CTA per section, no nav menu.** Conversion research is conclusive.
4. **Honest scope statements > inflated claims.** The "not for everyone" section is the most important trust signal on the page.
5. **Animation cadence must match the app.** Same spring values. Same stagger timings. The website is a continuation, not a separate brand.
6. **Performance is a design feature.** A slow site contradicts the entire "calm and considered" message.
7. **No dark patterns.** No email gates, no urgency timers, no exit-intent modals, no auto-charging trials.
8. **Reduced motion is not optional.** Build it as you go.
9. **The tone is consultant, not salesperson.** Diagnose, then offer. Specific behaviors over promises.
10. **When in doubt, take something out.** Stripe, Linear, and Vercel feel inevitable because every element either earns its place or gets removed.

---

## How to Hand This to Cursor

Save this entire document as `MARKETING_WEBSITE_PROMPT.md` in the marketing repo. When you start the conversation in Cursor:

> "Attached: `MARKETING_WEBSITE_PROMPT.md`. This is a new Next.js 15 marketing site for Smart Calendar, separate from the main app. Read the entire prompt. Then output: (1) your interpretation of the design philosophy, (2) the list of reference sites you'll study, (3) your phased implementation plan with file structure, (4) any clarifying questions before beginning. Do not write code until I confirm the plan."
