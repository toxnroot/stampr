'use client';

import { useTranslations } from 'next-intl';
import { Download, ImageOff, Archive } from 'lucide-react';
import JSZip from 'jszip';

export default function Preview({ results }) {
  const t = useTranslations('ImageLogoTool');

  const downloadAllAsZip = async () => {
    const zip = new JSZip();

    // Add all images to zip
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      // Convert base64 to blob
      const response = await fetch(item.src);
      const blob = await response.blob();
      zip.file(item.name, blob);
    }

    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Download zip
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logo-stamped-images-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!results.length) {
    return (
      <div className="mt-8 sm:mt-10 lg:mt-12 p-8 sm:p-12 lg:p-16 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-2xl sm:rounded-3xl text-center space-y-4 shadow-sm backdrop-blur-sm">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
          <ImageOff size={40} />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg sm:text-2xl font-black text-slate-100">
            {t('noResults')}
          </h3>
          <p className="text-sm sm:text-base text-slate-400 max-w-sm mx-auto">
            {t('uploadHint')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 sm:mt-10 lg:mt-12 space-y-4 sm:space-y-5 lg:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-800/50">
        <h3 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {t('resultsReady')} <span className="text-brand-primary text-lg sm:text-2xl ml-1">({results.length})</span>
        </h3>
        {results.length > 1 && (
          <button
            onClick={downloadAllAsZip}
            className="group relative flex items-center gap-3 px-6 py-3 overflow-hidden rounded-xl sm:rounded-2xl font-black transition-all active:scale-[0.98] shadow-lg shadow-brand-primary/10"
          >
            <div className="absolute inset-0 bg-brand-primary group-hover:scale-105 transition-transform duration-500" />
            <span className="relative z-10 text-white flex items-center gap-2">
              <Archive size={18} />
              {t('downloadAll')}
            </span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {results.map((item, i) => (
          <div
            key={i}
            className="group bg-slate-900/50 border border-slate-800/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-none hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative overflow-hidden bg-slate-950 aspect-[4/5] flex items-center justify-center">
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                onClick={() => window.open(item.src, '_blank')}
                title="انقر لعرض بالحجم الكامل / Click to view full size"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
            </div>
            <div className="p-4 sm:p-5 space-y-4">
              <p className="text-xs sm:text-sm text-slate-400 truncate font-black tracking-tight">
                {item.name}
              </p>
              <a
                href={item.src}
                download={item.name}
                className="group relative flex items-center justify-center gap-2 w-full py-3 sm:py-4 overflow-hidden rounded-xl sm:rounded-2xl font-black transition-all active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-slate-800 group-hover:bg-brand-primary transition-colors duration-300" />
                <span className="relative z-10 text-white group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                  <Download size={18} />
                  {t('download')}
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
