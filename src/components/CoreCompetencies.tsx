import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Network, 
  Brain, 
  FileCheck, 
  Cpu, 
  Layers,
  Server,
  Database,
  Sparkles
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface CoreCompetenciesProps {
  theme?: string;
}

export const CoreCompetencies: React.FC<CoreCompetenciesProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case 'Lock':
        return <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />;
      case 'Network':
        return <Network className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />;
      case 'FileCheck':
        return <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
      case 'Brain':
        return <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
      case 'Server':
        return <Server className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />;
      default:
        return <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />;
    }
  };

  const filteredCategories = selectedFilter === 'all' 
    ? SKILL_CATEGORIES 
    : SKILL_CATEGORIES.filter(cat => cat.title.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section 
      id="competencies" 
      className={`min-h-screen lg:h-screen w-full flex flex-col justify-center py-4 sm:py-5 px-6 sm:px-10 lg:px-14 max-w-7xl lg:max-w-[1550px] mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* 1. Header with Badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 mb-5 sm:mb-6 shrink-0">
        <div className="space-y-1.5 max-w-5xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border mb-1 ${
            isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Defense-in-Depth Architecture</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Competencies
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
            Comprehensive domain mastery across identity federation, privileged vaulting, cloud security, artificial intelligence, and compliance.
          </p>
        </div>
        <div className={`text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto shrink-0 ${
          isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/[0.05] border-white/10 text-zinc-300'
        }`}>
          6 CyberTech Domains
        </div>
      </div>

      {/* 2. Bento Grid: All 6 Core Competencies Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 shrink-0">
        {filteredCategories.map((cat, idx) => {
          // Sort skills strictly descending by proficiency % (highest on top to lowest at bottom)
          const sortedSkills = [...cat.skills].sort((a, b) => b.level - a.level);

          return (
            <div
              key={idx}
              className={`rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl transition-all group flex flex-col justify-between border ${
                isLight 
                  ? 'bg-white border-zinc-200 shadow-sm hover:border-zinc-300 hover:shadow-md' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                {/* Card Header with Icon, Title (with word-wrap), and Pillar Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`p-1.5 rounded-xl border shrink-0 group-hover:scale-105 transition-transform ${
                      isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/[0.05] border-white/10'
                    }`}>
                      {getIcon(cat.iconName)}
                    </div>
                    <h3 className={`text-xs sm:text-sm font-bold tracking-tight leading-snug break-words ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {cat.title}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 mt-0.5 ${
                    isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/[0.05] border-white/10 text-zinc-400'
                  }`}>
                    Pillar {idx + 1}
                  </span>
                </div>

                {/* Description with Word Wrap */}
                <p className={`text-[11px] sm:text-xs mb-2.5 leading-relaxed break-words line-clamp-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {cat.description}
                </p>
              </div>

              {/* Skills List Sorted Highest % on Top to Lowest at Bottom */}
              <div className={`space-y-1.5 pt-2 border-t ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                {sortedSkills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-start justify-between gap-1.5 text-xs py-0.5">
                    <div className="flex items-start gap-1.5 flex-1 min-w-0 pr-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1" />
                      <span className={`text-[11px] sm:text-xs leading-snug break-words ${isLight ? 'text-zinc-800 font-medium' : 'text-zinc-300'}`}>
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-auto pt-0.5">
                      <div className={`w-8 sm:w-10 h-1 rounded-full overflow-hidden ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 dark:text-blue-400 w-6 text-right tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
