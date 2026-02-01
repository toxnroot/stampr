import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AdSense from '@/app/components/AdSense';
import Script from 'next/script';
import { getArticleSchema } from '@/lib/schema';
import ShareButtons from '@/app/components/ShareButtons';

export async function generateMetadata({ params }) {
    const { slug, locale } = await params;
    const post = getPostBySlug(slug, locale, ['title', 'description']);
    if (!post) {
        return {
            title: 'Post Not Found'
        };
    }
    return {
        title: post.title,
        description: post.description,
    };
}

export default async function BlogPost({ params }) {
    const { slug, locale } = await params;
    const post = getPostBySlug(slug, locale, ['title', 'date', 'slug', 'content', 'image', 'author']);

    if (!post) {
        notFound();
    }

    const articleSchema = getArticleSchema({
        title: post.title,
        description: post.description || post.title,
        image: post.image,
        author: post.author,
        datePublished: post.date,
        slug: post.slug,
        locale,
    });

    return (
        <article className="min-h-screen bg-background text-foreground pb-20 ">
            {/* Article Schema */}
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />

            {/* Navigation Bar Placeholder (if any specific nav logic needed) */}

            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover brightness-50"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-deep to-gray-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 z-10 pb-12 max-w-4xl">
                    <Link
                        href={`/${locale}/blog`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-md border border-white/10 text-sm font-medium text-white hover:bg-background/30 transition-all mb-8 group"
                    >
                        <svg className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {locale === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200">
                        <div className="flex items-center gap-2 bg-brand-deep/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5">
                            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{post.date}</span>
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-2 bg-brand-deep/50 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5">
                                <span className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {post.author.charAt(0)}
                                </span>
                                <span>{post.author}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 max-w-3xl -mt-10 relative z-20">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                        prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/50
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-muted-foreground prose-p:leading-8 prose-p:mb-6
                        prose-ul:my-6 prose-li:my-2 prose-li:text-muted-foreground prose-li:marker:text-brand-primary
                        prose-strong:text-brand-primary prose-strong:font-semibold
                        prose-pre:bg-[#080c18] prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-lg
                        prose-code:text-brand-primary prose-code:bg-brand-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                        prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-foreground
                        prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-border/50
                        ">
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    return inline ? (
                                        <code className="text-sm font-mono text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded" {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <div className="relative group my-8">
                                            <div className="absolute top-0 right-0 left-0 h-10 bg-[#0f1524] rounded-t-xl border-b border-border flex items-center px-4 gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                            </div>
                                            <pre className="!bg-[#040714] !pt-14 !pb-6 !px-6 rounded-xl border border-border overflow-x-auto text-sm leading-relaxed shadow-inner" {...props}>
                                                <code className="font-mono text-gray-300" {...props}>
                                                    {children}
                                                </code>
                                            </pre>
                                        </div>
                                    )
                                },
                                img: ({ src, alt }) => (
                                    <div className="my-10">
                                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-muted shadow-2xl">
                                            <Image
                                                src={src}
                                                alt={alt}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {alt && <p className="text-center text-sm text-muted-foreground mt-3 italic">{alt}</p>}
                                    </div>
                                ),
                                ul: ({ children }) => <ul className="list-disc list-outside ml-6 space-y-2">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-outside ml-6 space-y-2">{children}</ol>,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>

                        {/* AdSense - In-Content Ad */}
                        <div className="my-12">
                            <AdSense adSlot="1234567890" adFormat="auto" className="min-h-[250px]" />
                        </div>

                        {/* Social Share Buttons */}
                        <div className="my-12 p-6 bg-secondary/30 border border-border/50 rounded-2xl">
                            <ShareButtons
                                url={`/${locale}/blog/${post.slug}`}
                                title={post.title}
                                locale={locale}
                            />
                        </div>
                    </div>


                    {/* Tool CTA */}
                    <div className="my-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary to-emerald-600 p-8 md:p-10 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start rtl:md:text-right">
                            <div className="max-w-xl">
                                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                                    {locale === 'ar' ? 'جاهز لحماية علامتك التجارية؟' : 'Ready to protect your brand?'}
                                </h3>
                                <p className="text-white/90 text-lg leading-relaxed">
                                    {locale === 'ar'
                                        ? 'استخدم أداتنا المجانية لإضافة شعارك كعلامة مائية على صورك في ثوانٍ.'
                                        : 'Use our free tool to watermark your images with your logo in seconds.'}
                                </p>
                            </div>
                            <Link
                                href={`/${locale}`}
                                className="whitespace-nowrap px-8 py-3.5 rounded-xl bg-white text-brand-primary font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {locale === 'ar' ? 'جرب الأداة الآن' : 'Try Tool Now'}
                            </Link>
                        </div>
                    </div>

                    <hr className="my-12 border-border" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-muted/30 p-8 rounded-2xl border border-border/50">
                        <div className="text-center md:text-start md:text-right rtl:md:text-left">
                            <h3 className="text-xl font-bold mb-2">{locale === 'ar' ? 'هل أعجبك المقال؟' : 'Enjoyed the article?'}</h3>
                            <p className="text-muted-foreground text-sm">{locale === 'ar' ? 'تحقق من المزيد من المواضيع في مدونتنا.' : 'Check out more topics on our blog.'}</p>
                        </div>
                        <Link
                            href={`/${locale}/blog`}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-brand-primary/25 transition-all transform hover:-translate-y-0.5"
                        >
                            {locale === 'ar' ? 'اقرأ المزيد' : 'Read More Articles'}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

