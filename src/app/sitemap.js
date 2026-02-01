import { getAllPosts } from '@/lib/posts';

export default async function sitemap() {
    const baseUrl = 'https://stampr.netlify.app';
    const locales = ['en', 'ar'];

    // Static routes for both locales
    const staticRoutes = ['', '/about', '/contact', '/blog', '/privacy', '/terms'];

    const routes = [];

    // Add static routes for each locale
    locales.forEach(locale => {
        staticRoutes.forEach(route => {
            routes.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    // Add blog posts for each locale
    locales.forEach(locale => {
        const posts = getAllPosts(locale, ['slug', 'date']);
        posts.forEach(post => {
            routes.push({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        });
    });

    return routes;
}
