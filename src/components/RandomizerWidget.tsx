import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullKantoList, TYPE_COLORS } from '../data/kantoPokemon';
import type { Pokemon } from '../types/pokemon';
import { Dices, Eye, EyeOff, Shield } from 'lucide-react';

interface RandomizerWidgetProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
  onPlayPokeballSound: () => void;
}

export const RandomizerWidget: React.FC<RandomizerWidgetProps> = ({
  onSelectPokemon,
  onPlayPokeballSound,
}) => {
  const allPokemon = getFullKantoList();
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>(allPokemon[24]); // Default Pikachu
  const [spinning, setSpinning] = useState(false);
  const [silhouetteMode, setSilhouetteMode] = useState(false);
  const [revealed, setRevealed] = useState(true);

  const handleRandomize = () => {
    onPlayPokeballSound();
    setSpinning(true);
    if (silhouetteMode) setRevealed(false);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allPokemon.length);
      setCurrentPokemon(allPokemon[randomIndex]);
      setSpinning(false);
    }, 600);
  };

  return (
    <section className="py-16 relative overflow-hidden bg-[#08090D] border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden text-center shadow-2xl">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3350D]/10 border border-[#E3350D]/30 text-[#FF6B35] font-pixel text-xs tracking-widest uppercase mb-4">
            <Dices className="w-4 h-4 text-[#E3350D]" />
            KANTO RANDOMIZER WIDGET
          </div>

          <h3 className="font-pixel text-xl sm:text-3xl text-white font-extrabold tracking-wider mb-2">
            WHO'S YOUR NEXT POKÉMON?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-lg mx-auto mb-8">
            Click the spin button to randomly select a partner from the 151 Kanto Pokédex or test your knowledge with mystery silhouette mode!
          </p>

          {/* Randomizer Card Box */}
          <div className="max-w-sm mx-auto bg-black/50 p-6 rounded-3xl border border-white/10 relative overflow-hidden mb-8">
            {/* Silhouette Mode Toggle */}
            <button
              onClick={() => {
                setSilhouetteMode(!silhouetteMode);
                setRevealed(silhouetteMode);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              title={silhouetteMode ? 'Disable Silhouette Mode' : 'Enable Mystery Silhouette Mode'}
            >
              {silhouetteMode ? <EyeOff className="w-4 h-4 text-[#E3350D]" /> : <Eye className="w-4 h-4 text-gray-400" />}
            </button>

            {/* Pokémon Display */}
            <div className="relative w-full h-44 flex items-center justify-center my-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPokemon.id}
                  initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, rotate: 20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={currentPokemon.artwork}
                  alt={currentPokemon.name}
                  className={`w-40 h-40 object-contain drop-shadow-2xl transition-all duration-300 ${
                    silhouetteMode && !revealed ? 'brightness-0 contrast-200' : ''
                  }`}
                />
              </AnimatePresence>
            </div>

            {/* Revealed Name & Info */}
            {(!silhouetteMode || revealed) ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="font-pixel text-xs text-gray-400">
                  #{String(currentPokemon.id).padStart(3, '0')}
                </span>
                <h4 className="font-pixel text-lg text-white font-bold tracking-wider my-1">
                  {currentPokemon.name}
                </h4>

                <div className="flex justify-center gap-1.5 mt-2">
                  {currentPokemon.types.map((type) => {
                    const style = TYPE_COLORS[type];
                    return (
                      <span
                        key={type}
                        className="px-3 py-0.5 rounded-full font-pixel text-[9px] uppercase font-bold"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="font-pixel text-xs text-[#FF6B35]">MYSTERY POKÉMON</div>
                <button
                  onClick={() => setRevealed(true)}
                  className="px-4 py-1.5 rounded-full bg-white/10 text-white font-pixel text-[10px] hover:bg-[#E3350D]"
                >
                  REVEAL IDENTITY
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRandomize}
              disabled={spinning}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#E3350D] to-[#FF6B35] text-white font-pixel text-xs tracking-widest font-bold shadow-xl shadow-[#E3350D]/30 hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {/* Poké Ball Icon */}
              <div className={`w-5 h-5 rounded-full bg-white relative overflow-hidden flex flex-col justify-between p-0.5 border border-black ${spinning ? 'animate-spin' : ''}`}>
                <div className="h-[46%] bg-[#E3350D] rounded-t-full"></div>
                <div className="h-0.5 bg-black w-full absolute top-[46%] left-0"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full border border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="h-[46%] bg-white rounded-b-full"></div>
              </div>
              <span>{spinning ? 'SPINNING...' : 'RANDOMIZE POKÉMON'}</span>
            </button>

            <button
              onClick={() => onSelectPokemon(currentPokemon)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 text-white font-pixel text-xs tracking-widest font-bold transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#FF6B35]" />
              <span>INSPECT STATS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
