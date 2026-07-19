import type { MetadataRoute } from 'next';
import { SITE_URL_DEFAULT } from '@/lib/brand';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_DEFAULT;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/download', '/request', '/changelog', '/privacy', '/terms'];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
