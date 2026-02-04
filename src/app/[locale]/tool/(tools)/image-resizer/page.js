import { getTranslations } from 'next-intl/server';
import ImageResizer from "@/app/components/ImageResizer/ImageResizer";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageResizer' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function Page() {
    return <ImageResizer />;
}
