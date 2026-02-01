'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    const t = useTranslations('UX');

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>

            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t('errorTitle')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                {t('errorDesc')}
            </p>

            <button
                onClick={reset}
                className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all hover:-translate-y-0.5 shadow-lg shadow-white/10"
            >
                {t('tryAgain')}
            </button>
        </div>
    );
}
