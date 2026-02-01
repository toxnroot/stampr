'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Controls from './Controls';
import Preview from './Preview';
import { loadImage, getPosition } from './utils';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';

export default function ImageLogoTool() {
  const t = useTranslations('ImageLogoTool');
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState(null);
  const [scale, setScale] = useState(0.2);
  const [position, setPosition] = useState('top-left');
  const [watermark, setWatermark] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [exportFormat, setExportFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [renamePattern, setRenamePattern] = useState('[name]_stamped');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  // Live Preview Logic
  useEffect(() => {
    let active = true;
    const generatePreview = async () => {
      if (!logo || !images?.length) {
        setPreviewSrc(null);
        return;
      }

      try {
        const logoImg = await loadImage(logo);
        const file = images[0];
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const logoW = img.width * scale;
        const logoH = logoImg.height * (logoW / logoImg.width);
        const { x, y } = getPosition(position, img.width, img.height, logoW, logoH, offsetX, offsetY);

        ctx.save();
        ctx.translate(x + logoW / 2, y + logoH / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.globalAlpha = watermark ? 0.3 : opacity;
        ctx.drawImage(logoImg, -logoW / 2, -logoH / 2, logoW, logoH);
        ctx.restore();

        if (active) {
          setPreviewSrc(canvas.toDataURL(exportFormat, 0.5)); // Fast preview with lower quality
        }
      } catch (err) {
        console.error('Preview error:', err);
      }
    };
    const timeoutId = setTimeout(generatePreview, 150);
    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [logo, images, scale, position, watermark, offsetX, offsetY, opacity, rotation, exportFormat]);

  // Persistent Settings Logic
  useEffect(() => {
    const savedSettings = localStorage.getItem('stampr_settings');
    if (savedSettings) {
      try {
        const { scale, position, watermark, offsetX, offsetY, opacity, rotation, exportFormat, quality, renamePattern } = JSON.parse(savedSettings);
        if (scale !== undefined) setScale(scale);
        if (position !== undefined) setPosition(position);
        if (watermark !== undefined) setWatermark(watermark);
        if (offsetX !== undefined) setOffsetX(offsetX);
        if (offsetY !== undefined) setOffsetY(offsetY);
        if (opacity !== undefined) setOpacity(opacity);
        if (rotation !== undefined) setRotation(rotation);
        if (exportFormat !== undefined) setExportFormat(exportFormat);
        if (quality !== undefined) setQuality(quality);
        if (renamePattern !== undefined) setRenamePattern(renamePattern);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
  }, []);

  useEffect(() => {
    const settings = { scale, position, watermark, offsetX, offsetY, opacity, rotation, exportFormat, quality, renamePattern };
    localStorage.setItem('stampr_settings', JSON.stringify(settings));
  }, [scale, position, watermark, offsetX, offsetY, opacity, rotation, exportFormat, quality, renamePattern]);

  const processImages = async () => {
    if (!logo || !images?.length) {
      alert(t('error'));
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const logoImg = await loadImage(logo);
      const output = [];

      for (const file of images) {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const logoW = img.width * scale;
        const logoH = logoImg.height * (logoW / logoImg.width);
        const { x, y } = getPosition(position, img.width, img.height, logoW, logoH, offsetX, offsetY);

        ctx.save();
        ctx.translate(x + logoW / 2, y + logoH / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.globalAlpha = watermark ? 0.3 : opacity;
        ctx.drawImage(logoImg, -logoW / 2, -logoH / 2, logoW, logoH);
        ctx.restore();

        const extension = exportFormat.split('/')[1];
        const baseName = file.name.split('.').slice(0, -1).join('.');
        const finalName = renamePattern.replace('[name]', baseName) + '.' + (extension === 'jpeg' ? 'jpg' : extension);

        output.push({
          src: canvas.toDataURL(exportFormat, exportFormat === 'image/png' ? undefined : quality),
          name: finalName
        });
      }

      setResults(output);
      setProcessedCount(output.length);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('An error occurred while processing images');
    } finally {
      setLoading(false);
    }
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Controls
          setLogo={setLogo}
          setImages={setImages}
          scale={scale}
          setScale={setScale}
          position={position}
          setPosition={setPosition}
          watermark={watermark}
          setWatermark={setWatermark}
          offsetX={offsetX}
          setOffsetX={setOffsetX}
          offsetY={offsetY}
          setOffsetY={setOffsetY}
          opacity={opacity}
          setOpacity={setOpacity}
          rotation={rotation}
          setRotation={setRotation}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          quality={quality}
          setQuality={setQuality}
          renamePattern={renamePattern}
          setRenamePattern={setRenamePattern}
          onProcess={processImages}
          loading={loading}
        />

        {/* Live Preview Console */}
        <div className="sticky top-24 space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Eye size={20} className="text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-200">{t('livePreview')}</h2>
          </div>
          <div className="aspect-video w-full bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-800 overflow-hidden flex items-center justify-center relative shadow-inner">
            {previewSrc ? (
              <img
                src={previewSrc}
                alt="Live Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <Eye className="text-zinc-400" size={24} />
                </div>
                <p className="text-sm font-medium text-zinc-500">
                  {t('previewHint')}
                </p>
              </div>
            )}
          </div>
          {previewSrc && (
            <p className="text-xs text-center text-zinc-500 italic">
              * {t('previewDisclaimer')}
            </p>
          )}
        </div>
      </div>

      <Preview results={results} />
    </div>
  );
}
