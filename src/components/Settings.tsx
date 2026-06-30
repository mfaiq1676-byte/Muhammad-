import React from 'react';
import { Settings, Shield, Lock, Bell, Eye, EyeOff, Globe, Signal, KeyRound, Ban, Trash2, ArrowLeft } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function SettingsView({ onBack, onLogout }: SettingsProps) {
  // Notifications state
  const [pushNotifs, setPushNotifs] = React.useState(true);
  const [saveData, setSaveData] = React.useState(false);
  const [privateAccount, setPrivateAccount] = React.useState(false);
  const [activeLanguage, setActiveLanguage] = React.useState('en');

  // 2FA state simulator
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [twoFactorCode, setTwoFactorCode] = React.useState('');

  React.useEffect(() => {
    let interval: any;
    if (twoFactorEnabled) {
      const generateCode = () => {
        const rand = Math.floor(100000 + Math.random() * 900000).toString();
        setTwoFactorCode(rand);
      };
      generateCode();
      interval = setInterval(generateCode, 10000); // Regenerate every 10 seconds
    } else {
      setTwoFactorCode('');
    }
    return () => clearInterval(interval);
  }, [twoFactorEnabled]);

  return (
    <div id="settings-panel" className="w-full h-full bg-[#0a0c10] flex flex-col p-5 text-white overflow-y-auto">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-6 shrink-0 select-none">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer border-0"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Device Preferences</span>
      </div>

      <div className="space-y-6">
        {/* Section: Privacy and Accounts */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none flex items-center gap-1.5">
            <Eye size={12} className="text-cyan-400" /> Account & Privacy
          </span>

          <div className="space-y-2 select-none">
            {/* Private Account toggle */}
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-zinc-200">Private Profile Visibility</span>
                <p className="text-[9px] text-zinc-500 mt-0.5">Only approved following can view clips.</p>
              </div>
              <button
                onClick={() => setPrivateAccount(!privateAccount)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer border-0 ${
                  privateAccount ? 'bg-[#00f2fe]' : 'bg-zinc-800'
                }`}
              >
                <div className={`w-4.5 h-4.5 bg-black rounded-full transition-transform ${privateAccount ? 'translate-x-4.5' : ''}`} />
              </button>
            </div>

            {/* Blocked Users list */}
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <Ban size={14} className="text-red-400" />
                <div>
                  <span className="font-bold text-zinc-200">Blocked Spammers</span>
                  <p className="text-[9px] text-zinc-500 mt-0.5">0 accounts currently restricted.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Notifications */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none flex items-center gap-1.5">
            <Bell size={12} className="text-pink-500" /> Device Alerts
          </span>

          <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl flex justify-between items-center text-xs select-none">
            <div>
              <span className="font-bold text-zinc-200">Push Notifications Toggles</span>
              <p className="text-[9px] text-zinc-500 mt-0.5">Alert on comments, likes, and live waves.</p>
            </div>
            <button
              onClick={() => setPushNotifs(!pushNotifs)}
              className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer border-0 ${
                pushNotifs ? 'bg-[#ff007f]' : 'bg-zinc-800'
              }`}
            >
              <div className={`w-4.5 h-4.5 bg-black rounded-full transition-transform ${pushNotifs ? 'translate-x-4.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Section: Language and Data */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none flex items-center gap-1.5">
            <Globe size={12} className="text-green-400" /> Localization & Data
          </span>

          <div className="space-y-2 select-none">
            {/* Language presets select */}
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-zinc-200">Active Language</span>
                <p className="text-[9px] text-zinc-500 mt-0.5">Translate platform parameters.</p>
              </div>
              <select
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 focus:outline-none px-2 py-1 rounded text-[11px] font-mono text-zinc-300"
              >
                <option value="en">English (US)</option>
                <option value="ja">日本語</option>
                <option value="es">Español</option>
              </select>
            </div>

            {/* Data saver mode */}
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <Signal size={14} className="text-zinc-400" />
                <div>
                  <span className="font-bold text-zinc-200">Data-Saver Streaming</span>
                  <p className="text-[9px] text-zinc-500 mt-0.5">Compress generative visual render rates.</p>
                </div>
              </div>
              <button
                onClick={() => setSaveData(!saveData)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer border-0 ${
                  saveData ? 'bg-green-400' : 'bg-zinc-800'
                }`}
              >
                <div className={`w-4.5 h-4.5 bg-black rounded-full transition-transform ${saveData ? 'translate-x-4.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section: Two-Factor Authentication (2FA) */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none flex items-center gap-1.5">
            <Shield size={12} className="text-yellow-400" /> Crypto Security (2FA)
          </span>

          <div className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs select-none">
              <div>
                <span className="font-bold text-zinc-200">Two-Factor Authenticator</span>
                <p className="text-[9px] text-zinc-500 mt-0.5">Generates rolling 6-digit access tokens.</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border cursor-pointer ${
                  twoFactorEnabled ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {twoFactorEnabled ? 'Enabled' : 'Enable'}
              </button>
            </div>

            {/* Rotating 2FA code generator */}
            {twoFactorEnabled && (
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 select-none">
                  <KeyRound size={14} className="text-yellow-400" />
                  <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">ROLLING CODE TOKEN</span>
                </div>
                <span className="text-lg font-mono font-black text-yellow-400 tracking-wider animate-pulse">
                  {twoFactorCode.slice(0, 3)} {twoFactorCode.slice(3)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Section: Account Actions */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-3 select-none pb-8">
          <button
            onClick={onLogout}
            className="w-full h-11 bg-red-950/40 hover:bg-red-950 border border-red-500/20 hover:border-red-500 text-red-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Trash2 size={14} /> Log Out of Connection
          </button>
        </div>
      </div>
    </div>
  );
}
