import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface SettingsScreenProps {
  onOpenPrivacy: () => void;
  onOpenSupport: () => void;
  onOpenAbout: () => void;
  onOpenGuides: () => void;
  onLogOut: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onOpenPrivacy,
  onOpenSupport,
  onOpenAbout,
  onOpenGuides,
  onLogOut,
}) => {
  const [videoQuality, setVideoQuality] = useState<'Auto' | '1080p' | '720p'>('Auto');
  const [spatialQuality, setSpatialQuality] = useState<'High' | 'Ultra' | 'Balanced'>('High');
  const [optimizeMobileData, setOptimizeMobileData] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between max-w-[420px] mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center p-1 border border-slate-200/60">
              <img
                alt="LiveVolume Logo"
                className="w-full h-full object-contain"
                src={ASSETS.logo}
              />
            </div>
            <h1 className="font-bold text-lg text-[#131b2e] tracking-tight">Settings</h1>
          </div>
          <button
            onClick={onOpenAbout}
            aria-label="Account Profile"
            className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </header>

      {/* Main Settings List */}
      <div className="w-full px-4 pt-4 flex flex-col gap-5 max-w-[420px] mx-auto">
        {/* Profile Card */}
        <div
          onClick={onOpenAbout}
          className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#dae2fd] text-[#004ac6] font-bold text-sm flex items-center justify-center">
                SC
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#004ac6] ring-2 ring-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#131b2e]">Sarah Chen</span>
                <span className="material-symbols-outlined text-[#004ac6] text-[16px]">
                  verified
                </span>
              </div>
              <span className="text-xs text-[#434655]">sarah.chen@example.com</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <span>Profile</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </div>
        </div>

        {/* CALL & VIDEO QUALITY */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Call & Video Quality
          </span>
          <div className="bg-white rounded-2xl shadow-xs border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* Video Quality */}
            <div
              onClick={() => setShowVideoModal(true)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">Video Quality</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    {videoQuality === 'Auto'
                      ? 'Auto (1080p HD based on conn...)'
                      : `${videoQuality} HD stream`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e2e7ff] text-[#004ac6]">
                  {videoQuality}
                </span>
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* 3D Quality */}
            <div
              onClick={() => setShow3DModal(true)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">3D Quality</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Adjust volumetric depth detail
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#004ac6] text-white">
                  {spatialQuality}
                </span>
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Optimize for mobile data */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">data_saver_on</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">
                    Optimize for mobile data
                  </span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Reduces bandwidth during volume...
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOptimizeMobileData(!optimizeMobileData)}
                type="button"
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  optimizeMobileData ? 'bg-[#004ac6]' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    optimizeMobileData ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* PREFERENCES & PRIVACY */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Preferences & Privacy
          </span>
          <div className="bg-white rounded-2xl shadow-xs border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* Notifications */}
            <div
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">Notifications</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Calls, missed calls, and connection alerts
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">
                chevron_right
              </span>
            </div>

            {/* Privacy & Camera Permissions */}
            <div
              onClick={onOpenPrivacy}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">
                    Privacy & Camera Permissions
                  </span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Manage camera, mic, and on-device pro...
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">
                chevron_right
              </span>
            </div>
          </div>
        </div>

        {/* SUPPORT & ABOUT */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Support & About
          </span>
          <div className="bg-white rounded-2xl shadow-xs border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {/* Help Center */}
            <div
              onClick={onOpenSupport}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">help</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">Help Center</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Guides, FAQs, and contact support
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">
                chevron_right
              </span>
            </div>

            {/* Guides & Tips */}
            <div
              onClick={onOpenGuides}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">User Guides & Tips</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Master 3D spatial calls
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">
                chevron_right
              </span>
            </div>

            {/* About LiveVolume */}
            <div
              onClick={onOpenAbout}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd]/50 text-[#004ac6] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                </div>
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-[#131b2e]">About LiveVolume</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Version 2.4.0 (Consumer Edition)
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">
                chevron_right
              </span>
            </div>
          </div>
        </div>

        {/* Log Out Button */}
        <button
          onClick={onLogOut}
          type="button"
          className="w-full py-3.5 bg-white rounded-2xl shadow-xs border border-slate-100 flex items-center justify-center gap-2 text-[#ba1a1a] font-semibold text-xs hover:bg-rose-50 active:scale-[0.99] transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Log Out</span>
        </button>

        {/* Footer Microcopy */}
        <div className="text-center py-2">
          <p className="text-[11px] text-slate-400">LiveVolume Inc. • Device Encrypted</p>
        </div>
      </div>

      {/* Video Quality Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl p-4 shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-[#131b2e]">Select Video Quality</h3>
            <div className="space-y-1">
              {(['Auto', '1080p', '720p'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setVideoQuality(q);
                    setShowVideoModal(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between ${
                    videoQuality === q
                      ? 'bg-[#e2e7ff] text-[#004ac6] font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{q}</span>
                  {videoQuality === q && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3D Quality Modal */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl p-4 shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-[#131b2e]">Adjust 3D Depth Detail</h3>
            <div className="space-y-1">
              {(['Ultra', 'High', 'Balanced'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSpatialQuality(q);
                    setShow3DModal(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between ${
                    spatialQuality === q
                      ? 'bg-[#004ac6] text-white font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{q} Detail</span>
                  {spatialQuality === q && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
