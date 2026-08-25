import React from 'react';
import { Heart, Shield } from 'lucide-react';

interface FooterProps {
  onPlayClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPlayClick }) => {
  return (
    <footer className="relative bg-[#050608] border-t border-[#E3350D]/20 pt-16 pb-12 overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E3350D]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E3350D] to-[#FF6B35] p-0.5 shadow-lg shadow-[#E3350D]/30">
                <div className="w-full h-full rounded-full bg-[#111318] relative overflow-hidden flex flex-col justify-between p-0.5">
                  <div className="h-[46%] bg-[#E3350D] rounded-t-full"></div>
                  <div className="h-0.5 bg-black w-full absolute top-[46%] left-0"></div>
                  <div className="w-3 h-3 bg-white rounded-full border border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#111318] rounded-full animate-ping"></div>
                  </div>
                  <div className="h-[46%] bg-white rounded-b-full"></div>
                </div>
              </div>
              <span className="font-pixel text-sm text-white font-bold tracking-widest">
                FIRE<span className="text-[#E3350D]">RED</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              A tribute to one of the most memorable Pokémon adventures. Remastered as a modern interactive web Pokédex experience for fans worldwide.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <div className="font-pixel text-xs text-[#FF6B35] tracking-widest mb-4">
              EXPLORE
            </div>
            <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
              <li><a href="#hero" onClick={onPlayClick} className="hover:text-white transition-colors">Hero Overview</a></li>
              <li><a href="#story" onClick={onPlayClick} className="hover:text-white transition-colors">Kanto Storyline</a></li>
              <li><a href="#starters" onClick={onPlayClick} className="hover:text-white transition-colors">Starter Selection</a></li>
              <li><a href="#features" onClick={onPlayClick} className="hover:text-white transition-colors">FireRed Features</a></li>
            </ul>
          </div>

          {/* Column 3: Pokédex & Map */}
          <div>
            <div className="font-pixel text-xs text-[#E3350D] tracking-widest mb-4">
              POKÉDEX & MAP
            </div>
            <ul className="space-y-2.5 text-xs text-gray-400 font-sans">
              <li><a href="#pokedex" onClick={onPlayClick} className="hover:text-white transition-colors">151 Kanto Pokédex</a></li>
              <li><a href="#kanto" onClick={onPlayClick} className="hover:text-white transition-colors">Interactive Kanto Map</a></li>
              <li><a href="#badges" onClick={onPlayClick} className="hover:text-white transition-colors">8 Gym Badges Vault</a></li>
              <li><a href="#rocket" onClick={onPlayClick} className="hover:text-white transition-colors">Team Rocket Base</a></li>
            </ul>
          </div>

          {/* Column 4: Easter Egg Info */}
          <div>
            <div className="font-pixel text-xs text-amber-400 tracking-widest mb-4">
              SECRET TRAINER CODE
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 space-y-2">
              <p>Try entering the classic Konami code on your keyboard:</p>
              <div className="font-mono text-[11px] text-amber-300 font-bold tracking-widest bg-black/50 p-2 rounded border border-amber-500/20 text-center">
                ↑ ↑ ↓ ↓ ← → ← →
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#E3350D] fill-[#E3350D]" />
            <span>for Pokémon fans worldwide.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-400">
              <Shield className="w-3.5 h-3.5 text-[#E3350D]" /> Non-commercial fan experience
            </span>
            <span>© Pokémon / Nintendo / Game Freak</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
