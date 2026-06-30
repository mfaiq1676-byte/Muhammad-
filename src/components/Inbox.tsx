import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MessageSquare, Send, Check, CheckCheck, Mic, Image } from 'lucide-react';
import { Chat, Creator, Message } from '../types';
import { INITIAL_CHATS } from '../data/mockData';

interface InboxProps {
  creators: Creator[];
}

export default function Inbox({ creators }: InboxProps) {
  const [chats, setChats] = React.useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null);
  const [typedText, setTypedText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const activeChat = chats.find((ch) => ch.id === activeChatId);

  // Send interactive message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedText.trim() || !activeChatId) return;

    const userMsg: Message = {
      id: `user_m_${Date.now()}`,
      senderId: 'me',
      text: typedText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    // Append message
    setChats((prev) =>
      prev.map((ch) => {
        if (ch.id === activeChatId) {
          const updatedMsgs = [...ch.messages, userMsg];
          return {
            ...ch,
            messages: updatedMsgs,
            lastMessageText: userMsg.text,
            unreadCount: 0
          };
        }
        return ch;
      })
    );

    setTypedText('');
    triggerAutoReply();
  };

  // Simulate automated delayed response from the creator
  const triggerAutoReply = () => {
    setIsTyping(true);

    const responses = [
      "No way! That sounds stellar. I'm finishing a sound loop render right now.",
      "Yes! Let's schedule a collab next Monday. I'll load up some synth presets.",
      "Check out this track outline. It matches your waves visualization perfectly. 🎹",
      "Haha sweet! Catch you on my stream tonight!"
    ];

    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: Message = {
        id: `reply_m_${Date.now()}`,
        senderId: activeChat?.creator.id || 'c1',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };

      setChats((prev) =>
        prev.map((ch) => {
          if (ch.id === activeChatId) {
            const updatedMsgs = [...ch.messages, replyMsg];
            // Simulate that previously unread user message is now read
            const markedRead = updatedMsgs.map(m => m.senderId === 'me' ? { ...m, isRead: true } : m);
            return {
              ...ch,
              messages: markedRead,
              lastMessageText: replyMsg.text
            };
          }
          return ch;
        })
      );
    }, 2500);
  };

  // Attach a simulated lofi lofi voice message clip
  const handleAttachVoice = () => {
    if (!activeChatId) return;
    const voiceMsg: Message = {
      id: `voice_m_${Date.now()}`,
      senderId: 'me',
      text: 'Voice note transmitted',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mediaType: 'voice',
      voiceDuration: '0:06',
      isRead: false
    };

    setChats((prev) =>
      prev.map((ch) => {
        if (ch.id === activeChatId) {
          return {
            ...ch,
            messages: [...ch.messages, voiceMsg],
            lastMessageText: '🎤 Voice note (0:06)'
          };
        }
        return ch;
      })
    );
    triggerAutoReply();
  };

  // Attach simulated canvas loop image
  const handleAttachMedia = () => {
    if (!activeChatId) return;
    const mediaMsg: Message = {
      id: `media_m_${Date.now()}`,
      senderId: 'me',
      text: 'Art screenshot attached',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&fit=crop',
      isRead: false
    };

    setChats((prev) =>
      prev.map((ch) => {
        if (ch.id === activeChatId) {
          return {
            ...ch,
            messages: [...ch.messages, mediaMsg],
            lastMessageText: '📷 Media Attachment'
          };
        }
        return ch;
      })
    );
    triggerAutoReply();
  };

  return (
    <div id="inbox-module" className="w-full h-full bg-obsidian flex flex-col text-white">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          /* Core Chat Logs List view */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col p-5"
          >
            <div className="flex justify-between items-center mb-6 select-none shrink-0 font-display">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400">Direct Contacts</span>
              <MessageSquare size={16} className="text-zinc-500" />
            </div>

            {/* Chats list view */}
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-none font-display">
              {chats.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChatId(ch.id)}
                  className="w-full flex items-center justify-between p-3.5 bg-carbon-card hover:bg-[#15151b] rounded-2xl border border-white/5 transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative shrink-0 font-sans">
                      <div className="w-[42px] h-[42px] rounded-full p-[1.5px] bg-gradient-to-tr from-champagne-gold to-velvet-bronze">
                        <img referrerPolicy="no-referrer" src={ch.creator.avatar} alt="avatar" className="w-full h-full object-cover rounded-full bg-obsidian" />
                      </div>
                      {ch.creator.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0c10] rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-200 truncate">{ch.creator.name}</h4>
                      <p className="text-[10px] text-zinc-500 truncate mt-0.5 font-sans font-light">{ch.lastMessageText}</p>
                    </div>
                  </div>

                  {ch.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-champagne-gold text-black flex items-center justify-center font-bold text-[9px] shrink-0 font-mono">
                      {ch.unreadCount}
                    </span>
                  )}
                </button>
              ))}

              {chats.length === 0 && (
                <div className="text-center py-12 select-none">
                  <p className="text-xs text-zinc-500">Your inbox is empty.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Active Chat Room view */
          <motion.div
            key="room"
            initial={{ x: 30 }}
            animate={{ x: 0 }}
            exit={{ x: 30 }}
            className="flex-1 flex flex-col h-full bg-obsidian"
          >
            {/* Chat Room header overlay */}
            <div className="px-5 py-4 border-b border-white/5 bg-carbon-card flex items-center justify-between shrink-0 select-none font-display">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveChatId(null)}
                  className="w-8 h-8 rounded-full bg-obsidian border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <ArrowLeft size={15} />
                </button>

                <div className="flex items-center gap-2.5">
                  <div className="w-[34px] h-[34px] rounded-full">
                    <img referrerPolicy="no-referrer" src={activeChat.creator.avatar} alt="contact" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100 leading-tight">{activeChat.creator.name}</h4>
                    <p className="text-[9px] text-zinc-500 font-mono">
                      {activeChat.creator.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-pulse" />
            </div>

            {/* Chat Messages Log list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 select-text scrollbar-none font-sans">
              {activeChat.messages.map((msg) => {
                const isUser = msg.senderId === 'me';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[260px] p-3.5 rounded-2xl relative shadow-md ${
                        isUser
                          ? 'bg-gradient-to-tr from-champagne-gold to-velvet-bronze text-black font-medium text-xs rounded-tr-none'
                          : 'bg-carbon-card text-zinc-200 text-xs rounded-tl-none border border-white/5'
                      }`}
                    >
                      {/* Message attachments custom renders */}
                      {msg.mediaType === 'image' && (
                        <img referrerPolicy="no-referrer" src={msg.mediaUrl} alt="attachment" className="w-full rounded-xl object-cover mb-2 border border-black/10" />
                      )}

                      {msg.mediaType === 'voice' && (
                        <div className="flex items-center gap-2 mb-1.5 py-1 select-none">
                          <button className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white border-0">
                            ▶
                          </button>
                          {/* Animated voice bar lines */}
                          <div className="flex gap-0.5 items-end h-5">
                            <div className="w-0.5 h-3 bg-current animate-pulse" />
                            <div className="w-0.5 h-4 bg-current" />
                            <div className="w-0.5 h-2 bg-current" />
                            <div className="w-0.5 h-5 bg-current animate-pulse" />
                            <div className="w-0.5 h-3 bg-current" />
                          </div>
                          <span className="text-[9px] font-mono opacity-80">{msg.voiceDuration}</span>
                        </div>
                      )}

                      <p className="leading-relaxed font-light text-xs">{msg.text}</p>

                      <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[8px] opacity-70 select-none font-mono">
                        <span>{msg.timestamp}</span>
                        {isUser && (
                          <span>
                            {msg.isRead ? <CheckCheck size={11} className="text-black" /> : <Check size={11} className="text-black/50" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-carbon-card border border-white/5 text-zinc-400 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input form bar footer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-obsidian flex gap-2 items-center select-none shrink-0 font-sans">
              <button
                type="button"
                onClick={handleAttachMedia}
                className="w-10 h-10 bg-carbon-card hover:bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-400 cursor-pointer shrink-0"
              >
                <Image size={15} />
              </button>

              <button
                type="button"
                onClick={handleAttachVoice}
                className="w-10 h-10 bg-carbon-card hover:bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-400 cursor-pointer shrink-0"
              >
                <Mic size={15} />
              </button>

              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type a secure DM..."
                className="flex-1 h-10 bg-zinc-950 border border-white/5 focus:border-champagne-gold focus:outline-none rounded-xl px-4 text-xs text-white"
              />

              <button
                type="submit"
                disabled={!typedText.trim()}
                className="w-10 h-10 bg-gradient-to-tr from-champagne-gold to-velvet-bronze hover:opacity-95 disabled:opacity-40 rounded-xl flex items-center justify-center text-black cursor-pointer border-0 shrink-0"
              >
                <Send size={14} className="text-black" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
