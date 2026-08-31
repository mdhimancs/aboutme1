import React from 'react';
import { ArrowRight, Terminal, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
  onExploreBlog: () => void;
  theme?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreBlog, theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';

  return (
    <section 
      id="overview" 
      className={`relative min-h-screen lg:h-screen w-full flex flex-col justify-center py-4 sm:py-5 px-6 sm:px-10 lg:px-14 max-w-7xl lg:max-w-[1550px] mx-auto overflow-hidden ${
        isLight ? 'bg-[#fcfcfd]' : 'bg-[#000000]'
      }`}
    >
      {/* Subtle Apple-style background glow */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[140px] rounded-full pointer-events-none ${isLight ? 'bg-blue-400/20' : 'bg-blue-600/15'}`} />
      <div className={`absolute top-1/3 left-1/4 w-[350px] h-[300px] blur-[120px] rounded-full pointer-events-none ${isLight ? 'bg-indigo-400/15' : 'bg-indigo-600/10'}`} />

      <div className="relative w-full mx-auto text-center space-y-4 sm:space-y-4 px-2 sm:px-4 shrink-0">
        {/* Badge */}
        <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-inner animate-in fade-in slide-in-from-bottom-3 duration-500 border ${
          isLight ? 'bg-white/80 border-zinc-200 text-zinc-700 shadow-sm' : 'bg-white/[0.04] border-white/10 text-zinc-300'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Strategic Architecture Advisory & Staff Roles discussions</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-2 max-w-6xl mx-auto">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Architecting Cybersecurity & IAM, <span className={`text-transparent bg-clip-text ${isLight ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-zinc-900' : 'bg-gradient-to-r from-blue-400 via-indigo-300 to-white'}`}>Data & Artificial Intelligence</span> at Scale.
          </h1>
          <p className={`w-full max-w-6xl mx-auto text-sm sm:text-base lg:text-lg font-normal leading-relaxed px-1 sm:px-2 ${isLight ? 'text-zinc-800' : 'text-zinc-400'}`}>
            {PERSONAL_INFO.tagline}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
          <a
            href="#career"
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
              isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            <span>Explore Career</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={onExploreBlog}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md transition-all ${
              isLight ? 'bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-sm' : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/25'
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-500" />
            <span>Read Tech Blog</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full max-w-6xl mx-auto">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all group border ${
                isLight ? 'bg-white/90 border-zinc-200 shadow-sm hover:border-zinc-300' : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'}`}>
                {stat.value}
              </div>
              <div className={`text-xs font-medium mt-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
