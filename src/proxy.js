import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/i18n';

export default createMiddleware({
    locales,
    defaultLocale
});

export const config = {
    matcher: ['/', '/(ar|en)/:path*', '/((?!_next|api|.*\\..*).*)']
};
