import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Users, Gift, MessageSquare, Send, X, ShieldAlert, Settings, Sparkles } from 'lucide-react';
import { VirtualGift } from '../types';
import { GIFTS } from '../data/mockData';

interface LiveStreamProps {
  onBackToFeed: () => void;
  onAddGiftReward: (coins: number) => void;
}

export default function LiveStream({ onBackToFeed, onAddGiftReward }: LiveStreamProps) {
  const [isLive, setIsLive] = React.useState(false);
  const [viewerCount, setViewerCount] = React.useState(4320);
  const [chatMessages, setChatMessages] = React.useState<{ id: string; user: string; text: string; isGift?: string }[]>([
    { id: 'l1', user: 'cyber_babe', text: 'OMG those visualizers are insane! 🔥' },
    { id: 'l2', user: 'lofi_fanatic', text: 'Listening from sunny Berlin! 🇩🇪' },
    { id: 'l3', user: 'synth_coder', text: 'Is this live canvas rendering in WebGL?' }
  ]);
  const [messageText, setMessageText] = React.useState('');
  const [showGiftSelector, setShowGiftSelector] = React.useState(false);
  const [activeGiftAnimation, setActiveGiftAnimation] = React.useState<{ icon: string; name: string; color: string } | null>(null);

  // Auto-scrolling simulated livestream chat
  React.useEffect(() => {
    if (!isLive) return;

    const chatTemplates = [
      "Can we request a slow particle loop? 🌌",
      "Alex Vance visual style is so inspirational.",
      "Just tipped a Sparkling Rose! 🌹🌹",
      "Wow, the color palette is so premium.",
      "Cyberpunk 2077 vibes heavily in here. 🤖",
      "Greetings from Neo Tokyo! 🗼🌌",
      "Loving the rain soundwave in the background.",
      "Double tapping like crazy! ❤️"
    ];

    const interval = setInterval(() => {
      const randomUser = ['lofi_study', 'neon_shadow', 'wave_rider', 'pixel_chef', 'cosmic_mind'][Math.floor(Math.random() * 5)];
      const randomText = chatTemplates[Math.floor(Math.random() * chatTemplates.length)];

      setChatMessages((prev) => [
        ...prev,
        { id: `l_${Date.now()}`, user: randomUser, text: randomText }
      ].slice(-20)); // Limit to last 20 messages

      // Randomly adjust viewer count slightly
      setViewerCount((v) => Math.max(100, v + Math.floor((Math.random() - 0.5) * 50)));
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { id: `l_user_${Date.now()}`, user: 'me', text: messageText.trim() }
    ]);
    setMessageText('');
  };

  const handleSendGift = (gift: VirtualGift) => {
    setShowGiftSelector(false);
    onAddGiftReward(gift.cost);

    // Add visual live chat log
    setChatMessages((prev) => [
      ...prev,
      { id: `gift_${Date.now()}`, user: 'me', text: `sent a ${gift.name} ${gift.icon}`, isGift: gift.icon }
    ]);

    // Fire overlay animation
    setActiveGiftAnimation({ icon: gift.icon, name: gift.name, color: gift.sparkleColor });
    setTimeout(() => {
      setActiveGiftAnimation(null);
    }, 2200);
  };

  return (
    <div id="live-stream-module" className="w-full h-full bg-[#050608] flex flex-col relative text-white">
      {/* Immersive visual streaming background simulation */}
      <div className="absolute inset-0 z-0 bg-[#080a0f] flex flex-col justify-between p-4">
        {/* Generative streaming graphics background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7f00ff]/10 via-transparent to-[#00f2fe]/10" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className={`w-28 h-28 rounded-full border-2 border-dashed mx-auto flex items-center justify-center p-2 ${
              isLive ? 'border-[#ff007f] bg-fuchsia-950/20' : 'border-zinc-700 bg-zinc-950'
            }`}
          >
            <Radio size={44} className={isLive ? 'text-[#ff007f]' : 'text-zinc-600'} />
          </motion.div>

          <div className="space-y-1.5 select-none">
            <h3 className="text-sm font-bold tracking-wider uppercase">
              {isLive ? 'BROADCASTING LIVE SIGNAL' : 'STREAM TRANSMITTER'}
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              {isLive ? 'BANDWIDTH: 1420 KB/S • 1080P' : 'ESTABLISH LIVE WEBCAM ACCESS'}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Gift Splash Animation Overlay */}
      <AnimatePresence>
        {activeGiftAnimation && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 100 }}
            animate={{ scale: [1, 1.4, 1.2], opacity: [1, 1, 0], y: -80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none text-center"
          >
            <div
              className="text-7xl filter drop-shadow-lg mb-2"
              style={{ filter: `drop-shadow(0 0 20px ${activeGiftAnimation.color})` }}
            >
              {activeGiftAnimation.icon}
            </div>
            <p className="text-sm font-black uppercase tracking-wider text-white bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              me sent {activeGiftAnimation.name}!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Stream Top Header Overlay Controls */}
      <div className="relative z-10 flex justify-between items-center p-4 select-none shrink-0">
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="text-[10px] font-bold bg-[#ff007f] text-white px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              LIVE
            </span>
          ) : (
            <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
              OFFLINE
            </span>
          )}

          {isLive && (
            <span className="text-[10px] font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-zinc-300 flex items-center gap-1">
              <Users size={11} /> {viewerCount.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={onBackToFeed}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:text-red-400 border-0 cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>

      {/* Bottom overlay: if not live, show "Go Live" control. If live, show interactive chat box & gifts */}
      <div className="mt-auto relative z-10 p-4 w-full flex flex-col gap-3">
        {!isLive ? (
          <div className="p-4 bg-zinc-900/80 border border-zinc-800/60 rounded-3xl text-center space-y-4 shadow-lg backdrop-blur-md select-none">
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-wide">Enter the Broadcasting Orbit</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                Connect your camera, set moderators, and host live visualizer loops with audiences worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 select-none">
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-left space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Stream Category</span>
                <p className="text-[11px] text-[#00f2fe] font-semibold">Generative Art & Sound</p>
              </div>
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-left space-y-1">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Host Camera</span>
                <p className="text-[11px] text-zinc-300">FaceTime Front (HD)</p>
              </div>
            </div>

            <button
              onClick={() => setIsLive(true)}
              className="w-full h-11 bg-gradient-to-r from-[#ff007f] to-[#7f00ff] hover:opacity-90 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md uppercase tracking-wider"
            >
              Initiate Stream Session
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Live Chat scrolling roll */}
            <div className="h-[220px] overflow-y-auto space-y-2 px-1 text-xs select-text">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/5 max-w-[280px]">
                  {msg.isGift ? (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#00f2fe]">{msg.user}</span>
                      <span className="text-pink-400 font-bold uppercase text-[9px] tracking-wider bg-pink-950/40 px-1.5 py-0.5 rounded border border-pink-500/10">TIPPED GIFT</span>
                      <span className="text-zinc-200">{msg.text}</span>
                    </div>
                  ) : (
                    <p className="leading-relaxed">
                      <span className="font-bold text-zinc-400 mr-2">{msg.user}</span>
                      <span className="text-zinc-100 font-light">{msg.text}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Actions Row: write message & Send Gift */}
            <div className="flex gap-2 items-center select-none shrink-0">
              <form onSubmit={handleSendMessage} className="flex-1 flex gap-2 items-center">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Chat with visualizer host..."
                  className="flex-1 h-10 bg-black/40 backdrop-blur-md border border-zinc-800 focus:border-[#ff007f] focus:outline-none rounded-xl px-4 text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </form>

              {/* Gift Drawer Toggler */}
              <button
                onClick={() => setShowGiftSelector(true)}
                className="w-11 h-10 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-black font-bold shadow-md cursor-pointer border-0"
              >
                <Gift size={18} className="text-black" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Gift Drawer Panel Overlay */}
      <AnimatePresence>
        {showGiftSelector && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute bottom-0 left-0 right-0 h-[260px] bg-[#0c101d] rounded-t-[32px] border-t border-zinc-800 z-40 flex flex-col text-white"
          >
            <div className="w-full flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Sparkles size={12} className="text-[#00f2fe]" /> virtual creator gifts
              </span>
              <button
                onClick={() => setShowGiftSelector(false)}
                className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer border-0"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-3 p-4 overflow-y-auto flex-1 select-none">
              {GIFTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleSendGift(g)}
                  className="flex flex-col items-center justify-between p-2.5 bg-zinc-950 hover:bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
                >
                  <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">{g.icon}</span>
                  <div className="text-center mt-1">
                    <p className="text-[9px] font-bold text-zinc-300 leading-tight w-12 truncate">{g.name}</p>
                    <p className="text-[8px] text-yellow-500 font-mono font-bold mt-0.5">{g.cost} coins</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
