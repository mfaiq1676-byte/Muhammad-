import { Creator, Video, Chat, AppNotification, VirtualGift, Comment } from '../types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'c1',
    name: 'Alex Vance',
    handle: '@alex_vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop&crop=faces',
    followers: 843200,
    following: 342,
    totalLikes: 14200000,
    bio: 'Digital artist & sound designer. Experimenting with visual flow and synth waves. ✨ Seattle',
    isFollowing: true,
    isOnline: true
  },
  {
    id: 'c2',
    name: 'Neo Sakura',
    handle: '@neo_sakura',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&fit=crop&crop=faces',
    followers: 1200000,
    following: 110,
    totalLikes: 35600000,
    bio: 'Cyberpunk explorer. Capturing the glowing heart of Tokyo at night. 🌌🗼',
    isFollowing: false,
    isOnline: true
  },
  {
    id: 'c3',
    name: 'Jordan Brooks',
    handle: '@jordan_beats',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&crop=faces',
    followers: 320500,
    following: 890,
    totalLikes: 5800000,
    bio: 'Lofi beats for late night drives. Music is the universal language. 🎧🎹',
    isFollowing: true,
    isOnline: false
  },
  {
    id: 'c4',
    name: 'Maya Luna',
    handle: '@maya_luna',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop&crop=faces',
    followers: 2400000,
    following: 204,
    totalLikes: 89000000,
    bio: 'Chasing sunsets and dreamscapes around the globe. 🌅 Next stop: Bali.',
    isFollowing: false,
    isOnline: true
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'com1',
    username: 'sonic_wave',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop',
    text: 'This visualizer loop matches the beat perfectly! What synth did you use?',
    timestamp: '2h ago',
    likes: 245
  },
  {
    id: 'com2',
    username: 'cyber_mind',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&fit=crop',
    text: 'Tokyo nights are unmatched. Incredible neon details!',
    timestamp: '4h ago',
    likes: 182
  },
  {
    id: 'com3',
    username: 'dream_weaver',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop',
    text: 'This is the most satisfying generative art I have seen all day.',
    timestamp: '5h ago',
    likes: 92
  },
  {
    id: 'com4',
    username: 'pixel_purist',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&fit=crop',
    text: 'Wow, the physics in this particle simulation is smooth as silk. 🔥',
    timestamp: '1d ago',
    likes: 310
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'v1',
    creator: INITIAL_CREATORS[0],
    caption: 'Generating waves from pure sine inputs. Sound visualization in its raw form. Let the ripples wash over you.',
    hashtags: ['generativeart', 'synthwave', 'satisfying', 'audioflow'],
    music: 'Alex Vance - Sine Waves & Coffee (Original)',
    likes: 142300,
    commentsCount: 384,
    shares: 12050,
    saves: 34200,
    views: 890000,
    isLiked: false,
    isSaved: false,
    canvasType: 'aurora',
    loopSpeed: 0.02,
    baseColor: '#00f2fe',
    accentColor: '#4facfe'
  },
  {
    id: 'v2',
    creator: INITIAL_CREATORS[1],
    caption: 'Cyberpunk grid overload in neon pink. The digital metropolis never sleeps.',
    hashtags: ['cyberpunk', 'neonvibes', 'metropolis', 'tokyonights'],
    music: 'Neo Sakura - Electric Dreams (Tokyo Mix)',
    likes: 350900,
    commentsCount: 1420,
    shares: 48900,
    saves: 95400,
    views: 1800000,
    isLiked: true,
    isSaved: true,
    canvasType: 'cyber',
    loopSpeed: 0.03,
    baseColor: '#ff007f',
    accentColor: '#7f00ff'
  },
  {
    id: 'v3',
    creator: INITIAL_CREATORS[2],
    caption: 'Chilled chords, soft rain, and ambient light rings. Kick back, study or dream.',
    hashtags: ['lofibears', 'ambientmusic', 'chillwaves', 'focused'],
    music: 'Jordan Beats - Midnight Coffee (Rainy Session)',
    likes: 89200,
    commentsCount: 204,
    shares: 4320,
    saves: 18900,
    views: 450000,
    isLiked: false,
    isSaved: false,
    canvasType: 'rings',
    loopSpeed: 0.015,
    baseColor: '#f1c40f',
    accentColor: '#e67e22'
  },
  {
    id: 'v4',
    creator: INITIAL_CREATORS[3],
    caption: 'Lost in the beautiful cosmic particle streams. A universe of dots floating in perfect harmony.',
    hashtags: ['cosmicdust', 'zenparticles', 'relaxing', 'motionart'],
    music: 'Maya Luna - Stellar Drifting (Ambient Ambient)',
    likes: 642000,
    commentsCount: 4209,
    shares: 89300,
    saves: 142000,
    views: 4200000,
    isLiked: false,
    isSaved: false,
    canvasType: 'particles',
    loopSpeed: 0.025,
    baseColor: '#2ecc71',
    accentColor: '#1abc9c'
  },
  {
    id: 'v5',
    creator: INITIAL_CREATORS[0],
    caption: 'Entering warp drive. Hyperspace lines bending around our perspective.',
    hashtags: ['warp', 'hyperspace', 'digitaltrips', 'scifiloops'],
    music: 'Space Echoes - Horizon Zero',
    likes: 104000,
    commentsCount: 512,
    shares: 8920,
    saves: 14200,
    views: 620000,
    isLiked: false,
    isSaved: false,
    canvasType: 'hyperspace',
    loopSpeed: 0.04,
    baseColor: '#9b59b6',
    accentColor: '#3498db'
  }
];

export const TRENDING_HASHTAGS = [
  { tag: 'generativeart', views: '2.4B', category: 'Creative' },
  { tag: 'synthwave', views: '840M', category: 'Music' },
  { tag: 'cyberpunk', views: '4.2B', category: 'Tech' },
  { tag: 'ambientmusic', views: '1.1B', category: 'Music' },
  { tag: 'lofibears', views: '540M', category: 'Vibe' },
  { tag: 'tokyonights', views: '2.8B', category: 'Travel' },
  { tag: 'motionart', views: '1.5B', category: 'Creative' }
];

export const GIFTS: VirtualGift[] = [
  { id: 'g1', name: 'Sparkling Rose', icon: '🌹', cost: 1, sparkleColor: '#ff2a6d' },
  { id: 'g2', name: 'Sweet Ice Cream', icon: '🍦', cost: 5, sparkleColor: '#ffdd67' },
  { id: 'g3', name: 'Golden Trophy', icon: '🏆', cost: 20, sparkleColor: '#f1c40f' },
  { id: 'g4', name: 'Cosmic Diamond', icon: '💎', cost: 99, sparkleColor: '#05d9e8' },
  { id: 'g5', name: 'Super Firework', icon: '🎆', cost: 299, sparkleColor: '#00fe9c' }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'like',
    sender: {
      name: 'Neo Sakura',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&fit=crop'
    },
    text: 'liked your generative waves sound visualizer video.',
    timestamp: '5m ago',
    isRead: false
  },
  {
    id: 'n2',
    type: 'comment',
    sender: {
      name: 'Alex Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop'
    },
    text: 'commented: "This is beautiful! What an incredible canvas rendering."',
    timestamp: '25m ago',
    isRead: false
  },
  {
    id: 'n3',
    type: 'follow',
    sender: {
      name: 'Jordan Brooks',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop'
    },
    text: 'started following you.',
    timestamp: '1h ago',
    isRead: true
  },
  {
    id: 'n4',
    type: 'live',
    sender: {
      name: 'Maya Luna',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop'
    },
    text: 'is LIVE now! Join her cosmic journey to Bali sunsets.',
    timestamp: '2h ago',
    isRead: true
  },
  {
    id: 'n5',
    type: 'system',
    text: 'Your creator fund has been updated! You earned $24.50 from virtual gifts yesterday. Check your wallet.',
    timestamp: '1d ago',
    isRead: true
  }
];

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'ch1',
    creator: INITIAL_CREATORS[0],
    messages: [
      { id: 'm1', senderId: 'c1', text: 'Hey there! I saw your recent sound loop. Loved the visual rhythm!', timestamp: '10:30 AM', isRead: true },
      { id: 'm2', senderId: 'me', text: 'Thanks Alex! That means a lot coming from you. Your work has been a huge inspiration.', timestamp: '10:32 AM', isRead: true },
      { id: 'm3', senderId: 'c1', text: 'We should definitely collaborate on a hybrid audio-visual synth track soon!', timestamp: '10:33 AM', isRead: true }
    ],
    lastMessageText: 'We should definitely collaborate on a hybrid audio-visual synth track soon!',
    unreadCount: 0
  },
  {
    id: 'ch2',
    creator: INITIAL_CREATORS[1],
    messages: [
      { id: 'm4', senderId: 'c2', text: 'Are you planning to tune into my Tokyo night stream tonight?', timestamp: 'Yesterday', isRead: true },
      { id: 'm5', senderId: 'me', text: 'Absolutely! I set a reminder. Cant wait to see the street glows.', timestamp: 'Yesterday', isRead: true }
    ],
    lastMessageText: 'Absolutely! I set a reminder. Cant wait to see the street glows.',
    unreadCount: 0
  }
];
