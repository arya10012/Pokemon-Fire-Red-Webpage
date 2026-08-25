import React from 'react';
import { motion } from 'framer-motion';
import type { Pokemon } from '../types/pokemon';
import { TYPE_COLORS } from '../data/kantoPokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  onPlayClick: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
  onPlayClick,
}) => {
  const primaryType = pokemon.types[0];
  const primaryStyle = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        onPlayClick();
        onClick();
      }}
      className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-[#E3350D]/60 transition-all duration-300 cursor-pointer relative group overflow-hidden flex flex-col justify-between"
    >
      {/* Background Ambient Glow matching primary type */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity"
        style={{ backgroundColor: primaryStyle.bg }}
      />

      {/* Card Header: #ID and Name */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-pixel text-[11px] text-gray-400 font-semibold tracking-wider">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
            BST {pokemon.stats.total}
          </span>
        </div>

        <h3 className="font-pixel text-sm sm:text-base text-white font-bold tracking-wider group-hover:text-[#FF6B35] transition-colors mb-3">
          {pokemon.name}
        </h3>
      </div>

      {/* Floating Official Artwork */}
      <div className="relative w-full h-40 flex items-center justify-center my-2">
        <motion.img
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + (pokemon.id % 3), repeat: Infinity, ease: 'easeInOut' }}
          src={pokemon.artwork}
          alt={pokemon.name}
          loading="lazy"
          className="w-32 h-32 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Card Footer: Type Badges */}
      <div className="flex items-center gap-1.5 pt-3 border-t border-white/5">
        {pokemon.types.map((type) => {
          const style = TYPE_COLORS[type] || TYPE_COLORS.normal;
          return (
            <span
              key={type}
              className="px-2.5 py-0.5 rounded-full font-pixel text-[9px] uppercase font-bold tracking-wider shadow-sm"
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {type}
            </span>
          );
        })}
      </div>

      {/* Hover Bottom Accent Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: primaryStyle.bg }}
      />
    </motion.div>
  );
};
