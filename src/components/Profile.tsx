import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Grid, Bookmark, Save, Play, Edit3, X } from 'lucide-react';
import { Video, DraftVideo, Creator } from '../types';

interface ProfileProps {
  creators: Creator[];
  publishedVideos: Video[];
  savedVideos: Video[];
  drafts: DraftVideo[];
  myProfile: { name: string; handle: string; avatar: string; bio: string };
  onUpdateProfile: (updated: { name: string; bio: string; avatar: string }) => void;
  onClearDraft: (id: string) => void;
  onNavigateToSettings: () => void;
}

export default function Profile({
  creators,
  publishedVideos,
  savedVideos,
  drafts,
  myProfile,
  onUpdateProfile,
  onClearDraft,
  onNavigateToSettings
}: ProfileProps) {
  const [activeTab, setActiveTab] = React.useState<'videos' | 'saved' | 'drafts'>('videos');
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editName, setEditName] = React.useState(myProfile.name);
  const [editBio, setEditBio] = React.useState(myProfile.bio);
  const [editAvatar, setEditAvatar] = React.useState(myProfile.avatar);

  // Stats
  const totalLikesSum = publishedVideos.reduce((sum, v) => sum + v.likes, 280000);
  const totalViewsSum = publishedVideos.reduce((sum, v) => sum + v.views, 1200000);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name: editName, bio: editBio, avatar: editAvatar });
    setShowEditModal(false);
  };

  const myAvatarUrls = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop'
  ];

  return (
    <div id="profile-panel" className="w-full h-full bg-obsidian flex flex-col p-5 text-white overflow-y-auto">
      {/* Top Header controls row */}
      <div className="flex justify-between items-center mb-6 shrink-0 select-none font-display">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Creator Console</span>
        <button
          onClick={onNavigateToSettings}
          className="w-8 h-8 rounded-full bg-carbon-card border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
        >
          <Settings size={15} />
        </button>
      </div>

      {/* Hero Bio profile card block */}
      <div className="flex flex-col items-center text-center space-y-4 mb-6 shrink-0 select-none font-sans">
        <div className="relative">
          <div className="w-[84px] h-[84px] rounded-full p-[2px] bg-gradient-to-tr from-champagne-gold to-velvet-bronze">
            <img referrerPolicy="no-referrer" src={myProfile.avatar} alt="avatar" className="w-full h-full object-cover rounded-full bg-obsidian" />
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute bottom-0 right-0 w-7 h-7 bg-champagne-gold text-black hover:opacity-90 rounded-full flex items-center justify-center shadow-md border-0 cursor-pointer"
          >
            <Edit3 size={12} className="text-black" />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-100 font-display">{myProfile.name}</h3>
          <p className="text-xs text-champagne-gold font-medium font-mono mt-0.5">{myProfile.handle}</p>
        </div>

        <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-[280px]">
          {myProfile.bio}
        </p>

        {/* Stats segment bars */}
        <div className="grid grid-cols-3 gap-1 w-full bg-carbon-card border border-white/5 rounded-2xl p-3 text-center">
          <div>
            <h4 className="text-sm font-black text-white">128</h4>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-display">Following</span>
          </div>
          <div className="border-x border-white/5">
            <h4 className="text-sm font-black text-white">43.2K</h4>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-display">Followers</span>
          </div>
          <div>
            <h4 className="text-sm font-black text-white">
              {totalLikesSum >= 1000000 ? `${(totalLikesSum / 1000000).toFixed(1)}M` : `${(totalLikesSum / 1000).toFixed(0)}K`}
            </h4>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-display">Likes</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation list select row */}
      <div className="flex border-b border-white/5 mb-4 shrink-0 select-none font-display">
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer relative ${
            activeTab === 'videos' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Grid size={13} /> Loops
          {activeTab === 'videos' && <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-champagne-gold" />}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer relative ${
            activeTab === 'saved' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Bookmark size={13} /> Saved
          {activeTab === 'saved' && <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-champagne-gold" />}
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer relative ${
            activeTab === 'drafts' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Save size={13} /> Drafts ({drafts.length})
          {activeTab === 'drafts' && <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-champagne-gold" />}
        </button>
      </div>

      {/* Tab contents panel rendering */}
      <div className="flex-1">
        {activeTab === 'videos' && (
          <div className="grid grid-cols-3 gap-2 pb-6">
            {publishedVideos.map((v) => (
              <div
                key={v.id}
                className="aspect-[9/12] rounded-xl relative overflow-hidden border border-white/5 flex items-center justify-center bg-carbon-card text-champagne-gold hover:bg-[#15151b] transition-colors"
              >
                {/* Visualizer loop thumbnail badge */}
                <div className="text-center p-1 font-mono text-[8px] uppercase tracking-wider select-none space-y-1">
                  <Play size={16} className="mx-auto text-current opacity-70" />
                  <span className="block truncate max-w-[64px]">{v.canvasType}</span>
                </div>

                {/* Stat count overlay */}
                <span className="absolute bottom-1.5 left-1.5 text-[8px] font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded text-white select-none">
                  {(v.views / 1000).toFixed(0)}K views
                </span>
              </div>
            ))}

            {publishedVideos.length === 0 && (
              <div className="col-span-3 text-center py-12 select-none">
                <p className="text-xs text-zinc-500">No published loops yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-3 gap-2 pb-6">
            {savedVideos.map((v) => (
              <div
                key={v.id}
                className="aspect-[9/12] rounded-xl bg-carbon-card border border-white/5 relative overflow-hidden flex items-center justify-center text-zinc-400 hover:bg-[#15151b] transition-colors"
              >
                <div className="text-center p-1 font-mono text-[8px] uppercase tracking-wider select-none space-y-1">
                  <Bookmark size={16} className="mx-auto text-champagne-gold fill-champagne-gold/20" />
                  <span className="block truncate max-w-[64px]">{v.canvasType}</span>
                </div>
              </div>
            ))}

            {savedVideos.length === 0 && (
              <div className="col-span-3 text-center py-12 select-none">
                <p className="text-xs text-zinc-500">No saved loops yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="space-y-2 pb-6">
            {drafts.map((dr) => (
              <div
                key={dr.id}
                className="p-3.5 bg-carbon-card border border-white/5 rounded-xl hover:border-zinc-800 transition-all flex items-center justify-between"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-zinc-200 truncate">{dr.caption}</h4>
                  <p className="text-[9px] text-zinc-500 font-mono mt-0.5">Filter: {dr.filter} • Saved {dr.timestamp}</p>
                </div>

                <div className="flex items-center gap-2 select-none">
                  <span className="text-[9px] font-bold bg-champagne-gold/10 text-champagne-gold px-2 py-0.5 rounded border border-champagne-gold/20 uppercase tracking-wider">
                    Local
                  </span>
                  <button
                    onClick={() => onClearDraft(dr.id)}
                    className="w-7 h-7 rounded-lg bg-obsidian border border-white/5 text-zinc-400 hover:text-red-400 flex items-center justify-center cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}

            {drafts.length === 0 && (
              <div className="text-center py-12 select-none">
                <p className="text-xs text-zinc-500">No active local drafts.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile modal overlay sheet */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 select-text">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-[340px] bg-carbon-card rounded-3xl border border-white/5 p-5 space-y-4 text-white"
            >
              <div className="flex justify-between items-center select-none font-display">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Edit Details</span>
                <button onClick={() => setShowEditModal(false)} className="text-zinc-500 hover:text-white bg-transparent border-0 cursor-pointer">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* Pick avatar face */}
                <div className="space-y-1.5 select-none">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-display">Select Avatar</label>
                  <div className="flex gap-2.5 pt-1">
                    {myAvatarUrls.map((url) => (
                      <button
                        type="button"
                        key={url}
                        onClick={() => setEditAvatar(url)}
                        className={`w-11 h-11 rounded-full object-cover p-0.5 border cursor-pointer transition-all ${
                          editAvatar === url ? 'border-champagne-gold scale-105' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img referrerPolicy="no-referrer" src={url} alt="option" className="w-full h-full rounded-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-display">Display Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-10 bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl px-3 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-display">Custom Bio</label>
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl p-3 text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-champagne-gold to-velvet-bronze text-black font-bold text-xs rounded-xl cursor-pointer hover:opacity-95 transition-all shadow-md shadow-champagne-gold/10"
                >
                  Save Profile Configuration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
