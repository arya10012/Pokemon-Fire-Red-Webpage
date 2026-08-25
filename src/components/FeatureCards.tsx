import React from 'react';
import { motion } from 'framer-motion';
import { FIRE_RED_FEATURES } from '../data/story';
import { Flame, MapPin, Swords, BookOpen, Radio, Sparkles } from 'lucide-react';

interface FeatureCardsProps {
  onPlayClick: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame,
  MapPin,
  Swords,
  BookOpen,
  Radio,
  Sparkles,
};

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onPlayClick }) => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#08090D]">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-red-950/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3350D]/10 border border-[#E3350D]/30 text-[#FF6B35] font-pixel text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4 text-[#FFAA00]" />
            GAME MECHANICS & HIGHLIGHTS
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white font-extrabold tracking-wider mb-4">
            FIRE RED <span className="text-[#E3350D]">FEATURES</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            Discover the groundbreaking features introduced in Pokémon FireRed that revolutionized the Game Boy Advance Pokémon generation.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIRE_RED_FEATURES.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.iconName] || Sparkles;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={onPlayClick}
                className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#E3350D]/50 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#E3350D]/10 border border-[#E3350D]/30 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-[#E3350D] group-hover:text-[#FF6B35]" />
                  </div>
                  <span className="font-pixel text-[9px] text-[#FF6B35] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="font-pixel text-base text-white font-bold tracking-wider mb-3 group-hover:text-[#FF6B35] transition-colors">
                  {feature.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E3350D] to-[#FF6B35] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
