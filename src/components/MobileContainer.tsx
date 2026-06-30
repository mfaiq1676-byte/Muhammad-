import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
  activeCanvasType?: string;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  // Get current local time format
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="desktop-bg" className="min-h-screen w-full bg-obsidian flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative">
      {/* Dynamic ambient blur background - Elegant Champagne & Bronze */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-champagne-gold/5 blur-[120px] pointer-events-none ambient-glow-gold" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-velvet-bronze/5 blur-[120px] pointer-events-none ambient-glow-gold" />

      {/* Smartphone Physical Bezel Frame with refined bronze/charcoal borders */}
      <div id="phone-bezel" className="relative w-full max-w-[420px] h-[860px] bg-black rounded-[56px] p-3 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95)] border-4 border-carbon-light flex flex-col overflow-hidden select-none">
        {/* Inner glow accent */}
        <div className="absolute inset-0 rounded-[52px] border border-white/5 pointer-events-none z-50" />

        {/* Physical Camera Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#111] border border-zinc-900 mr-4 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-amber-900/40" />
          </div>
          <div className="w-12 h-1 bg-[#121212] rounded-full" />
        </div>

        {/* Phone Speaker & Status Bar Container */}
        <div className="h-7 w-full flex justify-between items-center px-6 text-[11px] font-medium tracking-wide text-zinc-400 z-40 bg-transparent shrink-0 mt-1 select-none font-sans">
          <span>{time}</span>
          <div className="flex items-center gap-1.5">
            <Signal size={12} className="text-zinc-400" />
            <Wifi size={12} className="text-zinc-400" />
            <div className="flex items-center gap-0.5">
              <span className="text-[9px] mr-0.5 font-bold">5G</span>
              <Battery size={14} className="text-zinc-400" />
            </div>
          </div>
        </div>

        {/* Core Mobile Viewport Container */}
        <div id="mobile-viewport" className="flex-1 w-full bg-obsidian rounded-[42px] overflow-hidden flex flex-col relative z-30 border border-white/5">
          {children}
        </div>

        {/* Phone Bottom Gesture Bar indicator */}
        <div className="h-6 w-full flex items-center justify-center bg-transparent shrink-0 z-40 select-none">
          <div className="w-28 h-1 bg-white/40 rounded-full transition-all duration-300 hover:bg-white/70" />
        </div>
      </div>
    </div>
  );
}
