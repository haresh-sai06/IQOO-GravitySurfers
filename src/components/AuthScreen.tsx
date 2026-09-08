import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface AuthScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onBack,
  onSuccess,
  initialMode = 'login',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('alex@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Alex Rivera');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 800);
  };

  const handleOAuth = (provider: string) => {
    showToast(`Connecting to ${provider}...`);
    setTimeout(() => {
      onSuccess();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none min-h-screen pb-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[16px] text-blue-400 animate-spin">
            sync
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 w-full z-20 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/50 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-slate-900 transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <img
              alt="LiveVolume Logo"
              className="h-7 w-auto object-contain"
              src={ASSETS.logo}
            />
            <span className="font-semibold text-base text-[#131b2e] tracking-tight">
              LiveVolume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#434655]">
              {authMode === 'login' ? 'Sign In' : 'Register'}
            </span>
            <div className="w-7 h-7 rounded-full bg-[#004ac6] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[16px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 flex flex-col w-full px-4 py-5 max-w-[400px] mx-auto">
        {/* Brand Greeting Header */}
        <div className="flex flex-col items-center text-center mt-1 mb-5">
          <div className="relative w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center p-2 mb-2.5 border border-slate-100">
            <img
              alt="LiveVolume Logo"
              className="w-10 h-10 rounded-xl object-contain"
              src={ASSETS.logo}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-bold text-base text-[#131b2e] tracking-tight">
              LiveVolume
            </span>
            <span className="bg-blue-50 text-[#2563eb] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              3D Live
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#131b2e] tracking-tight">
            {authMode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-xs text-[#434655] mt-1">
            {authMode === 'login'
              ? 'Sign in to connect in live spatial 3D'
              : 'Join LiveVolume and stream in spatial 3D'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#e2e7ff] p-1 rounded-full flex items-center mb-5 relative shadow-inner">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-full transition-all duration-200 ${
              authMode === 'login'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            type="button"
          >
            Log In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-full transition-all duration-200 ${
              authMode === 'register'
                ? 'bg-white text-[#004ac6] shadow-xs'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            type="button"
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
          {authMode === 'register' && (
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-medium text-[#434655] ml-1" htmlFor="fullname">
                Full Name
              </label>
              <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200/70 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <span className="material-symbols-outlined text-slate-400 absolute left-3 pointer-events-none text-[18px]">
                  badge
                </span>
                <input
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  required
                  className="w-full h-11 bg-transparent pl-10 pr-3 text-xs text-[#131b2e] placeholder:text-slate-400 rounded-xl focus:outline-none"
                  type="text"
                />
              </div>
            </div>
          )}

          {/* Email/Phone */}
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-[#434655] ml-1" htmlFor="email-phone">
              Email or Mobile Number
            </label>
            <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200/70 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <span className="material-symbols-outlined text-slate-400 absolute left-3 pointer-events-none text-[18px]">
                alternate_email
              </span>
              <input
                id="email-phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="alex@example.com"
                required
                className="w-full h-11 bg-transparent pl-10 pr-3 text-xs text-[#131b2e] placeholder:text-slate-400 rounded-xl focus:outline-none"
                type="text"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-medium text-[#434655]" htmlFor="password">
                Password
              </label>
              {authMode === 'register' && (
                <span className="text-[10px] text-slate-400">Min. 8 characters</span>
              )}
            </div>
            <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200/70 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <span className="material-symbols-outlined text-slate-400 absolute left-3 pointer-events-none text-[18px]">
                lock
              </span>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  authMode === 'login' ? 'Enter your password' : 'Create a secure password'
                }
                required
                type={showPassword ? 'text' : 'password'}
                className="w-full h-11 bg-transparent pl-10 pr-10 text-xs text-[#131b2e] placeholder:text-slate-400 rounded-xl focus:outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 p-1.5 text-slate-400 hover:text-slate-700 transition-colors rounded-lg active:scale-95 focus:outline-none"
                type="button"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Login Options / Register Terms */}
          {authMode === 'login' ? (
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#2563eb] focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-xs text-[#434655]">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent!')}
                className="text-xs font-semibold text-[#004ac6] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          ) : (
            <div className="flex items-start gap-2 pt-0.5">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-slate-300 text-[#2563eb] focus:ring-blue-500 w-4 h-4 mt-0.5"
              />
              <label htmlFor="agree-terms" className="text-[11px] text-[#434655] leading-tight">
                I agree to LiveVolume's{' '}
                <a href="#terms" className="text-[#004ac6] underline">
                  Terms of Service
                </a>{' '}
                &{' '}
                <a href="#privacy" className="text-[#004ac6] underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="w-full h-12 mt-1 bg-[#2563eb] hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-2 tracking-tight disabled:opacity-75"
            type="submit"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>
                  {authMode === 'login' ? 'Authenticating...' : 'Preparing Space...'}
                </span>
              </>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-slate-200" />
          <span className="absolute px-3 bg-[#faf8ff] text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            or continue with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuth('Google')}
            className="h-11 px-3 bg-white hover:bg-slate-50 active:scale-[0.98] rounded-xl border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all text-[#131b2e] font-semibold text-xs"
            type="button"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => handleOAuth('Apple')}
            className="h-11 px-3 bg-white hover:bg-slate-50 active:scale-[0.98] rounded-xl border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all text-[#131b2e] font-semibold text-xs"
            type="button"
          >
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .61-2.65 1.37-.56.65-1.06 1.71-.93 2.74 1 .08 2.05-.49 2.66-1.24z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Footer Switch */}
        <div className="mt-6 flex flex-col items-center text-center space-y-3">
          <div className="text-xs text-[#434655]">
            <span>
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-[#004ac6] font-semibold ml-1 hover:underline focus:outline-none"
              type="button"
            >
              {authMode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </div>

          {/* Privacy Trust Badge */}
          <div className="flex items-center gap-1.5 bg-[#f2f3ff] px-3 py-1.5 rounded-full border border-blue-100">
            <span
              className="material-symbols-outlined text-[15px] text-[#004ac6]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-[10px] font-medium text-[#434655]">
              End-to-end encrypted • On-device 3D processing
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
