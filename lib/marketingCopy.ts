/** Long-form homepage copy — single source of truth for marketing sections. */

import { CONTACT_EMAIL } from '@/lib/brand';

export const storyCopy = {
  eyebrow: 'The Manifesto',
  headline: 'A different posture toward time.',
  paragraphs: [
    'Traditional calendars were built for meetings. They treat your week as a grid of empty boxes.',
    'Chronocal is built to make planning simpler and more efficient. Allowing you to feel like planning is enticing rather than monotonous. Everything should flow from this posture. When you drag a task, the calendar reflows in a quiet, fluid cascade. Goals fill like rising water. Your data stays on your device by default.',
    'The ultimate goal is creating a place where you remember everything your way, and are given every tool out there to make that possible.',
  ],
} as const;

export const featureCopy = {
  tasks: {
    headline: 'Sorted by Intention.',
    subheadline:
      'Organize your workflow into color-coded tabs along the edge. Hover to reveal the category. Drag a task onto your week, and watch the calendar intelligently absorb it.',
    comingSoon: false,
  },
  focus: {
    headline: 'Fiercely Protected Focus.',
    subheadline:
      'Carve out hours exclusively for the work that matters. Mark your focus zones, drop your tasks in, and Chronocal handles the rest: scheduling, spreading, and protecting your boundaries.',
    comingSoon: false,
  },
  cascade: {
    headline: 'A Ripple, Not a Jump.',
    subheadline:
      'When plans change, Chronocal adapts seamlessly. Move a task, and the rest of your week parts like water with a gentle, physics-driven spring. No jarring jumps. Just a calendar that fluidly reshapes itself to match your reality.',
    comingSoon: false,
  },
  goals: {
    headline: 'Ambient Momentum.',
    subheadline:
      'Progress, made beautifully visible. Set a weekly target: read for 5 hours, hit the gym 4 times. As you log sessions, your goal card fills like water. Quiet, satisfying, and never demanding.',
    comingSoon: false,
  },
  widgets: {
    headline: 'Signal, No Noise.',
    subheadline:
      "Essential tools without the intrusion. An offline timer, weather, and mail sit docked quietly at the edge. Expandable when you need them, entirely invisible when you don't.",
    comingSoon: false,
  },
  sync: {
    headline: 'Absolute Data Sovereignty.',
    subheadline:
      'Your planner lives on your device. Import your Google Calendar or export via .ics to Apple and Outlook. Account sync is an option when you want it, not a requirement before you start.',
    comingSoon: false,
  },
  everywhere: {
    headline: 'Your week, everywhere.',
    subheadline:
      'Windows desktop and web app today. macOS, Linux, and mobile are in active development. Apple users can plan in the browser now.',
    comingSoon: false,
  },
} as const;

export const honestCopy = {
  eyebrow: 'The Dreams',
  headline: 'What we are building toward.',
  cards: [
    {
      title: 'A fuller planning system.',
      body: 'We want Chronocal to grow into deeper project planning — without turning into ticket boards and Gantt charts. The dream is structure that still feels like your week, not another work OS.',
    },
    {
      title: 'Shared weeks, still personal.',
      body: 'One day, collaborating with the people in your life without losing the quiet focus of a personal calendar. Shared moments, not a permissions matrix.',
    },
    {
      title: 'Everything in one place.',
      body: 'Notes, tasks, goals, and the week — already coming together. The dream is a home for your whole planning life, so you need fewer apps to feel organized.',
    },
  ],
} as const;

export const makerCopy = {
  eyebrow: 'From the Maker',
  paragraphs: [
    'I built Chronocal because every calendar I tried was clunky and felt like a necessity rather than something I wanted to do. None of them respected the actual fun work of taking the bucket of items in your head, giving them a space, and genuinely feeling great when you complete them.',
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
      a: `Share it on the request page (chronocal.tech/request) or email ${CONTACT_EMAIL}. We read every note.`,
    },
    {
      q: 'Can I use it for teams?',
      a: 'Not yet — and that is one of our dreams. Chronocal is built for one person\'s week today. Shared planning is something we want to grow into carefully.',
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
  webCtaLabel: 'Open web app',
} as const;
