import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenSearch: () => void;
  dayNightMode: 'day' | 'night';
  onToggleDayNight: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  trainerLevel: number;
  onPlayClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  dayNightMode,
  onToggleDayNight,
  soundEnabled,
  onToggleSound,
  trainerLevel,
  onPlayClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'STORY', href: '#story' },
    { name: 'STARTERS', href: '#starters' },
    { name: 'POKÉDEX', href: '#pokedex' },
    { name: 'KANTO', href: '#kanto' },
    { name: 'BADGES', href: '#badges' },
    { name: 'ROCKET', href: '#rocket' },
    { name: 'FEATURES', href: '#features' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090D]/85 backdrop-blur-xl border-b border-[#E3350D]/20 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={onPlayClick}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#E3350D] to-[#FF6B35] p-0.5 shadow-lg shadow-[#E3350D]/30 group-hover:scale-105 transition-transform duration-300">
            {/* Poké Ball Icon */}
            <div className="w-full h-full rounded-full bg-[#111318] relative overflow-hidden flex flex-col justify-between p-0.5">
              <div className="h-[46%] bg-[#E3350D] rounded-t-full"></div>
              <div className="h-1 bg-black w-full absolute top-[46%] left-0"></div>
              <div className="w-3.5 h-3.5 bg-white rounded-full border-2 border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-inner">
                <div className="w-1 h-1 bg-[#111318] rounded-full animate-ping"></div>
              </div>
              <div className="h-[46%] bg-white rounded-b-full"></div>
            </div>
          </div>
          <div>
            <div className="font-pixel text-xs tracking-wider text-[#E3350D] flex items-center gap-1">
              POKÉMON
            </div>
            <div className="font-pixel text-sm tracking-widest text-white font-bold group-hover:text-[#FF6B35] transition-colors">
              FIRE<span className="text-[#E3350D]">RED</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 glass-panel px-6 py-2 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={onPlayClick}
              className="font-sans text-xs font-semibold tracking-wider text-gray-300 hover:text-[#FF6B35] hover:glow-text-red transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Trainer Level Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111318] border border-[#E3350D]/40 text-xs font-pixel text-[#FF6B35] shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#FFAA00] animate-spin" style={{ animationDuration: '6s' }} />
            <span>LV.{trainerLevel}</span>
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => {
              onPlayClick();
              onOpenSearch();
            }}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#E3350D]/20 hover:border-[#E3350D] text-gray-300 hover:text-white transition-all"
            title="Global Search (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              onPlayClick();
            }}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#E3350D]/20 hover:border-[#E3350D] text-gray-300 hover:text-white transition-all"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Audio Cues'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF6B35]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Day / Night Atmosphere Toggle */}
          <button
            onClick={() => {
              onPlayClick();
              onToggleDayNight();
            }}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#E3350D]/20 hover:border-[#E3350D] text-gray-300 hover:text-white transition-all"
            title={`Switch to ${dayNightMode === 'day' ? 'Night' : 'Day'} mode`}
          >
            {dayNightMode === 'day' ? <Sun className="w-4 h-4 text-[#FFAA00]" /> : <Moon className="w-4 h-4 text-[#A890F0]" />}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              onPlayClick();
              onOpenSearch();
            }}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onPlayClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#E3350D]" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#08090D]/95 border-b border-[#E3350D]/30 backdrop-blur-2xl overflow-hidden px-4 py-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 font-pixel text-xs text-[#FF6B35]">
                  <Sparkles className="w-4 h-4 text-[#FFAA00]" />
                  TRAINER LV. {trainerLevel}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onToggleSound();
                      onPlayClick();
                    }}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF6B35]" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      onToggleDayNight();
                      onPlayClick();
                    }}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {dayNightMode === 'day' ? <Sun className="w-4 h-4 text-[#FFAA00]" /> : <Moon className="w-4 h-4 text-[#A890F0]" />}
                  </button>
                </div>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    onPlayClick();
                    setMobileMenuOpen(false);
                  }}
                  className="font-pixel text-xs text-gray-300 hover:text-[#E3350D] py-2 border-b border-white/5 tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
