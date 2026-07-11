import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqCopy } from '@/lib/marketingCopy';

export function FaqSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          {faqCopy.title}
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqCopy.items.map((item, i) => (
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
