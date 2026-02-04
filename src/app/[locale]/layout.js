import { Inter, Cairo } from 'next/font/google';
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Script from 'next/script';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';
import GoogleAnalytics from '../components/GoogleAnalytics';
import CookieConsent from '../components/CookieConsent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr ? 'Stampr - أدوات الصور الاحترافية' : 'Stampr - Professional Image Tools';
  const description = isAr
    ? 'أضف شعارك، قلل حجم صورك، أو حول صيغها بسهولة وبخصوصية تامة. معالجة جماعية للصور في المتصفح دون رفعها للسيرفر.'
    : 'Add your logo, compress images, or convert formats easily with total privacy. Batch image processing in your browser without uploads.';

  const keywords = isAr
    ? ['علامة مائية', 'إضافة شعار للصور', 'ضغط الصور', 'تحويل الصور', 'معالجة الصور', 'حماية الصور', 'محول الصور', 'تصغير الصور', 'خصوصية']
    : ['watermark', 'logo stamping', 'image watermark', 'batch watermark', 'privacy', 'browser tool', 'image processing', 'compress image', 'image converter'];

  return {
    metadataBase: new URL('https://stampr.netlify.app'),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description: description,
    keywords: keywords,
    authors: [{ name: 'Stampr Team' }],
    creator: 'Stampr',
    publisher: 'Stampr',
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_AR' : 'en_US',
      url: 'https://stampr.netlify.app',
      title: title,
      description: description,
      siteName: 'Stampr',
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: 'Stampr Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/logo.png'],
    },
    verification: {
      google: 'da6b566d7c77b39a',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://stampr.netlify.app',
      languages: {
        'en': 'https://stampr.netlify.app/en',
        'ar': 'https://stampr.netlify.app/ar',
      },
    },
  };
}



export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${locale === 'ar' ? cairo.className : inter.className} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <Navbar />
            <main className="pt-24 sm:pt-32">
              {children}
            </main>
            <Footer locale={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>

        {/* Analytics */}
        <GoogleAnalytics measurementId="G-4VK9LW27K3" />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="00e937db-828f-4a2f-acb4-853e45adca78"
        />

        {/* Cookie Consent Banner */}
        <CookieConsent locale={locale} />

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
      </body>
    </html>
  );
}
