import React from 'react';
import { Sparkles, Scissors, Sliders, Save, ArrowRight, Sparkle, X } from 'lucide-react';
import { Video as VideoType, DraftVideo } from '../types';

interface UploadStudioProps {
  onPublishVideo: (newVideo: Partial<VideoType>) => void;
  onSaveDraft: (draft: DraftVideo) => void;
  onGoBack: () => void;
}

export default function UploadStudio({ onPublishVideo, onSaveDraft, onGoBack }: UploadStudioProps) {
  // Video core state
  const [caption, setCaption] = React.useState('');
  const [hashtags, setHashtags] = React.useState('');
  const [musicTitle, setMusicTitle] = React.useState('Alex Vance - Ambient Echoes (Original)');
  const [privacy, setPrivacy] = React.useState<'public' | 'friends' | 'private'>('public');

  // Creative tools settings
  const [selectedCanvas, setSelectedCanvas] = React.useState<'aurora' | 'cyber' | 'rings' | 'particles' | 'hyperspace'>('aurora');
  const [speed, setSpeed] = React.useState<'0.5x' | '1x' | '2x'>('1x');
  const [activeFilter, setActiveFilter] = React.useState<'normal' | 'vintage' | 'cyber' | 'sunset' | 'monochrome'>('normal');
  const [trimRange, setTrimRange] = React.useState<[number, number]>([0, 15]);
  const [beautyGlow, setBeautyGlow] = React.useState(50);
  const [colorCorrection, setColorCorrection] = React.useState({ brightness: 100, contrast: 100 });
  const [sticker, setSticker] = React.useState<string | null>(null);
  const [voiceEffect, setVoiceEffect] = React.useState<'none' | 'robot' | 'deep' | 'echo'>('none');

  // AI-powered caption helpers
  const [isAiGenerating, setIsAiGenerating] = React.useState(false);
  const [aiSuggestions, setAiSuggestions] = React.useState<string[]>([]);
  const [showAiModal, setShowAiModal] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState('');

  // Recording Simulation
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordTime, setRecordTime] = React.useState(0);
  const [recordedClips, setRecordedClips] = React.useState<number>(0);

  React.useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordTime((t) => {
          if (t >= 15) {
            setIsRecording(false);
            setRecordedClips((c) => c + 1);
            return 15;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleAiCaptionGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (data.captions) {
        setAiSuggestions(data.captions);
      }
    } catch (e) {
      console.error(e);
      setAiSuggestions([
        `✨ Custom particle flow dancing to ${aiPrompt}. #motionart #creative #zen`,
        `🌌 Cosmic rhythm looping in deep neon inspired by ${aiPrompt}. #synthwave #vibes`,
        `🛸 Bending colors in Tokyo twilight under ${aiPrompt} vibes. #cyberpunk #neon`
      ]);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const selectAiSuggestion = (sug: string) => {
    const parts = sug.split('#');
    setCaption(parts[0].trim());
    if (parts.length > 1) {
      setHashtags(parts.slice(1).map(t => t.trim()).join(' '));
    }
    setShowAiModal(false);
  };

  const handlePublish = () => {
    onPublishVideo({
      caption: caption || 'Experimenting with creative generative loops.',
      hashtags: hashtags ? hashtags.split(' ') : ['creative', 'zen'],
      music: musicTitle,
      canvasType: selectedCanvas,
      baseColor: selectedCanvas === 'aurora' ? '#00f2fe' : selectedCanvas === 'cyber' ? '#ff007f' : '#f1c40f',
      accentColor: selectedCanvas === 'aurora' ? '#4facfe' : selectedCanvas === 'cyber' ? '#7f00ff' : '#e67e22',
      loopSpeed: speed === '0.5x' ? 0.01 : speed === '2x' ? 0.04 : 0.02,
    });
  };

  const handleSaveDraft = () => {
    onSaveDraft({
      id: `draft_${Date.now()}`,
      caption: caption || 'Draft creative visualization',
      hashtags: hashtags,
      filter: activeFilter,
      speed: speed,
      musicTitle: musicTitle,
      coverColor: selectedCanvas === 'aurora' ? 'cyan' : selectedCanvas === 'cyber' ? 'pink' : 'yellow',
      timestamp: new Date().toLocaleDateString()
    });
  };

  // CSS Filter string based on state
  const getFilterStyle = () => {
    let filter = '';
    if (activeFilter === 'vintage') filter += 'sepia(0.5) contrast(1.1)';
    else if (activeFilter === 'cyber') filter += 'hue-rotate(90deg) saturate(1.4)';
    else if (activeFilter === 'sunset') filter += 'saturate(1.2) sepia(0.2) contrast(1.1)';
    else if (activeFilter === 'monochrome') filter += 'grayscale(1)';

    const brightnessPercent = colorCorrection.brightness;
    const contrastPercent = colorCorrection.contrast;
    filter += ` brightness(${brightnessPercent}%) contrast(${contrastPercent}%)`;

    return { filter };
  };

  return (
    <div id="upload-studio-panel" className="w-full h-full bg-obsidian flex flex-col p-5 text-white overflow-y-auto scrollbar-none font-sans">
      {/* Visual Camera Preview Canvas simulation */}
      <div className="relative aspect-[9/12] w-full rounded-2xl bg-zinc-950 overflow-hidden border border-white/5 mb-5 shadow-inner shrink-0 flex flex-col justify-between p-4">
        {/* Dynamic Canvas Simulator Background preview */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center transition-all duration-300 bg-zinc-950/40"
          style={getFilterStyle()}
        >
          {/* Animated SVG to look highly premium */}
          <div className="text-center space-y-3">
            <Sparkle size={48} className="mx-auto animate-pulse text-champagne-gold" />
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              {selectedCanvas} live render output
            </span>
          </div>

          {/* Skin Smoothing Beauty Glow Blur Layer */}
          <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: `blur(${beautyGlow / 15}px)`, opacity: 0.2 }} />

          {/* Active visual sticker */}
          {sticker && (
            <div className="absolute top-1/3 left-1/3 text-4xl animate-bounce pointer-events-none">
              {sticker}
            </div>
          )}
        </div>

        {/* Camera Header Overlay */}
        <div className="relative z-10 flex justify-between items-center select-none font-display">
          <span className="text-[10px] font-mono font-bold bg-black/60 px-2 py-1 rounded-md text-red-500 flex items-center gap-1.5 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            {isRecording ? `REC 00:${recordTime.toString().padStart(2, '0')}` : 'STUDIO READY'}
          </span>
          <span className="text-[10px] font-mono font-bold bg-black/60 px-2 py-1 rounded-md text-zinc-400">
            SPEED: {speed}
          </span>
        </div>

        {/* Recording Controls Center Toggles */}
        <div className="relative z-10 flex flex-col items-center justify-end flex-1 pb-4 gap-4 font-display">
          {!isRecording && (
            <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl backdrop-blur-md">
              {['aurora', 'cyber', 'rings', 'particles'].map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedCanvas(style as any)}
                  className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase transition-all cursor-pointer ${
                    selectedCanvas === style ? 'bg-champagne-gold text-black' : 'bg-transparent text-zinc-400'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          )}

          {/* Pulsing Record Button */}
          <div className="flex items-center gap-6 select-none">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center cursor-pointer transition-all bg-transparent"
            >
              <div className={`rounded-full transition-all ${isRecording ? 'w-5 h-5 bg-red-500' : 'w-10 h-10 bg-red-500'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Editing Studio Sliders */}
      <div className="space-y-5">
        {/* Creative controls accordion */}
        <div className="space-y-3.5">
          {/* Trim Range Slider */}
          <div className="space-y-1.5 p-3.5 bg-carbon-card rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs text-zinc-400 font-display">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Scissors size={12} className="text-champagne-gold" /> Trimmer Range
              </span>
              <span className="font-mono text-[10px] text-champagne-gold">{trimRange[0]}s - {trimRange[1]}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={trimRange[1]}
              onChange={(e) => setTrimRange([trimRange[0], Number(e.target.value)])}
              className="w-full accent-champagne-gold cursor-pointer"
            />
          </div>

          {/* Speed selector & filters row */}
          <div className="grid grid-cols-2 gap-3 select-none font-display">
            <div className="p-3 bg-carbon-card rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Capture Speed</span>
              <div className="grid grid-cols-3 gap-1.5">
                {['0.5x', '1x', '2x'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s as any)}
                    className={`h-7 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      speed === s ? 'bg-champagne-gold text-black font-extrabold' : 'bg-obsidian text-zinc-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-carbon-card rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Glass Filters</span>
              <div className="flex gap-1 overflow-x-auto scrollbar-none">
                {['normal', 'vintage', 'cyber', 'sunset'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f as any)}
                    className={`h-7 px-2 shrink-0 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      activeFilter === f ? 'bg-gradient-to-tr from-champagne-gold to-velvet-bronze text-black font-bold' : 'bg-obsidian text-zinc-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color correction & beauty sliders */}
          <div className="p-4 bg-carbon-card rounded-xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center select-none font-display">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <Sliders size={12} className="text-champagne-gold" /> Color Correction & Beauty Glow
              </span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>Skin Smoothing Blur</span>
                  <span className="text-champagne-gold">{beautyGlow}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={beautyGlow}
                  onChange={(e) => setBeautyGlow(Number(e.target.value))}
                  className="w-full accent-champagne-gold cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>Exposure Brightness</span>
                  <span className="text-champagne-gold">{colorCorrection.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={colorCorrection.brightness}
                  onChange={(e) => setColorCorrection(prev => ({ ...prev, brightness: Number(e.target.value) }))}
                  className="w-full accent-champagne-gold cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Voice Effects & Background Sound Selector */}
          <div className="p-4 bg-carbon-card rounded-xl border border-white/5 space-y-4 select-none font-display">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Voice Effects Modulator</span>
              <div className="grid grid-cols-4 gap-1.5">
                {['none', 'robot', 'deep', 'echo'].map((ve) => (
                  <button
                    key={ve}
                    onClick={() => setVoiceEffect(ve as any)}
                    className={`h-7 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      voiceEffect === ve ? 'bg-gradient-to-r from-champagne-gold to-velvet-bronze text-black font-bold' : 'bg-obsidian text-zinc-400'
                    }`}
                  >
                    {ve}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Stickers Badge Overlay</span>
              <div className="flex gap-2">
                {['🔥', '✨', '⚡', '🌌', '👑', '👽'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSticker(sticker === st ? null : st)}
                    className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer border ${
                      sticker === st ? 'bg-obsidian border-champagne-gold' : 'bg-obsidian border-transparent'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Captions & Tag Settings */}
        <div className="space-y-4 p-4 bg-carbon-card rounded-xl border border-white/5">
          <div className="flex justify-between items-center font-display">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Caption & Tag settings</span>
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-1 text-[10px] text-champagne-gold bg-champagne-gold/10 px-2 py-1 rounded-md border border-champagne-gold/20 font-bold uppercase tracking-wider hover:bg-champagne-gold/25 transition-all cursor-pointer"
            >
              <Sparkles size={11} /> Generate AI Caption
            </button>
          </div>

          <div className="space-y-3.5">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a custom description..."
              className="w-full h-10 bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl px-3.5 text-xs text-white"
            />

            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="Hashtags (separated by space, e.g. generative synth)"
              className="w-full h-10 bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl px-3.5 text-xs text-zinc-300 font-mono"
            />
          </div>
        </div>

        {/* Buttons Row: Save Draft vs Publish */}
        <div className="grid grid-cols-2 gap-3 select-none pb-6 font-display">
          <button
            onClick={handleSaveDraft}
            className="h-11 bg-carbon-card hover:bg-zinc-900 border border-white/5 text-zinc-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Save size={14} /> Save to Drafts
          </button>

          <button
            onClick={handlePublish}
            className="h-11 bg-gradient-to-r from-champagne-gold to-velvet-bronze hover:opacity-95 text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-champagne-gold/10 transition-all"
          >
            Publish Stream <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* AI Generate captions modal overlay */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 select-text">
          <div className="w-full max-w-[340px] bg-carbon-card rounded-3xl border border-white/5 p-5 space-y-4">
            <div className="flex justify-between items-center select-none font-display">
              <span className="text-[10px] font-bold text-champagne-gold tracking-widest uppercase flex items-center gap-1">
                <Sparkles size={12} /> Aura Caption Generator
              </span>
              <button onClick={() => setShowAiModal(false)} className="text-zinc-500 hover:text-white bg-transparent border-0 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <p className="text-[11px] text-zinc-400">Describe what vibe your dynamic short-video represents:</p>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Study session with rain chords..."
                className="w-full h-10 bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl px-3 text-xs text-white"
              />
              <button
                onClick={handleAiCaptionGenerate}
                disabled={isAiGenerating || !aiPrompt.trim()}
                className="w-full h-10 bg-gradient-to-r from-champagne-gold to-velvet-bronze disabled:opacity-40 text-black font-bold text-xs rounded-xl flex items-center justify-center cursor-pointer transition-all font-display"
              >
                {isAiGenerating ? <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" /> : 'Ask Gemini Model'}
              </button>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-white/5 font-display">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider select-none">Select a generated vibe:</span>
                <div className="space-y-2 font-sans">
                  {aiSuggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAiSuggestion(sug)}
                      className="w-full p-2.5 bg-obsidian hover:bg-[#15151b] rounded-xl border border-white/5 text-left text-[11px] font-light leading-relaxed text-zinc-300 transition-all cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
