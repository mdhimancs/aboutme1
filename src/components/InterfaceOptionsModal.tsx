import React, { useState } from 'react';
import { X, Palette, Layout, Type, Check, Sparkles } from 'lucide-react';

export type ThemeMode = 'apple-dark' | 'apple-light' | 'obsidian' | 'terminal';
export type AccentColor = 'blue' | 'emerald' | 'violet' | 'amber';
export type FontStyle = 'inter' | 'mono';

interface InterfaceOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  currentAccent: AccentColor;
  onAccentChange: (accent: AccentColor) => void;
  currentFont: FontStyle;
  onFontChange: (font: FontStyle) => void;
}

export const InterfaceOptionsModal: React.FC<InterfaceOptionsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  currentAccent,
  onAccentChange,
  currentFont,
  onFontChange,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeMode; name: string; desc: string; preview: string }[] = [
    { id: 'apple-dark', name: 'Apple Midnight Dark', desc: 'Sleek frosted dark mode inspired by macOS Sequoia', preview: 'bg-[#000000] border-zinc-700 text-white' },
    { id: 'apple-light', name: 'Apple Studio Light', desc: 'Clean, high-contrast light mode with crisp typography', preview: 'bg-white border-zinc-300 text-zinc-900' },
    { id: 'obsidian', name: 'Cyber Obsidian', desc: 'Deep violet gradient ambiance with glowing highlights', preview: 'bg-[#06030d] border-purple-500/40 text-purple-200' },
    { id: 'terminal', name: 'Hacker Terminal', desc: 'Monochrome matrix feel with high-contrast amber/green', preview: 'bg-black border-emerald-500/50 text-emerald-400' },
  ];

  const accents: { id: AccentColor; name: string; colorClass: string }[] = [
    { id: 'blue', name: 'Apple Blue', colorClass: 'bg-blue-500' },
    { id: 'emerald', name: 'Emerald Green', colorClass: 'bg-emerald-500' },
    { id: 'violet', name: 'Electric Violet', colorClass: 'bg-purple-500' },
    { id: 'amber', name: 'Solar Amber', colorClass: 'bg-amber-500' },
  ];

  const fonts: { id: FontStyle; name: string; desc: string }[] = [
    { id: 'inter', name: 'Inter (Sans-Serif)', desc: 'Modern, clean geometric proportions' },
    { id: 'mono', name: 'JetBrains (Monospace)', desc: 'Developer-first terminal aesthetic' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0a0a0c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Interface Customizer</h3>
              <p className="text-xs text-zinc-400">Tailor the portfolio appearance to your exact aesthetic preference.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Themes */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
            <Layout className="w-3.5 h-3.5" />
            <span>Theme & Surface Mode</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themes.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{t.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-xs text-zinc-400">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accent Color Palette</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {accents.map((acc) => {
              const isSelected = currentAccent === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => onAccentChange(acc.id)}
                  className={`p-3 rounded-xl border flex items-center space-x-2.5 transition-all ${
                    isSelected
                      ? 'border-white bg-white/10'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${acc.colorClass}`} />
                  <span className="text-xs font-medium text-white">{acc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
            <Type className="w-3.5 h-3.5" />
            <span>Typography Mode</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fonts.map((f) => {
              const isSelected = currentFont === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => onFontChange(f.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-semibold text-white">{f.name}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-lg"
          >
            Apply Interface Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
