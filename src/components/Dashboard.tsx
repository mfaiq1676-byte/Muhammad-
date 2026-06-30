import React from 'react';
import { motion } from 'motion/react';
import { BarChart2, Eye, Clock, Sparkles, TrendingUp, DollarSign, Globe, Award } from 'lucide-react';

interface DashboardProps {
  giftCoinsEarned: number;
}

export default function Dashboard({ giftCoinsEarned }: DashboardProps) {
  // Convert coins to simulated cash reward
  const earningsFromGifts = giftCoinsEarned * 0.05;
  const totalEarnings = 1424.50 + earningsFromGifts;

  const stats = [
    { label: 'Weekly Views', value: '42.8K', diff: '+12.4%', icon: Eye, color: 'text-cyan-400' },
    { label: 'Watch Time', value: '890 Hrs', diff: '+8.2%', icon: Clock, color: 'text-pink-500' },
    { label: 'Platform Fund', value: `$${totalEarnings.toFixed(2)}`, diff: '+$24.50 today', icon: DollarSign, color: 'text-green-400' }
  ];

  const graphData = [
    { day: 'Mon', views: 42, active: true },
    { day: 'Tue', views: 65, active: false },
    { day: 'Wed', views: 88, active: true },
    { day: 'Thu', views: 55, active: false },
    { day: 'Fri', views: 95, active: true },
    { day: 'Sat', views: 120, active: true },
    { day: 'Sun', views: 110, active: true }
  ];

  return (
    <div id="dashboard-panel" className="w-full h-full bg-[#0a0c10] flex flex-col p-5 text-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6 shrink-0 select-none">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Analytics Suite</span>
        <BarChart2 size={16} className="text-zinc-500" />
      </div>

      {/* Stats summary list cards */}
      <div className="space-y-3 mb-6 shrink-0 select-none">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-2xl flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{s.label}</span>
                <h4 className="text-lg font-black text-white">{s.value}</h4>
              </div>
              <div className="text-right">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center mb-1">
                  <Icon size={16} className={s.color} />
                </div>
                <span className="text-[10px] font-mono text-green-400 font-bold">{s.diff}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Bar Chart: Weekly Traffic Visualizer */}
      <div className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-2xl space-y-4 mb-6 select-none shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
            <TrendingUp size={12} className="text-[#00f2fe]" /> Traffic Volume Trends
          </span>
          <span className="text-[9px] font-mono text-zinc-500">7-DAY ROTATION</span>
        </div>

        {/* CSS Chart bars layout */}
        <div className="flex items-end justify-between h-36 pt-4 px-1">
          {graphData.map((d, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full flex justify-center items-end h-28 relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.views / 130) * 100}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className={`w-4.5 rounded-t-md relative group ${
                    d.active
                      ? 'bg-gradient-to-t from-[#00f2fe] to-[#7f00ff] shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'bg-zinc-800'
                  }`}
                />
              </div>
              <span className="text-[9px] font-mono text-zinc-500 font-bold">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Demographics bento grid blocks */}
      <div className="grid grid-cols-2 gap-3 pb-6 select-none">
        <div className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-2xl space-y-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
            <Globe size={11} className="text-[#ff007f]" /> Global Reach
          </span>
          <div className="space-y-1.5 font-mono text-[9px] text-zinc-400">
            <div className="flex justify-between">
              <span>United States</span>
              <span className="font-bold text-white">42%</span>
            </div>
            <div className="flex justify-between">
              <span>Japan</span>
              <span className="font-bold text-white">28%</span>
            </div>
            <div className="flex justify-between">
              <span>Germany</span>
              <span className="font-bold text-white">15%</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-2xl space-y-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
            <Award size={11} className="text-yellow-400" /> Growth Tier
          </span>
          <div className="space-y-1">
            <h5 className="text-[11px] font-bold text-[#00f2fe] uppercase">Silver Partner</h5>
            <p className="text-[9px] text-zinc-400 font-light leading-snug">
              Unlock golden tier at 50K total followers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
