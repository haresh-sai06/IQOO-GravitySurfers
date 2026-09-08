import React, { useState } from 'react';
import { ScreenType } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthScreen } from './components/AuthScreen';
import { ContactsScreen } from './components/ContactsScreen';
import { RecentsScreen } from './components/RecentsScreen';
import { ActiveCallScreen } from './components/ActiveCallScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { HelpSupportScreen } from './components/HelpSupportScreen';
import { GuidesScreen } from './components/GuidesScreen';
import { PrivacyScreen } from './components/PrivacyScreen';
import { AboutScreen } from './components/AboutScreen';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeCaller, setActiveCaller] = useState<string>('Sarah Chen');

  const handleStartCall = (contactName: string) => {
    setActiveCaller(contactName || 'Sarah Chen');
    setCurrentScreen('call');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => {
              setAuthMode('register');
              setCurrentScreen('auth');
            }}
            onLogin={() => {
              setAuthMode('login');
              setCurrentScreen('auth');
            }}
          />
        );

      case 'auth':
        return (
          <AuthScreen
            initialMode={authMode}
            onSuccess={() => setCurrentScreen('contacts')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );

      case 'contacts':
        return (
          <ContactsScreen
            onStartCall={handleStartCall}
            onOpenSettings={() => setCurrentScreen('settings')}
          />
        );

      case 'recents':
        return <RecentsScreen onStartCall={handleStartCall} />;

      case 'call':
        return (
          <ActiveCallScreen
            callerName={activeCaller}
            onEndCall={() => setCurrentScreen('contacts')}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onOpenPrivacy={() => setCurrentScreen('privacy')}
            onOpenSupport={() => setCurrentScreen('support')}
            onOpenAbout={() => setCurrentScreen('about')}
            onOpenGuides={() => setCurrentScreen('guides')}
            onLogOut={() => setCurrentScreen('welcome')}
          />
        );

      case 'support':
        return (
          <HelpSupportScreen
            onBack={() => setCurrentScreen('settings')}
            onOpenGuides={() => setCurrentScreen('guides')}
            onOpenPrivacy={() => setCurrentScreen('privacy')}
          />
        );

      case 'guides':
        return (
          <GuidesScreen
            onBack={() => setCurrentScreen('settings')}
            onOpenSupport={() => setCurrentScreen('support')}
            onStartCallDemo={() => handleStartCall('Sarah Chen')}
          />
        );

      case 'privacy':
        return <PrivacyScreen onBack={() => setCurrentScreen('settings')} />;

      case 'about':
        return (
          <AboutScreen
            onBack={() => setCurrentScreen('settings')}
            onOpenPrivacy={() => setCurrentScreen('privacy')}
          />
        );

      default:
        return (
          <ContactsScreen
            onStartCall={handleStartCall}
            onOpenSettings={() => setCurrentScreen('settings')}
          />
        );
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#faf8ff] sm:bg-slate-900 flex items-center justify-center sm:py-6">
      {/* Phone container wrapper */}
      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:min-h-[850px] sm:max-h-[900px] sm:rounded-[36px] bg-[#faf8ff] sm:shadow-2xl relative flex flex-col overflow-hidden sm:border-8 sm:border-slate-800">
        {/* Main View Port */}
        <main className="flex-1 flex flex-col w-full overflow-y-auto no-scrollbar relative">
          {renderScreen()}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav currentScreen={currentScreen} onChangeScreen={setCurrentScreen} />
      </div>
    </div>
  );
}
