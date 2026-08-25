import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORY_CHAPTERS } from '../data/story';
import type { StoryChapter } from '../types/pokemon';
import { BookOpen, MapPin, ChevronRight, X, Award, CheckCircle2 } from 'lucide-react';

interface StoryTimelineProps {
  onPlayClick: () => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onPlayClick }) => {
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null);

  return (
    <section id="story" className="py-24 relative overflow-hidden bg-[#08090D]">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E3350D]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3350D]/10 border border-[#E3350D]/30 text-[#FF6B35] font-pixel text-xs tracking-widest uppercase mb-4">
            <BookOpen className="w-4 h-4 text-[#E3350D]" />
            THE LEGENDARY JOURNEY
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white font-extrabold tracking-wider mb-4">
            THE KANTO <span className="text-[#E3350D]">ADVENTURE</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            Follow the chronological epic of Pokémon FireRed from receiving your first starter in Pallet Town to conquering the Sevii Islands post-game.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORY_CHAPTERS.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => {
                onPlayClick();
                setSelectedChapter(chapter);
              }}
              className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#E3350D]/50 transition-all duration-300 cursor-pointer relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Top Chapter Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-2xl text-[#E3350D] font-extrabold tracking-wider group-hover:text-[#FF6B35] transition-colors">
                    {chapter.number}
                  </span>
                  <span className="text-[11px] font-sans text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#E3350D]" />
                    {chapter.location}
                  </span>
                </div>

                <h3 className="font-pixel text-sm sm:text-base text-white font-bold tracking-wider mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {chapter.title}
                </h3>

                <p className="font-sans text-xs text-gray-400 leading-relaxed mb-6">
                  {chapter.shortDesc}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {chapter.badgeReward ? (
                  <span className="text-[10px] font-pixel text-[#FFAA00] flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#FFAA00]" />
                    {chapter.badgeReward}
                  </span>
                ) : (
                  <span className="text-[10px] font-pixel text-gray-500">MILESTONE</span>
                )}

                <div className="flex items-center gap-1 text-xs text-[#E3350D] font-bold group-hover:translate-x-1 transition-transform">
                  <span>EXPAND</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E3350D] to-[#FF6B35] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chapter Details Modal */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#111318] border border-[#E3350D]/40 rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel relative overflow-hidden max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  onPlayClick();
                  setSelectedChapter(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="font-pixel text-3xl text-[#E3350D] font-extrabold mb-2">
                {selectedChapter.number}
              </div>

              <h2 className="font-pixel text-xl sm:text-2xl text-white font-bold tracking-wider mb-2">
                {selectedChapter.title}
              </h2>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#FF6B35] mb-6">
                <MapPin className="w-3.5 h-3.5" />
                {selectedChapter.location}
              </div>

              <p className="font-sans text-gray-300 text-sm sm:text-base leading-relaxed mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                {selectedChapter.fullDesc}
              </p>

              <div className="mb-6">
                <h4 className="font-pixel text-xs text-[#FF6B35] tracking-widest mb-3 uppercase">
                  KEY CHAPTER HIGHLIGHTS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedChapter.keyEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E3350D] shrink-0" />
                      <span>{evt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    onPlayClick();
                    setSelectedChapter(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#E3350D] text-white font-pixel text-xs tracking-wider font-bold hover:bg-[#FF6B35] transition-colors"
                >
                  CLOSE LORE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
