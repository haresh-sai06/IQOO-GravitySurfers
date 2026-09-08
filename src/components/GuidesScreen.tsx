import React, { useState } from 'react';
import { GUIDE_ITEMS } from '../data/mockData';
import { GuideItem } from '../types';

interface GuidesScreenProps {
  onBack: () => void;
  onOpenSupport: () => void;
  onStartCallDemo: () => void;
}

export const GuidesScreen: React.FC<GuidesScreenProps> = ({
  onBack,
  onOpenSupport,
  onStartCallDemo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'camera' | 'audio' | 'battery'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGuideModal, setActiveGuideModal] = useState<GuideItem | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const filteredGuides = GUIDE_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 flex items-center justify-between pt-safe max-w-[420px] mx-auto">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-slate-100 text-[#131b2e] flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>
        <div className="text-center flex-1 px-2">
          <h1 className="font-bold text-[16px] text-[#131b2e] tracking-tight leading-tight">
            User Guides & Tips
          </h1>
          <p className="text-[11px] text-[#434655] font-medium">Master 3D spatial calls</p>
        </div>
        <button
          onClick={() => {
            const promptVal = prompt('Search guides:', searchQuery);
            if (promptVal !== null) setSearchQuery(promptVal);
          }}
          aria-label="Search guides"
          className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 py-4 space-y-5 max-w-[420px] mx-auto">
        {/* Featured Walkthrough Card */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-[#2563eb]">
              <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
              Essential Guide
            </span>
            <span className="text-xs text-slate-400 font-medium">3 min read</span>
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#131b2e] leading-snug">
              Getting Started with 3D Holographic Calls
            </h2>
            <p className="text-xs text-[#434655] mt-1 leading-relaxed">
              Learn how your front camera reconstructs live depth and lets both callers move naturally
              in 3D space.
            </p>
          </div>

          {/* 3 Sequential Visual Steps */}
          <div className="bg-[#f8fafc] rounded-xl p-3 flex items-center justify-between gap-1 border border-slate-200/60">
            <div className="flex flex-col items-center text-center gap-1 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-[#2563eb] mb-0.5 border border-slate-100">
                <span className="material-symbols-outlined text-[18px]">photo_camera_front</span>
              </div>
              <span className="text-[11px] font-bold text-[#131b2e] leading-tight">
                1. Position Face
              </span>
              <span className="text-[9px] text-[#434655] leading-tight">Arm's length, clear</span>
            </div>

            <span className="material-symbols-outlined text-slate-300 text-xs shrink-0">
              arrow_forward
            </span>

            <div className="flex flex-col items-center text-center gap-1 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-[#2563eb] mb-0.5 border border-slate-100">
                <span className="material-symbols-outlined text-[18px]">sync</span>
              </div>
              <span className="text-[11px] font-bold text-[#131b2e] leading-tight">
                2. Depth Sync
              </span>
              <span className="text-[9px] text-[#434655] leading-tight">Instant on-device</span>
            </div>

            <span className="material-symbols-outlined text-slate-300 text-xs shrink-0">
              arrow_forward
            </span>

            <div className="flex flex-col items-center text-center gap-1 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-[#2563eb] mb-0.5 border border-slate-100">
                <span className="material-symbols-outlined text-[18px]">orbit</span>
              </div>
              <span className="text-[11px] font-bold text-[#131b2e] leading-tight">
                3. Orbit & Talk
              </span>
              <span className="text-[9px] text-[#434655] leading-tight">Swipe to rotate 3D</span>
            </div>
          </div>

          <button
            onClick={() => setShowWalkthrough(true)}
            className="w-full py-3 px-4 rounded-xl bg-[#2563eb] text-white text-xs font-semibold hover:bg-blue-700 active:scale-[0.99] transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Read full walkthrough</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </section>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition ${
              selectedCategory === 'all'
                ? 'bg-[#131b2e] text-white'
                : 'bg-white border border-slate-200 text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            All Guides
          </button>
          <button
            onClick={() => setSelectedCategory('camera')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'camera'
                ? 'bg-[#131b2e] text-white'
                : 'bg-white border border-slate-200 text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            Camera & Lighting
          </button>
          <button
            onClick={() => setSelectedCategory('audio')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'audio'
                ? 'bg-[#131b2e] text-white'
                : 'bg-white border border-slate-200 text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            Spatial Audio
          </button>
          <button
            onClick={() => setSelectedCategory('battery')}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === 'battery'
                ? 'bg-[#131b2e] text-white'
                : 'bg-white border border-slate-200 text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            Battery & Data
          </button>
        </div>

        {/* Interactive Tutorials List */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Tutorials
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              {filteredGuides.length} lessons
            </span>
          </div>

          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setActiveGuideModal(guide)}
              className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:border-blue-300 active:bg-slate-50 transition cursor-pointer shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">{guide.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e] leading-snug truncate">
                  {guide.title}
                </h4>
                <p className="text-[11px] text-[#434655] line-clamp-1 mt-0.5">
                  {guide.description}
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px] shrink-0">
                chevron_right
              </span>
            </article>
          ))}
        </section>

        {/* Help Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#2563eb] shrink-0">
            <span className="material-symbols-outlined text-[20px]">help_center</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#131b2e]">Still have questions?</div>
            <p className="text-[11px] text-[#434655] leading-tight mt-0.5">
              Check out our FAQs or get in touch with our team.
            </p>
          </div>
          <button
            onClick={onOpenSupport}
            className="text-xs font-semibold text-[#2563eb] hover:underline shrink-0 py-1"
          >
            Get Help
          </button>
        </div>
      </div>

      {/* Guide Detail Modal */}
      {(activeGuideModal || showWalkthrough) && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full">
                Interactive Walkthrough
              </span>
              <button
                onClick={() => {
                  setActiveGuideModal(null);
                  setShowWalkthrough(false);
                }}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                {activeGuideModal ? activeGuideModal.title : 'Getting Started with 3D Calls'}
              </h3>
              <p className="text-xs text-[#434655] mt-1 leading-relaxed">
                {activeGuideModal
                  ? activeGuideModal.description
                  : 'LiveVolume transforms 2D camera frames into a dense interactive 3D point cloud in real time.'}
              </p>
            </div>

            <div className="p-3 bg-[#f8fafc] rounded-xl border border-slate-200 text-xs text-[#434655] space-y-2">
              <div className="font-semibold text-[#131b2e]">Key Takeaways:</div>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>Keep phone at arm's length for best depth field accuracy.</li>
                <li>Drag across screen anytime during a call to rotate viewpoints.</li>
                <li>Tap recenter button anytime to smoothly snap back to center.</li>
                <li>Wear stereo headphones for true 360-degree binaural spatial audio.</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setActiveGuideModal(null);
                setShowWalkthrough(false);
                onStartCallDemo();
              }}
              className="w-full py-2.5 bg-[#2563eb] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-700 transition"
            >
              <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
              <span>Test 3D Call Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
