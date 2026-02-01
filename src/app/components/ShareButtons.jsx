'use client';

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons({ url, title, locale }) {
    const [copied, setCopied] = useState(false);

    const shareUrl = `https://stampr.netlify.app${url}`;
    const shareTitle = encodeURIComponent(title);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: shareUrl,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            color: 'hover:bg-blue-500/10 hover:text-blue-500',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
            color: 'hover:bg-sky-500/10 hover:text-sky-500',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
            color: 'hover:bg-blue-600/10 hover:text-blue-600',
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
            color: 'hover:bg-green-500/10 hover:text-green-500',
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Share2 size={20} />
                {locale === 'ar' ? 'شارك المقال' : 'Share Article'}
            </h3>

            <div className="flex flex-wrap gap-3">
                {/* Social Share Buttons */}
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 transition-all duration-300 ${link.color}`}
                        aria-label={`Share on ${link.name}`}
                    >
                        <link.icon size={18} />
                        <span className="text-sm font-medium hidden sm:inline">{link.name}</span>
                    </a>
                ))}

                {/* Copy Link Button */}
                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-brand-primary/50 hover:text-brand-primary transition-all duration-300"
                    aria-label="Copy link"
                >
                    <LinkIcon size={18} />
                    <span className="text-sm font-medium hidden sm:inline">
                        {copied ? (locale === 'ar' ? 'تم النسخ!' : 'Copied!') : (locale === 'ar' ? 'نسخ الرابط' : 'Copy Link')}
                    </span>
                </button>

                {/* Native Share (Mobile) */}
                {typeof navigator !== 'undefined' && navigator.share && (
                    <button
                        onClick={handleNativeShare}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-brand-primary transition-all duration-300 sm:hidden"
                        aria-label="Share"
                    >
                        <Share2 size={18} />
                        <span className="text-sm font-medium">{locale === 'ar' ? 'مشاركة' : 'Share'}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
