import React from 'react';
import { ScreenType } from '../types';
import { useTheme } from '../context/ThemeContext';
import { triggerHaptic } from '../utils/haptics';

interface BottomNavProps {
  currentScreen: ScreenType;
  onChangeScreen: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onChangeScreen }) => {
  const { theme } = useTheme();

  // Hide bottom nav during welcome, auth, or full-screen active call
  if (currentScreen === 'welcome' || currentScreen === 'auth' || currentScreen === 'call') {
    return null;
  }

  const handleNav = (screen: ScreenType) => {
    if (screen === 'call') {
      triggerHaptic('callStart');
    } else {
      triggerHaptic('light');
    }
    onChangeScreen(screen);
  };

  const isSettingsActive =
    currentScreen === 'settings' ||
    currentScreen === 'support' ||
    currentScreen === 'privacy' ||
    currentScreen === 'about';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 max-w-[420px] mx-auto flex items-center justify-around py-1.5 px-2 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      {/* Tab: Call (Launches 3D Call) */}
      <button
        onClick={() => handleNav('call')}
        style={currentScreen === 'call' ? { color: theme.primary } : {}}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'call' ? '' : 'text-slate-400 hover:text-slate-700'
        }`}
        type="button"
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'call' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          call
        </span>
        <span
          className={`text-[10px] tracking-tight mt-0.5 ${
            currentScreen === 'call' ? 'font-bold' : 'font-medium'
          }`}
        >
          Call
        </span>
      </button>

      {/* Tab: Contacts */}
      <button
        onClick={() => handleNav('contacts')}
        style={currentScreen === 'contacts' ? { color: theme.primary } : {}}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'contacts' ? '' : 'text-slate-400 hover:text-slate-700'
        }`}
        type="button"
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'contacts' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          contacts
        </span>
        <span
          className={`text-[10px] tracking-tight mt-0.5 ${
            currentScreen === 'contacts' ? 'font-bold' : 'font-medium'
          }`}
        >
          Contacts
        </span>
      </button>

      {/* Tab: History / Recents */}
      <button
        onClick={() => handleNav('recents')}
        style={currentScreen === 'recents' ? { color: theme.primary } : {}}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'recents' ? '' : 'text-slate-400 hover:text-slate-700'
        }`}
        type="button"
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'recents' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          history
        </span>
        <span
          className={`text-[10px] tracking-tight mt-0.5 ${
            currentScreen === 'recents' ? 'font-bold' : 'font-medium'
          }`}
        >
          History
        </span>
      </button>

      {/* Tab: Guides & Tips */}
      <button
        onClick={() => handleNav('guides')}
        style={currentScreen === 'guides' ? { color: theme.primary } : {}}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          currentScreen === 'guides' ? '' : 'text-slate-400 hover:text-slate-700'
        }`}
        type="button"
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'guides' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          menu_book
        </span>
        <span
          className={`text-[10px] tracking-tight mt-0.5 ${
            currentScreen === 'guides' ? 'font-bold' : 'font-medium'
          }`}
        >
          Guides
        </span>
      </button>

      {/* Tab: Settings */}
      <button
        onClick={() => handleNav('settings')}
        style={isSettingsActive ? { color: theme.primary } : {}}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
          isSettingsActive ? '' : 'text-slate-400 hover:text-slate-700'
        }`}
        type="button"
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={isSettingsActive ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          settings
        </span>
        <span
          className={`text-[10px] tracking-tight mt-0.5 ${
            isSettingsActive ? 'font-bold' : 'font-medium'
          }`}
        >
          Settings
        </span>
      </button>
    </nav>
  );
};
