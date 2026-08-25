import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayFanfare: () => void;
}

export const SecretEasterEgg: React.FC<SecretEasterEggProps> = ({
  isOpen,
  onClose,
  onPlayFanfare,
}) => {
  useEffect(() => {
    if (isOpen) {
      onPlayFanfare();

      // Trigger confetti bursts
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          colors: ['#E3350D', '#FF6B35', '#FFD700', '#FFFFFF', '#111111'],
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [isOpen, onPlayFanfare]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          className="relative max-w-lg w-full bg-gradient-to-b from-[#1A1808] via-[#111318] to-black border-2 border-[#FFD700] rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(255,215,0,0.4)] overflow-hidden"
        >
          {/* Animated Background Rays */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent animate-pulse-glow"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#FFAA00] p-1 shadow-xl shadow-[#FFD700]/30 flex items-center justify-center animate-bounce">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Trophy className="w-10 h-10 text-[#FFD700]" />
            </div>
          </div>

          <div className="font-pixel text-xs text-[#FFD700] tracking-widest uppercase mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            KONAMI CODE DETECTED
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
          </div>

          <h2 className="font-pixel text-lg sm:text-2xl text-white font-extrabold tracking-wider glow-text-gold mb-4">
            SECRET TRAINER MODE UNLOCKED!
          </h2>

          <p className="font-sans text-gray-300 text-sm mb-6 leading-relaxed">
            You’ve entered the legendary code of masters (<span className="text-[#FFD700]">↑ ↑ ↓ ↓ ← → ← →</span>). All Pokémon shiny sprites and secret champion badges are now unlocked for your exploration!
          </p>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-pixel mb-6">
            ✨ SPECIAL TITLE: KANTO CHAMPION TRAINER
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF6B35] text-black font-pixel text-xs tracking-widest font-bold shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
          >
            ENTER THE CHAMPION REALM
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
