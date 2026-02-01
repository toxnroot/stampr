'use client';
import { useTranslations } from 'next-intl';
import { use } from 'react';

export default function ContactPage({ params }) {
    const { locale } = use(params);
    const t = useTranslations('ContactPage');

    const socialLinks = [
        {
            name: 'WhatsApp',
            href: 'https://wa.me/201008711638',
            hoverColor: 'hover:text-emerald-500',
            bgHover: 'hover:bg-emerald-500/10',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            )
        },
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/mohammed.alshliany',
            hoverColor: 'hover:text-blue-600',
            bgHover: 'hover:bg-blue-600/10',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            )
        },
        {
            name: 'X',
            href: 'https://x.com/Toxn655',
            hoverColor: 'hover:text-white',
            bgHover: 'hover:bg-zinc-800',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            )
        },
        {
            name: 'Email',
            href: 'mailto:mohammed.job.dev@gmail.com',
            hoverColor: 'hover:text-red-500',
            bgHover: 'hover:bg-red-500/10',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none" />

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                <h1 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-tight py-2">
                    {t('title')}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {t('subtitle')}
                </p>
            </div>

            <div className="container mx-auto max-w-4xl relative z-10">

                {/* Contact Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <a href="mailto:mohammed.job.dev@gmail.com" className="bg-card/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-card/60 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                            <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-1">{t('info.email')}</h3>
                        <p className="text-sm text-muted-foreground break-all">mohammed.job.dev@gmail.com</p>
                    </a>

                    <a href="tel:+201008711638" dir="ltr" className="bg-card/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-card/60 transition-all hover:-translate-y-1 group">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                            <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-1">{t('info.phone')}</h3>
                        <p className="text-sm text-muted-foreground">+20100 8711 638</p>
                    </a>

                    <div className="bg-card/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-card/60 transition-all hover:-translate-y-1 group cursor-default">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold mb-1">{t('info.location')}</h3>
                        <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
                    </div>
                </div>

                {/* Social Media Grid */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-8">{t('social.title')}</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-20 h-20 rounded-3xl bg-card/40 backdrop-blur-md border border-white/5 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 hover:-rotate-3 transition-all duration-300 group ${link.bgHover} text-muted-foreground ${link.hoverColor}`}
                                aria-label={link.name}
                            >
                                <div className="group-hover:scale-110 transition-transform duration-300">
                                    {link.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                    <p className="mt-8 text-muted-foreground text-sm">{t('social.subtitle')}</p>
                </div>

            </div>
        </div>
    );
}
