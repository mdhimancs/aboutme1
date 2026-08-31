/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExecutiveBio } from './components/ExecutiveBio';
import { CoreCompetencies } from './components/CoreCompetencies';
import { CareerJourney } from './components/CareerJourney';
import { TechnicalBlog } from './components/TechnicalBlog';
import { Archive } from './components/Archive';
import { Projects } from './components/Projects';
import { Philosophy } from './components/Philosophy';
import { ContactModal } from './components/ContactModal';
import { InterfaceOptionsModal, ThemeMode, AccentColor, FontStyle } from './components/InterfaceOptionsModal';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SECTIONS = ['overview', 'bio', 'competencies', 'projects', 'career', 'blog', 'philosophy', 'archive'] as const;
type SectionId = typeof SECTIONS[number];

const SECTION_LABELS: Record<SectionId, string> = {
  overview: 'Overview',
  bio: 'Bio',
  competencies: 'Competencies',
  projects: 'Key Projects',
  career: 'Career',
  blog: 'Tech Blog',
  philosophy: 'Philosophy',
  archive: 'Archives & Patents'
};

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [interfaceModalOpen, setInterfaceModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('overview');

  const [theme, setTheme] = useState<ThemeMode>('apple-dark');
  const [accent, setAccent] = useState<AccentColor>('blue');
  const [font, setFont] = useState<FontStyle>('inter');

  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const activeIndex = Math.max(0, SECTIONS.indexOf(activeSection));

  // Navigate to target section smoothly
  const navigateToSection = useCallback((sectionId: SectionId) => {
    const el = document.getElementById(sectionId);
    if (el && containerRef.current) {
      isTransitioningRef.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);
    }
  }, []);

  const navigateToIndex = useCallback((index: number) => {
    if (index >= 0 && index < SECTIONS.length) {
      navigateToSection(SECTIONS[index]);
    }
  }, [navigateToSection]);

  const handleNextPage = useCallback(() => {
    if (activeIndex < SECTIONS.length - 1) {
      navigateToIndex(activeIndex + 1);
    }
  }, [activeIndex, navigateToIndex]);

  const handlePrevPage = useCallback(() => {
    if (activeIndex > 0) {
      navigateToIndex(activeIndex - 1);
    }
  }, [activeIndex, navigateToIndex]);

  // Sync active section based on scroll position in scroll container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isTransitioningRef.current) return;
      const scrollPosition = container.scrollTop + container.clientHeight / 2;

      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Wheel interception for discrete page-down / page-up navigation stops
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if modifier keys are pressed
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Check if event originated inside a scrollable sub-element
      const target = e.target as HTMLElement | null;
      const scrollableChild = target?.closest('.overflow-y-auto') as HTMLElement | null;

      if (scrollableChild) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableChild;
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        // If inner element can scroll further in that direction, let it scroll naturally
        if (isScrollingDown && scrollTop + clientHeight < scrollHeight - 8) {
          return;
        }
        if (isScrollingUp && scrollTop > 8) {
          return;
        }
      }

      // If already animating, prevent standard jump
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Threshold check for wheel intensity
      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        if (e.deltaY > 0) {
          handleNextPage();
        } else {
          handlePrevPage();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleNextPage, handlePrevPage]);

  // Keyboard navigation for page-down / page-up / arrow keys / space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'PageDown' || (e.key === 'ArrowDown' && !e.altKey) || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'PageUp' || (e.key === 'ArrowUp' && !e.altKey) || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToIndex(SECTIONS.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPage, handlePrevPage, navigateToIndex]);

  // Touch swipe support for mobile stops
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;

    // Check if swipe distance is significant (> 45px)
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
    touchStartYRef.current = null;
  };

  // Compute theme background & text styles
  const getThemeClass = () => {
    switch (theme) {
      case 'apple-light':
        return 'bg-[#fcfcfd] text-black';
      case 'obsidian':
        return 'bg-[#06030d] text-[#e2d9fc]';
      case 'terminal':
        return 'bg-black text-[#00ff66] font-mono';
      case 'apple-dark':
      default:
        return 'bg-[#000000] text-[#f5f5f7]';
    }
  };

  const isLight = theme === 'apple-light';

  return (
    <div className={`h-screen w-screen overflow-hidden transition-colors duration-500 theme-${theme} ${getThemeClass()} ${font === 'mono' ? 'font-mono' : 'font-sans'}`}>
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onOpenInterfaceOptions={() => setInterfaceModalOpen(true)}
        activeSection={activeSection}
        theme={theme}
        onNavigate={(id) => navigateToSection(id as SectionId)}
      />
      
      {/* Main Snap Scroll Container */}
      <div 
        ref={containerRef}
        id="main-scroll-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="md:ml-[390px] h-screen overflow-y-auto scroll-container select-text"
      >
        <main className="w-full">
          {/* Stop 1: Overview */}
          <div className="snap-section">
            <Hero 
              onOpenContact={() => setContactOpen(true)} 
              onExploreBlog={() => navigateToSection('blog')} 
              theme={theme} 
            />
          </div>

          {/* Stop 2: Executive Bio */}
          <div className="snap-section">
            <ExecutiveBio 
              theme={theme} 
              onNextPage={handleNextPage}
            />
          </div>

          {/* Stop 3: Core Technical Competencies */}
          <div className="snap-section">
            <CoreCompetencies 
              theme={theme} 
            />
          </div>

          {/* Stop 3.5: Projects */}
          <div className="snap-section">
            <Projects 
              theme={theme} 
            />
          </div>
          
          {/* Stop 4: Career Journey */}
          <div className="snap-section">
            <CareerJourney 
              theme={theme} 
            />
          </div>

          {/* Stop 5: Technical Blog */}
          <div className="snap-section">
            <TechnicalBlog 
              theme={theme} 
            />
          </div>

          {/* Stop 6: Philosophy */}
          <div className="snap-section">
            <Philosophy 
              theme={theme} 
            />
          </div>
          
          {/* Stop 7: Archives & Patents + Integrated Footer */}
          <div className="snap-section">
            <Archive 
              theme={theme} 
              onOpenContact={() => setContactOpen(true)}
              onScrollToTop={() => navigateToIndex(0)}
            />
          </div>
        </main>
      </div>

      {/* Floating Page Stop Navigation Controller & Indicator */}
      <div className="fixed bottom-3 sm:bottom-3.5 right-3.5 sm:right-4 z-40 flex items-center gap-2">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border shadow-xl transition-all ${
          isLight ? 'bg-white/90 border-zinc-200 text-zinc-900 shadow-zinc-200/50' : 'bg-zinc-950/80 border-white/15 text-white shadow-black/80'
        }`}>
          {/* Stop Dots */}
          <div className="hidden sm:flex items-center gap-1.5 px-1">
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec}
                onClick={() => navigateToIndex(idx)}
                title={`Jump to ${SECTION_LABELS[sec]}`}
                className={`transition-all rounded-full ${
                  activeSection === sec
                    ? 'w-4 h-2 bg-blue-500'
                    : `w-2 h-2 ${isLight ? 'bg-zinc-300 hover:bg-zinc-500' : 'bg-white/25 hover:bg-white/50'}`
                }`}
              />
            ))}
          </div>

          <div className={`hidden sm:block h-3.5 w-[1px] ${isLight ? 'bg-zinc-200' : 'bg-white/15'}`} />

          {/* Current Stop Number & Name */}
          <div className="flex items-center gap-1.5 text-xs font-semibold px-1">
            <span className="font-mono text-blue-500 tabular-nums">{activeIndex + 1}</span>
            <span className="text-[10px] opacity-40">/</span>
            <span className="text-[10px] opacity-60 font-mono">8</span>
            <span className="hidden md:inline-block ml-1 font-medium text-xs truncate max-w-[130px]">
              {SECTION_LABELS[activeSection]}
            </span>
          </div>

          {/* Page Up / Page Down Action Buttons */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={handlePrevPage}
              disabled={activeIndex === 0}
              title="Page Up / Previous Stop (↑ or PgUp)"
              className={`p-1 rounded-full border transition-all ${
                activeIndex === 0
                  ? 'opacity-30 cursor-not-allowed border-transparent'
                  : (isLight ? 'hover:bg-zinc-100 border-zinc-200 active:scale-95' : 'hover:bg-white/10 border-white/10 active:scale-95')
              }`}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={activeIndex === SECTIONS.length - 1}
              title="Page Down / Next Stop (↓ or PgDn)"
              className={`p-1 rounded-full border transition-all ${
                activeIndex === SECTIONS.length - 1
                  ? 'opacity-30 cursor-not-allowed border-transparent'
                  : (isLight ? 'hover:bg-zinc-100 border-zinc-200 active:scale-95' : 'hover:bg-white/10 border-white/10 active:scale-95')
              }`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <InterfaceOptionsModal
        isOpen={interfaceModalOpen}
        onClose={() => setInterfaceModalOpen(false)}
        currentTheme={theme}
        onThemeChange={setTheme}
        currentAccent={accent}
        onAccentChange={setAccent}
        currentFont={font}
        onFontChange={setFont}
      />
    </div>
  );
}
