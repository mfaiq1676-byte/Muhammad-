import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, KeyRound, Eye, EyeOff, ArrowLeft, Chrome, Apple, Facebook } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (userData: { username: string; email: string }) => void;
}

type AuthScreen = 'login' | 'signup' | 'forgot' | 'otp';

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [screen, setScreen] = React.useState<AuthScreen>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [otp, setOtp] = React.useState(['', '', '', '']);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (screen === 'login') {
        if (!email || !password) {
          setError('Please fill in all credentials.');
          return;
        }
        onLoginSuccess({ username: email.split('@')[0], email });
      } else if (screen === 'signup') {
        if (!name || !email || !password) {
          setError('Please fill in all registration fields.');
          return;
        }
        setScreen('otp');
      } else if (screen === 'forgot') {
        if (!email) {
          setError('Please provide your registered email.');
          return;
        }
        setScreen('otp');
      }
    }, 1200);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const verifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ username: name || 'aura_creator', email: email || 'user@aurastream.com' });
    }, 1000);
  };

  const simulateSocial = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ username: `${provider.toLowerCase()}_creator`, email: `social_${provider.toLowerCase()}@aurastream.com` });
    }, 1500);
  };

  return (
    <div id="auth-screen" className="w-full h-full bg-obsidian flex flex-col p-6 text-white overflow-y-auto relative">
      {/* Decorative vector background dots */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-champagne-gold/5 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-velvet-bronze/5 rounded-full blur-xl" />

      {/* Screen Title Block */}
      <div className="text-center mt-6 mb-8 shrink-0">
        <h2 className="text-2xl font-black bg-gradient-to-r from-champagne-gold via-platinum to-velvet-bronze bg-clip-text text-transparent tracking-widest font-display uppercase">AURA</h2>
        <p className="text-[10px] text-zinc-500 mt-1 font-semibold uppercase tracking-wider">Verify your pulse connection</p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {screen === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Welcome Back</h3>
                <p className="text-xs text-zinc-400">Log in to check your visual stream.</p>
              </div>

              {error && <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-400 rounded-xl">{error}</div>}

              <form onSubmit={handleAction} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-4 text-xs transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">Password</label>
                    <button type="button" onClick={() => setScreen('forgot')} className="text-[10px] text-champagne-gold hover:underline font-bold bg-transparent border-0 cursor-pointer">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-11 text-xs transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-champagne-gold to-velvet-bronze hover:opacity-90 disabled:opacity-50 text-black font-bold text-xs rounded-xl transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center font-display uppercase tracking-widest"
                >
                  {isLoading ? <span className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> : 'Log In'}
                </button>
              </form>

              {/* Social Logins */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-zinc-800/40"></div>
                  <span className="flex-shrink mx-4 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Or social login</span>
                  <div className="flex-grow border-t border-zinc-800/40"></div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => simulateSocial('Google')} className="flex items-center justify-center h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-150 cursor-pointer">
                    <Chrome size={18} className="text-red-400" />
                  </button>
                  <button onClick={() => simulateSocial('Apple')} className="flex items-center justify-center h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-150 cursor-pointer">
                    <Apple size={18} className="text-zinc-200" />
                  </button>
                  <button onClick={() => simulateSocial('Facebook')} className="flex items-center justify-center h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-150 cursor-pointer">
                    <Facebook size={18} className="text-blue-400" />
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-zinc-500">Don't have an account? </span>
                <button onClick={() => setScreen('signup')} className="text-xs text-champagne-gold hover:underline font-bold bg-transparent border-0 cursor-pointer">Sign Up</button>
              </div>
            </motion.div>
          )}

          {screen === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight font-display">Create Pulse</h3>
                <p className="text-xs text-zinc-400">Join the premium creative stream ecosystem.</p>
              </div>

              {error && <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-400 rounded-xl">{error}</div>}

              <form onSubmit={handleAction} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">Full name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-4 text-xs transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-4 text-xs transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-11 text-xs transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-champagne-gold to-velvet-bronze hover:opacity-90 disabled:opacity-50 text-black font-bold text-xs rounded-xl transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center font-display uppercase tracking-widest"
                >
                  {isLoading ? <span className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> : 'Register & Verify'}
                </button>
              </form>

              <div className="text-center pt-2">
                <span className="text-xs text-zinc-500">Already have an account? </span>
                <button onClick={() => setScreen('login')} className="text-xs text-champagne-gold hover:underline font-bold bg-transparent border-0 cursor-pointer">Log In</button>
              </div>
            </motion.div>
          )}

          {screen === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <button onClick={() => setScreen('login')} className="flex items-center text-xs text-zinc-400 hover:text-white transition-all duration-150 mb-2 bg-transparent border-0 cursor-pointer">
                <ArrowLeft size={16} className="mr-1.5" /> Back to Log In
              </button>

              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight font-display">Recover Key</h3>
                <p className="text-xs text-zinc-400">Enter your email and we will issue a secure 4-digit code to log in.</p>
              </div>

              {error && <div className="p-3 text-xs bg-red-950/40 border border-red-500/30 text-red-400 rounded-xl">{error}</div>}

              <form onSubmit={handleAction} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase font-display">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 bg-carbon-card hover:bg-[#15151b] border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl pl-11 pr-4 text-xs transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-champagne-gold to-velvet-bronze hover:opacity-90 disabled:opacity-50 text-black font-bold text-xs rounded-xl transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center font-display uppercase tracking-widest"
                >
                  {isLoading ? <span className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> : 'Request OTP Code'}
                </button>
              </form>
            </motion.div>
          )}

          {screen === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight font-display">Security OTP</h3>
                <p className="text-xs text-zinc-400">We sent a verification code to your email. Enter it below to unlock access.</p>
              </div>

              <div className="flex justify-center gap-3 py-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 bg-carbon-card border border-white/5 focus:border-champagne-gold text-center text-xl font-bold rounded-xl focus:outline-none transition-all duration-200"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={verifyOtp}
                disabled={isLoading || otp.includes('')}
                className="w-full h-11 bg-gradient-to-r from-champagne-gold via-platinum to-velvet-bronze hover:opacity-90 disabled:opacity-40 text-black font-bold text-xs rounded-xl transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center font-display uppercase tracking-widest"
              >
                {isLoading ? <span className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" /> : 'Confirm Connection'}
              </button>

              <div className="text-center">
                <span className="text-[11px] text-zinc-500">Didn't receive code? </span>
                <button onClick={() => setOtp(['', '', '', ''])} className="text-[11px] text-champagne-gold hover:underline font-bold bg-transparent border-0 cursor-pointer">Resend Code</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Safety info footer */}
      <div className="text-center mt-6 py-2 shrink-0 select-none">
        <span className="text-[10px] text-zinc-600 font-mono flex items-center justify-center gap-1">
          <KeyRound size={12} className="text-zinc-500" /> AES-256 Cloud Token Handshake
        </span>
      </div>
    </div>
  );
}
