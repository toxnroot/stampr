import { getTranslations } from 'next-intl/server';
import ToolGrid from '@/app/components/Tools/ToolGrid';
import { ArrowRightLeft, Stamp, Scaling, Zap, ShieldCheck, Image } from 'lucide-react';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ToolsPage' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        keywords: t('keywords'),
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            keywords: t('keywords'),
        },
    };
}

export default async function Page({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ToolsPage' });

    const tools = [
        {
            id: 'image-resizer',
            slug: `/${locale}/tool/image-resizer`,
            title: t('tools.imageResizer.title'),
            description: t('tools.imageResizer.description'),
            icon: <Scaling className="text-amber-400" size={32} />,
            bg: 'bg-amber-400/10',
            border: 'border-amber-400/20'
        },
        {
            id: 'image-converter',
            slug: `/${locale}/tool/image-converter`,
            title: t('tools.imageConverter.title'),
            description: t('tools.imageConverter.description'),
            icon: <ArrowRightLeft className="text-blue-400" size={32} />,
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20'
        },
        {
            id: 'logo-stamping',
            slug: `/${locale}/tool/logo-stamping`,
            title: t('tools.logoStamping.title'),
            description: t('tools.logoStamping.description'),
            icon: <Stamp className="text-brand-primary" size={32} />,
            bg: 'bg-brand-primary/10',
            border: 'border-brand-primary/20'
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[128px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10" />

            <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:py-28 relative z-10">
                <div className="text-center mb-20 space-y-6">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent p-2 tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                <ToolGrid tools={tools} openToolText={t('openTool')} />

                {/* Trust Badges */}
                <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
                    <div className="group flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">100% Private</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">All processing happens locally on your device. Zero uploads.</p>
                    </div>

                    <div className="group flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">Built with cutting-edge web tech for instant, bulk results.</p>
                    </div>

                    <div className="group flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                            <Image size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">High Quality</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">Original quality maintained with smart WebP optimization.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
