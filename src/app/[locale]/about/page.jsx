import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function AboutPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage' });

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <div className="relative py-24 sm:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight py-2">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Values Grid */}
            <div className="container mx-auto px-4 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Privacy */}
                    <div className="bg-card/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-card/80 transition-all group">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('values.privacy.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {t('values.privacy.desc')}
                        </p>
                    </div>

                    {/* Speed */}
                    <div className="bg-card/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-card/80 transition-all group">
                        <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('values.speed.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {t('values.speed.desc')}
                        </p>
                    </div>

                    {/* Simplicity */}
                    <div className="bg-card/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-card/80 transition-all group">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{t('values.simplicity.title')}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {t('values.simplicity.desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="container mx-auto px-4 pb-32">
                <div className="bg-muted/20 border border-white/5 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold text-white">{t('story.title')}</h2>
                        <div className="space-y-4 text-muted-foreground leading-loose">
                            <p>{t('story.text')}</p>
                            <p>{t('story.text2')}</p>
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center">
                        <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-brand-primary to-emerald-600 rounded-[2rem] p-1 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            <div className="absolute inset-0 bg-white/10 rounded-[2rem] blur-xl" />
                            <div className="relative h-full w-full bg-black/90 rounded-[1.9rem] flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                <div className="text-center p-8">
                                    <div className='flex justify-center items-center'>
                                        <Image src="/logo.png" alt="Stampr Logo" width={160} height={160}  />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 playwrite-nz">Stampr</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-4 pb-24 text-center">
                <p className="text-muted-foreground mb-8">{t('team.title')}</p>
                <Link
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-brand-primary font-bold text-lg hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1 transition-all"
                >
                    {t('team.cta')}
                </Link>
            </div>
        </div>
    );
}
