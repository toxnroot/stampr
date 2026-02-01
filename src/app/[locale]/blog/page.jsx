import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function BlogIndex({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });
    const posts = getAllPosts(locale, ['title', 'date', 'slug', 'description', 'image']);

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-block p-1.5 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium border border-brand-primary/20 mb-2">
                    {locale === 'ar' ? 'المدونة' : 'Our Blog'}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-emerald-400 to-teal-500 tracking-tight">
                    {locale === 'ar' ? 'أحدث المقالات والأخبار' : 'Latest Articles & News'}
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {locale === 'ar'
                        ? 'اكتشف رؤى جديدة، شروحات تقنية، ونصائح لتحسين علامتك التجارية وحمايتها.'
                        : 'Discover insights, tutorials, and tips to enhance and protect your brand identity.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 row-auto">
                {posts.map((post, index) => (
                    <Link
                        key={post.slug}
                        href={`/${locale}/blog/${post.slug}`}
                        className="group block h-full"
                    >
                        <article className="h-full flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-brand-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/5 hover:-translate-y-1">
                            <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-deep/50 flex items-center justify-center">
                                        <span className="text-4xl opacity-50">📝</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6 flex flex-col flex-grow relative">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                                    <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full border border-brand-primary/20">
                                        {locale === 'ar' ? 'مقال' : 'Article'}
                                    </span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-brand-primary transition-colors line-clamp-2 leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {post.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-brand-primary mt-auto group/btn">
                                    {locale === 'ar' ? 'اقرأ المقال' : 'Read Article'}
                                    <svg className={`w-4 h-4 ${locale === 'ar' ? 'mr-2 rotate-180 group-hover/btn:-translate-x-1' : 'ml-2 group-hover/btn:translate-x-1'} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
