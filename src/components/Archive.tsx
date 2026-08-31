import React, { useState } from 'react';
import { Archive as ArchiveIcon, ExternalLink, Star, Calendar, Filter, Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { ARCHIVE_ITEMS, PERSONAL_INFO } from '../data/portfolioData';

interface ArchiveProps {
  theme?: string;
  onOpenContact?: () => void;
  onScrollToTop?: () => void;
}

export const Archive: React.FC<ArchiveProps> = ({ 
  theme = 'apple-dark', 
  onOpenContact, 
  onScrollToTop 
}) => {
  const isLight = theme === 'apple-light';
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const types = ['All', 'Open Source', 'Keynote', 'Patent', 'Paper', 'Legacy Project'];
  const years = ['All', '2026', '2025', '2024', '2023'];

  const filteredArchive = ARCHIVE_ITEMS.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesYear = selectedYear === 'All' || item.year.toString() === selectedYear;
    return matchesType && matchesYear;
  });

  return (
    <section 
      id="archive" 
      className={`min-h-screen lg:h-screen w-full flex flex-col justify-between py-4 sm:py-5 px-6 sm:px-10 lg:px-14 max-w-7xl lg:max-w-[1550px] mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Section Header */}
        <div className="w-full space-y-1.5 mb-4 shrink-0 text-center">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-blue-500">Historical Vault</h2>
          <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            Archives & Patents
          </h3>
          <p className={`max-w-3xl mx-auto text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
            A comprehensive catalog of past open-source projects, patents, keynote presentations, and whitepapers.
          </p>
        </div>

        {/* Filters Bar */}
        <div className={`max-w-4xl mx-auto mb-4 flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl backdrop-blur-xl border w-full shrink-0 ${
          isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-white/[0.02] border-white/10'
        }`}>
          <div className="flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto">
            <span className={`text-[11px] font-medium mr-1 flex items-center space-x-1 whitespace-nowrap ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <Filter className="w-3 h-3" />
              <span>Type:</span>
            </span>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedType === t
                    ? 'bg-blue-600 text-white shadow'
                    : (isLight ? 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200' : 'bg-white/[0.04] text-zinc-400 hover:text-white')
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-px h-4 bg-zinc-200 dark:bg-white/10 mx-1" />

          <div className="flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto">
            <span className={`text-[11px] font-medium mr-1 flex items-center space-x-1 whitespace-nowrap ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <Calendar className="w-3 h-3" />
              <span>Year:</span>
            </span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedYear === y
                    ? (isLight ? 'bg-zinc-900 text-white shadow' : 'bg-white text-black shadow')
                    : (isLight ? 'bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-200' : 'bg-white/[0.04] text-zinc-400 hover:text-white')
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Archive Grid */}
        <div className="max-h-[36vh] sm:max-h-[40vh] overflow-y-auto pr-1 sm:pr-2">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredArchive.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-4 sm:p-5 backdrop-blur-xl transition-all group flex flex-col justify-between border ${
                  isLight 
                    ? 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center space-x-1.5 border ${
                      isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white/[0.05] border-white/10 text-blue-400'
                    }`}>
                      <span>{item.type}</span>
                      {item.type === 'Patent' && (
                        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1 py-0.2 rounded font-mono">® TM</span>
                      )}
                    </span>
                    <span className={`text-xs font-mono ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.year}</span>
                  </div>

                  <h4 className={`text-sm sm:text-base font-bold transition-colors tracking-tight ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-300'}`}>
                    {item.title}
                  </h4>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    {item.description}
                  </p>
                </div>

                <div className={`pt-3 border-t space-y-2.5 mt-2 ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t, i) => (
                      <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                        isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-white/[0.03] border-white/5 text-zinc-400'
                      }`}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {item.stars ? (
                      <div className="flex items-center space-x-1 text-xs text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{item.stars.toLocaleString()} stars</span>
                      </div>
                    ) : <div />}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArchive.length === 0 && (
            <div className="text-center py-10 text-zinc-400">
              <ArchiveIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No archive records match the selected filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Integrated Compact Executive Footer */}
      <div className={`pt-4 mt-4 border-t shrink-0 ${isLight ? 'border-zinc-200 text-zinc-600' : 'border-white/10 text-zinc-400'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className={`font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] opacity-40 ml-2">Executive Portfolio Archive</span>
          </div>

          <div className="flex items-center space-x-3">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <Github className="w-3.5 h-3.5" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            {onOpenContact && (
              <button onClick={onOpenContact} className={`hover:text-blue-500 transition-colors ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                <Mail className="w-3.5 h-3.5" />
              </button>
            )}
            {onScrollToTop && (
              <button
                onClick={onScrollToTop}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                  isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200' : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:bg-white/[0.1]'
                }`}
              >
                <span>Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
