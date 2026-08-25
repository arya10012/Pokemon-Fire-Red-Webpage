import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Pokemon } from '../types/pokemon';
import { TYPE_COLORS } from '../data/kantoPokemon';
import { fetchPokemonDetails } from '../services/pokeApi';
import { X, Sparkles, Shield, ArrowRight, Activity } from 'lucide-react';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
  onSelectPokemon: (pokemon: Pokemon) => void;
  onPlayClick: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  onClose,
  onSelectPokemon,
  onPlayClick,
}) => {
  const [showShiny, setShowShiny] = useState(false);
  const [detailedPokemon, setDetailedPokemon] = useState<Pokemon | null>(pokemon);
  const [, setLoading] = useState(false);

  useEffect(() => {
    setShowShiny(false);
    if (pokemon) {
      setDetailedPokemon(pokemon);
      setLoading(true);
      fetchPokemonDetails(pokemon.id).then((data) => {
        setDetailedPokemon(data);
        setLoading(false);
      });
    }
  }, [pokemon]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && pokemon) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pokemon, onClose]);

  if (!pokemon || !detailedPokemon) return null;

  const primaryType = detailedPokemon.types[0];
  const primaryStyle = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  const currentArtwork = showShiny && detailedPokemon.shinyArtwork
    ? detailedPokemon.shinyArtwork
    : detailedPokemon.artwork;

  const statItems = [
    { label: 'HP', val: detailedPokemon.stats.hp, max: 255, color: 'bg-emerald-500' },
    { label: 'ATTACK', val: detailedPokemon.stats.attack, max: 190, color: 'bg-[#E3350D]' },
    { label: 'DEFENSE', val: detailedPokemon.stats.defense, max: 230, color: 'bg-amber-500' },
    { label: 'SP. ATK', val: detailedPokemon.stats.specialAttack, max: 194, color: 'bg-cyan-500' },
    { label: 'SP. DEF', val: detailedPokemon.stats.specialDefense, max: 230, color: 'bg-purple-500' },
    { label: 'SPEED', val: detailedPokemon.stats.speed, max: 180, color: 'bg-[#FF6B35]' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-4xl bg-[#111318] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel relative overflow-hidden my-8"
        >
          {/* Top Background Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-30"
            style={{ backgroundColor: primaryStyle.bg }}
          />

          {/* Close Button */}
          <button
            onClick={() => {
              onPlayClick();
              onClose();
            }}
            className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            {/* Left Column: Artwork & Shiny Toggle */}
            <div className="md:col-span-5 flex flex-col items-center justify-between bg-black/40 p-6 rounded-3xl border border-white/5">
              <div className="w-full flex items-center justify-between mb-4">
                <span className="font-pixel text-xs text-gray-400">
                  #{String(detailedPokemon.id).padStart(3, '0')}
                </span>
                <span className="font-pixel text-xs text-[#FF6B35]">
                  {detailedPokemon.category}
                </span>
              </div>

              {/* Artwork */}
              <div className="relative w-full h-56 flex items-center justify-center my-2">
                <img
                  src={currentArtwork}
                  alt={detailedPokemon.name}
                  className="w-52 h-52 object-contain drop-shadow-2xl animate-float"
                />
              </div>

              {/* Shiny Toggle */}
              <button
                onClick={() => {
                  onPlayClick();
                  setShowShiny(!showShiny);
                }}
                className={`w-full py-2.5 px-4 rounded-xl font-pixel text-[11px] tracking-wider font-bold flex items-center justify-center gap-2 border transition-all ${
                  showShiny
                    ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#FFAA00]" />
                {showShiny ? 'SHINY SPRITE ACTIVE' : 'SHOW SHINY SPRITE'}
              </button>

              {/* Height & Weight Info */}
              <div className="grid grid-cols-2 gap-3 w-full mt-4 text-center">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-pixel text-gray-400">HEIGHT</div>
                  <div className="font-bold text-sm text-white mt-0.5">{detailedPokemon.height} m</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-pixel text-gray-400">WEIGHT</div>
                  <div className="font-bold text-sm text-white mt-0.5">{detailedPokemon.weight} kg</div>
                </div>
              </div>
            </div>

            {/* Right Column: Lore, Stats, Abilities & Evolution */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Header & Types */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h2 className="font-pixel text-2xl sm:text-3xl text-white font-extrabold tracking-wider">
                    {detailedPokemon.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    {detailedPokemon.types.map((type) => {
                      const style = TYPE_COLORS[type] || TYPE_COLORS.normal;
                      return (
                        <span
                          key={type}
                          className="px-3 py-1 rounded-full font-pixel text-xs uppercase font-bold tracking-wider shadow-sm"
                          style={{ backgroundColor: style.bg, color: style.text }}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Description Entry */}
                <p className="font-sans text-gray-300 text-sm leading-relaxed mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                  "{detailedPokemon.description}"
                </p>

                {/* Abilities */}
                <div className="mb-6">
                  <div className="font-pixel text-xs text-[#FF6B35] tracking-widest mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    ABILITIES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {detailedPokemon.abilities.map((ability, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-xs font-sans text-gray-300"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Base Stats */}
                <div className="space-y-2.5 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between font-pixel text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1.5 text-[#FF6B35]">
                      <Activity className="w-3.5 h-3.5" />
                      BASE STATS
                    </span>
                    <span className="text-white font-bold">TOTAL: {detailedPokemon.stats.total}</span>
                  </div>

                  {statItems.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3 text-xs">
                      <span className="w-16 font-pixel text-[10px] text-gray-400">{stat.label}</span>
                      <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (stat.val / stat.max) * 100)}%` }}
                          transition={{ duration: 0.6 }}
                          className={`h-full rounded-full ${stat.color}`}
                        />
                      </div>
                      <span className="w-8 text-right font-mono font-bold text-gray-200">{stat.val}</span>
                    </div>
                  ))}
                </div>

                {/* Evolution Chain */}
                {detailedPokemon.evolutionChain && detailedPokemon.evolutionChain.length > 0 && (
                  <div>
                    <div className="font-pixel text-xs text-[#E3350D] tracking-widest mb-3">
                      EVOLUTION CHAIN
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {detailedPokemon.evolutionChain.map((node, index) => (
                        <React.Fragment key={node.id}>
                          <button
                            onClick={() => {
                              onPlayClick();
                              fetchPokemonDetails(node.id).then((p) => onSelectPokemon(p));
                            }}
                            className="flex flex-col items-center p-2 rounded-2xl bg-white/5 border border-white/5 hover:border-[#E3350D] hover:bg-[#E3350D]/10 transition-all shrink-0 group"
                          >
                            <img src={node.artwork} alt={node.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                            <span className="font-pixel text-[10px] text-white mt-1">{node.name}</span>
                            {node.minLevel && (
                              <span className="font-mono text-[9px] text-[#FF6B35]">Lv. {node.minLevel}</span>
                            )}
                          </button>

                          {index < detailedPokemon.evolutionChain!.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
