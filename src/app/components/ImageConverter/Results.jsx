'use client';

import { useTranslations } from 'next-intl';
import { Download, FileCheck, Zap } from 'lucide-react';
import JSZip from 'jszip';

export default function Results({ results }) {
    const t = useTranslations('ImageConverter');

    if (!results || results.length === 0) return null;

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownloadAll = async () => {
        const zip = new JSZip();
        results.forEach((res) => zip.file(res.name, res.blob));
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted_images.zip';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 border-b border-slate-800/60">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <FileCheck className="text-brand-primary" size={24} />
                    {t('processedText', { count: results.length })}
                </h3>
                <button
                    onClick={handleDownloadAll}
                    className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20"
                >
                    <Download size={20} />
                    {t('downloadAll')}
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {results.map((res, idx) => (
                    <div key={idx} className="group relative bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300">
                        <div className="aspect-square relative flex items-center justify-center p-2 bg-slate-950/20">
                            <img src={res.src} alt={res.name} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-brand-primary text-[10px] font-black text-white rounded-md shadow-lg uppercase">
                                {res.format}
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <p className="text-xs font-bold text-slate-200 truncate" title={res.name}>{res.name}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-500">{formatSize(res.newSize)}</span>
                                <a
                                    href={res.src}
                                    download={res.name}
                                    className="p-2 bg-slate-800 text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-all shadow-lg"
                                >
                                    <Download size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
