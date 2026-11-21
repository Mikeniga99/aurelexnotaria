import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api routes
  // - /admin routes (Espace gestion back-office)
  // - /_next (Next.js internals)
  // - /images, favicon, static files
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
