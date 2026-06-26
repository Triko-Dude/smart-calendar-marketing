import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectPlatformFromUserAgent } from '@/lib/osDetect';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const ua = request.headers.get('user-agent') ?? '';
  const platform = detectPlatformFromUserAgent(ua);
  response.headers.set('x-detected-platform', platform);
  return response;
}

export const config = {
  matcher: ['/download'],
};
