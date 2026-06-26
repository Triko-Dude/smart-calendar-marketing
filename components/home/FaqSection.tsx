import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_ITEMS = [
  {
    q: 'Is my data private?',
    a: 'Yes. By default, your planner data lives on your device. We do not sell, share, or analyze your calendar. If you connect Google Calendar, only the events you authorize are imported. Read the privacy policy for specifics.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. The core planner is offline-first. Create tasks, schedule blocks, and use the timer widget without a network connection. Connected widgets and Google import need the internet.',
  },
  {
    q: 'What if I don\'t want cloud sync?',
    a: 'You don\'t need it. The app works fully without an account. Your data stays in local storage on your device. Backup and restore via JSON is built in.',
  },
  {
    q: 'Can I import from Google Calendar?',
    a: 'Yes, when you connect a Google account. Existing events appear as read-only overlays on your week. Writing back to Google is not supported yet — your scheduled tasks stay in Smart Calendar.',
  },
  {
    q: 'What about Apple Calendar?',
    a: 'Export a .ics file from Settings, or subscribe to a live feed. Apple Calendar refreshes on its own schedule. Direct two-way sync is not available yet.',
  },
  {
    q: 'Will it always be free?',
    a: 'It is free during beta. We will announce pricing before anything changes. No card required today.',
  },
  {
    q: 'What if I find a bug?',
    a: 'Email hello@smartcalendar.app or open an issue on the public roadmap. Fixes ship as we can.',
  },
  {
    q: 'Can I use it for teams?',
    a: 'Not yet. Smart Calendar is built for one person\'s week. Team features are not on the near roadmap.',
  },
  {
    q: 'What if I don\'t like it?',
    a: 'Use it free. Uninstall anytime. Your data exports to JSON if you want to leave.',
  },
];

export function FaqSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Questions
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
