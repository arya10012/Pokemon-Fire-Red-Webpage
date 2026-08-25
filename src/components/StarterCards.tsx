import React from 'react';
import { motion } from 'framer-motion';
import { POKEMON_BY_ID, TYPE_COLORS } from '../data/kantoPokemon';
import { Flame, Droplets, Leaf, Sparkles, Check, Shield } from 'lucide-react';
import type { Pokemon } from '../types/pokemon';

interface StarterCardsProps {
  chosenStarterId: number | null;
  onSelectStarter: (starterId: number) => void;
  onOpenModal: (pokemon: Pokemon) => void;
  onPlayClick: () => void;
}

export const StarterCards: React.FC<StarterCardsProps> = ({
  chosenStarterId,
  onSelectStarter,
  onOpenModal,
  onPlayClick,
}) => {
  const starters = [
    {
      pokemon: POKEMON_BY_ID.get(4)!, // Charmander
      icon: Flame,
      themeColor: '#F08030',
      glowColor: 'rgba(240, 128, 48, 0.4)',
      bgGradient: 'from-orange-950/60 via-red-950/40 to-black',
      quote: 'Prof. Oak: "So! You want the Fire Pokémon Charmander?"',
    },
    {
      pokemon: POKEMON_BY_ID.get(7)!, // Squirtle
      icon: Droplets,
      themeColor: '#6890F0',
      glowColor: 'rgba(104, 144, 240, 0.4)',
      bgGradient: 'from-blue-950/60 via-cyan-950/40 to-black',
      quote: 'Prof. Oak: "So! You want the Water Pokémon Squirtle?"',
    },
    {
      pokemon: POKEMON_BY_ID.get(1)!, // Bulbasaur
      icon: Leaf,
      themeColor: '#78C850',
      glowColor: 'rgba(120, 200, 80, 0.4)',
      bgGradient: 'from-emerald-950/60 via-green-950/40 to-black',
      quote: 'Prof. Oak: "So! You want the Grass Pokémon Bulbasaur?"',
    },
  ];

  return (
    <section id="starters" className="py-24 relative overflow-hidden bg-[#08090D]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E3350D]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3350D]/10 border border-[#E3350D]/30 text-[#FF6B35] font-pixel text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4 text-[#FFAA00]" />
            PALLET TOWN LABORATORY
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white font-extrabold tracking-wider mb-4">
            CHOOSE YOUR <span className="text-[#E3350D]">PARTNER</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            Every Pokémon Master remembers their first decision in Professor Oak’s Lab. Select your partner to begin your Kanto journey.
          </p>
        </div>

        {/* 3 Large Starter Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {starters.map(({ pokemon, icon: Icon, themeColor, bgGradient, quote }) => {
            const isSelected = chosenStarterId === pokemon.id;

            return (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => {
                  onPlayClick();
                  onSelectStarter(pokemon.id);
                }}
                className={`rounded-3xl p-6 sm:p-8 cursor-pointer relative overflow-hidden transition-all duration-500 border ${
                  isSelected
                    ? 'border-2 border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.3)] bg-gradient-to-b ' + bgGradient
                    : 'glass-panel border-white/10 hover:border-white/30'
                }`}
              >
                {/* Chosen Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FFD700] text-black font-pixel text-[10px] tracking-widest font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/40 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                    CHOSEN PARTNER
                  </div>
                )}

                {/* Type Icon Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="p-2.5 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${themeColor}22`, border: `1px solid ${themeColor}66` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: themeColor }} />
                  </div>
                  <div>
                    <span className="font-pixel text-xs text-gray-400">#{String(pokemon.id).padStart(3, '0')}</span>
                    <h3 className="font-pixel text-xl text-white font-bold tracking-wider">{pokemon.name}</h3>
                  </div>
                </div>

                {/* Floating Pokémon Artwork */}
                <div className="relative w-full h-56 flex items-center justify-center my-4">
                  <div
                    className="absolute w-44 h-44 rounded-full blur-2xl opacity-40 transition-all"
                    style={{ backgroundColor: themeColor }}
                  />
                  <motion.img
                    animate={{ y: isSelected ? [0, -12, 0] : [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    src={pokemon.artwork}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Element Type Badges */}
                <div className="flex items-center gap-2 mb-4">
                  {pokemon.types.map((type) => {
                    const style = TYPE_COLORS[type];
                    return (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full font-pixel text-[10px] tracking-wider uppercase font-bold shadow-md"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                  {pokemon.description}
                </p>

                {/* Base Stats Bar */}
                <div className="space-y-2 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between font-pixel text-[10px] text-gray-400 mb-1">
                    <span>BASE STAT TOTAL</span>
                    <span className="text-white font-bold">{pokemon.stats.total} PTS</span>
                  </div>

                  {/* HP */}
                  <div className="flex items-center gap-2 text-xs font-sans">
                    <span className="w-12 text-gray-400 font-mono text-[10px]">HP</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(pokemon.stats.hp / 150) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-emerald-500"
                      />
                    </div>
                    <span className="w-6 text-right font-mono text-[10px] text-gray-300">{pokemon.stats.hp}</span>
                  </div>

                  {/* ATK */}
                  <div className="flex items-center gap-2 text-xs font-sans">
                    <span className="w-12 text-gray-400 font-mono text-[10px]">ATK</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(pokemon.stats.attack / 150) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full bg-[#E3350D]"
                      />
                    </div>
                    <span className="w-6 text-right font-mono text-[10px] text-gray-300">{pokemon.stats.attack}</span>
                  </div>

                  {/* SPD */}
                  <div className="flex items-center gap-2 text-xs font-sans">
                    <span className="w-12 text-gray-400 font-mono text-[10px]">SPD</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(pokemon.stats.speed / 150) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full bg-amber-500"
                      />
                    </div>
                    <span className="w-6 text-right font-mono text-[10px] text-gray-300">{pokemon.stats.speed}</span>
                  </div>
                </div>

                {/* Oak Quote snippet if selected */}
                {isSelected && (
                  <p className="font-mono text-xs text-[#FFD700] mb-6 italic bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    {quote}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayClick();
                      onSelectStarter(pokemon.id);
                    }}
                    className={`flex-1 py-3 rounded-xl font-pixel text-[11px] tracking-wider font-bold transition-all shadow-md ${
                      isSelected
                        ? 'bg-[#FFD700] text-black hover:bg-amber-400'
                        : 'bg-white/10 text-white hover:bg-[#E3350D] hover:text-white'
                    }`}
                  >
                    {isSelected ? 'PARTNER SELECTED' : 'CHOOSE PARTNER'}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayClick();
                      onOpenModal(pokemon);
                    }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white"
                    title="View Full Stats"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
