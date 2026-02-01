'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent({ locale }) {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);
    };

    const rejectCookies = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    const text = locale === 'ar' ? {
        title: 'نستخدم ملفات تعريف الارتباط',
        message: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل أداء الموقع. من خلال الاستمرار، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
        accept: 'قبول',
        reject: 'رفض',
        privacy: 'سياسة الخصوصية'
    } : {
        title: 'We use cookies',
        message: 'We use cookies to improve your experience and analyze site performance. By continuing, you agree to our use of cookies.',
        accept: 'Accept',
        reject: 'Reject',
        privacy: 'Privacy Policy'
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card/98 backdrop-blur-lg border border-border rounded-xl shadow-2xl p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                        <Cookie className="w-4 h-4 text-brand-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold mb-1">{text.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            {text.message}{' '}
                            <Link href={`/${locale}/privacy`} className="text-brand-primary hover:underline">
                                {text.privacy}
                            </Link>
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={acceptCookies}
                                className="flex-1 px-3 py-1.5 bg-brand-primary text-white rounded-lg text-xs font-medium hover:bg-brand-primary/90 transition-all duration-300"
                            >
                                {text.accept}
                            </button>
                            <button
                                onClick={rejectCookies}
                                className="px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs font-medium hover:bg-secondary/80 transition-all duration-300"
                            >
                                {text.reject}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={rejectCookies}
                        className="flex-shrink-0 p-1 hover:bg-secondary rounded-md transition-colors"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
