import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small pause at 100%
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div id="splash-screen" className="relative flex flex-col justify-between items-center w-full h-full bg-obsidian p-8 text-white">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-champagne-gold/10 to-velvet-bronze/5 blur-[80px] pointer-events-none" />

      {/* Decorative top grid */}
      <div className="w-full text-center mt-8 select-none">
        <span className="font-display text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Aura Short-Video Ecosystem</span>
      </div>

      {/* Center Logo Section */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-champagne-gold to-velvet-bronze p-[2px] shadow-[0_0_40px_rgba(223,183,108,0.25)]"
        >
          {/* Inner dark card */}
          <div className="flex items-center justify-center w-full h-full rounded-[22px] bg-obsidian">
            {/* Pulsing Play icon representing short videos */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Play size={28} className="text-champagne-gold fill-champagne-gold ml-1" />
            </motion.div>
          </div>
          {/* Glowing rings */}
          <div className="absolute inset-0 rounded-3xl border border-champagne-gold/30 animate-ping opacity-20" />
        </motion.div>

        <div className="text-center space-y-2">
          <motion.h1
            initial={{ letterSpacing: "0.15em", opacity: 0 }}
            animate={{ letterSpacing: "0.3em", opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-[0.3em] bg-gradient-to-r from-champagne-gold via-platinum to-velvet-bronze bg-clip-text text-transparent uppercase font-display"
          >
            AURA
          </motion.h1>
          <p className="text-[10px] text-zinc-400 font-medium tracking-[0.2em] uppercase">Premium Visual Stream</p>
        </div>
      </div>

      {/* Loader & Footer section */}
      <div className="w-full space-y-8 mb-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 px-1 font-display tracking-wider uppercase font-bold">
            <span>Establishing core grid...</span>
            <span className="text-champagne-gold">{Math.round(progress)}%</span>
          </div>

          {/* Loading bar rail */}
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-velvet-bronze to-champagne-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-1.5 text-center select-none">
          <p className="text-[9px] text-zinc-500 font-medium tracking-widest uppercase">Secured with Two-Factor Crypto-Node</p>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold animate-pulse" />
            <span className="text-[9px] font-mono text-zinc-600">v1.0.4-LATEST (60FPS)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
