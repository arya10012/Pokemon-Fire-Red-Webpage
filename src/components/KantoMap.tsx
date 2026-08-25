import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KANTO_LOCATIONS } from '../data/locations';
import type { LocationPoint } from '../types/pokemon';
import { MapPin, Compass, Award, Shield, Sparkles } from 'lucide-react';

interface KantoMapProps {
  onPlayClick: () => void;
}

export const KantoMap: React.FC<KantoMapProps> = ({ onPlayClick }) => {
  const [activeLocation, setActiveLocation] = useState<LocationPoint>(KANTO_LOCATIONS[0]);

  return (
    <section id="kanto" className="py-24 relative overflow-hidden bg-[#08090D]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-teal-900/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-pixel text-xs tracking-widest uppercase mb-4">
            <Compass className="w-4 h-4 text-teal-400" />
            REGIONAL CARTOGRAPHY
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white font-extrabold tracking-wider mb-4">
            INTERACTIVE <span className="text-teal-400">KANTO MAP</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            Click on key cities, oceanic routes, and landmarks across the Kanto mainland to inspect wild encounters, gym leaders, and story lore.
          </p>
        </div>

        {/* Map Container & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Map Canvas */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
            {/* Retro Pixel Map Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />

            {/* Glowing Route Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E3350D" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Route 1: Pallet -> Viridian -> Pewter -> Cerulean */}
              <polyline
                points="18% 78%, 18% 58%, 18% 28%, 52% 28%, 52% 20%"
                fill="none"
                stroke="url(#routeGlow)"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* Route 2: Cerulean -> Saffron -> Vermilion -> Celadon */}
              <polyline
                points="52% 20%, 52% 38%, 40% 38%, 40% 82%, 52% 65%"
                fill="none"
                stroke="url(#routeGlow)"
                strokeWidth="3"
                strokeDasharray="6 4"
              />

              {/* Route 3: Pallet -> Cinnabar -> Fuchsia */}
              <polyline
                points="18% 78%, 18% 92%, 40% 82%"
                fill="none"
                stroke="url(#routeGlow)"
                strokeWidth="3"
                strokeDasharray="6 4"
              />

              {/* Route 4: Viridian -> Victory Road -> Indigo */}
              <polyline
                points="18% 58%, 8% 58%, 8% 15%"
                fill="none"
                stroke="url(#routeGlow)"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Location Nodes */}
            {KANTO_LOCATIONS.map((loc) => {
              const isActive = activeLocation.id === loc.id;

              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    onPlayClick();
                    setActiveLocation(loc);
                  }}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                >
                  {/* Outer Pulsing Aura */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-teal-400/30 scale-125 border-2 border-teal-400 shadow-[0_0_25px_#2DD4BF]'
                        : 'bg-white/10 border border-white/20 hover:scale-110 hover:border-teal-400'
                    }`}
                  >
                    <MapPin
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-teal-300' : 'text-gray-300 group-hover:text-teal-400'
                      }`}
                    />
                  </div>

                  {/* Node Label Tooltip */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2.5 py-1 rounded-md font-pixel text-[9px] whitespace-nowrap shadow-lg transition-all ${
                      isActive
                        ? 'bg-teal-500 text-black font-bold'
                        : 'bg-black/80 text-gray-300 border border-white/10 opacity-70 group-hover:opacity-100'
                    }`}
                  >
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Location Details Panel */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-pixel text-[10px] text-teal-400 uppercase tracking-widest">
                      {activeLocation.type} LOCATION
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      X: {activeLocation.x}% / Y: {activeLocation.y}%
                    </span>
                  </div>
                  <h3 className="font-pixel text-xl sm:text-2xl text-white font-bold tracking-wider">
                    {activeLocation.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
                  {activeLocation.description}
                </p>

                {/* Gym Leader Info */}
                {activeLocation.gymLeader && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                    <Award className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-pixel text-[10px] text-amber-400">GYM LEADER IN RESIDENCE</div>
                      <div className="font-bold text-sm text-white">{activeLocation.gymLeader}</div>
                    </div>
                  </div>
                )}

                {/* Wild Pokémon Found */}
                <div>
                  <div className="font-pixel text-xs text-[#FF6B35] tracking-widest mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    WILD POKÉMON ENCOUNTERS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.wildPokemon.map((poke, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-gray-300"
                      >
                        {poke}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Landmarks */}
                <div>
                  <div className="font-pixel text-xs text-teal-400 tracking-widest mb-3 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    KEY LANDMARKS
                  </div>
                  <div className="space-y-2">
                    {activeLocation.landmarks.map((mark, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-300 bg-black/40 p-2.5 rounded-xl border border-white/5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{mark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
