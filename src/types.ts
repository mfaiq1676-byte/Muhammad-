export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  following: number;
  totalLikes: number;
  bio: string;
  isFollowing: boolean;
  isOnline?: boolean;
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Video {
  id: string;
  creator: Creator;
  caption: string;
  hashtags: string[];
  music: string;
  likes: number;
  commentsCount: number;
  shares: number;
  saves: number;
  views: number;
  isLiked: boolean;
  isSaved: boolean;
  canvasType: 'aurora' | 'cyber' | 'rings' | 'particles' | 'hyperspace' | 'soundwave';
  loopSpeed: number;
  baseColor: string;
  accentColor: string;
  isLiveSimulated?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  mediaType?: 'image' | 'voice';
  mediaUrl?: string;
  voiceDuration?: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  creator: Creator;
  messages: Message[];
  lastMessageText: string;
  unreadCount: number;
}

export interface AppNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share' | 'live' | 'system';
  sender?: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface VirtualGift {
  id: string;
  name: string;
  icon: string;
  cost: number;
  sparkleColor: string;
}

export interface DraftVideo {
  id: string;
  caption: string;
  hashtags: string;
  filter: string;
  speed: string;
  musicTitle: string;
  coverColor: string;
  timestamp: string;
}

export interface PlatformReport {
  id: string;
  videoTitle: string;
  reporter: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp: string;
}
