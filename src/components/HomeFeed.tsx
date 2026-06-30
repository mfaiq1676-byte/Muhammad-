import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, Music, Volume2, VolumeX, Plus, Check, Send, X, Copy, MessageSquare } from 'lucide-react';
import { Video, Comment } from '../types';
import { MOCK_COMMENTS } from '../data/mockData';

interface HomeFeedProps {
  videos: Video[];
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  onToggleFollow: (creatorId: string) => void;
  onShare: (video: Video) => void;
}

export default function HomeFeed({
  videos,
  onToggleLike,
  onToggleSave,
  onToggleFollow,
  onShare
}: HomeFeedProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [commentsMap, setCommentsMap] = React.useState<Record<string, Comment[]>>({});
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [hearts, setHearts] = React.useState<{ id: number; x: number; y: number }[]>([]);
  const [lastTap, setLastTap] = React.useState<number>(0);

  const activeVideo = videos[currentIndex] || videos[0];

  // Canvas loop setup
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Initialize comments list per video
  React.useEffect(() => {
    const initialMap: Record<string, Comment[]> = {};
    videos.forEach(v => {
      initialMap[v.id] = [...MOCK_COMMENTS];
    });
    setCommentsMap(initialMap);
  }, [videos]);

  // Handle Swipe up/down navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      // Swipe Up (Next video)
      if (currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsPlaying(true);
      }
    } else if (diff < -50) {
      // Swipe Down (Prev video)
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsPlaying(true);
      }
    }
    setTouchStart(null);
  };

  // Keyboard navigation fallback
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showComments) return;
      if (e.key === 'ArrowDown') {
        if (currentIndex < videos.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setIsPlaying(true);
        }
      } else if (e.key === 'ArrowUp') {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setIsPlaying(true);
        }
      } else if (e.key === ' ') {
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos.length, isPlaying, showComments]);

  // Dynamic Generative Canvas Rendering Loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    const particleList: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 360;
        canvas.height = canvas.parentElement?.clientHeight || 640;
      }
    };
    resizeCanvas();

    // Create seed particles for particle background
    for (let i = 0; i < 40; i++) {
      particleList.push({
        x: Math.random() * (canvas.width || 360),
        y: Math.random() * (canvas.height || 640),
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    const render = () => {
      if (!ctx || !canvas) return;
      if (!isPlaying) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      tick += activeVideo.loopSpeed;

      // Dark solid visual overlay background
      ctx.fillStyle = '#06080c';
      ctx.fillRect(0, 0, w, h);

      // Render loop based on visual design
      if (activeVideo.canvasType === 'aurora') {
        // Blending fluid wavy gradients
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#020306');
        gradient.addColorStop(0.5, '#0c101d');
        gradient.addColorStop(1, '#020306');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = activeVideo.baseColor;
        ctx.lineWidth = 2;
        for (let j = 0; j < 4; j++) {
          ctx.beginPath();
          ctx.strokeStyle = j % 2 === 0 ? activeVideo.baseColor : activeVideo.accentColor;
          ctx.globalAlpha = 0.25 - (j * 0.05);
          for (let x = 0; x < w; x += 10) {
            const y = h / 2 + Math.sin(x * 0.005 + tick + j * 0.5) * 120 + Math.cos(x * 0.002 - tick + j) * 40;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

      } else if (activeVideo.canvasType === 'cyber') {
        // Futuristic isometric cyberpunk coordinate grid
        ctx.strokeStyle = '#1e2433';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;

        // Draw dynamic grid lines
        const space = 40;
        const offset = (tick * 15) % space;
        for (let x = offset; x < w; x += space) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = offset; y < h; y += space) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Draw floating cyber rings
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = activeVideo.baseColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const r1 = 80 + Math.sin(tick) * 20;
        ctx.arc(w / 2, h / 2, r1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = activeVideo.accentColor;
        ctx.beginPath();
        const r2 = 140 + Math.cos(tick * 0.7) * 30;
        ctx.arc(w / 2, h / 2, r2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 1.0;

      } else if (activeVideo.canvasType === 'rings') {
        // Rotating concentric rings with dynamic pulse
        ctx.fillStyle = '#06080c';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        ctx.lineWidth = 3;

        for (let j = 1; j <= 5; j++) {
          const r = j * 45 + Math.sin(tick * 2 + j) * 15;
          ctx.strokeStyle = j % 2 === 0 ? activeVideo.baseColor : activeVideo.accentColor;
          ctx.globalAlpha = 0.8 / j;
          ctx.beginPath();
          ctx.arc(cx, cy, r, tick * (j * 0.2), tick * (j * 0.2) + Math.PI * 1.5);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

      } else if (activeVideo.canvasType === 'particles') {
        // Ambient drifting zen circles
        ctx.fillStyle = '#07090e';
        ctx.fillRect(0, 0, w, h);

        particleList.forEach((p) => {
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0 || p.x > w) p.dx *= -1;
          if (p.y < 0 || p.y > h) p.dy *= -1;

          ctx.fillStyle = activeVideo.baseColor;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Glowing center orb
        const radial = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, 120 + Math.sin(tick)*20);
        radial.addColorStop(0, activeVideo.accentColor + '55');
        radial.addColorStop(1, 'transparent');
        ctx.fillStyle = radial;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(w/2, h/2, 150, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1.0;

      } else if (activeVideo.canvasType === 'hyperspace') {
        // Space warp warp-drive streaks
        ctx.fillStyle = '#040508';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = activeVideo.baseColor;
        ctx.lineWidth = 1.5;
        const linesCount = 30;
        ctx.globalAlpha = 0.7;

        for (let j = 0; j < linesCount; j++) {
          const angle = (j / linesCount) * Math.PI * 2 + tick * 0.1;
          const dist = ((tick * 100 + j * 20) % h) * 0.5;
          const x1 = w / 2 + Math.cos(angle) * (dist * 0.1);
          const y1 = h / 2 + Math.sin(angle) * (dist * 0.1);
          const x2 = w / 2 + Math.cos(angle) * dist;
          const y2 = h / 2 + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
      }

      // Small subtle scanning visualizer bar at the bottom
      ctx.fillStyle = activeVideo.accentColor;
      ctx.globalAlpha = 0.1;
      const scanY = (tick * 100) % h;
      ctx.fillRect(0, scanY, w, 3);
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [currentIndex, isPlaying, activeVideo]);

  // Click handler for pause / play and double click for like
  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double Tap Like
      onToggleLike(activeVideo.id);

      // Add visual rising heart at tap location
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setHearts((prev) => [...prev, { id: Date.now(), x, y }]);

      // Auto clear heart
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== h.id));
      }, 1000);
    } else {
      // Single Tap Pause/Play
      setIsPlaying(!isPlaying);
    }
    setLastTap(now);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c_user_${Date.now()}`,
      username: 'me',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop',
      text: commentText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setCommentsMap((prev) => ({
      ...prev,
      [activeVideo.id]: [newComment, ...(prev[activeVideo.id] || [])]
    }));
    setCommentText('');
  };

  const activeComments = commentsMap[activeVideo.id] || [];

  return (
    <div
      id="home-feed-module"
      className="w-full h-full relative select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 60FPS Generative canvas */}
      <div className="absolute inset-0 z-0" onClick={handleScreenTap}>
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Floating interactive hearts overlay from double clicks */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ scale: 0.5, opacity: 0, y: h.y }}
              animate={{ scale: [1, 1.3, 0.8], opacity: [1, 1, 0], y: h.y - 120, x: h.x + (Math.random() - 0.5) * 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute text-red-500 text-5xl filter drop-shadow-[0_4px_10px_rgba(239,68,68,0.4)]"
              style={{ left: h.x - 24, top: h.y - 24 }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pause screen visual overlay indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-20">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-white/90 backdrop-blur-md"
          >
            <div className="flex gap-1.5 justify-center items-center">
              <div className="w-2.5 h-7 bg-white/95 rounded-full" />
              <div className="w-2.5 h-7 bg-white/95 rounded-full" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Global feeds tab selectors (Top header overlays) */}
      <div className="absolute top-4 left-0 right-0 flex justify-center items-center gap-6 z-30 pointer-events-auto select-none font-display">
        <button className="text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-all">Following</button>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <button className="text-white text-xs font-bold uppercase tracking-widest relative">
          For You
          <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-champagne-gold" />
        </button>
      </div>

      {/* Feed Side Controls Column (Action overlays) */}
      <div className="absolute right-3.5 bottom-28 flex flex-col items-center gap-5 z-20 text-white">
        {/* Creator avatar card with Follow click */}
        <div className="relative mb-3 flex flex-col items-center">
          <div className="w-[46px] h-[46px] rounded-full p-[1.5px] bg-gradient-to-tr from-champagne-gold to-velvet-bronze">
            <img referrerPolicy="no-referrer" src={activeVideo.creator.avatar} alt="creator" className="w-full h-full object-cover rounded-full bg-obsidian" />
          </div>
          <button
            onClick={() => onToggleFollow(activeVideo.creator.id)}
            className={`absolute bottom-[-6px] w-[18px] h-[18px] rounded-full flex items-center justify-center border border-black text-black font-bold transition-all duration-200 cursor-pointer ${
              activeVideo.creator.isFollowing ? 'bg-green-500 text-white' : 'bg-white hover:bg-zinc-200'
            }`}
          >
            {activeVideo.creator.isFollowing ? <Check size={10} className="text-white" /> : <Plus size={10} />}
          </button>
        </div>

        {/* Action: Like */}
        <button
          onClick={() => onToggleLike(activeVideo.id)}
          className="flex flex-col items-center bg-transparent border-0 cursor-pointer text-white hover:opacity-85 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Heart
              size={22}
              className={`transition-colors duration-200 ${
                activeVideo.isLiked ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-wider">{activeVideo.likes.toLocaleString()}</span>
        </button>

        {/* Action: Comment */}
        <button
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center bg-transparent border-0 cursor-pointer text-white hover:opacity-85 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
            <MessageCircle size={22} />
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-wider">{activeVideo.commentsCount.toLocaleString()}</span>
        </button>

        {/* Action: Save/Bookmark */}
        <button
          onClick={() => onToggleSave(activeVideo.id)}
          className="flex flex-col items-center bg-transparent border-0 cursor-pointer text-white hover:opacity-85 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Bookmark
              size={22}
              className={`transition-colors duration-200 ${
                activeVideo.isSaved ? 'text-[#f1c40f] fill-[#f1c40f]' : 'text-white'
              }`}
            />
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-wider">{activeVideo.saves.toLocaleString()}</span>
        </button>

        {/* Action: Share */}
        <button
          onClick={() => setShowShare(true)}
          className="flex flex-col items-center bg-transparent border-0 cursor-pointer text-white hover:opacity-85 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Share2 size={22} />
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-wider">{activeVideo.shares.toLocaleString()}</span>
        </button>
      </div>

      {/* Feed Bottom Details Panel Overlay */}
      <div className="absolute left-4 bottom-24 right-20 text-white z-20 pointer-events-auto">
        <div className="space-y-1.5 select-text">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-wide">{activeVideo.creator.name}</span>
            <span className="text-zinc-400 text-xs">{activeVideo.creator.handle}</span>
          </div>

          <p className="text-xs text-zinc-100 leading-relaxed font-light line-clamp-2">
            {activeVideo.caption}
          </p>

          {/* Hashtags list */}
          <div className="flex flex-wrap gap-1.5 text-[11px] text-champagne-gold font-semibold font-display">
            {activeVideo.hashtags.map((tag, idx) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>

          {/* Music Scrolling marquee */}
          <div className="flex items-center gap-2 pt-1.5 select-none overflow-hidden max-w-[200px]">
            <Music size={12} className="text-champagne-gold shrink-0" />
            <div className="text-[11px] font-medium tracking-wide whitespace-nowrap text-zinc-300 animate-[marquee_8s_linear_infinite] font-sans">
              {activeVideo.music}
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive volume mute indicator control */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white z-30 hover:bg-black/60 cursor-pointer border-0"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Interactive Comments Slider Drawer */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute bottom-0 left-0 right-0 h-[480px] bg-carbon-card rounded-t-[32px] border-t border-white/5 z-40 flex flex-col text-white"
          >
            {/* Drawer Drag Header */}
            <div className="w-full flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0 select-none">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">
                Comments ({activeComments.length})
              </span>
              <button
                onClick={() => setShowComments(false)}
                className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer border-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Comments List area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">
              {activeComments.map((com) => (
                <div key={com.id} className="flex gap-3 text-xs select-text">
                  <img referrerPolicy="no-referrer" src={com.avatar} alt="user" className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-300 font-display">{com.username}</span>
                      <span className="text-[9px] text-zinc-600 font-mono">{com.timestamp}</span>
                    </div>
                    <p className="text-zinc-200 text-xs font-light leading-relaxed">{com.text}</p>
                    <div className="flex items-center gap-1 pt-0.5 text-[10px] text-zinc-500 font-bold select-none">
                      <Heart size={10} className="cursor-pointer hover:text-red-500" /> {com.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Write comment input bar */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-white/5 bg-obsidian flex gap-2 items-center shrink-0">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type a thoughtful vibe..."
                className="flex-1 h-10 bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl px-4 text-xs text-white"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-gradient-to-tr from-champagne-gold to-velvet-bronze hover:opacity-95 rounded-xl flex items-center justify-center text-black cursor-pointer border-0 shrink-0"
              >
                <Send size={14} className="text-black" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Direct Share Drawer */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute bottom-0 left-0 right-0 h-[280px] bg-carbon-card rounded-t-[32px] border-t border-white/5 z-40 flex flex-col text-white"
          >
            <div className="w-full flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0 select-none">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">Share Visualizer</span>
              <button
                onClick={() => setShowShare(false)}
                className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer border-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Sharing platforms items */}
            <div className="p-6 grid grid-cols-4 gap-4 flex-1 items-center justify-center font-display select-none">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  onShare(activeVideo);
                  setShowShare(false);
                }}
                className="flex flex-col items-center gap-2 bg-transparent border-0 text-white cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-white/5 hover:bg-zinc-900 flex items-center justify-center text-champagne-gold">
                  <Copy size={18} />
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Copy Link</span>
              </button>

              <button
                onClick={() => {
                  onShare(activeVideo);
                  setShowShare(false);
                }}
                className="flex flex-col items-center gap-2 bg-transparent border-0 text-white cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-white/5 hover:bg-zinc-900 flex items-center justify-center text-champagne-gold">
                  <MessageSquare size={18} />
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Send Direct</span>
              </button>

              <button
                onClick={() => {
                  onShare(activeVideo);
                  setShowShare(false);
                }}
                className="flex flex-col items-center gap-2 bg-transparent border-0 text-white cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-white/5 hover:bg-zinc-900 flex items-center justify-center text-champagne-gold">
                  <Volume2 size={18} />
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Use Sound</span>
              </button>

              <button
                onClick={() => {
                  onShare(activeVideo);
                  setShowShare(false);
                }}
                className="flex flex-col items-center gap-2 bg-transparent border-0 text-white cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-white/5 hover:bg-zinc-900 flex items-center justify-center text-champagne-gold">
                  <Bookmark size={18} fill="#dfb76c" className="text-champagne-gold" />
                </div>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase">Playlist</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
