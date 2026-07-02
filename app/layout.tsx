import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import {
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_SUBTAGLINE,
  PRODUCT_TAGLINE,
  SITE_URL_DEFAULT,
} from '@/lib/brand';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_DEFAULT;

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`,
  description: PRODUCT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: '/brand/logo.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/logo.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: PRODUCT_NAME,
    description: PRODUCT_SUBTAGLINE,
    images: ['/og-image.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PRODUCT_NAME,
    description: PRODUCT_SUBTAGLINE,
    images: ['/og-image.svg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: PRODUCT_NAME,
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
