'use client';

import { useTranslations } from 'next-intl';
import { Download, FileCheck, Zap } from 'lucide-react';
import JSZip from 'jszip';

export default function Results({ results }) {
    const t = useTranslations('ImageResizer');

    if (!results || results.length === 0) return null;

    const totalBefore = results.reduce((acc, curr) => acc + curr.oldSize, 0);
    const totalAfter = results.reduce((acc, curr) => acc + curr.newSize, 0);
    const totalSavings = ((totalBefore - totalAfter) / totalBefore) * 100;

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownloadAll = async () => {
        const zip = new JSZip();
        results.forEach((res) => {
            zip.file(res.name, res.blob);
        });
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'compressed_images.zip';
        link.click();
    };

    return (
        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('before')}</p>
                    <p className="text-2xl font-bold text-slate-200">{formatSize(totalBefore)}</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('after')}</p>
                    <p className="text-2xl font-bold text-brand-primary">{formatSize(totalAfter)}</p>
                </div>
                <div className={`relative group overflow-hidden border p-6 rounded-2xl text-center space-y-2 ${totalSavings >= 0 ? 'bg-brand-primary/10 border-brand-primary/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:scale-110 transition-transform">
                        <Zap size={48} className={totalSavings >= 0 ? 'text-brand-primary' : 'text-rose-500'} />
                    </div>
                    <p className={`text-xs font-black uppercase tracking-widest ${totalSavings >= 0 ? 'text-brand-primary/60' : 'text-rose-500/60'}`}>
                        {totalSavings >= 0 ? t('savings') : t('sizeIncrease')}
                    </p>
                    <p className={`text-2xl font-black ${totalSavings >= 0 ? 'text-brand-primary' : 'text-rose-500'}`}>
                        {totalSavings >= 0 ? '' : '+'}{Math.abs(Math.round(totalSavings))}%
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                    <FileCheck className="text-brand-primary" size={24} />
                    {t('processedText', { count: results.length })}
                </h3>
                <button
                    onClick={handleDownloadAll}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/20"
                >
                    <Download size={20} />
                    {t('downloadAll')}
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {results.map((res, idx) => (
                    <div key={idx} className="group relative bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300">
                        <div className="aspect-square w-full">
                            <img src={res.src} alt={res.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-3 space-y-2">
                            <p className="text-xs font-bold text-slate-300 truncate" title={res.name}>{res.name}</p>
                            <div className="flex justify-between items-center text-[10px] sm:text-xs">
                                <span className="text-slate-500 line-through">{formatSize(res.oldSize)}</span>
                                <span className="text-brand-primary font-bold">{formatSize(res.newSize)}</span>
                                <span className={`px-1.5 py-0.5 rounded-md font-black ${res.newSize <= res.oldSize ? 'bg-brand-primary/20 text-brand-primary' : 'bg-rose-500/20 text-rose-500'}`}>
                                    {res.newSize <= res.oldSize ? '-' : '+'}{Math.abs(Math.round(((res.oldSize - res.newSize) / res.oldSize) * 100))}%
                                </span>
                            </div>
                            <a
                                href={res.src}
                                download={res.name}
                                className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-colors mt-2"
                            >
                                <Download size={14} />
                                {t('download')}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
