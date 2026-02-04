'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Controls from './Controls';
import Results from './Results';
import { CheckCircle2, XCircle, Share2, ShieldCheck } from 'lucide-react';

export default function ImageResizer() {
    const t = useTranslations('ImageResizer');
    const [images, setImages] = useState(null);
    const [quality, setQuality] = useState(0.8);
    const [exportFormat, setExportFormat] = useState('image/jpeg');
    const [renamePattern, setRenamePattern] = useState('[name]_compressed');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [processedCount, setProcessedCount] = useState(0);

    // Load persistent settings
    useEffect(() => {
        const saved = localStorage.getItem('stampr_resizer_settings');
        if (saved) {
            try {
                const { quality, exportFormat, renamePattern } = JSON.parse(saved);
                if (quality) setQuality(quality);
                if (exportFormat) setExportFormat(exportFormat);
                if (renamePattern) setRenamePattern(renamePattern);
            } catch (e) { console.error(e); }
        }
    }, []);

    // Save settings
    useEffect(() => {
        localStorage.setItem('stampr_resizer_settings', JSON.stringify({ quality, exportFormat, renamePattern }));
    }, [quality, exportFormat, renamePattern]);

    // Cleanup Object URLs to prevent memory leaks
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

        // Clean up previous URLs before setting new results
        results.forEach(res => {
            if (res.src?.startsWith('blob:')) URL.revokeObjectURL(res.src);
        });

        setResults([]);

        try {
            const output = [];
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const res = await compressImage(file, quality, exportFormat, renamePattern);
                output.push(res);
            }
            setResults(output);
            setProcessedCount(output.length);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (err) {
            console.error(err);
            alert('Error processing images');
        } finally {
            setLoading(false);
        }
    };

    const compressImage = (file, quality, format, pattern) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Maintain aspect ratio
                    canvas.width = img.width;
                    canvas.height = img.height;

                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Canvas toBlob failed'));
                            return;
                        }

                        const dataUrl = URL.createObjectURL(blob);
                        const baseName = file.name.split('.').slice(0, -1).join('.');
                        let extension = format.split('/')[1];
                        if (extension === 'jpeg') extension = 'jpg';

                        const finalName = pattern.replace('[name]', baseName) + '.' + extension;

                        resolve({
                            src: dataUrl, // Still using for preview, but it's an Object URL now
                            blob: blob,   // Keep the blob for better handling if needed
                            name: finalName,
                            oldSize: file.size,
                            newSize: blob.size
                        });
                    }, format, quality);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="max-w-6xl mx-auto py-6 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-8">
            <div className="mb-6 sm:mb-8 lg:mb-12 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-3 sm:mb-4 p-2">
                    {t('title')}
                </h1>
            </div>

            {showSuccess && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-emerald-900/30 border border-emerald-800 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-emerald-400">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-emerald-100">
                                    {t('success')}!
                                </p>
                                <p className="text-xs text-emerald-400">
                                    {t('processedText', { count: processedCount })}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="text-emerald-400 hover:text-emerald-200"
                        >
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
                    renamePattern={renamePattern}
                    setRenamePattern={setRenamePattern}
                    onProcess={processImages}
                    loading={loading}
                />

                <Results results={results} />
            </div>

            {/* Privacy Note */}
            <div className="mt-12 p-6 border border-slate-800/40 rounded-3xl bg-slate-900/20 flex flex-col items-center gap-3 max-w-3xl mx-auto">
                <ShieldCheck className="text-slate-500" size={24} />
                <p className="text-sm text-slate-500 italic text-center">
                    All processing happens locally in your browser. Your images are never uploaded to any server.
                </p>
            </div>
        </div>
    );
}
