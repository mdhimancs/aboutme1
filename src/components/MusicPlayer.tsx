import React, { useState } from 'react';
import { Music, X, Play, Pause } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Using the requested YouTube URL
  const videoId = 'QBbcl05Bx1U'; 

  return (
    <div className="relative z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 p-1.5 transition-colors text-zinc-400 hover:text-white"
          title="Music Player"
        >
          <Music className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-semibold">Music</span>
        </button>
      ) : (
        <div className="absolute top-8 right-0 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl shadow-2xl w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-xs font-semibold">Music Player</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            width="100%"
            height="150"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
            title="Music Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg mb-2"
          ></iframe>
        </div>
      )}
    </div>
  );
};
