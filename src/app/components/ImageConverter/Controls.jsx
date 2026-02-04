'use client';

import { useTranslations } from 'next-intl';
import { Upload, Image as ImageIcon, Settings, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Controls({
    setImages,
    quality,
    setQuality,
    exportFormat,
    setExportFormat,
    onProcess,
    loading
}) {
    const t = useTranslations('ImageConverter');
    const [isDragging, setIsDragging] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);

    const handleFiles = (files) => {
        if (files.length > 0) {
            setImages(files);
            setSelectedCount(files.length);
        }
    };

    const formats = [
        { value: 'image/webp', label: 'WebP', desc: t('formats.webp') },
        { value: 'image/png', label: 'PNG', desc: t('formats.png') },
        { value: 'image/jpeg', label: 'JPEG', desc: t('formats.jpeg') },
        { value: 'image/avif', label: 'AVIF', desc: t('formats.avif') },
        { value: 'image/x-icon', label: 'ICO', desc: t('formats.ico') },
        { value: 'image/bmp', label: 'BMP', desc: t('formats.bmp') },
        { value: 'image/tiff', label: 'TIFF', desc: t('formats.tiff') },
        { value: 'image/gif', label: 'GIF', desc: t('formats.gif') }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/60 p-6 rounded-3xl space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                    <Upload className="text-brand-primary" size={20} />
                    <h2 className="text-xl font-bold text-white">{t('uploadImages')}</h2>
                </div>

                <div className="relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                        id="converter-upload"
                    />
                    <label
                        htmlFor="converter-upload"
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                        className={`flex flex-col items-center justify-center gap-4 w-full min-h-[220px] p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isDragging ? 'border-brand-primary bg-brand-primary/10 scale-[1.02]' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/20'
                            }`}
                    >
                        {selectedCount > 0 ? (
                            <>
                                <CheckCircle2 size={40} className="text-brand-primary" />
                                <p className="text-brand-primary font-bold">{selectedCount} {t('filesSelected')}</p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                    <ImageIcon size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-200 font-medium">{t('dropFilesHere')}</p>
                                    <p className="text-xs text-slate-500 mt-1">{t('orClickToSelect')}</p>
                                </div>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Settings Area */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/60 p-6 rounded-3xl space-y-6 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                    <Settings className="text-brand-primary" size={20} />
                    <h2 className="text-xl font-bold text-white">{t('targetFormat')}</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                    {formats.map((fmt) => (
                        <button
                            key={fmt.value}
                            onClick={() => setExportFormat(fmt.value)}
                            className={`flex flex-col items-start p-2 rounded-xl border text-left transition-all ${exportFormat === fmt.value
                                    ? 'bg-brand-primary/10 border-brand-primary shadow-lg shadow-brand-primary/10'
                                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            <span className={`text-xs font-black ${exportFormat === fmt.value ? 'text-brand-primary' : 'text-slate-200'}`}>
                                {fmt.label}
                            </span>
                            <span className="text-[9px] text-slate-500 truncate w-full">{fmt.desc}</span>
                        </button>
                    ))}
                </div>

                {exportFormat === 'image/x-icon' && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                        <AlertCircle className="text-amber-500 shrink-0" size={16} />
                        <p className="text-[10px] text-amber-200/70 italic leading-relaxed">
                            {t('icoWarning')}
                        </p>
                    </div>
                )}

                <div className={`space-y-3 transition-opacity ${exportFormat === 'image/x-icon' || exportFormat === 'image/png' || exportFormat === 'image/bmp' || exportFormat === 'image/gif' || exportFormat === 'image/tiff' ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {t('quality')} ({Math.round(quality * 100)}%)
                    </label>
                    <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(+e.target.value)}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                </div>

                <button
                    onClick={onProcess}
                    disabled={loading || selectedCount === 0}
                    className="group relative w-full overflow-hidden py-4 rounded-2xl font-black text-white active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-xl shadow-brand-primary/20"
                >
                    <div className="absolute inset-0 bg-brand-primary group-hover:bg-brand-primary/90 transition-colors" />
                    <span className="relative flex items-center justify-center gap-3">
                        {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                        {loading ? t('processing') : t('process')}
                    </span>
                </button>
            </div>
        </div>
    );
}
