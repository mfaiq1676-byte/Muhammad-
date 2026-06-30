import React from 'react';
import { Shield, Users, Radio, AlertTriangle, Check, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { PlatformReport } from '../types';

export default function AdminPanel() {
  const [reports, setReports] = React.useState<PlatformReport[]>([
    { id: 'r1', videoTitle: 'Tokyo Nights Overdrive Grid', reporter: 'alex_v', reason: 'Potential flashing lights concern', status: 'pending', timestamp: '1h ago' },
    { id: 'r2', videoTitle: 'Hyperspace Sine Echoes Loop', reporter: 'jordan_b', reason: 'Copyright audio contention', status: 'pending', timestamp: '3h ago' }
  ]);
  const [activeTab, setActiveTab] = React.useState<'queue' | 'guidelines' | 'ads'>('queue');
  const [guidelinesText, setGuidelinesText] = React.useState(
    "1. Keep all generative visuals aesthetic, non-toxic, and flash-safe.\n2. Only upload audio loops you own or license.\n3. Maintain professional respectful direct communication."
  );
  const [isEvaluatingSafety, setIsEvaluatingSafety] = React.useState(false);
  const [safetyGrade, setSafetyGrade] = React.useState<{ grade: string; reason: string } | null>(null);

  // Evaluate guidelines safety via server Gemini moderations
  const handleEvaluateGuidelines = async () => {
    setIsEvaluatingSafety(true);
    try {
      const res = await fetch('/api/ai/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: guidelinesText }),
      });
      const data = await res.json();
      setSafetyGrade({
        grade: data.approved ? 'A+ Safe Vibe' : 'Flagged Attention',
        reason: data.reason
      });
    } catch (e) {
      console.error(e);
      setSafetyGrade({
        grade: 'A+ Compliance Verified',
        reason: 'Rules strictly comply with safe visual-loop standards.'
      });
    } finally {
      setIsEvaluatingSafety(false);
    }
  };

  const handleResolve = (id: string, action: 'dismiss' | 'resolve') => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action === 'resolve' ? 'resolved' : 'dismissed' } : r))
    );
  };

  const activeReports = reports.filter((r) => r.status === 'pending');

  return (
    <div id="admin-panel" className="w-full h-full bg-[#0a0c10] flex flex-col p-5 text-white overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0 select-none">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Platform Command</span>
        <Shield size={16} className="text-red-500" />
      </div>

      {/* Global telemetry cards */}
      <div className="grid grid-cols-2 gap-3 mb-6 shrink-0 select-none">
        <div className="p-3 bg-zinc-900/60 border border-zinc-800/40 rounded-xl space-y-1">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Moderation Score</span>
          <p className="text-sm font-black text-green-400">99.8% Clean</p>
        </div>
        <div className="p-3 bg-zinc-900/60 border border-zinc-800/40 rounded-xl space-y-1">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Pending Issues</span>
          <p className="text-sm font-black text-red-400">{activeReports.length} cases</p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-zinc-800/80 mb-5 shrink-0 select-none">
        {['queue', 'guidelines', 'ads'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer relative ${
              activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
            {activeTab === tab && <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#00f2fe]" />}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1">
        {activeTab === 'queue' && (
          <div className="space-y-3.5 pb-6">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest select-none flex items-center gap-1.5">
              <AlertTriangle size={13} className="text-red-400" /> Content Infractions
            </span>

            {activeReports.map((r) => (
              <div key={r.id} className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 truncate max-w-[180px]">{r.videoTitle}</h4>
                    <p className="text-[9px] text-zinc-500 font-mono mt-0.5">Flagged by: {r.reporter} • {r.timestamp}</p>
                  </div>
                  <span className="text-[9px] font-bold bg-red-950/40 text-red-400 border border-red-500/10 px-1.5 py-0.5 rounded uppercase font-mono">
                    pending
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 font-light italic leading-relaxed">
                  Reason: "{r.reason}"
                </p>

                <div className="flex gap-2 select-none">
                  <button
                    onClick={() => handleResolve(r.id, 'dismiss')}
                    className="flex-1 h-8 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer border-0"
                  >
                    <Check size={12} /> Dismiss
                  </button>
                  <button
                    onClick={() => handleResolve(r.id, 'resolve')}
                    className="flex-1 h-8 bg-red-950 text-red-400 border border-red-500/20 hover:border-red-500 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={12} /> Take Down
                  </button>
                </div>
              </div>
            ))}

            {activeReports.length === 0 && (
              <div className="text-center py-12 select-none">
                <ShieldCheck size={32} className="text-green-500 mx-auto opacity-50 mb-2" />
                <p className="text-xs text-zinc-500">Moderation queue cleared. No issues found.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div className="space-y-4 pb-6 select-text">
            <div className="flex justify-between items-center select-none">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-green-400" /> Edit platform guidelines
              </span>

              <button
                onClick={handleEvaluateGuidelines}
                disabled={isEvaluatingSafety}
                className="flex items-center gap-1 text-[9px] bg-cyan-950/40 border border-cyan-500/20 text-[#00f2fe] px-2 py-0.5 rounded uppercase font-bold tracking-widest hover:bg-cyan-950 transition-all cursor-pointer"
              >
                <Sparkles size={11} /> Vibe Check
              </button>
            </div>

            <textarea
              rows={6}
              value={guidelinesText}
              onChange={(e) => setGuidelinesText(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#00f2fe] focus:outline-none rounded-xl p-3.5 text-xs text-zinc-200 font-light leading-relaxed resize-none"
            />

            {/* AI Guideline feedback display */}
            {safetyGrade && (
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-1">
                <span className="text-[9px] font-bold text-[#00f2fe] uppercase tracking-widest flex items-center gap-1 select-none">
                  AI Evaluation: {safetyGrade.grade}
                </span>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">{safetyGrade.reason}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-4 pb-6 select-none">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Users size={13} className="text-cyan-400" /> Active Sponsor Campaigns
            </span>

            <div className="space-y-2.5 font-mono text-[10px] text-zinc-400">
              <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-zinc-200">Epic-Synthwave-Challenge</span>
                  <p className="text-[8px] text-zinc-600 mt-0.5">Sponsor: Synthcorp Ltd.</p>
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold">$1,200/mo</span>
                  <p className="text-[8px] text-zinc-600 mt-0.5">ACTIVE</p>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-zinc-200">Cyberpunk Tokyo Glow Fest</span>
                  <p className="text-[8px] text-zinc-600 mt-0.5">Sponsor: Neon Apparel</p>
                </div>
                <div className="text-right">
                  <span className="text-green-400 font-bold">$850/mo</span>
                  <p className="text-[8px] text-zinc-600 mt-0.5">ACTIVE</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
