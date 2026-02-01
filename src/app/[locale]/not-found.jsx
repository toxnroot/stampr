'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const t = useTranslations('UX');
    // Simple way to get locale from pathname since params might not be available in root not-found
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
                <h1 className="text-9xl font-black text-brand-primary/20 select-none">404</h1>
            </div>

            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8 relative z-10">
                {t('notFoundDesc')}
            </p>

            <Link
                href={`/${locale}`}
                className="relative z-10 px-8 py-3 rounded-xl bg-brand-primary text-white font-medium hover:bg-brand-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brand-primary/20"
            >
                {t('returnHome')}
            </Link>
        </div>
    );
}
