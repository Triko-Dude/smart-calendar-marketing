/** Long-form homepage copy — single source of truth for marketing sections. */

import { CONTACT_EMAIL } from '@/lib/brand';

export const storyCopy = {
  eyebrow: 'The Manifesto',
  headline: 'A different posture toward time.',
  paragraphs: [
    'Traditional calendars were built for meetings. They treat your week as a grid of empty boxes, applauding you when the grid is full. They confuse a scheduled hour with a completed one. They optimize for the appearance of productivity, not the craft of the work itself.',
    'Chronocal is built on a different premise: There is time in your week that belongs strictly to you. We call these Focus Zones: protected hours where your only job is the work in front of you. You define your intentions in color-coded streams. Chronocal handles the logistics by placing tasks intelligently, spreading hours across days, and adapting when a deadline shifts.',
    'Everything in the product flows from this posture. When you drag a task, the calendar reflows in a quiet, fluid cascade. Goals fill like rising water. Your data stays on your device by default.',
    'You handle the part that matters: showing up.',
  ],
} as const;

export const featureCopy = {
  tasks: {
    headline: 'Sorted by Intention.',
    subheadline:
      'Organize your workflow into color-coded tabs along the edge. Hover to reveal the category. Drag a task onto your week, and watch the calendar intelligently absorb it.',
  },
  focus: {
    headline: 'Fiercely Protected Focus.',
    subheadline:
      'Carve out hours exclusively for the work that matters. Mark your focus zones, drop your tasks in, and Chronocal handles the rest: scheduling, spreading, and protecting your boundaries.',
  },
  cascade: {
    headline: 'A Ripple, Not a Jump.',
    subheadline:
      'When plans change, Chronocal adapts seamlessly. Move a task, and the rest of your week parts like water with a gentle, physics-driven spring. No jarring jumps. Just a calendar that fluidly reshapes itself to match your reality.',
  },
  goals: {
    headline: 'Ambient Momentum.',
    subheadline:
      'Progress, made beautifully visible. Set a weekly target: read for 5 hours, hit the gym 4 times. As you log sessions, your goal card fills like water. Quiet, satisfying, and never demanding.',
  },
  widgets: {
    headline: 'Signal, No Noise.',
    subheadline:
      "Essential tools without the intrusion. An offline timer, weather, and mail sit docked quietly at the edge. Expandable when you need them, entirely invisible when you don't.",
  },
  sync: {
    headline: 'Absolute Data Sovereignty.',
    subheadline:
      'Your planner lives on your device. Import your Google Calendar or export via .ics to Apple and Outlook. Account sync is an option when you want it, not a requirement before you start.',
  },
  everywhere: {
    headline: 'Your week, everywhere.',
    subheadline:
      'Windows desktop today. macOS, Linux, web, and mobile in active development. Your rhythm follows you.',
  },
} as const;

export const honestCopy = {
  eyebrow: 'Designed with Discipline',
  headline: 'A few things this is not.',
  cards: [
    {
      title: 'Not a project management tool.',
      body: 'No tickets, no boards, no Gantt charts. If you need Jira, you need Jira.',
    },
    {
      title: 'Not a team collaboration suite.',
      body: 'Chronocal is for one person mastering one week. No shared workspaces, no @-mentions, no permissions matrix.',
    },
    {
      title: 'Not an all-in-one workspace.',
      body: 'We do one thing perfectly: protect your time and schedule your deep work. Notion and Obsidian are excellent at the rest.',
    },
  ],
} as const;

export const makerCopy = {
  eyebrow: 'From the Maker',
  paragraphs: [
    'I built Chronocal because every calendar I tried treated my time as inventory to be claimed. None of them respected the actual work: the act of sitting down, getting into something hard, and seeing it through.',
    "This is the calendar I always wanted. If it ends up being the one you wanted too, I'm grateful.",
  ],
} as const;

export const pricingCopy = {
  headline: 'Experience Chronocal.',
  price: '$0',
  priceSubline: 'during early access. No credit card. No countdown timers.',
  features: [
    'Full planner: tasks, focus zones, auto-fill, and goals',
    'Local-first architecture (no account required)',
    'Windows desktop installer with Google Calendar sync',
    'JSON backup and .ics export',
    'Offline-capable timer widget',
  ],
  ctaLabel: 'Download Chronocal',
  footerNote: "We'll announce pricing before anything changes.",
} as const;

export const faqCopy = {
  title: 'FAQ',
  items: [
    {
      q: 'Is my data private?',
      a: 'Yes. By default, your planner data lives on your device. We do not sell, share, or analyze your calendar. If you connect Google Calendar, only the events you authorize are imported. Read the privacy policy for specifics.',
    },
    {
      q: 'Windows says the installer is unrecognized. Is it safe?',
      a: 'Early-access installers are not code-signed yet, so SmartScreen may warn on first install. Click "More info" then "Run anyway" if you trust this download from chronocal.tech. Code signing is planned for a future release.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. The core planner is offline-first. Create tasks, schedule blocks, and use the timer widget without a network connection. Connected widgets and Google sync need the internet.',
    },
    {
      q: "What if I don't want cloud sync?",
      a: "You don't need it. The app works fully without an account. Your data stays in local storage on your device. Backup and restore via JSON is built in.",
    },
    {
      q: 'Can I sync with Google Calendar?',
      a: 'Yes. Connect Google Calendar in Settings to show existing events as overlays and sync scheduled Chronocal blocks to a dedicated Google calendar (two-way).',
    },
    {
      q: 'What about Apple Calendar?',
      a: 'Export a .ics file from Settings, or subscribe to a live feed. Apple Calendar refreshes on its own schedule. Direct two-way sync is not available yet.',
    },
    {
      q: 'Will it always be free?',
      a: 'It is free during early access. We will announce pricing before anything changes. No credit card required today.',
    },
    {
      q: 'What if I find a bug?',
      a: `Email ${CONTACT_EMAIL} or open an issue on the public roadmap. Fixes ship as we can.`,
    },
    {
      q: 'Can I use it for teams?',
      a: "Not yet. Chronocal is built for one person's week. Team features are not on the near roadmap.",
    },
    {
      q: "What if I don't like it?",
      a: 'Use it free. Uninstall anytime. Your data exports to JSON if you want to leave.',
    },
  ],
} as const;

export const finalCtaCopy = {
  headline: 'Ready when you are.',
  ctaLabel: 'Download Chronocal',
} as const;
