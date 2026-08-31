import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';

interface TechnicalBlogProps {
  theme?: string;
}

export const TechnicalBlog: React.FC<TechnicalBlogProps> = ({ theme = 'apple-dark' }) => {
  const isLight = theme === 'apple-light';
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section 
      id="blog" 
      className={`min-h-screen lg:h-screen w-full flex flex-col justify-center py-4 sm:py-5 px-4 sm:px-6 lg:px-8 max-w-7xl lg:max-w-[1550px] mx-auto border-t ${
        isLight ? 'border-zinc-200 bg-[#fcfcfd]' : 'border-white/10 bg-[#000000]'
      }`}
    >
      {/* Section Header */}
      <div className="w-full space-y-1.5 mb-4 shrink-0 text-left">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-blue-500">Technical Publications</h2>
        <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          Architecture & Engineering Blog
        </h3>
        <p className={`max-w-4xl text-xs sm:text-sm ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
          Deep dives into distributed systems, Zero Trust federations, AI threat intelligence, and low-latency cryptography.
        </p>
        <p className="text-[10px] italic opacity-50 max-w-3xl pt-1 font-mono">
          Reflections are personal; resemblances to organizational strategies are unintentional.
        </p>
      </div>

      {/* Main Layout Content */}
      <div className="flex flex-col w-full max-w-5xl flex-1 min-h-0">
        
        {/* Search */}
        <div className="mb-3 shrink-0">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search articles by topic, keyword, or architecture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-xs transition-colors backdrop-blur-md border ${
                isLight 
                  ? 'bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none' 
                  : 'bg-white/[0.03] border-white/10 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none shadow-inner'
              }`}
            />
          </div>
        </div>

        {/* Scrollable Blog Content Container */}
        <div className="overflow-y-auto pl-1 sm:pl-2 pr-1 sm:pr-2 space-y-3">
          <div className="w-full pl-0 sm:pl-1">
            <div className={`border-l-2 space-y-4 pb-4 ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
              {Array.from(new Set(filteredPosts.map(p => new Date(p.date).getFullYear()))).sort((a, b) => b - a).map(year => (
                <div key={year} className="relative pl-3.5 sm:pl-4">
                  {/* Year Marker */}
                  <div className={`absolute -left-[24px] top-0 px-2 py-0.5 rounded-full text-[11px] font-bold border shadow-sm ${
                    isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-zinc-900 border-zinc-700 text-white'
                  }`}>
                    {year}
                  </div>
                  
                  <div className="space-y-2 pt-6 sm:pt-5">
                    {filteredPosts.filter(p => new Date(p.date).getFullYear() === year).map(post => {
                      const dateObj = new Date(post.date);
                      const month = dateObj.toLocaleString('default', { month: 'short' });
                      return (
                        <div 
                          key={post.id}
                          onClick={() => setActivePost(post)}
                          className="relative flex items-center gap-1.5 cursor-pointer group"
                        >
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[16px] sm:-left-[18px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 transition-colors ${
                            isLight ? 'bg-white border-zinc-300 group-hover:border-blue-500' : 'bg-black border-zinc-600 group-hover:border-blue-400'
                          }`} />
                          
                          <div className={`w-8 shrink-0 text-[11px] font-semibold ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {month}
                          </div>
                          
                          <div className={`flex-1 rounded-lg px-3 py-1.5 border transition-all ${
                            isLight 
                              ? 'bg-zinc-50/70 border-zinc-200/60 hover:border-zinc-300 hover:bg-white hover:shadow-sm' 
                              : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-0.5">
                              <span className={`text-[9px] uppercase tracking-wider font-bold shrink-0 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                                {post.category}
                              </span>
                              <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600 text-xs">•</span>
                              <h4 className={`text-xs font-bold truncate transition-colors ${isLight ? 'text-zinc-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'}`}>
                                {post.title}
                              </h4>
                            </div>
                            <div className={`text-[11px] line-clamp-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No technical publications found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Reader */}
      <BlogPostModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};
