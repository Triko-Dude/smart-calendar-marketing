export function MakerSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--background-overlay)] py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
          From the maker
        </h2>
        <blockquote className="mt-8 space-y-6 text-pretty text-lg leading-relaxed text-[var(--text-secondary)]">
          <p>
            I built Smart Calendar because every calendar I tried treated my time as boxes to fill.
            None of them respected the actual work — the act of sitting down, getting into something
            hard, and finishing it.
          </p>
          <p>
            This is the calendar I wanted. If it ends up being the one you wanted too, I&apos;m
            grateful.
          </p>
        </blockquote>
        <p className="mt-8 text-sm text-[var(--text-tertiary)]">— The maker</p>
      </div>
    </section>
  );
}
