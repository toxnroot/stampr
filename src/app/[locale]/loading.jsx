'use client';
import { useTranslations } from 'next-intl';

export default function Loading() {
    // const t = useTranslations('UX'); // Optional: Add text if needed

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                    {/* Spinner Ring */}
                    <div className="absolute inset-0 border-4 border-muted rounded-xl"></div>
                    <div className="absolute inset-0 border-4 border-brand-primary rounded-xl border-t-transparent animate-spin"></div>

                    {/* Inner Logo Hint */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-brand-primary/20 rounded-md animate-pulse"></div>
                    </div>
                </div>
                {/* <p className="text-muted-foreground font-medium animate-pulse">{t('loadingText')}</p> */}
            </div>
        </div>
    );
}
