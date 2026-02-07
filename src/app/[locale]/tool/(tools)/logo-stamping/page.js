import { getTranslations } from 'next-intl/server';
import Script from 'next/script';
import { getSoftwareAppSchema, getBreadcrumbSchema } from '@/lib/schema';
import ImageLogoTool from "@/app/components/ImageLogoTool/ImageLogoTool";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageLogoTool' });
    const baseUrl = 'https://stampr.netlify.app';

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        keywords: t('keywords'),
        alternates: {
            canonical: `${baseUrl}/${locale}/tool/logo-stamping`,
            languages: {
                en: `${baseUrl}/en/tool/logo-stamping`,
                ar: `${baseUrl}/ar/tool/logo-stamping`,
            },
        },
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            url: `${baseUrl}/${locale}/tool/logo-stamping`,
            type: 'website',
            images: [{ url: '/logo.png' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('metaTitle'),
            description: t('metaDescription'),
            images: ['/logo.png'],
        },
    };
}

export default async function LogoStampingToolPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageLogoTool' });
    const baseUrl = 'https://stampr.netlify.app';

    const softwareSchema = getSoftwareAppSchema({
        name: t('metaTitle'),
        description: t('metaDescription'),
        url: `${baseUrl}/${locale}/tool/logo-stamping`,
        category: 'MultimediaApplication'
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `${baseUrl}/${locale}` },
        { name: locale === 'ar' ? 'الأدوات' : 'Tools', url: `${baseUrl}/${locale}/tool` },
        { name: t('title'), url: `${baseUrl}/${locale}/tool/logo-stamping` },
    ]);

    return (
        <div>
            <Script
                id="software-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ImageLogoTool />
        </div>
    );
}