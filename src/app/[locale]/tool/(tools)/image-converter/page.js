import { getTranslations } from 'next-intl/server';
import ImageConverter from '@/app/components/ImageConverter/ImageConverter';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageConverter' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function Page() {
    return <ImageConverter />;
}
