'use client';

import { useTranslations } from 'next-intl';
import { Upload, Image as ImageIcon, Settings, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function Controls({
  setLogo,
  setImages,
  scale,
  setScale,
  position,
  setPosition,
  watermark,
  setWatermark,
  offsetX,
  setOffsetX,
  offsetY,
  setOffsetY,
  opacity,
  setOpacity,
  rotation,
  setRotation,
  exportFormat,
  setExportFormat,
  quality,
  setQuality,
  renamePattern,
  setRenamePattern,
  onProcess,
  loading
}) {
  const t = useTranslations('ImageLogoTool');
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingImages, setIsDraggingImages] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState(null);

  // Logo drag handlers
  const handleLogoDragOver = (e) => {
    e.preventDefault();
    setIsDraggingLogo(true);
  };

  const handleLogoDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingLogo(false);
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    setIsDraggingLogo(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      setLogo(files[0]);
      setLogoFile(files[0]);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoFile(file);
    }
  };

  // Images drag handlers
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
          {t('uploadLogo')}
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            onDragOver={handleLogoDragOver}
            onDragLeave={handleLogoDragLeave}
            onDrop={handleLogoDrop}
            className={`flex flex-col items-center justify-center gap-2 sm:gap-3 w-full p-4 sm:p-5 lg:p-6 border-2 border-dashed rounded-2xl sm:rounded-3xl cursor-pointer transition-all group relative overflow-hidden ${isDraggingLogo
              ? 'border-brand-primary bg-brand-primary/5 scale-[1.01]'
              : logoFile
                ? 'border-brand-primary/20 bg-brand-primary/5'
                : 'border-slate-800 hover:border-brand-primary/50 hover:bg-brand-primary/5'
              }`}
          >
            {logoFile ? (
              <>
                <CheckCircle2 size={24} className="sm:w-8 sm:h-8 text-brand-primary animate-in zoom-in duration-300" />
                <div className="text-center space-y-0.5 sm:space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-brand-primary">
                    ✓ {t('fileSelected')}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate max-w-[150px] sm:max-w-[200px]">
                    {logoFile.name}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className={`p-3 rounded-2xl transition-all duration-300 ${isDraggingLogo
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                  : 'bg-slate-800/50 text-slate-400 group-hover:bg-brand-primary group-hover:text-white'
                  }`}>
                  <Upload size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="text-center space-y-0.5 sm:space-y-1">
                  <p className={`text-xs sm:text-sm font-bold transition-colors ${isDraggingLogo
                    ? 'text-brand-primary'
                    : 'text-slate-300 group-hover:text-brand-primary'
                    }`}>
                    {isDraggingLogo ? t('dropFilesHere') : t('uploadLogo')}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    {t('orClickToSelect')}
                  </p>
                </div>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Images Upload */}
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
                    ✓ {imageFiles.length} {t('filesSelected')}
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
      </div >

      {/* Scale Slider */}
      <div className="space-y-2">
        <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
          {t('scale')} ({Math.round(scale * 100)}%)
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={scale}
          onChange={e => setScale(+e.target.value)}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-100"
        />
      </div >

      {/* Opacity Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
            {t('opacity')}
          </label>
          <span className="text-xs font-mono font-bold text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded-full">
            {Math.round(opacity * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={opacity}
          onChange={e => setOpacity(+e.target.value)}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
        />
      </div >

      {/* Rotation Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
            {t('rotation')}
          </label>
          <span className="text-xs sm:text-sm font-semibold text-zinc-300">
            {rotation}°
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRotation((rotation - 1 + 360) % 360)}
            className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 active:scale-95 transition-all font-bold"
          >
            −
          </button>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={rotation}
            onChange={e => setRotation(+e.target.value)}
            className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-100"
          />
          <button
            type="button"
            onClick={() => setRotation((rotation + 1) % 360)}
            className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 active:scale-95 transition-all font-bold"
          >
            +
          </button>
        </div>
      </div >

      {/* Position Select */}
      <div className="space-y-2">
        <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
          {t('position')}
        </label>
        <select
          value={position}
          onChange={e => setPosition(e.target.value)}
          className="w-full bg-background border border-zinc-700 text-white p-2 sm:p-2.5 lg:p-3 text-sm rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all"
        >
          <option value="top-left">{t('positions.topLeft')}</option>
          <option value="top-right">{t('positions.topRight')}</option>
          <option value="bottom-left">{t('positions.bottomLeft')}</option>
          <option value="bottom-right">{t('positions.bottomRight')}</option>
          <option value="center">{t('positions.center')}</option>
        </select>
      </div >

      {/* Custom Position Controls */}
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-slate-900/30 rounded-lg sm:rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Settings size={16} className="sm:w-[18px] sm:h-[18px] text-brand-primary" />
          <h4 className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
            {t('customPosition')}
          </h4>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Offset X */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] sm:text-xs font-medium text-zinc-400">
                {t('offsetX')}
              </label>
              <span className="text-xs sm:text-sm font-semibold text-zinc-300">
                {offsetX} {t('pixels')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOffsetX(Math.max(-200, offsetX - 1))}
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 active:scale-95 transition-all font-bold"
                aria-label="Decrease X offset"
              >
                −
              </button>
              <div className="relative flex-1">
                <input
                  type="range"
                  min="-200"
                  max="200"
                  step="1"
                  value={offsetX}
                  onChange={e => setOffsetX(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-100"
                />
                {/* Scale indicators */}
                {/* Generate tick marks for every 5 pixels */}
                {Array.from({ length: 81 }, (_, i) => {
                  const value = -200 + i * 5; // -200, -195, -190, ..., 0, ..., 195, 200
                  const position = ((value + 200) / 400) * 100; // Convert to percentage
                  const isZero = value === 0;
                  const isTenMultiple = value % 10 === 0 && !isZero;
                  const height = isZero ? 'h-6' : isTenMultiple ? 'h-5' : 'h-4';
                  const bgColor = isZero
                    ? 'bg-zinc-400'
                    : isTenMultiple
                      ? 'bg-zinc-500'
                      : 'bg-zinc-600';

                  return (
                    <div
                      key={value}
                      onClick={() => setOffsetX(value)}
                      className={`hidden sm:block absolute top-1/2 -translate-y-1/2 w-0.5 ${height} ${bgColor} cursor-pointer hover:bg-zinc-300 transition-colors`}
                      style={{ left: `${position}%` }}
                      title={`${value}px`}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setOffsetX(Math.min(200, offsetX + 1))}
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 active:scale-95 transition-all font-bold"
                aria-label="Increase X offset"
              >
                +
              </button>
            </div>
          </div>

          {/* Offset Y */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] sm:text-xs font-medium text-zinc-400">
                {t('offsetY')}
              </label>
              <span className="text-xs sm:text-sm font-semibold text-zinc-300">
                {offsetY} {t('pixels')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOffsetY(Math.max(-200, offsetY - 1))}
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 active:scale-95 transition-all font-bold"
                aria-label="Decrease Y offset"
              >
                −
              </button>
              <div className="relative flex-1">
                <input
                  type="range"
                  min="-200"
                  max="200"
                  step="1"
                  value={offsetY}
                  onChange={e => setOffsetY(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-100"
                />
                {/* Scale indicators */}
                {/* Generate tick marks for every 5 pixels */}
                {Array.from({ length: 81 }, (_, i) => {
                  const value = -200 + i * 5; // -200, -195, -190, ..., 0, ..., 195, 200
                  const position = ((value + 200) / 400) * 100; // Convert to percentage
                  const isZero = value === 0;
                  const isTenMultiple = value % 10 === 0 && !isZero;
                  const height = isZero ? 'h-6' : isTenMultiple ? 'h-5' : 'h-4';
                  const bgColor = isZero
                    ? 'bg-zinc-400'
                    : isTenMultiple
                      ? 'bg-zinc-500'
                      : 'bg-zinc-600';

                  return (
                    <div
                      key={value}
                      onClick={() => setOffsetY(value)}
                      className={`hidden sm:block absolute top-1/2 -translate-y-1/2 w-0.5 ${height} ${bgColor} cursor-pointer hover:bg-zinc-300 transition-colors`}
                      style={{ left: `${position}%` }}
                      title={`${value}px`}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setOffsetY(Math.min(200, offsetY + 1))}
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-600 active:scale-95 transition-all font-bold"
                aria-label="Increase Y offset"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div >

      {/* Export Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
            {t('exportFormat')}
          </label>
          <select
            value={exportFormat}
            onChange={e => setExportFormat(e.target.value)}
            className="w-full bg-background border border-zinc-700 text-white p-2 sm:p-2.5 lg:p-3 text-sm rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all"
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>

        {
          exportFormat !== 'image/png' && (
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
                {t('quality')} ({Math.round(quality * 100)}%)
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={e => setQuality(+e.target.value)}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-100"
              />
            </div>
          )
        }
      </div >

      {/* Batch Rename Pattern */}
      <div className="space-y-2">
        <label className="block text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
          {t('renamePattern')}
        </label>
        <div className="relative">
          <input
            type="text"
            value={renamePattern}
            onChange={e => setRenamePattern(e.target.value)}
            placeholder="[name]_stamped"
            className="w-full bg-background border border-slate-800 text-slate-200 p-2 sm:p-2.5 lg:p-3 text-sm rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-mono"
          />
          <p className="mt-1 text-[10px] text-slate-500 italic">
            {t('renameHint')}
          </p>
        </div>
      </div>

      {/* Watermark Checkbox */}
      <label className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-930 rounded-lg sm:rounded-xl cursor-pointer hover:bg-slate-900 transition-colors border border-slate-800" >
        <input
          type="checkbox"
          checked={watermark}
          onChange={e => setWatermark(e.target.checked)}
          className="w-4 h-4 sm:w-5 sm:h-5 rounded border-slate-700 text-brand-primary focus:ring-2 focus:ring-brand-primary cursor-pointer"
        />
        <span className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
          {t('watermark')}
        </span>
      </label >

      {/* Process Button */}
      < button
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
