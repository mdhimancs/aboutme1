import React, { useState, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, Map as MapIcon } from 'lucide-react';
import { CAREER_MILESTONES } from '../data/portfolioData';
import { CareerMiniMap } from './CareerMiniMap';

interface CareerJourneyProps {
  theme?: string;
}

export const CareerJourney: React.FC<CareerJourneyProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(CAREER_MILESTONES[0]?.id || null);
  const [mobileMiniMapOpen, setMobileMiniMapOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { label: 'All Roles (2005–2025)', value: 'All' },
    { label: 'Goldman Sachs (14+ Yrs · 2011–2025)', value: 'Goldman Sachs' },
    { label: 'Computer Associates (2+ Yrs · 2009–2011)', value: 'Computer Associates' },
    { label: 'Amrita Technologies (4+ Yrs · 2005–2009)', value: 'Amrita Technologies' }
  ];

  const filteredMilestones = selectedFilter === 'All'
    ? CAREER_MILESTONES
    : CAREER_MILESTONES.filter((m) => m.company.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleFilterChange = (filterVal: string) => {
    setSelectedFilter(filterVal);
    const matches = filterVal === 'All'
      ? CAREER_MILESTONES
      : CAREER_MILESTONES.filter((m) => m.company.toLowerCase().includes(filterVal.toLowerCase()));

    if (matches.length > 0) {
      const targetId = matches[0].id;
      setExpandedId(targetId);
      setTimeout(() => {
        const el = document.getElementById(`milestone-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  const handleSelectMilestone = (id: string) => {
    const target = CAREER_MILESTONES.find(m => m.id === id);
    if (target && selectedFilter !== 'All' && !target.company.toLowerCase().includes(selectedFilter.toLowerCase())) {
      setSelectedFilter('All');
    }
    setExpandedId(id);
    
    // Smooth scroll into view
    setTimeout(() => {
      const el = document.getElementById(`milestone-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  };

  return (
    <section 
      id="career" 
      className={`min-h-screen lg:h-screen w-full flex flex-col justify-center py-3 sm:py-4 px-6 sm:px-10 lg:px-14 max-w-7xl lg:max-w-[1700px] mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Section Header */}
      <div className="text-center space-y-1.5 mb-3 sm:mb-4 shrink-0">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-blue-500">Professional Experience</h2>
        <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          Career & Milestones
        </h3>
        <p className={`max-w-3xl mx-auto text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          A track record of delivering engineering leadership and resilient distributed Cybertechnology, IAM/PAM architecture across Leading Banking Finance, Digital & Consumer banking, capital and trading markets & Fortune 100 enterprises.
        </p>
      </div>

      {/* Filter and Controls Header */}
      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 shrink-0 relative">
        <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2 mx-auto overflow-x-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === opt.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : (isLight 
                      ? 'bg-zinc-100 text-zinc-700 hover:text-black hover:bg-zinc-200 border border-zinc-200' 
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10')
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Mobile Mini-Map toggle button */}
        <button
          onClick={() => setMobileMiniMapOpen(!mobileMiniMapOpen)}
          className={`lg:hidden absolute right-0 flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            mobileMiniMapOpen 
              ? 'bg-blue-600 text-white border-blue-600' 
              : (isLight ? 'bg-zinc-100 text-zinc-700 border-zinc-200' : 'bg-white/[0.05] text-zinc-300 border-white/10')
          }`}
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>{mobileMiniMapOpen ? 'Hide Mini-Map' : 'View Mini-Map'}</span>
        </button>
      </div>

      {/* Mobile Mini-Map Dropdown (Visible only on smaller screens when toggled) */}
      {mobileMiniMapOpen && (
        <div className="lg:hidden mb-4 max-h-[50vh] overflow-y-auto">
          <CareerMiniMap
            milestones={filteredMilestones}
            allMilestones={CAREER_MILESTONES}
            activeMilestoneId={expandedId}
            onSelectMilestone={(id) => {
              handleSelectMilestone(id);
              setMobileMiniMapOpen(false);
            }}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            theme={theme}
          />
        </div>
      )}

      {/* Main Dual-Column Content: Timeline on Left, Mini Map on Right or Left shifted */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch flex-1 min-h-0 pt-2 sm:pt-3">
        
        {/* Timeline Milestone Cards (Moved to left side) */}
        <div 
          ref={listContainerRef}
          className="lg:col-span-8 xl:col-span-8 max-h-[65vh] sm:max-h-[75vh] overflow-y-auto pl-2 sm:pl-4 pr-2 sm:pr-4 space-y-4"
        >
          <div className={`relative border-l-2 ${isLight ? 'border-zinc-200' : 'border-white/10'} pl-4 sm:pl-6 space-y-5 py-1 ml-2 sm:ml-3`}>
            {filteredMilestones.map((milestone) => {
              const isExpanded = expandedId === milestone.id;
              return (
                <div 
                  key={milestone.id} 
                  id={`milestone-${milestone.id}`}
                  className="relative group scroll-mt-4"
                >
                  {/* Timeline Bullet */}
                  <div className={`absolute -left-[23px] sm:-left-[31px] top-2 w-3.5 h-3.5 rounded-full ${isLight ? 'bg-white' : 'bg-black'} border-2 ${
                    isExpanded ? 'border-blue-500 bg-blue-500 scale-125' : 'border-blue-500/70'
                  } group-hover:scale-125 group-hover:bg-blue-500 transition-all shadow-md`} />

                  <div
                    onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                    className={`border rounded-2xl sm:rounded-3xl p-4 sm:p-5 backdrop-blur-xl transition-all cursor-pointer ${
                      isLight
                        ? (isExpanded ? 'border-blue-500 bg-white shadow-md ring-1 ring-blue-500/20' : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm')
                        : (isExpanded ? 'border-blue-500/50 bg-white/[0.04] shadow-xl' : 'bg-white/[0.02] border-white/10 hover:border-white/25')
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-2.5">
                      <div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/20 inline-block mb-1">
                          {milestone.category}
                        </span>
                        <h4 className={`text-base sm:text-lg font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          {milestone.role}
                        </h4>
                        <div className={`text-xs sm:text-sm font-medium ${isLight ? 'text-zinc-700' : 'text-zinc-300'} mt-0.5`}>
                          {milestone.company}
                        </div>
                      </div>
                      <div className={`flex flex-col sm:items-end text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'} space-y-0.5 shrink-0`}>
                        <div className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/[0.05] border-white/10'}`}>
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span className="text-[11px] font-medium">{milestone.period}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-zinc-500 text-[11px]">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          <span>{milestone.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm mb-2.5 leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                      {milestone.summary}
                    </p>

                    {/* Key Achievements (Collapsible) */}
                    {isExpanded && (
                      <div className={`space-y-2.5 pt-2.5 border-t ${isLight ? 'border-zinc-100' : 'border-white/10'} animate-in fade-in duration-300`}>
                        <div className={`text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          Key Architectural Impact
                        </div>
                        <ul className="space-y-1.5">
                          {milestone.achievements.map((ach, i) => (
                            <li key={i} className={`flex items-start space-x-2 text-xs sm:text-sm ${isLight ? 'text-zinc-800' : 'text-zinc-300'}`}>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-1.5 flex flex-wrap gap-1.5">
                          {milestone.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${
                                isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/[0.05] border-white/10 text-zinc-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs font-medium text-blue-500">
                      <span>{isExpanded ? 'Collapse details' : 'Click to inspect achievements & tech stack'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Career Mini-Map HUD */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-4 h-fit max-h-[65vh] sm:max-h-[75vh]">
          <CareerMiniMap
            milestones={filteredMilestones}
            allMilestones={CAREER_MILESTONES}
            activeMilestoneId={expandedId}
            onSelectMilestone={handleSelectMilestone}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            theme={theme}
          />
        </div>

      </div>
    </section>
  );
};
