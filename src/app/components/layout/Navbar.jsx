'use client';

import { useTheme } from 'next-themes';
import { Menu, X, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Navbar');

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const switchLocale = () => {
        const currentLocale = locale;
        const newLocale = currentLocale === 'ar' ? 'en' : 'ar';
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    const navLinks = [
        { name: t('links.home'), href: `/${locale}` },
        { name: t('links.blog'), href: `/${locale}/blog` },
        { name: t('links.about'), href: `/${locale}/about` },
        { name: t('links.contact'), href: `/${locale}/contact` },
    ];

    const isActive = (path) => {
        if (path === `/${locale}` && pathname !== `/${locale}`) return false;
        return pathname.startsWith(path);
    };

    if (!mounted) return null;

    return (
        <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border ${isMenuOpen ? 'bg-background' : 'bg-background/95 backdrop-blur-md'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <Image
                                src="/logo.png"
                                alt="Stampr Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent playwrite-nz">
                            Stampr
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${isActive(link.href)
                                        ? 'bg-brand-primary/10 text-brand-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={switchLocale}
                            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary/90 transition-all duration-300 active:scale-95 shadow-lg shadow-brand-primary/20"
                            title={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                        >
                            <Languages size={18} />
                            <span className="text-sm">
                                {locale === 'ar' ? 'English' : 'العربية'}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-20 bg-background z-40 p-4 border-t border-border animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col space-y-2">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`p-4 text-center text-lg font-bold rounded-2xl transition-all duration-300 ${isActive(link.href)
                                        ? 'bg-brand-primary/10 text-brand-primary'
                                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                    }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-border/50 my-4" />
                        <button
                            onClick={switchLocale}
                            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-brand-primary text-white font-bold"
                        >
                            <Languages size={20} />
                            {locale === 'ar' ? 'English' : 'العربية'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
