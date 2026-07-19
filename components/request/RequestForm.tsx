'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL } from '@/lib/brand';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'missing_key';

const REQUEST_TYPES = [
  { value: '', label: 'Choose one, if you want' },
  { value: 'feature_request', label: 'Feature request' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'bug', label: 'Bug report' },
  { value: 'early_access', label: 'Early access / beta' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Something else' },
] as const;

const inputClass =
  'mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/30';

export function RequestForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setStatus('missing_key');
      return;
    }

    setStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', accessKey);
    formData.append('subject', 'New Chronocal request');
    formData.append('from_name', 'Chronocal website');
    formData.append('to', CONTACT_EMAIL);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      if (!response.ok || payload?.success === false) {
        setStatus('error');
        return;
      }
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-[var(--accent-blue)]/30 bg-[var(--background-elevated)] p-8 text-center">
        <p className="text-lg font-semibold text-[var(--foreground)]">
          Thanks — you&apos;re heard.
        </p>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Your note landed with the Chronocal team. We read every message and will
          get back to you at the email you shared.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          type="button"
          onClick={() => setStatus('idle')}
        >
          Send another note
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="request-email" className="text-sm font-medium text-[var(--foreground)]">
          Email
        </label>
        <input
          id="request-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="request-type" className="text-sm font-medium text-[var(--foreground)]">
          What kind of note is this?
        </label>
        <select id="request-type" name="type" defaultValue="" className={inputClass}>
          {REQUEST_TYPES.map((option) => (
            <option key={option.value || 'none'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="request-message" className="text-sm font-medium text-[var(--foreground)]">
          Message
        </label>
        <textarea
          id="request-message"
          name="message"
          required
          rows={6}
          placeholder="Tell us what would make planning feel lighter for you."
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </div>

      {/* Honeypot — leave unchecked; bots fill it */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </Button>

      {status === 'error' && (
        <p className="text-sm text-[var(--cat-coral,#ef6a5a)]" role="alert">
          Something went wrong. Please try again, or email{' '}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      {status === 'missing_key' && (
        <p className="text-sm text-[var(--cat-coral,#ef6a5a)]" role="alert">
          Requests aren&apos;t connected yet. Email{' '}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{' '}
          directly for now.
        </p>
      )}
    </form>
  );
}
