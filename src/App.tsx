import React from 'react';
import { Home, Search, PlusCircle, MessageSquare, User, Radio, BarChart2, DollarSign, ShieldAlert, KeyRound } from 'lucide-react';

import MobileContainer from './components/MobileContainer';
import Splash from './components/Splash';
import Auth from './components/Auth';
import HomeFeed from './components/HomeFeed';
import Discover from './components/Discover';
import UploadStudio from './components/UploadStudio';
import LiveStream from './components/LiveStream';
import Inbox from './components/Inbox';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Monetization from './components/Monetization';
import SettingsView from './components/Settings';
import AdminPanel from './components/AdminPanel';

import { Video, DraftVideo, Creator } from './types';
import { INITIAL_VIDEOS, INITIAL_CREATORS } from './data/mockData';

export default function App() {
  // Splash & Auth Flow state
  const [showSplash, setShowSplash] = React.useState(true);
  const [user, setUser] = React.useState<{ username: string; email: string } | null>(null);

  // App Page state
  const [currentPage, setCurrentPage] = React.useState<
    'feed' | 'discover' | 'upload' | 'live' | 'inbox' | 'profile' | 'dashboard' | 'monetization' | 'settings' | 'admin'
  >('feed');

  // Video & Profile State managers
  const [videos, setVideos] = React.useState<Video[]>(INITIAL_VIDEOS);
  const [creators, setCreators] = React.useState<Creator[]>(INITIAL_CREATORS);
  const [drafts, setDrafts] = React.useState<DraftVideo[]>([
    {
      id: 'd_pre',
      caption: 'Testing the cyberpunk pink laser grid preset loops',
      hashtags: 'cyberpunk neon matrix',
      filter: 'cyber',
      speed: '1x',
      musicTitle: 'Neo Sakura - Electric Dreams (Tokyo Mix)',
      coverColor: 'pink',
      timestamp: '06/29/2026'
    }
  ]);
  const [giftCoinsEarned, setGiftCoinsEarned] = React.useState(120);

  const [myProfile, setMyProfile] = React.useState({
    name: 'Aura Explorer',
    handle: '@aura_explorer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop',
    bio: 'Digital synthesis wizard. Building high-fidelity interactive canvas loops. ✨ Seattle'
  });

  const loggedInCreator: Creator = {
    id: 'me',
    name: myProfile.name,
    handle: myProfile.handle,
    avatar: myProfile.avatar,
    followers: 43200,
    following: 128,
    totalLikes: 284300,
    bio: myProfile.bio,
    isFollowing: false
  };

  // 1. Actions: Like video toggle
  const handleToggleLike = (id: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 } : v))
    );
  };

  // 2. Actions: Save video toggle
  const handleToggleSave = (id: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, isSaved: !v.isSaved, saves: v.isSaved ? v.saves - 1 : v.saves + 1 } : v)));
  };

  // 3. Actions: Follow creator toggle
  const handleToggleFollow = (creatorId: string) => {
    setCreators((prev) => prev.map((c) => (c.id === creatorId ? { ...c, isFollowing: !c.isFollowing } : c)));
    setVideos((prev) =>
      prev.map((v) => (v.creator.id === creatorId ? { ...v, creator: { ...v.creator, isFollowing: !v.creator.isFollowing } } : v))
    );
  };

  // 4. Actions: Sharing copy log callback
  const handleShareVideo = (v: Video) => {
    console.log(`Shared short video: ${v.caption}`);
  };

  // 5. Actions: Publish new video loop from UploadStudio
  const handlePublishVideo = (newVid: Partial<Video>) => {
    const published: Video = {
      id: `v_pub_${Date.now()}`,
      creator: loggedInCreator,
      caption: newVid.caption || 'Exploring visual space loops.',
      hashtags: newVid.hashtags || ['visual', 'flow'],
      music: newVid.music || 'Original Sound Loop (HD)',
      likes: 0,
      commentsCount: 0,
      shares: 0,
      saves: 0,
      views: 12,
      isLiked: false,
      isSaved: false,
      canvasType: newVid.canvasType || 'aurora',
      loopSpeed: newVid.loopSpeed || 0.02,
      baseColor: newVid.baseColor || '#00f2fe',
      accentColor: newVid.accentColor || '#7f00ff'
    };

    setVideos((prev) => [published, ...prev]);
    setCurrentPage('feed');
  };

  // 6. Actions: Add virtual gift earnings from Livestream
  const handleAddGiftReward = (cost: number) => {
    setGiftCoinsEarned((c) => c + cost);
  };

  const handleClearCoins = () => {
    setGiftCoinsEarned(0);
  };

  // Splash rendering
  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  // Auth screen rendering if not logged in
  if (!user) {
    return (
      <MobileContainer>
        <Auth onLoginSuccess={(u) => setUser(u)} />
      </MobileContainer>
    );
  }

  // Segment video groupings
  const myPublished = videos.filter((v) => v.creator.id === 'me');
  const mySaved = videos.filter((v) => v.isSaved);

  return (
    <MobileContainer activeCanvasType={currentPage === 'feed' ? videos[0]?.canvasType : undefined}>
      {/* Visual Live indicator tab on header for simple navigation */}
      <div className="absolute top-12 left-5 z-40 flex gap-2">
        {currentPage !== 'live' && (
          <button
            onClick={() => setCurrentPage('live')}
            className="flex items-center gap-1.5 bg-amber-600/90 text-white font-extrabold text-[9px] px-2.5 py-1 rounded-full border border-amber-500/20 shadow-md cursor-pointer select-none uppercase tracking-widest hover:bg-amber-700 transition-colors"
          >
            <Radio size={10} className="animate-pulse" /> LIVE
          </button>
        )}

        {currentPage === 'profile' && (
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-1 bg-carbon-card border border-white/5 text-[9px] px-2.5 py-1 rounded-full text-zinc-300 font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
            >
              <BarChart2 size={10} /> Chart
            </button>
            <button
              onClick={() => setCurrentPage('monetization')}
              className="flex items-center gap-1 bg-carbon-card border border-white/5 text-[9px] px-2.5 py-1 rounded-full text-zinc-300 font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
            >
              <DollarSign size={10} /> Wallet
            </button>
          </div>
        )}
      </div>

      {/* Main interactive routing viewport pages */}
      <div className="flex-1 w-full h-full overflow-hidden relative">
        {currentPage === 'feed' && (
          <HomeFeed
            videos={videos}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
            onToggleFollow={handleToggleFollow}
            onShare={handleShareVideo}
          />
        )}

        {currentPage === 'discover' && (
          <Discover
            creators={creators}
            videos={videos}
            onSelectHashtag={(tag) => {
              // Filters active videos to tag category and loads feed
              const matchingIdx = videos.findIndex((v) => v.hashtags.includes(tag.toLowerCase()));
              if (matchingIdx !== -1) {
                setCurrentPage('feed');
              }
            }}
            onSelectCreator={(cr) => {
              // Scroll directly to creator's video
              const matchingIdx = videos.findIndex((v) => v.creator.id === cr.id);
              if (matchingIdx !== -1) {
                setCurrentPage('feed');
              }
            }}
          />
        )}

        {currentPage === 'upload' && (
          <UploadStudio
            onPublishVideo={handlePublishVideo}
            onSaveDraft={(dr) => {
              setDrafts((prev) => [dr, ...prev]);
              setCurrentPage('profile');
            }}
            onGoBack={() => setCurrentPage('feed')}
          />
        )}

        {currentPage === 'live' && <LiveStream onBackToFeed={() => setCurrentPage('feed')} onAddGiftReward={handleAddGiftReward} />}

        {currentPage === 'inbox' && <Inbox creators={creators} />}

        {currentPage === 'profile' && (
          <Profile
            creators={creators}
            publishedVideos={myPublished}
            savedVideos={mySaved}
            drafts={drafts}
            myProfile={myProfile}
            onUpdateProfile={(updated) => setMyProfile((p) => ({ ...p, ...updated }))}
            onClearDraft={(id) => setDrafts((prev) => prev.filter((d) => d.id !== id))}
            onNavigateToSettings={() => setCurrentPage('settings')}
          />
        )}

        {currentPage === 'dashboard' && <Dashboard giftCoinsEarned={giftCoinsEarned} />}

        {currentPage === 'monetization' && <Monetization giftCoinsEarned={giftCoinsEarned} onClearCoins={handleClearCoins} />}

        {currentPage === 'settings' && (
          <SettingsView
            onBack={() => setCurrentPage('profile')}
            onLogout={() => {
              setUser(null);
              setCurrentPage('feed');
            }}
          />
        )}
      </div>

      {/* Global Bottom Tab Bar Controls Menu */}
      <div className="h-[60px] w-full bg-carbon-card border-t border-white/5 flex items-center justify-between px-6 select-none shrink-0 z-40 relative">
        <button
          onClick={() => setCurrentPage('feed')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-0 ${
            currentPage === 'feed' ? 'text-champagne-gold' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Home size={18} />
          <span className="text-[8px] font-bold uppercase tracking-wider font-display">Feed</span>
        </button>

        <button
          onClick={() => setCurrentPage('discover')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-0 ${
            currentPage === 'discover' ? 'text-champagne-gold' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Search size={18} />
          <span className="text-[8px] font-bold uppercase tracking-wider font-display">Explore</span>
        </button>

        {/* Floating Plus Upload Trigger */}
        <button
          onClick={() => setCurrentPage('upload')}
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-champagne-gold to-velvet-bronze flex items-center justify-center text-black shadow-[0_4px_15px_rgba(223,183,108,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-0 mt-[-24px]"
        >
          <PlusCircle size={22} className="text-black" />
        </button>

        <button
          onClick={() => setCurrentPage('inbox')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-0 ${
            currentPage === 'inbox' ? 'text-champagne-gold' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <div className="relative">
            <MessageSquare size={18} />
            <span className="absolute top-[-2px] right-[-3px] w-2 h-2 bg-champagne-gold rounded-full animate-pulse" />
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wider font-display">Inbox</span>
        </button>

        <button
          onClick={() => setCurrentPage('profile')}
          className={`flex flex-col items-center justify-center gap-1 cursor-pointer bg-transparent border-0 ${
            currentPage === 'profile' ||
            currentPage === 'dashboard' ||
            currentPage === 'monetization' ||
            currentPage === 'settings'
              ? 'text-champagne-gold'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <User size={18} />
          <span className="text-[8px] font-bold uppercase tracking-wider font-display">Me</span>
        </button>
      </div>
    </MobileContainer>
  );
}
