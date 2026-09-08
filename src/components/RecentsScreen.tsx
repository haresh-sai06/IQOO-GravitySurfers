import React, { useState } from 'react';
import { CALL_HISTORY_DATA } from '../data/mockData';
import { triggerHaptic } from '../utils/haptics';
import { useTheme } from '../context/ThemeContext';

interface RecentsScreenProps {
  onStartCall: (contactName: string) => void;
}

export const RecentsScreen: React.FC<RecentsScreenProps> = ({ onStartCall }) => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<'all' | 'missed' | '3d' | 'standard'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartCall = (name: string) => {
    triggerHaptic('callStart');
    onStartCall(name);
  };

  const filteredCalls = CALL_HISTORY_DATA.filter((call) => {
    const matchesSearch =
      call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'missed' && call.type === 'Missed') ||
      (activeFilter === '3d' && call.type === '3D') ||
      (activeFilter === 'standard' && (call.type === 'Video' || call.type === 'Audio'));

    return matchesSearch && matchesFilter;
  });

  const timeGroups: Array<'Today' | 'Yesterday' | 'Earlier this week'> = [
    'Today',
    'Yesterday',
    'Earlier this week',
  ];

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <div className="w-full px-4 pt-safe pt-3 pb-2 flex items-center justify-between max-w-[420px] mx-auto">
        <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Recents</h1>
        <button
          onClick={() => handleStartCall('Sarah Chen')}
          aria-label="Start Call"
          style={{ backgroundColor: theme.light, color: theme.primary }}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition"
        >
          <span className="material-symbols-outlined text-[20px]">add_call</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full px-4 flex flex-col gap-4 max-w-[420px] mx-auto">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-9 bg-white text-[#131b2e] placeholder:text-slate-400 text-xs rounded-xl shadow-xs border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="Search recents and contacts..."
            type="search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('all');
            }}
            style={activeFilter === 'all' ? { backgroundColor: theme.primary } : {}}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              activeFilter === 'all'
                ? 'text-white shadow-xs'
                : 'bg-white text-[#434655] border border-slate-200/60 hover:bg-slate-50'
            }`}
            type="button"
          >
            All
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('missed');
            }}
            style={activeFilter === 'missed' ? { backgroundColor: theme.primary } : {}}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              activeFilter === 'missed'
                ? 'text-white shadow-xs'
                : 'bg-white text-[#434655] border border-slate-200/60 hover:bg-slate-50'
            }`}
            type="button"
          >
            Missed
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('3d');
            }}
            style={activeFilter === '3d' ? { backgroundColor: theme.primary } : {}}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 ${
              activeFilter === '3d'
                ? 'text-white shadow-xs'
                : 'bg-white text-[#434655] border border-slate-200/60 hover:bg-slate-50'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
            3D Calls
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('standard');
            }}
            style={activeFilter === 'standard' ? { backgroundColor: theme.primary } : {}}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 ${
              activeFilter === 'standard'
                ? 'text-white shadow-xs'
                : 'bg-white text-[#434655] border border-slate-200/60 hover:bg-slate-50'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">videocam</span>
            Standard
          </button>
        </div>

        {/* Grouped Call Records */}
        <div className="flex flex-col gap-4">
          {timeGroups.map((group) => {
            const callsInGroup = filteredCalls.filter((call) => call.timeGroup === group);
            if (callsInGroup.length === 0) return null;

            return (
              <div key={group} className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {group}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {callsInGroup.length} call{callsInGroup.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {callsInGroup.map((call) => {
                    const isMissed = call.type === 'Missed';
                    return (
                      <div
                        key={call.id}
                        className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 flex items-center justify-between hover:bg-slate-50/80 transition"
                      >
                        <div
                          onClick={() => handleStartCall(call.name)}
                          className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                        >
                          {/* Avatar */}
                          <div className="relative shrink-0">
                            {call.avatar ? (
                              <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
                                <img
                                  alt={call.name}
                                  className="w-full h-full object-cover"
                                  src={call.avatar}
                                />
                              </div>
                            ) : (
                              <div
                                style={!isMissed ? { backgroundColor: theme.light, color: theme.primary } : {}}
                                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isMissed
                                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                                    : ''
                                }`}
                              >
                                {call.initials}
                              </div>
                            )}
                            {call.direction === 'incoming' && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex flex-col min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-bold text-xs truncate ${
                                  isMissed ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                                }`}
                              >
                                {call.name}
                              </span>
                              {call.type === '3D' && (
                                <span
                                  style={{ backgroundColor: theme.light, color: theme.primary }}
                                  className="px-1.5 py-0.2 rounded-md text-[9px] font-bold flex items-center gap-0.5"
                                >
                                  <span className="material-symbols-outlined text-[10px]">
                                    view_in_ar
                                  </span>
                                  3D
                                </span>
                              )}
                              {isMissed && (
                                <span className="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                                  Missed
                                </span>
                              )}
                              {call.type === 'Video' && (
                                <span className="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-slate-100 text-slate-600">
                                  Video
                                </span>
                              )}
                              {call.type === 'Audio' && (
                                <span className="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-slate-100 text-slate-600">
                                  Audio
                                </span>
                              )}
                            </div>

                            {/* Subtitle with arrow */}
                            <div className="flex items-center gap-1 text-[11px] text-[#434655] mt-0.5">
                              {call.direction === 'incoming' && (
                                <span className="material-symbols-outlined text-[13px] text-blue-500">
                                  call_received
                                </span>
                              )}
                              {call.direction === 'outgoing' && (
                                <span className="material-symbols-outlined text-[13px] text-slate-400">
                                  call_made
                                </span>
                              )}
                              {call.direction === 'missed' && (
                                <span className="material-symbols-outlined text-[13px] text-[#ba1a1a]">
                                  call_missed
                                </span>
                              )}
                              <span className="truncate">
                                {isMissed
                                  ? call.rings
                                  : `${call.direction === 'incoming' ? 'Incoming' : 'Outgoing'} • ${call.duration}`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Timestamp & Action */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] text-slate-400 font-medium">
                            {call.timestamp}
                          </span>
                          <button
                            onClick={() => handleStartCall(call.name)}
                            aria-label={`Call ${call.name}`}
                            style={!isMissed ? { backgroundColor: theme.light, color: theme.primary } : {}}
                            className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition cursor-pointer ${
                              isMissed
                                ? 'bg-[#ffdad6] text-[#ba1a1a] hover:bg-rose-200'
                                : 'hover:opacity-90'
                            }`}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {call.type === 'Video' ? 'videocam' : 'call'}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
