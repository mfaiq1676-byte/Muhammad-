import React from 'react';
import { Search, Flame, Award, Sparkles, TrendingUp, Grid, Play } from 'lucide-react';
import { Video, Creator } from '../types';
import { TRENDING_HASHTAGS } from '../data/mockData';

interface DiscoverProps {
  creators: Creator[];
  videos: Video[];
  onSelectHashtag: (tag: string) => void;
  onSelectCreator: (creator: Creator) => void;
}

export default function Discover({ creators, videos, onSelectHashtag, onSelectCreator }: DiscoverProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [aiInsights, setAiInsights] = React.useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = React.useState(false);

  // Categories
  const categories = ['All', 'Creative', 'Music', 'Tech', 'Vibe'];

  // Query server-side Gemini recommendation endpoint
  const fetchAiRecommendations = async () => {
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: activeCategory }),
      });
      const data = await response.json();
      if (data.recommendations) {
        setAiInsights(data.recommendations);
      }
    } catch (e) {
      console.error(e);
      setAiInsights([
        "🔥 Hot Trend: #ambientbeats is booming in studying category!",
        "💡 Creator Suggestion: Try making a loop with '#generativeflow' to double views!",
        "📈 Audience Insight: Viewers are watching 'audio-visual synth loops' for 42% longer today."
      ]);
    } finally {
      setIsLoadingAi(false);
    }
  };

  React.useEffect(() => {
    fetchAiRecommendations();
  }, [activeCategory]);

  // Filter hashtags based on search or category
  const filteredTags = TRENDING_HASHTAGS.filter(item => {
    const matchesSearch = item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="discover-panel" className="w-full h-full bg-obsidian flex flex-col p-5 text-white overflow-y-auto">
      {/* Top Search bar */}
      <div className="relative mb-5 shrink-0">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search creators, visuals, or tags..."
          className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-4 text-xs transition-all duration-200"
        />
      </div>

      {/* Category Horizontal sliders */}
      <div className="flex gap-2.5 pb-4 overflow-x-auto shrink-0 scrollbar-none font-display">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-champagne-gold to-velvet-bronze text-black shadow-md shadow-champagne-gold/10'
                : 'bg-carbon-card border border-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI Smart Recommendation Box */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-carbon-card to-obsidian border border-white/5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-champagne-gold/5 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-1.5 mb-3 select-none">
          <Sparkles size={14} className="text-champagne-gold animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-gold font-display">AURA COGNITIVE SUGGESTION</span>
          {isLoadingAi && <span className="w-2.5 h-2.5 rounded-full border border-champagne-gold border-t-transparent animate-spin ml-auto" />}
        </div>

        <div className="space-y-2.5">
          {aiInsights.map((insight, idx) => (
            <p key={idx} className="text-xs text-zinc-300 font-light leading-relaxed flex items-start gap-2">
              <span className="text-zinc-600 font-mono">0{idx + 1}</span>
              {insight}
            </p>
          ))}
        </div>
      </div>

      {/* Grid of Trending Creators */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3.5 select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-display">
            <Award size={14} className="text-champagne-gold" /> Popular Creators
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {creators.map((cr) => (
            <button
              key={cr.id}
              onClick={() => onSelectCreator(cr)}
              className="flex flex-col items-center gap-2 shrink-0 bg-transparent border-0 text-white cursor-pointer hover:scale-105 transition-all"
            >
              <div className="w-14 h-14 rounded-full p-[1.5px] bg-gradient-to-tr from-champagne-gold to-velvet-bronze">
                <img referrerPolicy="no-referrer" src={cr.avatar} alt="creator" className="w-full h-full object-cover rounded-full bg-obsidian" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-wide w-16 truncate font-display">{cr.name}</p>
                <p className="text-[8px] text-zinc-500 font-mono">{cr.followers >= 1000000 ? `${(cr.followers/1000000).toFixed(1)}M` : `${(cr.followers/1000).toFixed(0)}K`}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Trending Hashtags / Challenges */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-3 select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-display">
            <Flame size={14} className="text-amber-500" /> Hot Challenges
          </span>
        </div>

        <div className="space-y-2.5">
          {filteredTags.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectHashtag(item.tag)}
              className="w-full flex items-center justify-between p-3.5 bg-carbon-card hover:bg-[#15151b] rounded-xl border border-white/5 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-obsidian border border-white/5 rounded-lg flex items-center justify-center text-champagne-gold font-mono text-xs font-bold">
                  #
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">#{item.tag}</h4>
                  <p className="text-[9px] text-zinc-500 font-semibold uppercase font-display">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-400 font-bold">{item.views} views</span>
              </div>
            </button>
          ))}

          {filteredTags.length === 0 && (
            <div className="text-center py-8">
              <p className="text-xs text-zinc-500">No hashtags matching your queries found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
