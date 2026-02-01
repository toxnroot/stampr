import { useTranslations, useLocale } from 'next-intl';
import ImageLogoTool from '../components/ImageLogoTool/ImageLogoTool';
import { Zap, Shield, Palette } from 'lucide-react';

export default function Home() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <main className="w-full">
        <ImageLogoTool />

        {/* SEO Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 space-y-32 sm:space-y-40">

          {/* Features */}
          <section className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Background Decor */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200px] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-[2rem] hover:bg-card hover:border-brand-primary/20 transition-all duration-300 group text-center sm:text-left">
                <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('features.1.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('features.1.description')}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-[2rem] hover:bg-card hover:border-blue-500/20 transition-all duration-300 group text-center sm:text-left">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-7 h-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('features.2.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('features.2.description')}
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-[2rem] hover:bg-card hover:border-purple-500/20 transition-all duration-300 group text-center sm:text-left">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-500">
                  <Palette className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('features.3.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('features.3.description')}
                </p>
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section className="relative">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{t('howItWorks.title')}</h2>
              <p className="text-muted-foreground text-lg sm:text-xl">{t('howItWorks.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="relative pt-4 text-center group">
                  <div className="w-24 h-24 bg-card border-4 border-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20 group-hover:border-brand-primary/50 transition-colors duration-500 relative z-10">
                    <span className="text-3xl font-black text-muted-foreground/30 group-hover:text-brand-primary transition-colors">0{step}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{t(`howItWorks.steps.${step}.title`)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed px-4">{t(`howItWorks.steps.${step}.description`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-6">{t('faq.title')}</h2>
              <div className="w-20 h-1.5 bg-brand-primary rounded-full mx-auto opacity-50"></div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group p-6 sm:p-8 bg-card/50 hover:bg-card border border-border/50 hover:border-brand-primary/20 rounded-3xl transition-all duration-300">
                  <h4 className="text-lg sm:text-xl font-bold mb-4 flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary font-bold text-sm mt-0.5">Q</span>
                    {t(`faq.${i}.q`)}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed pl-12 text-base">{t(`faq.${i}.a`)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
