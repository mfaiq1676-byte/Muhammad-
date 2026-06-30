import React from 'react';
import { DollarSign, Wallet, ArrowUpRight, Gift, Percent, Receipt, RefreshCw, Sparkles } from 'lucide-react';

interface MonetizationProps {
  giftCoinsEarned: number;
  onClearCoins: () => void;
}

export default function Monetization({ giftCoinsEarned, onClearCoins }: MonetizationProps) {
  // 1 virtual coin is worth $0.05 cash
  const giftCashValue = giftCoinsEarned * 0.05;
  const walletBalance = 345.20 + giftCashValue;
  const [withdrawAmount, setWithdrawAmount] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [withdrawLogs, setWithdrawLogs] = React.useState<{ id: string; amt: string; date: string; status: string }[]>([
    { id: 'w1', amt: '$120.00', date: '06/24/2026', status: 'Completed' },
    { id: 'w2', amt: '$75.50', date: '06/10/2026', status: 'Completed' }
  ]);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      setErrorMsg('Please enter a valid cash amount.');
      return;
    }
    if (amt > walletBalance) {
      setErrorMsg('Insufficient cash balance to complete withdrawal.');
      return;
    }

    setSuccessMsg(`Initiated withdrawal of $${amt.toFixed(2)} to your linked account!`);
    onClearCoins(); // Deduct the coin balance part
    setWithdrawLogs((prev) => [
      { id: `w_${Date.now()}`, amt: `$${amt.toFixed(2)}`, date: new Date().toLocaleDateString(), status: 'Pending Approval' },
      ...prev
    ]);
    setWithdrawAmount('');
  };

  return (
    <div id="monetization-panel" className="w-full h-full bg-[#0a0c10] flex flex-col p-5 text-white overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0 select-none">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Revenue Portal</span>
        <Wallet size={16} className="text-zinc-500" />
      </div>

      {/* Main Glassmorphic Card: Wallet Balance */}
      <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#16222f] to-[#0d0e12] border border-[#00f2fe]/10 shadow-lg relative overflow-hidden mb-6 select-none shrink-0">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f2fe]/10 rounded-full blur-xl pointer-events-none" />
        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
          <Sparkles size={12} className="text-yellow-400" /> Current Net Balance
        </span>
        <h2 className="text-3xl font-black tracking-tight text-white flex items-baseline gap-1">
          ${walletBalance.toFixed(2)}
          <span className="text-xs font-normal text-zinc-400">USD</span>
        </h2>
        <p className="text-[10px] text-zinc-500 font-mono mt-2">
          GIFT TOKENS: <span className="text-[#00f2fe] font-bold">{giftCoinsEarned}</span> (${giftCashValue.toFixed(2)})
        </p>
      </div>

      {/* Mini Rewards Program Details */}
      <div className="grid grid-cols-2 gap-3 mb-6 select-none shrink-0">
        <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl space-y-1.5">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
            <Gift size={11} className="text-pink-500" /> Gift Split
          </span>
          <p className="text-xs font-black">80% Creator / 20% App</p>
        </div>
        <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/40 rounded-xl space-y-1.5">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
            <RefreshCw size={11} className="text-cyan-400 animate-spin-slow" /> Exchange Rate
          </span>
          <p className="text-xs font-black">1 Coin = $0.05 Cash</p>
        </div>
      </div>

      {/* Withdrawal Form block */}
      <div className="p-4 bg-zinc-900/60 border border-zinc-800/40 rounded-2xl space-y-3.5 mb-6 shrink-0">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1 select-none">
          <ArrowUpRight size={13} className="text-green-400" /> Withdraw Earnings
        </span>

        {successMsg && <div className="p-3 text-[11px] bg-green-950/40 border border-green-500/20 text-green-400 rounded-xl">{successMsg}</div>}
        {errorMsg && <div className="p-3 text-[11px] bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl">{errorMsg}</div>}

        <form onSubmit={handleWithdraw} className="space-y-3">
          <div className="relative">
            <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="e.g. 100.00"
              className="w-full h-10 bg-zinc-950 border border-zinc-800 focus:border-green-400 focus:outline-none rounded-xl pl-9 pr-4 text-xs font-mono text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-green-500 hover:bg-green-600 text-black font-bold text-xs rounded-xl cursor-pointer"
          >
            Transfer to Bank / Stripe
          </button>
        </form>
      </div>

      {/* Withdrawal logs history list */}
      <div className="flex-1">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-3 select-none">
          <Receipt size={13} className="text-zinc-500" /> Transaction Logs
        </span>

        <div className="space-y-2.5">
          {withdrawLogs.map((log) => (
            <div key={log.id} className="p-3 bg-zinc-950/60 border border-zinc-800/40 rounded-xl flex justify-between items-center text-xs font-mono">
              <div>
                <span className="font-bold text-zinc-200">{log.amt}</span>
                <p className="text-[9px] text-zinc-600 mt-0.5">{log.date}</p>
              </div>
              <div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  log.status === 'Completed' ? 'bg-green-950 text-green-400 border border-green-500/10' : 'bg-yellow-950 text-yellow-400 border border-yellow-500/10'
                }`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
