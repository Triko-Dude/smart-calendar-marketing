import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartcalendar.app';

export const metadata: Metadata = {
  title: 'Smart Calendar — A calmer way to plan your week',
  description:
    'A weekly calendar for focused work. Schedules your tasks, protects your time, and gets out of your way. Windows and web available today.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Smart Calendar',
    description: 'A calmer way to plan your week.',
    images: ['/og-image.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Calendar',
    description: 'A calmer way to plan your week.',
    images: ['/og-image.svg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Smart Calendar',
  operatingSystem: 'Windows, Web',
  applicationCategory: 'ProductivityApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
