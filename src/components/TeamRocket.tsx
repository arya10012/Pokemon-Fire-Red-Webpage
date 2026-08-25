import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skull, Terminal, AlertTriangle, Zap, Lock } from 'lucide-react';

interface TeamRocketProps {
  onPlayClick: () => void;
}

export const TeamRocket: React.FC<TeamRocketProps> = ({ onPlayClick }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM INITIALIZED: SILPH CO. MAINFRAME V3.4',
    'STATUS: EXECUTIVE ACCESS ONLY // BOSS GIOVANNI',
    'TYPE "HELP" OR "SILPH" TO SEARCH SECRET FILES...',
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlayClick();
    const cmd = terminalInput.toLowerCase().trim();
    setTerminalInput('');

    let resp = `UNKNOWN COMMAND: "${cmd}". TRY "HELP", "MEWTWO", "SILPH", "CORNER", OR "JESSIE".`;

    if (cmd === 'help') {
      resp = 'AVAILABLE INTEL COMMANDS: SILPH, MEWTWO, CORNER, JESSIE, GIOVANNI, CLEAR';
    } else if (cmd === 'silph') {
      resp = 'FILE #884: SILPH CO. SEIZED TO MASS-PRODUCE THE MASTER BALL FOR BOSS GIOVANNI.';
    } else if (cmd === 'mewtwo') {
      resp = 'FILE #150: GENETIC CLONING PROJECT COMPLETED IN CINNABAR LAB. MUTANT ESCAPED TO CERULEAN CAVE.';
    } else if (cmd === 'corner') {
      resp = 'FILE #092: CELADON GAME CORNER BASEMENT CONCEALS ROCKET HIDEOUT BEHIND POSTER.';
    } else if (cmd === 'jessie') {
      resp = 'AGENT BRIEF: JESSIE, JAMES & MEOWTH DISPATCHED TO PURSUE PIKACHU ACROSS ROUTE 24.';
    } else if (cmd === 'giovanni') {
      resp = 'CLASSIFIED: GIOVANNI OPERATES AS VIRIDIAN GYM LEADER & TEAM ROCKET SUPREME COMMANDER.';
    } else if (cmd === 'clear') {
      setTerminalLogs(['SYSTEM CLEARED. ENTER COMMAND...']);
      return;
    }

    setTerminalLogs((prev) => [...prev, `> ${cmd}`, resp].slice(-8));
  };

  return (
    <section id="rocket" className="py-24 relative overflow-hidden bg-[#0A0306]">
      {/* Villainous Crimson Particles & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-950/40 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      {/* Red Glitch Scanlines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        <div className="w-full h-2 bg-red-500/50 animate-scanline" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-500 font-pixel text-xs tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,0,50,0.3)]">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            CRIMINAL SYNDICATE WARNING
          </div>
          <h2 className="font-pixel text-3xl sm:text-5xl text-white font-extrabold tracking-wider mb-4">
            TEAM <span className="text-[#FF0033] glow-text-red">ROCKET</span>
          </h2>
          <p className="font-mono text-red-400 text-base sm:text-lg italic mb-2">
            "Prepare for trouble. Make it double."
          </p>
          <p className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed">
            The powerful underground crime syndicate operating across Kanto, exploiting rare Pokémon for financial gain and world domination.
          </p>
        </div>

        {/* 3 Column Syndicate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Boss Giovanni */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel-rocket rounded-3xl p-6 border border-red-500/30 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-pixel text-xs text-red-500">SUPREME LEADER</span>
              <Lock className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="font-pixel text-xl text-white font-bold mb-2">GIOVANNI</h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4">
              Mastermind behind Team Rocket and secret 8th Gym Master of Viridian City. Uses Earth & Ground Pokémon (Rhydon, Nidoking) to crush challengers.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-red-500/20 font-mono text-[11px] text-red-400">
              MOTTO: "All Pokémon exist solely for the glory of Team Rocket!"
            </div>
          </motion.div>

          {/* Card 2: Jessie, James & Meowth */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel-rocket rounded-3xl p-6 border border-red-500/30 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-pixel text-xs text-red-500">TRIO FIELD AGENTS</span>
              <Skull className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="font-pixel text-xl text-white font-bold mb-2">JESSIE & JAMES</h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4">
              Accompanied by the talking Meowth, Koffing, and Ekans. Constantly hatching extravagant schemes to steal rare Pokémon from trainers across Kanto.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-red-500/20 font-mono text-[11px] text-red-400">
              PARTNERS: Ekans, Koffing, Arbok, Weezing & Meowth
            </div>
          </motion.div>

          {/* Card 3: Silph Co Takeover */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel-rocket rounded-3xl p-6 border border-red-500/30 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-pixel text-xs text-red-500">HEADQUARTERS SEIZURE</span>
              <Zap className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="font-pixel text-xl text-white font-bold mb-2">SILPH CO. SIEGE</h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4">
              Team Rocket held Saffron City hostage to seize Silph Co.’s secret prototype Master Ball, capable of capturing any wild Pokémon without fail.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-red-500/20 font-mono text-[11px] text-red-400">
              TARGET: Master Ball & Silph Scope Prototypes
            </div>
          </motion.div>
        </div>

        {/* Interactive Rocket Security Terminal Widget */}
        <div className="max-w-4xl mx-auto glass-panel-rocket rounded-3xl p-6 sm:p-8 border border-red-500/50 shadow-[0_0_40px_rgba(255,0,50,0.2)]">
          <div className="flex items-center justify-between pb-4 border-b border-red-500/30 mb-6">
            <div className="flex items-center gap-2 font-pixel text-xs text-red-500">
              <Terminal className="w-4 h-4 text-red-500" />
              ROCKET SECURITY TERMINAL // HIGH-LEVEL INTEL ACCESS
            </div>
            <span className="font-mono text-[10px] text-red-400 animate-pulse">● ENCRYPTED CONNECTION</span>
          </div>

          {/* Terminal Console Logs */}
          <div className="bg-black/80 p-4 rounded-2xl border border-red-500/20 font-mono text-xs text-red-400 h-48 overflow-y-auto space-y-2 mb-4 shadow-inner">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className={log.startsWith('>') ? 'text-white font-bold' : 'text-red-400'}>
                {log}
              </div>
            ))}
          </div>

          {/* Terminal Command Form */}
          <form onSubmit={handleTerminalSubmit} className="flex gap-2">
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Enter terminal command (e.g. HELP, SILPH, MEWTWO)..."
              className="flex-1 bg-black/60 border border-red-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder:text-red-900 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-pixel text-xs tracking-wider font-bold shadow-lg shadow-red-600/30 transition-all"
            >
              EXECUTE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
