import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Map, Sparkles, Shield } from 'lucide-react';

interface HeroProps {
  onPlayClick: () => void;
  dayNightMode: 'day' | 'night';
}

export const Hero: React.FC<HeroProps> = ({ onPlayClick, dayNightMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulse: number;
    }

    const particles: Particle[] = [];
    const particleColors = dayNightMode === 'day' 
      ? ['#FF6B35', '#FFAA00', '#E3350D', '#FFFFFF'] 
      : ['#E3350D', '#FF6B35', '#A890F0', '#705898'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.01;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow around particle
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dayNightMode]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090D]/40 via-[#08090D]/80 to-[#08090D] z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#E3350D]/20 to-[#FF6B35]/15 blur-[140px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Floating Decorative Poké Ball Artwork */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 right-[10%] hidden lg:block opacity-20 pointer-events-none"
      >
        <div className="w-64 h-64 rounded-full border-8 border-[#E3350D] relative flex flex-col justify-between p-2 shadow-[0_0_80px_rgba(227,53,13,0.3)]">
          <div className="h-[46%] bg-[#E3350D]/30 rounded-t-full"></div>
          <div className="h-4 bg-[#E3350D] w-full absolute top-[46%] left-0"></div>
          <div className="w-16 h-16 bg-white/20 rounded-full border-4 border-[#E3350D] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-6 h-6 bg-[#E3350D] rounded-full"></div>
          </div>
          <div className="h-[46%] bg-white/10 rounded-b-full"></div>
        </div>
      </motion.div>

      {/* Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Top Retro Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#E3350D]/40 backdrop-blur-md mb-8 shadow-lg shadow-[#E3350D]/10"
        >
          <Sparkles className="w-4 h-4 text-[#FF6B35] animate-spin" style={{ animationDuration: '4s' }} />
          <span className="font-pixel text-[11px] tracking-widest text-[#FF6B35] uppercase">
            GBA REMASTERED DIGITAL DASHBOARD
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-pixel text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-wider leading-none text-white mb-6 drop-shadow-2xl"
        >
          POKÉMON <br />
          <span className="bg-gradient-to-r from-[#E3350D] via-[#FF6B35] to-[#FFAA00] bg-clip-text text-transparent glow-text-red">
            FIRE RED
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 tracking-wide mb-6"
        >
          Return to the <span className="text-[#FF6B35] underline underline-offset-8 decoration-[#E3350D]">Kanto Region.</span>
        </motion.h2>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Relive the adventure that introduced a generation of trainers to the world of Pokémon. Explore all 151 Kanto Pokémon, claim 8 Gym Badges, defeat Team Rocket, and master the Indigo Plateau.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#kanto"
            onClick={onPlayClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E3350D] to-[#FF6B35] text-white font-pixel text-xs tracking-widest font-bold shadow-xl shadow-[#E3350D]/40 hover:shadow-[#E3350D]/60 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 border border-red-400/30 group"
          >
            <Map className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            [ EXPLORE KANTO ]
          </a>

          <a
            href="#pokedex"
            onClick={onPlayClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md text-white font-pixel text-xs tracking-widest font-bold border border-white/15 hover:border-[#E3350D] hover:bg-[#E3350D]/10 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
          >
            <Shield className="w-4 h-4 text-[#FF6B35]" />
            [ VIEW POKÉDEX ]
          </a>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.a
        href="#story"
        onClick={onPlayClick}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-400 hover:text-[#E3350D] transition-colors"
      >
        <span className="font-pixel text-[10px] tracking-widest">SCROLL DOWN</span>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
          <ChevronDown className="w-4 h-4 text-[#E3350D]" />
        </div>
      </motion.a>
    </section>
  );
};
