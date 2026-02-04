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
    renamePattern,
    setRenamePattern,
    onProcess,
    loading
}) {
    const t = useTranslations('ImageResizer');
    const [isDraggingImages, setIsDraggingImages] = useState(false);
    const [imageFiles, setImageFiles] = useState(null);

    const handleImagesDragOver = (e) => {
        e.preventDefault();
        setIsDraggingImages(true);
    };

    const handleImagesDragLeave = (e) => {
        e.preventDefault();
        setIsDraggingImages(false);
    };

    const handleImagesDrop = (e) => {
        e.preventDefault();
        setIsDraggingImages(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setImages(files);
            setImageFiles(files);
        }
    };

    const handleImagesChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setImages(files);
            setImageFiles(files);
        }
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/60 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-none space-y-4 sm:space-y-5 lg:space-y-6 transition-all duration-300">
            <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-slate-800">
                <Settings className="text-slate-400" size={18} />
                <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                    {t('title')}
                </h2>
            </div>

            <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
                    {t('uploadImages')}
                </label>
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                        className="hidden"
                        id="images-upload"
                    />
                    <label
                        htmlFor="images-upload"
                        onDragOver={handleImagesDragOver}
                        onDragLeave={handleImagesDragLeave}
                        onDrop={handleImagesDrop}
                        className={`flex flex-col items-center justify-center gap-2 sm:gap-3 w-full p-4 sm:p-5 lg:p-6 border-2 border-dashed rounded-lg sm:rounded-xl cursor-pointer transition-all group ${isDraggingImages
                            ? 'border-blue-400 bg-blue-950/30 scale-[1.02]'
                            : imageFiles
                                ? 'border-blue-600 bg-blue-950/20'
                                : 'border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900/50'
                            }`}
                    >
                        {imageFiles && imageFiles.length > 0 ? (
                            <>
                                <CheckCircle2 size={24} className="sm:w-8 sm:h-8 text-blue-400" />
                                <div className="text-center space-y-0.5 sm:space-y-1">
                                    <p className="text-xs sm:text-sm font-semibold text-blue-300">
                                        {imageFiles.length} {t('filesSelected')}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-zinc-400 truncate max-w-[200px] sm:max-w-[250px]">
                                        {Array.from(imageFiles).slice(0, 2).map(f => f.name).join(', ')}
                                        {imageFiles.length > 2 ? '...' : ''}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`p-2 sm:p-2.5 lg:p-3 rounded-full transition-colors ${isDraggingImages
                                    ? 'bg-blue-900/50'
                                    : 'bg-zinc-800 group-hover:bg-zinc-700'
                                    }`}>
                                    <ImageIcon size={20} className={`sm:w-6 sm:h-6 transition-colors ${isDraggingImages
                                        ? 'text-blue-400'
                                        : 'text-zinc-400 group-hover:text-zinc-300'
                                        }`} />
                                </div>
                                <div className="text-center space-y-0.5 sm:space-y-1">
                                    <p className={`text-xs sm:text-sm font-medium transition-colors ${isDraggingImages
                                        ? 'text-blue-300'
                                        : 'text-zinc-300 group-hover:text-zinc-100'
                                        }`}>
                                        {isDraggingImages ? t('dropFilesHere') : t('uploadImages')}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-zinc-500">
                                        {t('orClickToSelect')}
                                    </p>
                                </div>
                            </>
                        )}
                    </label>
                </div>
            </div>

            <div className={`space-y-4 transition-opacity duration-300 ${exportFormat === 'image/png' ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
                    {t('quality')} ({Math.round(quality * 100)}%)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { value: 0.9, label: t('highQuality') },
                        { value: 0.7, label: t('mediumQuality') },
                        { value: 0.5, label: t('lowQuality') },
                        { value: 0.3, label: t('extraSmall') }
                    ].map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setQuality(option.value)}
                            disabled={exportFormat === 'image/png'}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all ${quality === option.value
                                ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={e => setQuality(+e.target.value)}
                    disabled={exportFormat === 'image/png'}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary mt-2"
                />
            </div>

            {exportFormat === 'image/png' && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
                    <p className="text-xs text-amber-200/80 leading-relaxed italic">
                        {t('pngWarning') || 'PNG is lossless and quality settings do not apply. File size may increase when converting from JPEG.'}
                    </p>
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
                    {t('exportFormat')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { value: 'image/jpeg', label: 'JPEG' },
                        { value: 'image/png', label: 'PNG' },
                        { value: 'image/webp', label: 'WebP' }
                    ].map((fmt) => (
                        <button
                            key={fmt.value}
                            onClick={() => setExportFormat(fmt.value)}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all ${exportFormat === fmt.value
                                ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                                }`}
                        >
                            {fmt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
                    {t('renamePattern')}
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={renamePattern}
                        onChange={e => setRenamePattern(e.target.value)}
                        placeholder="[name]_compressed"
                        className="w-full bg-background border border-slate-800 text-slate-200 p-2 sm:p-2.5 lg:p-3 text-sm rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-mono"
                    />
                    <p className="mt-1 text-[10px] text-slate-500 italic">
                        {t('renameHint')}
                    </p>
                </div>
            </div>

            <button
                onClick={onProcess}
                disabled={loading}
                className="group relative w-full overflow-hidden py-4 sm:py-5 lg:py-6 text-sm sm:text-lg rounded-2xl sm:rounded-3xl font-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-brand-primary/20"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary/80 group-hover:scale-105 transition-transform duration-500" />
                <span className="relative z-10 text-white flex items-center justify-center gap-3">
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : null}
                    {loading ? t('processing') : t('process')}
                </span>
            </button>
        </div>
    );
}
