import { getTranslations } from 'next-intl/server';
import ImageConverter from '@/app/components/ImageConverter/ImageConverter';
import Script from 'next/script';
import { getSoftwareAppSchema, getBreadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageConverter' });
    const baseUrl = 'https://stampr.netlify.app';

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        keywords: t('keywords'),
        alternates: {
            canonical: `${baseUrl}/${locale}/tool/image-converter`,
            languages: {
                en: `${baseUrl}/en/tool/image-converter`,
                ar: `${baseUrl}/ar/tool/image-converter`,
            },
        },
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            url: `${baseUrl}/${locale}/tool/image-converter`,
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

export default async function Page({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageConverter' });
    const baseUrl = 'https://stampr.netlify.app';

    const softwareSchema = getSoftwareAppSchema({
        name: t('metaTitle'),
        description: t('metaDescription'),
        url: `${baseUrl}/${locale}/tool/image-converter`,
        category: 'MultimediaApplication'
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `${baseUrl}/${locale}` },
        { name: locale === 'ar' ? 'الأدوات' : 'Tools', url: `${baseUrl}/${locale}/tool` },
        { name: t('title'), url: `${baseUrl}/${locale}/tool/image-converter` },
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
            <ImageConverter />
        </div>
    );
}
