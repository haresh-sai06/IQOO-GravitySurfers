import React from 'react';
import { ASSETS } from '../data/mockData';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onOpenPrivacy: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onSignIn,
  onOpenPrivacy,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between w-full max-w-sm mx-auto px-4 py-6 select-none">
      {/* Top Brand Header */}
      <div className="flex flex-col items-center text-center mt-2 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-2 mb-3 transition-transform active:scale-95 duration-200 border border-slate-100">
          <img
            alt="LiveVolume Logo"
            className="w-full h-full object-contain rounded-xl"
            src={ASSETS.logo}
          />
        </div>
        <h1 className="text-3xl font-bold text-[#131b2e] tracking-tight mb-1">
          LiveVolume
        </h1>
        <p className="text-base text-[#434655]">
          See who you're talking to, in 3D
        </p>
      </div>

      {/* Hero Spatial Visual Centerpiece */}
      <div className="relative w-full max-w-xs mx-auto mb-6">
        <div className="relative w-full aspect-square max-h-[280px] bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
          {/* Spatial Orbit Canvas / SVG */}
          <svg
            className="w-full h-full p-6 transition-transform duration-700 hover:scale-105"
            fill="none"
            viewBox="0 0 280 280"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outermost Depth Orbit Ring */}
            <ellipse
              cx="140"
              cy="140"
              rx="118"
              ry="52"
              stroke="#dae2fd"
              strokeDasharray="3 3"
              strokeWidth="1.2"
            />
            {/* Primary Equatorial Orbit Plane */}
            <ellipse cx="140" cy="140" rx="122" ry="122" stroke="#eaedff" strokeWidth="1.5" />
            <ellipse cx="140" cy="140" rx="58" ry="120" stroke="#dae2fd" strokeWidth="1.2" />
            <ellipse
              cx="140"
              cy="140"
              opacity="0.35"
              rx="120"
              ry="36"
              stroke="#2563eb"
              strokeWidth="1.5"
            />

            {/* Calm Ambient Volumetric Ring */}
            <circle cx="140" cy="140" fill="#f2f3ff" opacity="0.85" r="82" />
            <circle cx="140" cy="140" fill="#dbe1ff" opacity="0.45" r="54" />

            {/* Depth Axis Latitude Lines */}
            <path
              d="M 68 116 C 104 130, 176 130, 212 116"
              opacity="0.25"
              stroke="#2563eb"
              strokeWidth="1.2"
            />
            <path
              d="M 68 164 C 104 150, 176 150, 212 164"
              opacity="0.25"
              stroke="#2563eb"
              strokeWidth="1.2"
            />

            {/* Central Presence Silhouette */}
            <g className="text-[#2563eb]">
              <circle cx="140" cy="120" fill="#2563eb" r="22" />
              <path
                d="M106 172 C106 148, 120 144, 140 144 C160 144, 174 148, 174 172 C174 178, 170 180, 140 180 C110 180, 106 178, 106 172 Z"
                fill="#2563eb"
              />
            </g>

            {/* Dynamic Spatial Orbit Nodes */}
            <circle cx="58" cy="138" fill="#2563eb" r="4.5" />
            <circle cx="58" cy="138" opacity="0.2" r="8.5" stroke="#2563eb" strokeWidth="1" />
            <circle cx="222" cy="142" fill="#2563eb" r="5.5" />
            <circle cx="222" cy="142" opacity="0.25" r="10" stroke="#2563eb" strokeWidth="1" />
            <circle cx="184" cy="74" fill="#5bb8fe" r="3.5" />
            <circle cx="112" cy="214" fill="#5bb8fe" r="3.5" />
          </svg>

          {/* Gentle Ambient Live Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] shadow-xs border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#131b2e]">Spatial Room</span>
          </div>

          {/* Live Mic Quality Floating Pill */}
          <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] shadow-xs border border-blue-100">
            <span className="material-symbols-outlined text-[#2563eb] text-[15px]">view_in_ar</span>
            <span className="text-[11px] font-semibold text-[#131b2e]">True Depth</span>
          </div>
        </div>
      </div>

      {/* Reassurance & Value Props */}
      <div className="flex flex-col gap-2.5 w-full mb-6">
        <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white shadow-xs border border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-[#f2f3ff] flex items-center justify-center shrink-0 text-[#2563eb]">
            <span className="material-symbols-outlined text-[20px]">smartphone</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[15px] font-semibold text-[#131b2e] leading-tight">
              No headset required
            </span>
            <span className="text-xs text-[#434655]">
              Natural 3D view using your phone camera
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white shadow-xs border border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-[#f2f3ff] flex items-center justify-center shrink-0 text-[#2563eb]">
            <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[15px] font-semibold text-[#131b2e] leading-tight">
              Crystal-clear real-time depth
            </span>
            <span className="text-xs text-[#434655]">
              Lifelike presence with zero perceptible delay
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white shadow-xs border border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-[#f2f3ff] flex items-center justify-center shrink-0 text-[#2563eb]">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[15px] font-semibold text-[#131b2e] leading-tight">
              Private & encrypted on-device
            </span>
            <span className="text-xs text-[#434655]">
              Volumetric frames never touch the cloud
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="w-full flex flex-col items-center gap-3 pt-2">
        <button
          onClick={onGetStarted}
          className="w-full h-12 bg-[#2563eb] hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-[15px] rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          <span>Get started</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <div className="flex flex-col items-center gap-1 text-center">
          <button
            onClick={onSignIn}
            className="text-[13px] font-medium text-[#2563eb] hover:underline bg-transparent cursor-pointer py-1"
            type="button"
          >
            Already have an account? Sign in
          </button>
          <p className="text-xs text-slate-400">
            By continuing, you agree to our{' '}
            <button
              onClick={onOpenPrivacy}
              className="text-[#434655] underline hover:text-[#131b2e]"
            >
              Terms & Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
