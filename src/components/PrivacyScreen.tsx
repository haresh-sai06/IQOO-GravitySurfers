import React, { useState } from 'react';

interface PrivacyScreenProps {
  onBack: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  const [openSection, setOpenSection] = useState<number | null>(1);

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between pt-safe max-w-[420px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-slate-100 text-[#131b2e] flex items-center justify-center hover:bg-slate-200 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-bold text-sm text-[#131b2e] tracking-tight leading-tight">
              Privacy & Data Security
            </h1>
            <p className="text-[10px] text-slate-500 leading-tight">Updated October 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-100">
          <span className="material-symbols-outlined text-[15px]">verified_user</span>
          <span className="text-[10px] font-bold tracking-wide">Verified</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 py-4 space-y-4 max-w-[420px] mx-auto">
        {/* Privacy Principles Card */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#2563eb]">
            <span className="material-symbols-outlined text-[22px]">shield</span>
            <h2 className="text-xs font-bold text-[#131b2e]">Our Privacy Principles</h2>
          </div>
          <p className="text-xs text-[#434655] leading-relaxed">
            LiveVolume uses monocular depth and volumetric streaming engineered around zero data
            collection. Your raw camera feeds and depth calculations never leave your phone unencrypted.
          </p>

          <div className="space-y-2.5 pt-0.5">
            {/* Principle 1 */}
            <div className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-xl border border-slate-200/70">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">memory</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#131b2e]">100% On-Device Depth</h3>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[#2563eb] bg-blue-50 px-1.5 py-0.5 rounded">
                    Local NPU
                  </span>
                </div>
                <p className="text-[11px] text-[#434655] mt-1 leading-normal">
                  Neural network inference runs exclusively on your phone's hardware. Raw camera frames
                  never upload to cloud servers for 3D reconstruction.
                </p>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-xl border border-slate-200/70">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#131b2e]">End-to-End Encrypted Calls</h3>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    AES-256
                  </span>
                </div>
                <p className="text-[11px] text-[#434655] mt-1 leading-normal">
                  Live volumetric point cloud frames and spatial binaural audio are cryptographically
                  sealed. Only you and your caller hold session keys.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="flex items-start gap-3 p-3 bg-[#f8fafc] rounded-xl border border-slate-200/70">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#131b2e]">No Biometric Storage</h3>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                    Zero RAM Disk
                  </span>
                </div>
                <p className="text-[11px] text-[#434655] mt-1 leading-normal">
                  Point cloud coordinates exist only in volatile RAM during your live call and are purged
                  immediately the moment you hang up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Policy Sections */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Detailed Policy Terms
            </h3>
            <span className="text-[11px] text-slate-400">4 sections</span>
          </div>

          {/* Clause 1 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs transition-all">
            <button
              onClick={() => setOpenSection(openSection === 1 ? null : 1)}
              className="w-full flex items-center justify-between cursor-pointer font-bold text-xs text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                  1
                </span>
                <span>Information We Collect</span>
              </span>
              <span
                className={`material-symbols-outlined text-slate-400 text-[18px] transition-transform duration-200 ${
                  openSection === 1 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openSection === 1 && (
              <div className="text-xs text-[#434655] leading-relaxed mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
                <p>
                  We collect standard account identifiers (such as your verified phone number or email
                  address) strictly to authenticate you and enable directory lookups between saved
                  contacts.
                </p>
                <p className="text-[11px] bg-[#f8fafc] p-2 rounded-lg border border-slate-200/60">
                  🔒 <strong>Strict Policy:</strong> We never collect, inspect, store, or train AI
                  models on your volumetric 3D point cloud streams or spatial audio feeds.
                </p>
              </div>
            )}
          </div>

          {/* Clause 2 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs transition-all">
            <button
              onClick={() => setOpenSection(openSection === 2 ? null : 2)}
              className="w-full flex items-center justify-between cursor-pointer font-bold text-xs text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                  2
                </span>
                <span>Device Permissions Usage</span>
              </span>
              <span
                className={`material-symbols-outlined text-slate-400 text-[18px] transition-transform duration-200 ${
                  openSection === 2 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openSection === 2 && (
              <div className="text-xs text-[#434655] leading-relaxed mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#2563eb] mt-0.5">
                    videocam
                  </span>
                  <div>
                    <strong className="text-[#131b2e]">Camera:</strong> Required only during active live
                    calls for real-time monocular depth estimation.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#2563eb] mt-0.5">
                    mic
                  </span>
                  <div>
                    <strong className="text-[#131b2e]">Microphone:</strong> Required for live binaural
                    spatial audio capture during calls.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clause 3 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs transition-all">
            <button
              onClick={() => setOpenSection(openSection === 3 ? null : 3)}
              className="w-full flex items-center justify-between cursor-pointer font-bold text-xs text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
                <span>Peer-to-Peer Data Transfer</span>
              </span>
              <span
                className={`material-symbols-outlined text-slate-400 text-[18px] transition-transform duration-200 ${
                  openSection === 3 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openSection === 3 && (
              <div className="text-xs text-[#434655] leading-relaxed mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
                <p>
                  Whenever network topology allows, calls connect directly peer-to-peer (P2P). If
                  restrictive firewalls necessitate a TURN relay, the relay transmits only encrypted
                  packets and cannot decrypt the spatial stream.
                </p>
              </div>
            )}
          </div>

          {/* Clause 4 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs transition-all">
            <button
              onClick={() => setOpenSection(openSection === 4 ? null : 4)}
              className="w-full flex items-center justify-between cursor-pointer font-bold text-xs text-[#131b2e]"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                  4
                </span>
                <span>Your Rights & Data Deletion</span>
              </span>
              <span
                className={`material-symbols-outlined text-slate-400 text-[18px] transition-transform duration-200 ${
                  openSection === 4 ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openSection === 4 && (
              <div className="text-xs text-[#434655] leading-relaxed mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
                <p>
                  You retain total ownership over your information. You can wipe your account metadata,
                  call logs, and synchronized contacts anytime in Settings &gt; Account &gt; Delete Account.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Data Protection Officer Contact */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#131b2e] leading-tight">
                Data Protection Officer
              </div>
              <div className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
                privacy@livevolume.app
              </div>
            </div>
          </div>
          <a
            href="mailto:privacy@livevolume.app"
            className="px-3.5 py-2 rounded-xl bg-slate-100 text-[#131b2e] hover:bg-slate-200 text-xs font-semibold transition-colors flex items-center gap-1 border border-slate-200 active:scale-95 shrink-0"
          >
            <span>Contact</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};
