'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ToolGrid({ tools, openToolText }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
                <Link
                    key={tool.id}
                    href={tool.slug}
                    className="group relative flex flex-col p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-xl hover:bg-zinc-900/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-primary/10 overflow-hidden"
                >
                    {/* Animated Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Icon Container */}
                    <div className={`mb-8 w-16 h-16 rounded-2xl ${tool.bg} ${tool.border} border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                        {tool.icon}
                    </div>

                    <div className="space-y-4 flex-1 relative z-10">
                        <h2 className="text-2xl font-black text-white group-hover:text-brand-primary transition-colors duration-300">
                            {tool.title}
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-sm font-medium">
                            {tool.description}
                        </p>
                    </div>

                    <div className="mt-10 flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-[0.2em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {openToolText}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            ))}
        </div>
    );
}
