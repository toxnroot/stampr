// Organization and Website Schema for the main layout
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Stampr',
        url: 'https://stampr.netlify.app',
        logo: 'https://stampr.netlify.app/logo.png',
        description: 'Professional logo stamping and watermarking tool. Privacy-first, browser-based batch image processing.',
        sameAs: [
            'https://facebook.com/stampr',
            'https://twitter.com/stampr',
        ],
    };
}

export function getWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Stampr',
        url: 'https://stampr.netlify.app',
        description: 'Add your logo or watermark to multiple images easily and quickly.',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://stampr.netlify.app/blog?search={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };
}

// Article Schema for blog posts
export function getArticleSchema({ title, description, image, author, datePublished, slug, locale }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: image ? `https://stampr.netlify.app${image}` : 'https://stampr.netlify.app/logo.png',
        author: {
            '@type': 'Person',
            name: author || 'Stampr Team',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Stampr',
            logo: {
                '@type': 'ImageObject',
                url: 'https://stampr.netlify.app/logo.png',
            },
        },
        datePublished: datePublished,
        dateModified: datePublished,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://stampr.netlify.app/${locale}/blog/${slug}`,
        },
    };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
