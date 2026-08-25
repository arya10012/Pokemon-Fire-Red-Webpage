import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Sun, Moon, Shield } from 'lucide-react';
import type { TrainerState } from '../types/pokemon';

interface TrainerProgressProps {
  trainerState: TrainerState;
  onToggleDayNight: () => void;
  onPlayClick: () => void;
}

export const TrainerProgress: React.FC<TrainerProgressProps> = ({
  trainerState,
  onToggleDayNight,
  onPlayClick,
}) => {
  const completionPercentage = Math.round((trainerState.discoveredCount / 151) * 100);
  const xpNeeded = trainerState.level * 50;
  const xpPercent = Math.min(100, Math.round((trainerState.xp / xpNeeded) * 100));

  return (
    <section className="py-12 relative overflow-hidden bg-[#08090D] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Widget 1: Trainer Level & XP Bar */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-pixel text-xs text-[#FF6B35]">
                <Sparkles className="w-4 h-4 text-[#FFAA00]" />
                TRAINER LEVEL
              </div>
              <span className="font-pixel text-sm text-white font-bold">LV. {trainerState.level}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-gray-400">
                <span>XP PROGRESS</span>
                <span>{trainerState.xp} / {xpNeeded} XP</span>
              </div>
              <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#E3350D] to-[#FF6B35]"
                />
              </div>
            </div>
          </div>

          {/* Widget 2: Kanto Pokédex Completion Circular Tracker */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-pixel text-xs text-teal-400 mb-1">
                <Trophy className="w-4 h-4 text-teal-400" />
                KANTO COMPLETION
              </div>
              <div className="font-pixel text-2xl text-white font-extrabold my-1">
                {completionPercentage}%
              </div>
              <div className="font-sans text-xs text-gray-400">
                {trainerState.discoveredCount} of 151 Kanto Pokémon Discovered
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#2DD4BF"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * completionPercentage) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <Shield className="w-5 h-5 text-teal-400 absolute" />
            </div>
          </div>

          {/* Widget 3: Day / Night Atmosphere Toggle */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-pixel text-xs text-amber-400 mb-1">
                {trainerState.dayNightMode === 'day' ? <Sun className="w-4 h-4 text-[#FFAA00]" /> : <Moon className="w-4 h-4 text-[#A890F0]" />}
                KANTO ATMOSPHERE
              </div>
              <div className="font-pixel text-sm text-white font-bold my-1 uppercase">
                {trainerState.dayNightMode === 'day' ? 'PALLET TOWN DAYTIME' : 'LAVENDER NIGHTFALL'}
              </div>
              <div className="font-sans text-xs text-gray-400">
                Click to switch ambient lighting & particle palette
              </div>
            </div>

            <button
              onClick={() => {
                onPlayClick();
                onToggleDayNight();
              }}
              className="p-3.5 rounded-2xl bg-white/10 border border-white/15 hover:bg-[#E3350D]/20 hover:border-[#E3350D] transition-all shadow-lg text-white"
            >
              {trainerState.dayNightMode === 'day' ? <Sun className="w-5 h-5 text-[#FFAA00]" /> : <Moon className="w-5 h-5 text-[#A890F0]" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
