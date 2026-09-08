import React, { useState } from 'react';
import { ASSETS, FAQ_DATA } from '../data/mockData';

interface HelpSupportScreenProps {
  onBack: () => void;
  onOpenGuides: () => void;
  onOpenPrivacy: () => void;
}

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({
  onBack,
  onOpenGuides,
  onOpenPrivacy,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hi there! Welcome to LiveVolume Assist. How can we help you connect in 3D today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Thanks for asking about "${userText}". LiveVolume computes spatial depth locally on your phone's NPU for maximum privacy and zero latency. Let us know if you need anything else!`,
        },
      ]);
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-20 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/50 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between max-w-[420px] mx-auto">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f2f3ff] text-[#131b2e] active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          <h1 className="font-bold text-base text-[#131b2e]">Help & Support</h1>
          <button
            onClick={() => setShowChatModal(true)}
            aria-label="Support options"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f2f3ff] text-[#131b2e] active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full px-4 pt-3 flex flex-col gap-5 max-w-[420px] mx-auto">
        {/* Visual Care Hero Banner */}
        <div className="relative w-full rounded-2xl bg-[#f2f3ff] p-4 flex items-center justify-between overflow-hidden border border-blue-100 shadow-xs">
          <div className="flex flex-col max-w-[65%] z-10">
            <span className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider mb-1">
              LiveVolume Assist
            </span>
            <h2 className="text-base font-bold text-[#131b2e] mb-1 leading-snug">
              We're here to help you connect in 3D
            </h2>
            <p className="text-xs text-[#434655]">
              Find guides, resolve call questions, or speak with an expert.
            </p>
          </div>
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-xs bg-white border border-slate-100">
            <img
              alt="Support Advisor"
              className="w-full h-full object-cover"
              src={ASSETS.supportAdvisor}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full relative">
          <div className="w-full h-11 bg-white rounded-xl flex items-center px-3.5 shadow-xs border border-slate-200/70">
            <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2 shrink-0">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-[#131b2e] placeholder:text-slate-400 focus:outline-none"
              placeholder="Search articles, topics, or FAQs..."
              type="search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>
        </div>

        {/* Browse by Topic */}
        <section className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold text-[#131b2e]">Browse by Topic</h3>
            <span className="text-[11px] text-slate-400 font-medium">4 collections</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Topic 1 */}
            <button
              onClick={onOpenGuides}
              className="w-full bg-white p-3.5 rounded-2xl text-left flex flex-col justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.98]"
              type="button"
            >
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] mb-3">
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#131b2e]">Getting Started</h4>
                <p className="text-[11px] text-[#434655] mt-0.5">
                  Set up your profile & first call
                </p>
              </div>
            </button>

            {/* Topic 2 */}
            <button
              onClick={onOpenGuides}
              className="w-full bg-white p-3.5 rounded-2xl text-left flex flex-col justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.98]"
              type="button"
            >
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] mb-3">
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#131b2e]">3D Video Calls</h4>
                <p className="text-[11px] text-[#434655] mt-0.5">
                  Spatial depth & camera gestures
                </p>
              </div>
            </button>

            {/* Topic 3 */}
            <button
              onClick={onOpenGuides}
              className="w-full bg-white p-3.5 rounded-2xl text-left flex flex-col justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.98]"
              type="button"
            >
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] mb-3">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#131b2e]">Audio & Camera</h4>
                <p className="text-[11px] text-[#434655] mt-0.5">
                  Clarity, mic tuning & lighting
                </p>
              </div>
            </button>

            {/* Topic 4 */}
            <button
              onClick={onOpenPrivacy}
              className="w-full bg-white p-3.5 rounded-2xl text-left flex flex-col justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.98]"
              type="button"
            >
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] mb-3">
                <span className="material-symbols-outlined text-[20px]">shield_person</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#131b2e]">Account & Privacy</h4>
                <p className="text-[11px] text-[#434655] mt-0.5">
                  On-device spatial protections
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold text-[#131b2e]">Frequently Asked Questions</h3>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#004ac6] font-semibold"
            >
              View all
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-white shadow-xs border border-slate-100 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-3.5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    type="button"
                  >
                    <span className="text-xs font-bold text-[#131b2e] pr-2">
                      {faq.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform duration-200 shrink-0 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-0 text-[#434655] text-xs leading-relaxed border-t border-slate-100/60 pt-2.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Guide Card */}
        <div
          onClick={onOpenGuides}
          className="w-full rounded-2xl bg-[#eaedff] p-3.5 flex items-center gap-3 cursor-pointer hover:bg-[#e2e7ff] transition border border-blue-100 shadow-xs"
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white">
            <img
              alt="Guide thumbnail"
              className="w-full h-full object-cover"
              src={ASSETS.guideThumb}
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] text-[#004ac6] uppercase font-bold tracking-wider">
              Interactive Guide
            </span>
            <h4 className="text-xs font-bold text-[#131b2e] truncate">
              Optimizing Call Lighting
            </h4>
            <p className="text-[11px] text-[#434655] line-clamp-1">
              Tips for crisp real-time depth capture
            </p>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">
            chevron_right
          </span>
        </div>

        {/* Contact Support Section */}
        <section className="flex flex-col w-full">
          <h3 className="text-xs font-bold text-[#131b2e] mb-2 px-1">Still need help?</h3>
          <div className="flex flex-col space-y-2">
            {/* Chat Action */}
            <button
              onClick={() => setShowChatModal(true)}
              className="w-full bg-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.99] text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e]">Chat with Us</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Live representative • Replies in under 5m
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">
                chevron_right
              </span>
            </button>

            {/* Email Support */}
            <a
              href="mailto:support@livevolume.app"
              className="w-full bg-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.99] text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e]">Email Support</span>
                  <span className="text-[11px] text-[#434655] truncate">
                    support@livevolume.app
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">
                chevron_right
              </span>
            </a>

            {/* Report Issue */}
            <button
              onClick={() => setShowChatModal(true)}
              className="w-full bg-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs border border-slate-100 hover:bg-slate-50 transition active:scale-[0.99] text-left cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">report_problem</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e]">
                    Submit Feedback / Report Issue
                  </span>
                  <span className="text-[11px] text-[#434655] truncate">
                    Help improve the 3D calling engine
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">
                chevron_right
              </span>
            </button>
          </div>
        </section>

        {/* System Status & Footer */}
        <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#f2f3ff] space-x-1.5 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-[#004ac6] inline-block animate-pulse" />
            <span className="text-[11px] font-medium text-[#434655]">
              All 3D Relays Operational
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            LiveVolume v1.4.0 • Built with on-device privacy
          </p>
        </div>
      </div>

      {/* Live Support Chat Drawer/Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-4 shadow-2xl flex flex-col h-[520px] max-h-[85vh] animate-slide-up">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100">
                  <img
                    alt="Advisor"
                    className="w-full h-full object-cover"
                    src={ASSETS.supportAdvisor}
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#131b2e]">LiveVolume Assistant</h3>
                  <p className="text-[10px] text-emerald-600 font-semibold">Online • Typically replies in 1m</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2563eb] text-white rounded-br-xs'
                        : 'bg-[#f2f3ff] text-[#131b2e] rounded-bl-xs border border-blue-50'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about 3D calls, audio, cameras..."
                className="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
