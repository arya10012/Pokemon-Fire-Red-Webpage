import React, { useState, useMemo } from 'react';
import { getFullKantoList, TYPE_COLORS } from '../data/kantoPokemon';
import type { Pokemon, PokemonType } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { Search, Filter, ArrowUpDown, Shield, ChevronDown } from 'lucide-react';

interface PokedexProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
  onPlayClick: () => void;
}

const TYPE_FILTERS: (PokemonType | 'ALL')[] = [
  'ALL', 'normal', 'fire', 'water', 'grass', 
  'electric', 'psychic', 'rock', 'ground', 
  'poison', 'flying', 'bug', 'ghost', 
  'dragon', 'ice', 'fighting'
];

export const Pokedex: React.FC<PokedexProps> = ({
  onSelectPokemon,
  onPlayClick,
}) => {
  const [selectedType, setSelectedType] = useState<PokemonType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'number' | 'name' | 'stats'>('number');
  const [visibleCount, setVisibleCount] = useState(24);

  const allPokemon = useMemo(() => getFullKantoList(), []);

  const filteredPokemon = useMemo(() => {
    let result = allPokemon;

    // Filter by type
    if (selectedType !== 'ALL') {
      const typeLower = selectedType.toLowerCase() as PokemonType;
      result = result.filter((p) => p.types.includes(typeLower));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toString() === q ||
          `#${p.id}`.includes(q)
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stats') return b.stats.total - a.stats.total;
      return a.id - b.id;
    });
  }, [allPokemon, selectedType, searchQuery, sortBy]);

  const visibleList = filteredPokemon.slice(0, visibleCount);

  return (
    <section id="pokedex" className="py-24 relative overflow-hidden bg-[#08090D]">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#E3350D]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3350D]/10 border border-[#E3350D]/30 text-[#FF6B35] font-pixel text-xs tracking-widest uppercase mb-4">
            <Shield className="w-4 h-4 text-[#E3350D]" />
            OFFICIAL KANTO INDEX
          </div>
          <h2 className="font-pixel text-2xl sm:text-4xl text-white font-extrabold tracking-wider mb-4">
            KANTO <span className="text-[#E3350D]">POKÉDEX</span>
          </h2>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            Browse all 151 original Pokémon discovered across the Kanto region. Filter by element type, search by species, or inspect base stats.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 mb-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Pokémon (#025, Charizard)..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#E3350D] transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-pixel text-gray-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#FF6B35]" />
                SORT:
              </div>
              <select
                value={sortBy}
                onChange={(e) => {
                  onPlayClick();
                  setSortBy(e.target.value as any);
                }}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-pixel text-white focus:outline-none focus:border-[#E3350D] cursor-pointer"
              >
                <option value="number">NUMBER (#001 - #151)</option>
                <option value="name">NAME (A - Z)</option>
                <option value="stats">BASE STAT TOTAL</option>
              </select>
            </div>
          </div>

          {/* Type Filter Pills */}
          <div>
            <div className="text-[11px] font-pixel text-gray-400 mb-3 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#E3350D]" />
              ELEMENT TYPE FILTERS:
            </div>
            <div className="flex flex-wrap gap-2">
              {TYPE_FILTERS.map((type) => {
                const isSelected = selectedType === type;
                const typeKey = type.toLowerCase() as PokemonType;
                const style = type !== 'ALL' ? TYPE_COLORS[typeKey] : null;

                return (
                  <button
                    key={type}
                    onClick={() => {
                      onPlayClick();
                      setSelectedType(type);
                      setVisibleCount(24);
                    }}
                    className={`px-3.5 py-1.5 rounded-full font-pixel text-[10px] tracking-wider uppercase transition-all duration-200 shadow-md ${
                      isSelected
                        ? 'scale-105 border-2 border-white shadow-lg'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={
                      style
                        ? { backgroundColor: style.bg, color: style.text }
                        : { backgroundColor: isSelected ? '#E3350D' : 'rgba(255,255,255,0.1)', color: '#FFFFFF' }
                    }
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs text-gray-400 font-pixel">
          <span>SHOWING {visibleList.length} OF {filteredPokemon.length} POKÉMON</span>
          {selectedType !== 'ALL' && (
            <span className="text-[#FF6B35]">FILTERED BY {selectedType}</span>
          )}
        </div>

        {/* Pokédex Grid */}
        {filteredPokemon.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl border border-white/10">
            <Shield className="w-12 h-12 text-[#E3350D] mx-auto mb-4 opacity-50" />
            <h3 className="font-pixel text-lg text-white mb-2">NO POKÉMON FOUND</h3>
            <p className="font-sans text-sm text-gray-400">
              No Kanto Pokémon matched your search query "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => onSelectPokemon(pokemon)}
                onPlayClick={onPlayClick}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPokemon.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                onPlayClick();
                setVisibleCount((prev) => prev + 24);
              }}
              className="px-8 py-3.5 rounded-2xl bg-white/5 border border-white/15 hover:border-[#E3350D] hover:bg-[#E3350D]/20 font-pixel text-xs text-white tracking-widest font-bold transition-all inline-flex items-center gap-2 shadow-lg"
            >
              <span>LOAD MORE POKÉMON</span>
              <ChevronDown className="w-4 h-4 text-[#E3350D]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
