import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

function loadMarkdown(filename: string) {
  const filePath = path.join(process.cwd(), 'content', filename);
  return fs.readFileSync(filePath, 'utf-8');
}

export default function ChangelogPage() {
  const content = loadMarkdown('changelog.md');

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-20">
        <article className="markdown-body mx-auto max-w-2xl px-6">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
