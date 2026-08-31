import React, { useState } from 'react';
import { Menu, X, ArrowRight, Github, Linkedin, Mail, Sliders, Shield, Swords, Music } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MusicPlayer } from './MusicPlayer';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenInterfaceOptions: () => void;
  activeSection: string;
  theme?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onOpenInterfaceOptions, 
  activeSection, 
  theme = 'apple-dark',
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = theme === 'apple-light';

  const navLinks = [
    { id: 'overview', name: 'Overview', href: '#overview', num: '1' },
    { id: 'bio', name: 'Bio', href: '#bio', num: '2' },
    { id: 'competencies', name: 'Competencies', href: '#competencies', num: '3' },
    { id: 'projects', name: 'Projects', href: '#projects', num: '4' },
    { id: 'career', name: 'Career', href: '#career', num: '5' },
    { id: 'blog', name: 'Tech Blog', href: '#blog', num: '6' },
    { id: 'philosophy', name: 'Philosophy', href: '#philosophy', num: '7' },
    { id: 'archive', name: 'Archives', href: '#archive', num: '8' },
  ];

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className={`hidden md:flex fixed top-0 left-0 bottom-0 w-[390px] z-50 flex-col justify-between px-12 py-8 border-r backdrop-blur-2xl transition-all ${
        isLight
          ? 'bg-white/90 border-zinc-200 text-zinc-900 shadow-sm'
          : 'bg-[#050507]/90 border-white/10 text-white shadow-2xl'
      }`}>
        {/* Top: Name & Navigation */}
        <div className="space-y-7">
          <div className="space-y-3">
            <a
              href="#overview"
              onClick={(e) => handleLinkClick(e, 'overview')}
              className="flex flex-col space-y-1.5 group cursor-pointer pl-5"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                  {/* Thin, razor-sharp Crossed Swords / Spears behind Shield */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
                    <Swords className="w-7 h-7 text-white transform scale-110" strokeWidth={1} />
                  </div>
                  {/* Bigger Security Shield in foreground */}
                  <Shield className="w-6 h-6 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
                </div>
                <span className={`text-lg font-sans font-bold tracking-tight block ${isLight ? 'text-zinc-900 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]' : 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]'}`}>
                  {PERSONAL_INFO.name}
                </span>
              </div>
              <span className="text-[11px] text-blue-500 font-semibold tracking-wide text-left self-start">Cybersecurity & IAM • Data & AI</span>
            </a>

            {/* Slim Divider Line */}
            <div className={`h-px w-full my-2.5 ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} />

            {/* GitHub, LinkedIn, and Get in Touch Mail links */}
            <div className="flex flex-col space-y-1.5 py-1 pl-5 w-full">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 py-1.5 px-3 self-start -ml-1 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 w-full ${
                  isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
                title="GitHub Profile"
              >
                <Github className="w-5 h-5 flex-shrink-0" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 py-1.5 px-3 self-start -ml-1 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 w-full ${
                  isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>LinkedIn</span>
              </a>
              <button
                onClick={onOpenContact}
                className={`flex items-center space-x-3 py-1.5 px-3 self-start -ml-1 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 w-full text-left cursor-pointer ${
                  isLight ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90' : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
                title="Get in Touch via Email"
              >
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Slim Divider Line */}
            <div className={`h-px w-full my-2.5 ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} />
          </div>

          <nav className="space-y-0.5 w-full">
            <div className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 pl-5 mb-1.5 flex items-center justify-between">
              <span>Navigation</span>
            </div>
            <div className="space-y-0.5 pl-5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`flex items-center justify-between px-3 py-1.5 -ml-1 rounded-xl text-base sm:text-[17px] font-medium transition-all duration-150 w-full group cursor-pointer ${
                      isActive
                        ? isLight
                          ? 'bg-blue-50/90 text-blue-600 font-semibold shadow-xs'
                          : 'bg-white/10 text-white font-semibold shadow-xs'
                        : isLight
                          ? 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom: Copyright & Status */}
        <div className="space-y-4">
          <div className={`h-px w-full ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`} />
          <div className="flex flex-col space-y-2">
            <div className={`text-[10px] font-medium leading-relaxed ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <span className="font-bold text-blue-500">{PERSONAL_INFO.name}</span> • Copyright © 2011 - 2026
            </div>
            <div className={`text-[10px] font-semibold flex items-center gap-1.5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              <Shield className="w-3 h-3" />
              <span>Registered Security Architect™</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Top Right Floating Bar */}
      <div className="hidden md:flex fixed top-4 right-[600px] z-50 items-center gap-3">
        {/* Theme Options */}
        <button
          onClick={onOpenInterfaceOptions}
          className={`flex items-center space-x-2 transition-colors ${
            isLight 
              ? 'text-zinc-500 hover:text-zinc-900' 
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Theme & Interface Options"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold">Themes</span>
        </button>
        <MusicPlayer />
      

        </div>


      {/* Mobile Top Header */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-xl border-b transition-all ${
        isLight ? 'bg-white/90 border-zinc-200 text-zinc-900' : 'bg-[#000000]/90 border-white/10 text-white'
      }`}>
        <a 
          href="#overview" 
          onClick={(e) => handleLinkClick(e, 'overview')}
          className="flex items-center space-x-2 pl-4"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-400 via-indigo-400 to-blue-300 flex items-center justify-center text-white shadow-md shadow-blue-400/25 flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90">
              <Swords className="w-5 h-5 text-white transform scale-110" strokeWidth={1} />
            </div>
            <Shield className="w-4 h-4 text-white relative z-10 drop-shadow-sm fill-white/20" strokeWidth={2} />
          </div>
          <span className={`font-semibold text-xs sm:text-sm truncate ${isLight ? 'drop-shadow-[0_1px_5px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_1px_6px_rgba(255,255,255,0.2)]'}`}>{PERSONAL_INFO.name}</span>
        </a>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenInterfaceOptions}
            className={`p-1.5 transition-colors ${isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-full border ${isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'}`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden fixed inset-0 z-40 pt-16 px-6 backdrop-blur-2xl space-y-4 animate-in fade-in duration-200 ${
          isLight ? 'bg-white/95 text-zinc-900' : 'bg-[#0a0a0c]/95 text-white'
        }`}>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link.id);
                }}
                className={`flex items-center justify-between px-4 py-2 rounded-xl text-[17px] font-medium ${
                  activeSection === link.id
                    ? (isLight ? 'bg-blue-50 text-blue-600 font-semibold' : 'bg-white/10 text-white font-semibold')
                    : (isLight ? 'hover:bg-zinc-100 text-zinc-800' : 'hover:bg-white/5 text-zinc-200')
                }`}
              >
                <span>{link.name}</span>
                {activeSection === link.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-200 dark:border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
