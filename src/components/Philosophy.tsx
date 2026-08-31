import React from 'react';
import { BookOpen, Heart, Users } from 'lucide-react';

interface PhilosophyProps {
  theme?: string;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light' || theme === 'light';

  return (
    <section id="philosophy" className="py-14 sm:py-16 px-6 sm:px-10 lg:px-14 border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          Philosophy & Gratitude
        </h2>

        {/* Philosophy Content */}
        <div className="mb-8 space-y-4">
          <blockquote className={`text-lg sm:text-xl italic font-serif px-6 py-3 border-l-4 ${isLight ? 'border-blue-500 bg-blue-50/80 text-zinc-900' : 'border-blue-400 bg-white/[0.04] text-zinc-100'}`}>
            "Self-discovery through selfless pursuit of knowledge is the way to illumination." — Buddha
          </blockquote>
          <h3 className={`text-xl sm:text-2xl font-semibold pt-4 flex items-center ${isLight ? 'text-zinc-800' : 'text-white'}`}>
            <BookOpen className="mr-3 w-5 h-5 text-blue-500" /> Intellectual Foundation
          </h3>
          <p className={`font-serif italic text-lg sm:text-xl leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
            True wisdom lies in the constant pursuit of understanding, acknowledging that our knowledge is but a drop in an infinite ocean. Inspired by the resilience of Stoicism and the profound clarity of existential inquiry, I embrace the philosophy that growth is found in the intersection of disciplined action and radical curiosity. We are not defined by what we possess, but by what we contribute to the collective tapestry of human experience.
          </p>
        </div>

        {/* Gratitude Content */}
        <div className="mb-8 space-y-4">
          <h3 className={`text-xl sm:text-2xl font-semibold flex items-center ${isLight ? 'text-zinc-800' : 'text-white'}`}>
            <Heart className="mr-3 w-5 h-5 text-red-500" /> With Gratitude!
          </h3>
          <p className={`font-serif italic text-lg sm:text-xl leading-relaxed ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>
            With Gratitude, this journey has been shaped by the unwavering support and brilliance of many. My deepest gratitude to near and extended family - elders, young ones and contemporaries (actually 5 overlapping generations) for their enduring foundation and love, to friends for their companionship through high and low tides, to seniors and mentors for their wisdom, and to all — intentional or otherwise contributors—who have helped illuminate this path and continue to inspire.
          </p>
        </div>

        {/* Disclaimer */}
        <hr className={`my-8 border-t w-full max-w-2xl mx-auto ${isLight ? 'border-zinc-300' : 'border-white/20'}`} />
        <div className="mb-6 text-center space-y-2">
            <p className={`font-serif italic text-xl sm:text-2xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>À la prochaine, Prenez soin de vous ... Au revoir !</p>
            <p className={`font-serif italic text-base sm:text-lg ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>(Until next time, take care of yourself ... Goodbye!)</p>
        </div>
        <div className={`w-full p-4 rounded-xl border ${isLight ? 'bg-zinc-100/80 border-zinc-200' : 'bg-white/[0.03] border-white/10'}`}>
            <h4 className={`text-xs font-semibold mb-1.5 ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>Disclaimer</h4>
            <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'} leading-relaxed`}>
                The insights shared across this platform represent personal architectural reflections and intellectual exploration. Ideas presented are not necessarily my own; thoughts are personal and subject to change. Any resemblances to other works are purely coincidental or inspirational. Intellectual Property and credits belong to their respective original owners. No infringement is intended; this content is for informational purposes only.
            </p>
        </div>
      </div>
    </section>
  );
};
