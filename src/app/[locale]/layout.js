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

export const metadata = {
  metadataBase: new URL('https://stampr.netlify.app'),
  title: {
    default: 'Stampr - Professional Logo Stamping Tool',
    template: '%s | Stampr'
  },
  description: 'Add your logo or watermark to multiple images easily and quickly. Privacy-first, browser-based batch image processing with no uploads required.',
  keywords: ['watermark', 'logo stamping', 'image watermark', 'batch watermark', 'privacy', 'browser tool', 'image processing'],
  authors: [{ name: 'Stampr Team' }],
  creator: 'Stampr',
  publisher: 'Stampr',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stampr.netlify.app',
    title: 'Stampr - Professional Logo Stamping Tool',
    description: 'Add your logo or watermark to multiple images easily and quickly. Privacy-first, browser-based image processing.',
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
    title: 'Stampr - Professional Logo Stamping Tool',
    description: 'Add your logo or watermark to multiple images easily and quickly. Privacy-first, browser-based image processing.',
    images: ['/logo.png'],
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
            {children}
            <Footer locale={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>

        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-4VK9LW27K3" />

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
