import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Zap, Shield, Image as ImageIcon, ArrowRight, Scaling, ArrowRightLeft, Stamp } from 'lucide-react';

export default function Home() {
  const t = useTranslations('HomePage');
  const tp = useTranslations('ToolsPage');
  const locale = useLocale();

  const featuredTools = [
    {
      id: 'image-resizer',
      slug: `/${locale}/tool/image-resizer`,
      title: tp('tools.imageResizer.title'),
      icon: <Scaling className="text-amber-400" size={24} />,
      bg: 'bg-amber-400/10',
    },
    {
      id: 'image-converter',
      slug: `/${locale}/tool/image-converter`,
      title: tp('tools.imageConverter.title'),
      icon: <ArrowRightLeft className="text-blue-400" size={24} />,
      bg: 'bg-blue-400/10',
    },
    {
      id: 'logo-stamping',
      slug: `/${locale}/tool/logo-stamping`,
      title: tp('tools.logoStamping.title'),
      icon: <Stamp className="text-brand-primary" size={24} />,
      bg: 'bg-brand-primary/10',
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-32 relative z-10">

        {/* Hero Section */}
        <section className="text-center space-y-12 py-16 lg:py-24">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent block pb-2">
                {t('hero.title')}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href={`/${locale}/tool`}
              className="group relative px-10 py-5 bg-brand-primary rounded-2xl text-white font-black text-lg tracking-widest uppercase shadow-2xl shadow-brand-primary/40 hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-8 px-8 py-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white uppercase overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent`} />
                    {i === 1 ? 'AI' : i === 2 ? 'HD' : '4K'}
                  </div>
                ))}
              </div>
              <div className="text-left leading-tight">
                <p className="text-white font-bold text-sm">Professional Grade</p>
                <p className="text-zinc-500 text-xs font-medium">Verified locally processed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.slug}
                className="group p-6 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-primary/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-brand-primary transition-colors">{tool.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 sm:py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-900/60 backdrop-blur-sm border border-white/5 hover:bg-zinc-900/80 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  {i === 1 ? <Zap className="text-brand-primary" size={32} /> : i === 2 ? <Shield className="text-brand-primary" size={32} /> : <ImageIcon className="text-brand-primary" size={32} />}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{t(`features.${i}.title`)}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {t(`features.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works Redesign */}
        <section className="py-20 sm:py-32">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black text-white">{t('howItWorks.title')}</h2>
            <p className="text-slate-400 text-lg sm:text-xl font-medium">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 text-center relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-4xl font-black text-white/5 group-hover:text-brand-primary/10 transition-colors">0{step}</div>
                <h4 className="text-xl font-black text-white mb-2 relative z-10">{t(`howItWorks.steps.${step}.title`)}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">{t(`howItWorks.steps.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Polished */}
        <section className="max-w-4xl mx-auto py-20 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 underline decoration-brand-primary/30 underline-offset-8">{t('faq.title')}</h2>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-brand-primary/20 transition-all duration-500">
                <h4 className="text-xl font-black text-white mb-4 flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm">Q</span>
                  {t(`faq.${i}.q`)}
                </h4>
                <p className="text-slate-500 leading-relaxed pl-12 font-medium">{t(`faq.${i}.a`)}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
