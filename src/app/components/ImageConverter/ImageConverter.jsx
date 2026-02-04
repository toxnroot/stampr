'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Controls from './Controls';
import Results from './Results';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export default function ImageConverter() {
    const t = useTranslations('ImageConverter');
    const [images, setImages] = useState(null);
    const [quality, setQuality] = useState(0.8);
    const [exportFormat, setExportFormat] = useState('image/webp');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [processedCount, setProcessedCount] = useState(0);

    // Cleanup Object URLs
    useEffect(() => {
        return () => {
            results.forEach(res => {
                if (res.src.startsWith('blob:')) {
                    URL.revokeObjectURL(res.src);
                }
            });
        };
    }, [results]);

    const processImages = async () => {
        if (!images || images.length === 0) return;

        setLoading(true);
        results.forEach(res => {
            if (res.src?.startsWith('blob:')) URL.revokeObjectURL(res.src);
        });
        setResults([]);

        try {
            const output = [];
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const res = await convertImage(file, quality, exportFormat);
                output.push(res);
            }
            setResults(output);
            setProcessedCount(output.length);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (err) {
            console.error(err);
            alert('Error converting images');
        } finally {
            setLoading(false);
        }
    };

    const convertImage = (file, quality, format) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;

                    // ICO limitation handling
                    if (format === 'image/x-icon') {
                        if (width > 256 || height > 256) {
                            const ratio = Math.min(256 / width, 256 / height);
                            width = Math.round(width * ratio);
                            height = Math.round(height * ratio);
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // For broad support, use standard toBlob where possible
                    // Browsers don't natively toBlob('image/x-icon') or 'image/bmp' consistently
                    // We'll fall back and handle extensions properly
                    let finalMime = format;
                    if (format === 'image/x-icon' || format === 'image/bmp') {
                        finalMime = 'image/png'; // Use PNG as container for high quality
                    }

                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Conversion failed'));
                            return;
                        }

                        const url = URL.createObjectURL(blob);
                        const baseName = file.name.split('.').slice(0, -1).join('.');
                        let extension = format.split('/')[1];
                        if (extension === 'x-icon') extension = 'ico';
                        if (extension === 'jpeg') extension = 'jpg';
                        if (extension === 'tiff') extension = 'tif';
                        if (extension === 'gif') extension = 'gif';

                        const finalName = `${baseName}_converted.${extension}`;

                        resolve({
                            src: url,
                            blob: blob,
                            name: finalName,
                            oldSize: file.size,
                            newSize: blob.size,
                            format: extension.toUpperCase()
                        });
                    }, finalMime, quality);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="max-w-6xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center space-y-4">
                <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent p-2">
                    {t('title')}
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto italic">
                    {t('description')}
                </p>
            </div>

            {showSuccess && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-emerald-900/30 border border-emerald-800 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-emerald-400">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-emerald-100">{t('success')}!</p>
                                <p className="text-xs text-emerald-400">{t('processedText', { count: processedCount })}</p>
                            </div>
                        </div>
                        <button onClick={() => setShowSuccess(false)} className="text-emerald-400 hover:text-emerald-200">
                            <XCircle size={20} />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto lg:max-w-none">
                <Controls
                    setImages={setImages}
                    quality={quality}
                    setQuality={setQuality}
                    exportFormat={exportFormat}
                    setExportFormat={setExportFormat}
                    onProcess={processImages}
                    loading={loading}
                />
                <Results results={results} />
            </div>

            <div className="mt-16 p-8 border border-slate-800/40 rounded-3xl bg-slate-900/20 flex flex-col items-center gap-4 max-w-3xl mx-auto">
                <ShieldCheck className="text-slate-500" size={32} />
                <p className="text-sm text-slate-500 italic text-center leading-relaxed">
                    {t('privacyNote')}
                </p>
            </div>
        </div>
    );
}
