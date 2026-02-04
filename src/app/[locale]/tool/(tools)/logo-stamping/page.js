import { getTranslations } from 'next-intl/server';
import ImageLogoTool from "@/app/components/ImageLogoTool/ImageLogoTool";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ImageLogoTool' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function LogoStampingToolPage() {
    return (
        <div>
            <ImageLogoTool />
        </div>
    );
}