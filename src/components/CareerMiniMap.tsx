import React from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Award
} from 'lucide-react';
import { CareerMilestone } from '../types';

interface CareerMiniMapProps {
  milestones: CareerMilestone[];
  allMilestones: CareerMilestone[];
  activeMilestoneId: string | null;
  onSelectMilestone: (id: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  theme?: string;
}

export const CareerMiniMap: React.FC<CareerMiniMapProps> = ({
  milestones,
  allMilestones,
  activeMilestoneId,
  onSelectMilestone,
  selectedFilter,
  onFilterChange,
  theme = 'apple-dark'
}) => {
  const isLight = theme === 'apple-light';

  // Company styling helper
  const getCompanyStyle = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('goldman')) {
      return {
        badge: isLight ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-blue-500/15 text-blue-400 border-blue-500/30',
        dot: 'bg-blue-500 shadow-blue-500/50',
        tag: 'GS',
        color: 'text-blue-500'
      };
    }
    if (c.includes('computer associates')) {
      return {
        badge: isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-500 shadow-emerald-500/50',
        tag: 'CA',
        color: 'text-emerald-500'
      };
    }
    return {
      badge: isLight ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      dot: 'bg-amber-500 shadow-amber-500/50',
      tag: 'AT',
      color: 'text-amber-500'
    };
  };

  return (
    <div 
      className={`rounded-2xl sm:rounded-3xl border p-3 sm:p-4 flex flex-col h-fit backdrop-blur-xl transition-all ${
        isLight 
          ? 'bg-white/90 border-zinc-200 shadow-sm' 
          : 'bg-zinc-950/70 border-white/10 shadow-xl'
      }`}
    >
      {/* Mini Map Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-zinc-200 dark:border-white/10 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              Career Mini-Map & HUD
            </h4>
            <p className="text-[10px] text-zinc-500 font-medium">Interactive Journey Waypoints</p>
          </div>
        </div>

        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
          isLight ? 'bg-zinc-100 text-zinc-700 border-zinc-200' : 'bg-white/[0.05] text-zinc-400 border-white/10'
        }`}>
          2005 — 2025
        </span>
      </div>

      {/* Interactive Waypoints Railway */}
      <div className="overflow-y-auto pr-1 space-y-2 relative">
        {/* Continuous track line behind nodes */}
        <div className={`absolute left-3.5 top-3 w-0.5 ${
          isLight ? 'bg-zinc-200' : 'bg-white/10'
        }`} 
        style={{ height: allMilestones.length > 0 ? `calc(100% - 30px)` : '0' }}
        />

        {allMilestones.map((m, idx) => {
          const isActive = activeMilestoneId === m.id;
          const style = getCompanyStyle(m.company);
          const isFilteredOut = selectedFilter !== 'All' && !m.company.toLowerCase().includes(selectedFilter.toLowerCase());

          return (
            <button
              key={m.id}
              onClick={() => onSelectMilestone(m.id)}
              className={`w-full text-left relative flex items-start gap-2.5 p-2.5 rounded-xl border transition-all ${
                isFilteredOut ? 'opacity-35 grayscale' : 'opacity-100'
              } ${
                isActive
                  ? (isLight 
                      ? 'bg-blue-50/80 border-blue-500/50 shadow-sm ring-1 ring-blue-500/20 translate-x-1' 
                      : 'bg-blue-500/10 border-blue-500/60 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30 translate-x-1')
                  : (isLight 
                      ? 'bg-white/70 border-zinc-200/70 hover:border-zinc-300 hover:bg-zinc-50' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]')
              }`}
            >
              {/* Waypoint Indicator Icon / Dot */}
              <div className="relative shrink-0 mt-0.5 z-10">
                <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                  isLight ? 'bg-white' : 'bg-black'
                } ${
                  isActive 
                    ? 'border-blue-500 ring-4 ring-blue-500/20 scale-110' 
                    : `${isLight ? 'border-zinc-400' : 'border-zinc-600'}`
                } flex items-center justify-center`}>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </div>
              </div>

              {/* Waypoint Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <div className={`text-xs font-semibold truncate ${
                    isActive ? (isLight ? 'text-zinc-900 font-bold' : 'text-white font-bold') : (isLight ? 'text-zinc-800' : 'text-zinc-200')
                  }`}>
                    {m.role.split('|')[0].trim()}
                  </div>
                  <ArrowUpRight className={`w-3 h-3 shrink-0 transition-transform ${isActive ? 'text-blue-500 rotate-45' : 'text-zinc-400 opacity-0 group-hover:opacity-100'}`} />
                </div>

                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[10px] font-mono font-semibold truncate ${
                    isActive ? 'text-blue-500 dark:text-blue-400' : (isLight ? 'text-zinc-600' : 'text-zinc-400')
                  }`}>
                    {m.period.replace(' — ', ' – ')}
                  </span>
                  <span className={`text-[9px] shrink-0 font-semibold px-1.5 py-0.2 rounded border uppercase tracking-wider ${style.badge}`}>
                    {style.tag}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Tip */}
      <div className={`mt-3 pt-2.5 border-t text-[11px] flex items-center justify-between ${
        isLight ? 'border-zinc-200/80 text-zinc-600' : 'border-white/10 text-zinc-400'
      } shrink-0`}>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>Click any waypoint to inspect</span>
        </div>
        <button
          onClick={() => onFilterChange('All')}
          className="text-blue-500 hover:underline text-[10px] font-semibold"
        >
          View Full Span
        </button>
      </div>
    </div>
  );
};
