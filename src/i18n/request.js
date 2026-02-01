import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
    // In next-intl v4+, the param is requestLocale (a promise)
    let locale = await requestLocale;

    // If the locale is undefined or invalid, use the default locale
    if (!locale || !locales.includes(locale)) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
