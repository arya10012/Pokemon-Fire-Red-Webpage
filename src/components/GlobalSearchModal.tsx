import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Award, BookOpen, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFullKantoList } from '../data/kantoPokemon';
import { KANTO_LOCATIONS } from '../data/locations';
import { KANTO_GYMS } from '../data/gyms';
import { STORY_CHAPTERS } from '../data/story';
import type { Pokemon } from '../types/pokemon';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPokemon: (pokemon: Pokemon) => void;
  onPlayClick: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPokemon,
  onPlayClick,
}) => {
  const [query, setQuery] = useState('');
  const allPokemon = getFullKantoList();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          onPlayClick();
          // open handled outside
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPlayClick]);

  if (!isOpen) return null;

  const filteredPokemon = query.trim()
    ? allPokemon.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.id.toString() === query.trim() ||
          p.types.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : allPokemon.slice(0, 6);

  const filteredLocations = query.trim()
    ? KANTO_LOCATIONS.filter(
        (l) =>
          l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : KANTO_LOCATIONS.slice(0, 3);

  const filteredGyms = query.trim()
    ? KANTO_GYMS.filter(
        (g) =>
          g.name.toLowerCase().includes(query.toLowerCase()) ||
          g.city.toLowerCase().includes(query.toLowerCase()) ||
          g.badgeName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredStory = query.trim()
    ? STORY_CHAPTERS.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#111318] border border-[#E3350D]/40 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-black/40">
            <Search className="w-5 h-5 text-[#E3350D]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Pokémon (#006, Pikachu), Kanto cities, Gym Badges, or Lore..."
              className="w-full bg-transparent text-white font-sans text-sm sm:text-base outline-none placeholder:text-gray-500"
              autoFocus
            />
            <button
              onClick={() => {
                onPlayClick();
                onClose();
              }}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
            {/* Pokémon Results */}
            <div>
              <div className="text-xs font-pixel text-[#FF6B35] tracking-widest mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#E3350D]" />
                POKÉDEX ENTRIES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredPokemon.map((pokemon) => (
                  <button
                    key={pokemon.id}
                    onClick={() => {
                      onPlayClick();
                      onSelectPokemon(pokemon);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#E3350D]/50 hover:bg-[#E3350D]/10 text-left transition-all group"
                  >
                    <img
                      src={pokemon.artwork}
                      alt={pokemon.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <div className="text-xs font-pixel text-gray-400">
                        #{String(pokemon.id).padStart(3, '0')}
                      </div>
                      <div className="font-bold text-sm text-white group-hover:text-[#FF6B35]">
                        {pokemon.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Kanto Map Results */}
            {filteredLocations.length > 0 && (
              <div>
                <div className="text-xs font-pixel text-teal-400 tracking-widest mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  KANTO LOCATIONS
                </div>
                <div className="space-y-2">
                  {filteredLocations.map((loc) => (
                    <a
                      key={loc.id}
                      href="#kanto"
                      onClick={() => {
                        onPlayClick();
                        onClose();
                      }}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-teal-500/50 hover:bg-teal-500/10 text-left transition-all"
                    >
                      <MapPin className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-sm text-white">{loc.name}</div>
                        <div className="text-xs text-gray-400 line-clamp-1">{loc.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Gym Leaders Results */}
            {filteredGyms.length > 0 && (
              <div>
                <div className="text-xs font-pixel text-amber-400 tracking-widest mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  GYM LEADERS & BADGES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredGyms.map((gym) => (
                    <a
                      key={gym.id}
                      href="#badges"
                      onClick={() => {
                        onPlayClick();
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/10 text-left transition-all"
                    >
                      <img src={gym.signatureImage} alt={gym.name} className="w-9 h-9 object-contain" />
                      <div>
                        <div className="font-bold text-sm text-white">{gym.badgeName}</div>
                        <div className="text-xs text-amber-400">{gym.name} — {gym.city}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Story Lore Results */}
            {filteredStory.length > 0 && (
              <div>
                <div className="text-xs font-pixel text-purple-400 tracking-widest mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  STORY CHAPTERS
                </div>
                <div className="space-y-2">
                  {filteredStory.map((ch) => (
                    <a
                      key={ch.id}
                      href="#story"
                      onClick={() => {
                        onPlayClick();
                        onClose();
                      }}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 text-left transition-all"
                    >
                      <div className="font-pixel text-xs text-purple-400 px-2 py-1 bg-purple-900/40 rounded border border-purple-500/30">
                        {ch.number}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{ch.title}</div>
                        <div className="text-xs text-gray-400">{ch.shortDesc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-black/60 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono">ESC</kbd> to exit</span>
            <span className="font-pixel text-[10px] text-[#E3350D]">KANTO SEARCH ENGINE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
