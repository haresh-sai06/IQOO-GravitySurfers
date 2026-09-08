export type ScreenType = 
  | 'welcome'
  | 'auth'
  | 'contacts'
  | 'call'
  | 'recents'
  | 'settings'
  | 'support'
  | 'guides'
  | 'privacy'
  | 'about';

export interface Contact {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  subtitle: string;
  phone: string;
  is3DReady: boolean;
  isFavorite: boolean;
  isOnline?: boolean;
  typeCategory: 'spatial' | 'all' | 'favorites' | 'recent';
}

export interface CallRecord {
  id: string;
  contactId: string;
  name: string;
  initials: string;
  avatar?: string;
  type: '3D' | 'Missed' | 'Video' | 'Audio';
  direction: 'incoming' | 'outgoing' | 'missed';
  duration?: string;
  timestamp: string;
  timeGroup: 'Today' | 'Yesterday' | 'Earlier this week';
  rings?: string;
}

export interface GuideItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  readTime?: string;
  category: 'camera' | 'audio' | 'battery' | 'general';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
