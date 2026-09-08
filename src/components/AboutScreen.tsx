import React, { useState } from 'react';

interface AboutScreenProps {
  onBack: () => void;
  onOpenPrivacy: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack, onOpenPrivacy }) => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalBody, setModalBody] = useState<string | null>(null);

  const openLegalModal = (title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between pt-safe max-w-[420px] mx-auto">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f2f3ff] text-[#131b2e] active:scale-95 transition-transform"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <h1 className="font-bold text-base text-[#131b2e] tracking-tight">About LiveVolume</h1>
        <div className="w-10 h-10" />
      </header>

      {/* Main Content */}
      <div className="w-full px-4 pt-4 pb-6 space-y-5 max-w-[420px] mx-auto">
        {/* Brand Identity Hero Card */}
        <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#2563eb] mb-2.5 shadow-xs">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              view_in_ar
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#131b2e] tracking-tight">LiveVolume</h2>
          <p className="text-[11px] font-bold text-[#2563eb] uppercase tracking-widest mt-0.5">
            Spatial 3D Calling
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-[11px] font-medium text-[#434655] mt-2.5">
            <span>Version 1.4.2</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Build 2025.1</span>
          </div>
        </div>

        {/* Mission Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col space-y-2">
          <span className="text-[10px] font-bold text-[#2563eb] uppercase tracking-wider">
            Our Mission
          </span>
          <h3 className="text-sm font-bold text-[#131b2e]">
            Bringing real presence to daily calls
          </h3>
          <p className="text-xs text-[#434655] leading-relaxed">
            LiveVolume makes video calls feel like being in the same room. Using cutting-edge
            on-device spatial perception, you can naturally look around your conversation partner
            without specialized glasses, headsets, or extra hardware.
          </p>
        </div>

        {/* Why LiveVolume is Different */}
        <div className="flex flex-col space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Why LiveVolume is Different
          </h3>
          <div className="space-y-2">
            {/* Pillar 1 */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">screen_rotation</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e]">Zero Extra Hardware</h4>
                <p className="text-[11px] text-[#434655] mt-0.5 leading-relaxed">
                  Works directly through your phone's standard front camera and screen. No goggles or
                  sensors needed.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">lock_person</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e]">Private & On-Device</h4>
                <p className="text-[11px] text-[#434655] mt-0.5 leading-relaxed">
                  All 3D volumetric processing happens locally on your phone. Depth maps never leave
                  your device.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">wifi_tethering</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e]">Adaptive & Battery-Optimized</h4>
                <p className="text-[11px] text-[#434655] mt-0.5 leading-relaxed">
                  Intelligently transitions between 3D volume and high-definition video during low
                  bandwidth or weak connections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Resources */}
        <div className="flex flex-col space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Legal & Resources
          </h3>
          <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {/* Terms of Service */}
            <button
              onClick={() =>
                openLegalModal(
                  'Terms of Service',
                  'LiveVolume provides consumer communication services subject to these terms. All 3D rendering and communications are intended for real-time interpersonal calling.'
                )
              }
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">
                  description
                </span>
                <span className="text-xs font-medium text-[#131b2e]">Terms of Service</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                chevron_right
              </span>
            </button>

            {/* Privacy Policy */}
            <button
              onClick={onOpenPrivacy}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">shield</span>
                <span className="text-xs font-medium text-[#131b2e]">Privacy Policy</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                chevron_right
              </span>
            </button>

            {/* Open Source Licenses */}
            <button
              onClick={() =>
                openLegalModal(
                  'Open Source Licenses',
                  'LiveVolume is built with open source software including WebRTC, Plus Jakarta Sans (SIL OFL 1.1), Lucide icons (ISC License), and Tailwind CSS (MIT License).'
                )
              }
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">code</span>
                <span className="text-xs font-medium text-[#131b2e]">Open Source Licenses</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                chevron_right
              </span>
            </button>

            {/* Release Notes */}
            <button
              onClick={() =>
                openLegalModal(
                  'Release Notes & Updates (v1.4.2)',
                  '• Monocular 3D depth latency reduced by 35% on mobile NPUs.\n• Added 360-degree orbital perspective drag gestures.\n• Added spatial audio binaural head-related transfer functions (HRTF).\n• Battery consumption optimized for cellular calls.'
                )
              }
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">campaign</span>
                <span className="text-xs font-medium text-[#131b2e]">Release Notes & Updates</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Footer Acknowledgement */}
        <div className="pt-2 text-center flex flex-col items-center justify-center space-y-1">
          <p className="text-[11px] text-slate-400">Designed with care for human connection</p>
          <p className="text-[10px] text-slate-400/80">© 2025 LiveVolume Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {modalTitle && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#131b2e]">{modalTitle}</h3>
              <button onClick={() => setModalTitle(null)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#434655] leading-relaxed whitespace-pre-line">{modalBody}</p>
            <button
              onClick={() => setModalTitle(null)}
              className="w-full py-2 bg-[#2563eb] text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
