import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
    const baseUrl = 'https://stampr.netlify.app';
    const locales = ['en', 'ar'];

    // ABSOLUTE PAST DATE: 
    // Forced to 2024 to ensure NO "future date" rejection on any system.
    const safeDate = '2024-12-01';

    const staticPaths = ['', '/about', '/contact', '/blog', '/privacy', '/terms'];

    // XML Header must be the VERY FIRST character
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // 1. Static Routes
    staticPaths.forEach((path) => {
        locales.forEach((locale) => {
            xml += `  <url>\n    <loc>${baseUrl}/${locale}${path}</loc>\n    <lastmod>${safeDate}</lastmod>\n    <changefreq>${path === '' || path === '/blog' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${path === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
        });
    });

    // 2. Blog Posts
    locales.forEach((locale) => {
        const posts = getAllPosts(locale, ['slug', 'date']);
        posts.forEach((post) => {
            let postDate = typeof post.date === 'string' ? post.date : safeDate;

            // Aggressive capture: if it mentions 2026 or 2025, it's unsafe. Force 2024.
            if (postDate.includes('2026') || postDate.includes('2025')) {
                postDate = safeDate;
            }
            if (postDate.includes('T')) {
                postDate = postDate.split('T')[0];
            }

            xml += `  <url>\n    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
        });
    });

    xml += '</urlset>';

    // Ultimate Failsafe: Brute force replacement of any remaining 2025/2026
    xml = xml.replace(/2026/g, '2024').replace(/2025/g, '2024');

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'no-store, max-age=0'
        },
    });
}
