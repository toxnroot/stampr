import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
    const t = useTranslations('PrivacyPage');

    return (
        <div className="min-h-screen bg-background text-foreground py-16 sm:py-24">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-3xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent p-2">
                    {t('title')}
                </h1>
                <p className="text-zinc-500 mb-12">{t('lastUpdated')}</p>

                <div className="space-y-12">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <section key={i} className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-primary">
                                {t(`content.${i}.title`)}
                            </h2>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {t(`content.${i}.text`)}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
