import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KANTO_GYMS } from '../data/gyms';
import type { GymLeader } from '../types/pokemon';
import { TYPE_COLORS } from '../data/kantoPokemon';
import { Award, Sparkles, MapPin } from 'lucide-react';

interface GymBadgesProps {
  onPlayClick: () => void;
}

export const GymBadges: React.FC<GymBadgesProps> = ({ onPlayClick }) => {
  const [selectedGym, setSelectedGym] = useState<GymLeader>(KANTO_GYMS[0]);

  return (
    <section id="badges" className="py-24 relative overflow-hidden bg-[#08090D]">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[500px] bg-amber-900/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-pixel text-xs tracking-widest uppercase mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            THE GYM LEAGUE VAULT
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white font-extrabold tracking-wider mb-4">
            THE GYM <span className="text-amber-400">CHALLENGE</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            Collect all 8 official Kanto Gym Badges to prove your strength and gain entry to the Indigo Plateau Elite Four.
          </p>
        </div>

        {/* Badges Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {KANTO_GYMS.map((gym) => {
            const isSelected = selectedGym.id === gym.id;
            const typeStyle = TYPE_COLORS[gym.type];

            return (
              <motion.button
                key={gym.id}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onPlayClick();
                  setSelectedGym(gym);
                }}
                className={`glass-panel rounded-2xl p-4 flex flex-col items-center justify-between border transition-all duration-300 relative group overflow-hidden ${
                  isSelected
                    ? 'border-2 border-amber-400 shadow-[0_0_30px_rgba(255,215,0,0.3)] bg-gradient-to-b from-amber-950/40 to-black'
                    : 'border-white/10 hover:border-amber-400/50'
                }`}
              >
                {/* Badge Number */}
                <span className="font-pixel text-[10px] text-gray-400 mb-2">#{gym.id}</span>

                {/* Metallic 3D Badge Shape Render */}
                <div className="relative w-16 h-16 flex items-center justify-center my-2">
                  <div
                    className="w-14 h-14 rounded-full border-2 border-amber-400 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300"
                    style={{
                      background: `radial-gradient(circle, ${gym.color}dd 0%, #111318 100%)`,
                      boxShadow: `0 0 20px ${gym.color}66`,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full border border-white/40 bg-white/20 flex items-center justify-center font-pixel text-[10px] text-white font-bold">
                      {gym.badgeName.slice(0, 3)}
                    </div>
                  </div>
                </div>

                {/* Badge Name */}
                <span className="font-pixel text-[10px] text-white font-bold text-center mt-2 group-hover:text-amber-400 transition-colors">
                  {gym.badgeName.replace(' BADGE', '')}
                </span>

                {/* Type Pill */}
                <span
                  className="mt-2 px-2 py-0.5 rounded-full font-pixel text-[8px] uppercase font-bold"
                  style={{ backgroundColor: typeStyle.bg, color: typeStyle.text }}
                >
                  {gym.type}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Badge Detailed Card */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-amber-400/40 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGym.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Signature Pokémon Sprite */}
              <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/40 p-6 rounded-3xl border border-white/5 relative">
                <span className="font-pixel text-xs text-amber-400 mb-2">BADGE #{selectedGym.id} OF 8</span>
                <img
                  src={selectedGym.signatureImage}
                  alt={selectedGym.signaturePokemon}
                  className="w-40 h-40 object-contain drop-shadow-2xl animate-float my-2"
                />
                <div className="font-pixel text-xs text-gray-300 mt-2">
                  SIGNATURE: <span className="text-white font-bold">{selectedGym.signaturePokemon}</span>
                </div>
              </div>

              {/* Right Column: Leader Specs */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-pixel text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {selectedGym.city}
                    </span>
                    <h3 className="font-pixel text-2xl text-white font-extrabold tracking-wider mt-1">
                      {selectedGym.badgeName}
                    </h3>
                  </div>

                  <span
                    className="px-3.5 py-1 rounded-full font-pixel text-xs uppercase font-bold shadow-md"
                    style={{
                      backgroundColor: TYPE_COLORS[selectedGym.type].bg,
                      color: TYPE_COLORS[selectedGym.type].text,
                    }}
                  >
                    {selectedGym.type} SPECIALIST
                  </span>
                </div>

                <div className="font-mono text-sm text-amber-300 italic bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
                  "{selectedGym.quote}" — {selectedGym.name}
                </div>

                <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="font-pixel text-xs text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    BADGE PERKS & OBEDIENCE EFFECT
                  </div>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed">
                    {selectedGym.badgeEffect}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
