'use client';

import { useTheme } from 'next-themes';
import { Menu, X, Languages, ChevronDown, Scaling, ArrowRightLeft, Stamp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Navbar');

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        {
            name: t('links.tools'),
            href: `/${locale}/tool`,
            isDropdown: true,
            tools: [
                {
                    name: useTranslations('ToolsPage')('tools.imageResizer.title'),
                    desc: useTranslations('ToolsPage')('tools.imageResizer.description'),
                    href: `/${locale}/tool/image-resizer`,
                    icon: <Scaling size={20} className="text-amber-400" />
                },
                {
                    name: useTranslations('ToolsPage')('tools.imageConverter.title'),
                    desc: useTranslations('ToolsPage')('tools.imageConverter.description'),
                    href: `/${locale}/tool/image-converter`,
                    icon: <ArrowRightLeft size={20} className="text-blue-400" />
                },
                {
                    name: useTranslations('ToolsPage')('tools.logoStamping.title'),
                    desc: useTranslations('ToolsPage')('tools.logoStamping.description'),
                    href: `/${locale}/tool/logo-stamping`,
                    icon: <Stamp size={20} className="text-brand-primary" />
                }
            ]
        },
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
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 py-4 sm:px-6 lg:px-8 ${scrolled || isMenuOpen ? 'sm:py-3' : 'sm:py-6'
                }`}
        >
            <nav className={`max-w-7xl mx-auto h-16 sm:h-20 transition-all duration-500 rounded-[2rem] border overflow-hidden ${scrolled || isMenuOpen
                ? 'bg-zinc-900/80 backdrop-blur-2xl border-white/10 shadow-2xl'
                : 'bg-transparent border-transparent'
                }`}>
                <div className="h-full px-6 flex justify-between items-center gap-4">
                    {/* Logo Section */}
                    <Link href={`/${locale}`} className="flex items-center gap-3 group relative z-50">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg shadow-brand-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                            <Image
                                src="/logo.png"
                                alt="Stampr Logo"
                                fill
                                className="object-cover p-1"
                            />
                        </div>
                        <span className="text-xl sm:text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent playwrite-nz drop-shadow-sm">
                            Stampr
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-6 py-2.5 text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-500 ${isActive(link.href)
                                    ? 'text-white'
                                    : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                {isActive(link.href) && (
                                    <div className="absolute inset-0 bg-brand-primary rounded-xl shadow-[0_0_20px_rgba(0,153,102,0.3)] animate-in fade-in zoom-in duration-300 -z-10" />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA & Locale */}
                    <div className="hidden md:flex items-center gap-4 relative z-50">
                        <button
                            onClick={switchLocale}
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-brand-primary bg-white/5 hover:bg-brand-primary/10 text-white font-black text-xs tracking-widest uppercase transition-all duration-500 active:scale-95 overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                            <Languages size={16} className="text-brand-primary group-hover:text-white transition-colors" />
                            <span className="group-hover:text-white transition-colors">
                                {locale === 'ar' ? 'English' : 'العربية'}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:border-brand-primary transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Premium Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 z-[90] bg-zinc-950/80 backdrop-blur-3xl animate-in fade-in duration-500">
                    <div className="pt-32 px-8 flex flex-col items-center gap-3">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`w-full py-5 rounded-2xl text-center text-xl font-black uppercase tracking-[0.2em] transition-all duration-500 border ${isActive(link.href)
                                    ? 'bg-brand-primary text-white border-brand-primary shadow-2xl shadow-brand-primary/30'
                                    : 'bg-white/5 text-zinc-500 border-white/5 hover:text-white hover:bg-white/10'
                                    } transform animate-in slide-in-from-bottom-8 fill-mode-both`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-full h-px bg-white/10 my-6 animate-in fade-in slide-in-from-bottom-8 duration-500" style={{ animationDelay: '400ms' }} />
                        <button
                            onClick={switchLocale}
                            className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-lg animate-in slide-in-from-bottom-8 duration-500 fill-mode-both"
                            style={{ animationDelay: '500ms' }}
                        >
                            <Languages size={24} className="text-brand-primary" />
                            {locale === 'ar' ? 'English' : 'العربية'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
