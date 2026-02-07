import { getTranslations } from 'next-intl/server';
import ImageResizer from "@/app/components/ImageResizer/ImageResizer";
import Script from 'next/script';
import { getSoftwareAppSchema, getBreadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageResizer' });
    const baseUrl = 'https://stampr.netlify.app';

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        keywords: t('keywords'),
        alternates: {
            canonical: `${baseUrl}/${locale}/tool/image-resizer`,
            languages: {
                en: `${baseUrl}/en/tool/image-resizer`,
                ar: `${baseUrl}/ar/tool/image-resizer`,
            },
        },
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            url: `${baseUrl}/${locale}/tool/image-resizer`,
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
    const t = await getTranslations({ locale, namespace: 'ImageResizer' });
    const baseUrl = 'https://stampr.netlify.app';

    const softwareSchema = getSoftwareAppSchema({
        name: t('metaTitle'),
        description: t('metaDescription'),
        url: `${baseUrl}/${locale}/tool/image-resizer`,
        category: 'MultimediaApplication'
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `${baseUrl}/${locale}` },
        { name: locale === 'ar' ? 'الأدوات' : 'Tools', url: `${baseUrl}/${locale}/tool` },
        { name: t('title'), url: `${baseUrl}/${locale}/tool/image-resizer` },
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
            <ImageResizer />
        </div>
    );
}
