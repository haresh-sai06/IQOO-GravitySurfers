import React, { useState } from 'react';
import { ASSETS, CONTACTS_DATA } from '../data/mockData';
import { Contact } from '../types';
import { triggerHaptic } from '../utils/haptics';
import { useTheme } from '../context/ThemeContext';

interface ContactsScreenProps {
  onStartCall: (contactName: string) => void;
  onOpenSettings: () => void;
}

export const ContactsScreen: React.FC<ContactsScreenProps> = ({
  onStartCall,
  onOpenSettings,
}) => {
  const { theme } = useTheme();
  const [contactsList, setContactsList] = useState<Contact[]>(CONTACTS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'spatial' | 'favorites' | 'recent'>(
    'all'
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  // Initiate call with haptic feedback
  const handleInitiateCall = (contactName: string) => {
    triggerHaptic('callStart');
    onStartCall(contactName);
  };

  // Toggle pin to Favorites
  const handleToggleFavorite = (contactId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerHaptic('favoritePin');
    setContactsList((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  // Pinned favorites list
  const favoriteContacts = contactsList.filter((c) => c.isFavorite);

  // Group contacts by letter
  const filteredContacts = contactsList.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'spatial' && contact.is3DReady) ||
      (activeFilter === 'favorites' && contact.isFavorite) ||
      (activeFilter === 'recent' && (contact.typeCategory === 'recent' || contact.isFavorite));

    return matchesSearch && matchesFilter;
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  const lettersPresent = Array.from(
    new Set(filteredContacts.map((c) => c.name.charAt(0).toUpperCase()))
  ).sort();

  return (
    <div className="flex-1 flex flex-col w-full bg-[#faf8ff] select-none pb-24">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between max-w-[420px] mx-auto">
          <div className="flex items-center gap-2">
            <img
              alt="LiveVolume Logo"
              className="h-7 w-auto object-contain"
              src={ASSETS.logo}
            />
            <span className="font-semibold text-base text-[#131b2e] tracking-tight">
              LiveVolume
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-[#434655]">Contacts</span>
            <button
              onClick={() => {
                triggerHaptic('light');
                onOpenSettings();
              }}
              style={{ backgroundColor: theme.primary }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer active:scale-95 transition"
              title="Open Settings"
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 pt-3 flex flex-col gap-4 max-w-[420px] mx-auto">
        {/* Screen Title & Add Contact */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Contacts</h1>
            <p className="text-xs text-[#434655]">
              {contactsList.length} people • {contactsList.filter((c) => c.is3DReady).length} ready for 3D live spatial audio
            </p>
          </div>
          <button
            onClick={() => {
              triggerHaptic('light');
              setShowAddModal(true);
            }}
            aria-label="Add Contact"
            style={{ backgroundColor: theme.light, color: theme.primary }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-xs hover:opacity-90"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-9 bg-white text-[#131b2e] placeholder:text-slate-400 text-xs rounded-xl shadow-xs border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
            placeholder="Search contacts, numbers, or tags..."
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              activeFilter === 'all'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            All
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('spatial');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 ${
              activeFilter === 'spatial'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]" style={{ color: theme.primary }}>
              view_in_ar
            </span>
            3D Ready
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('favorites');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 ${
              activeFilter === 'favorites'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[14px]"
              style={{
                color: theme.primary,
                fontVariationSettings: "'FILL' 1",
              }}
            >
              star
            </span>
            Favorites ({favoriteContacts.length})
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveFilter('recent');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              activeFilter === 'recent'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#434655] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            Recent
          </button>
        </div>

        {/* My Card Profile */}
        <div
          onClick={() => handleInitiateCall('Sarah Chen')}
          className="w-full bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200">
              <img
                alt="Sarah Chen"
                className="w-full h-full object-cover"
                src={ASSETS.sarahChen}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#131b2e] truncate">Sarah Chen</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: theme.light, color: theme.primary }}
                >
                  My Card
                </span>
              </div>
              <span className="text-xs text-[#434655] truncate">
                +1 (555) 349-8201 • 3D Live Enabled
              </span>
            </div>
          </div>
          <div className="flex items-center text-slate-400">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </div>
        </div>

        {/* FAVORITES HORIZONTAL LIST AT THE TOP */}
        <div className="flex flex-col gap-2 pt-0.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{
                  color: theme.primary,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                star
              </span>
              <span className="text-xs font-bold text-[#131b2e]">Favorites</span>
              <span className="text-[11px] font-medium text-slate-400">
                ({favoriteContacts.length} pinned)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Quick Access</span>
          </div>

          {favoriteContacts.length > 0 ? (
            <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar py-1 px-0.5">
              {favoriteContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="w-[108px] shrink-0 bg-white rounded-2xl p-2.5 shadow-xs border border-slate-100 flex flex-col items-center justify-between text-center relative group hover:border-slate-200 transition"
                >
                  {/* Pin/Unpin Star Toggle */}
                  <button
                    onClick={(e) => handleToggleFavorite(contact.id, e)}
                    title="Unpin from Favorites"
                    aria-label={`Unpin ${contact.name}`}
                    className="absolute top-1.5 right-1.5 text-amber-400 hover:text-amber-500 p-0.5 transition cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </button>

                  {/* Avatar with Online indicator */}
                  <div
                    onClick={() => handleInitiateCall(contact.name)}
                    className="relative cursor-pointer mt-1"
                  >
                    {contact.avatar ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-slate-100 flex items-center justify-center">
                        <img
                          alt={contact.name}
                          className="w-full h-full object-cover"
                          src={contact.avatar}
                        />
                      </div>
                    ) : (
                      <div
                        style={{ backgroundColor: theme.light, color: theme.primary }}
                        className="w-12 h-12 rounded-full font-bold text-sm flex items-center justify-center"
                      >
                        {contact.initials}
                      </div>
                    )}
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  {/* Contact Name */}
                  <div
                    onClick={() => handleInitiateCall(contact.name)}
                    className="w-full mt-1.5 cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-[#131b2e] block truncate">
                      {contact.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {contact.is3DReady ? '3D Ready' : 'Voice'}
                    </span>
                  </div>

                  {/* 1-Tap Call Button with Haptic Trigger */}
                  <button
                    onClick={() => handleInitiateCall(contact.name)}
                    aria-label={`Start 3D Call with ${contact.name}`}
                    style={{ backgroundColor: theme.primary }}
                    className="w-full mt-2 py-1 px-2 rounded-xl text-white flex items-center justify-center gap-1 active:scale-95 transition shadow-xs cursor-pointer hover:opacity-95"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {contact.is3DReady ? 'view_in_ar' : 'call'}
                    </span>
                    <span className="text-[10px] font-bold">Call</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 border border-dashed border-slate-200 text-center flex flex-col items-center justify-center gap-1">
              <span className="material-symbols-outlined text-slate-300 text-[24px]">
                star_border
              </span>
              <span className="text-xs font-semibold text-slate-700">No pinned favorites</span>
              <p className="text-[11px] text-slate-400">
                Tap the star icon next to any contact below to pin them here for 1-tap calling.
              </p>
            </div>
          )}
        </div>

        {/* Alphabetical Directory */}
        <div className="relative flex items-start gap-2">
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            {lettersPresent.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xs border border-slate-100 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                  <span className="material-symbols-outlined text-[24px]">person_off</span>
                </div>
                <span className="text-sm font-bold text-[#131b2e]">No contacts found</span>
                <p className="text-xs text-[#434655] mt-1">
                  Try another keyword or remove your active filters.
                </p>
              </div>
            ) : (
              lettersPresent.map((letter) => {
                const groupContacts = filteredContacts.filter(
                  (c) => c.name.charAt(0).toUpperCase() === letter
                );

                return (
                  <div key={letter} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-400 px-2 tracking-wider">
                      {letter}
                    </span>
                    <div className="bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden divide-y divide-slate-100">
                      {groupContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 hover:bg-slate-50 transition"
                        >
                          <div
                            onClick={() => handleInitiateCall(contact.name)}
                            className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                          >
                            {contact.avatar ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                <img
                                  alt={contact.name}
                                  className="w-full h-full object-cover"
                                  src={contact.avatar}
                                />
                              </div>
                            ) : (
                              <div
                                style={{ backgroundColor: theme.light, color: theme.primary }}
                                className="w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center shrink-0"
                              >
                                {contact.initials}
                              </div>
                            )}
                            <div className="flex flex-col min-w-0 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs text-[#131b2e] truncate">
                                  {contact.name}
                                </span>
                                {contact.is3DReady && (
                                  <span
                                    className="px-1.5 py-0.2 rounded-md text-[9px] font-bold"
                                    style={{ backgroundColor: theme.light, color: theme.primary }}
                                  >
                                    3D Ready
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#434655] truncate">
                                {contact.subtitle}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Pin / Unpin Star Toggle */}
                            <button
                              onClick={(e) => handleToggleFavorite(contact.id, e)}
                              aria-label={contact.isFavorite ? `Unpin ${contact.name}` : `Pin ${contact.name} to Favorites`}
                              title={contact.isFavorite ? 'Unpin from Favorites' : 'Pin to Favorites'}
                              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition cursor-pointer ${
                                contact.isFavorite
                                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                  : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                              }`}
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined text-[18px]"
                                style={contact.isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                              >
                                star
                              </span>
                            </button>

                            {/* Voice Call Button */}
                            <button
                              onClick={() => handleInitiateCall(contact.name)}
                              aria-label={`Voice call ${contact.name}`}
                              className="w-9 h-9 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center active:scale-95 transition cursor-pointer"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">call</span>
                            </button>

                            {/* 3D Spatial Call Button */}
                            {contact.is3DReady && (
                              <button
                                onClick={() => handleInitiateCall(contact.name)}
                                aria-label={`3D Spatial call ${contact.name}`}
                                style={{ backgroundColor: theme.primary }}
                                className="w-9 h-9 rounded-full hover:opacity-90 text-white flex items-center justify-center active:scale-95 transition cursor-pointer shadow-xs"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  view_in_ar
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Alphabet Fast-Scroll Rail */}
          <div className="w-4 flex flex-col items-center justify-center py-2 select-none text-[10px] font-semibold text-slate-400 tracking-tight leading-4">
            {alphabet.map((char) => (
              <span
                key={char}
                onClick={() => setSearchQuery(char === '#' ? '' : char.toLowerCase())}
                style={lettersPresent.includes(char) ? { color: theme.primary } : {}}
                className={`cursor-pointer transition hover:opacity-80 ${
                  lettersPresent.includes(char) ? 'font-bold' : 'text-slate-300'
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Audio Tip Banner */}
        <div
          style={{ borderColor: theme.border, backgroundColor: theme.subtle }}
          className="w-full rounded-2xl p-3.5 flex items-center gap-3 border"
        >
          <div
            style={{ backgroundColor: theme.light, color: theme.primary }}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">spatial_audio</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#131b2e]">Looking for 3D Audio?</span>
            <span className="text-[11px] text-[#434655] leading-tight mt-0.5">
              Tap the 3D box icon next to any contact to position their voice anywhere around you
              in real time.
            </span>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 shadow-xl border border-slate-100 flex flex-col space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#131b2e]">Add Contact</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 font-medium">Name</label>
                <input
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full h-10 px-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">Phone Number</label>
                <input
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-10 px-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newContactName.trim()) {
                    triggerHaptic('success');
                    const newContact: Contact = {
                      id: `c-${Date.now()}`,
                      name: newContactName,
                      initials: newContactName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase(),
                      subtitle: `${newContactPhone || 'Mobile'} • 3D Ready`,
                      phone: newContactPhone || '+1 (555) 000-0000',
                      is3DReady: true,
                      isFavorite: true, // pin by default when adding new contact
                      typeCategory: 'all',
                    };
                    setContactsList((prev) => [newContact, ...prev]);
                    setNewContactName('');
                    setNewContactPhone('');
                    setShowAddModal(false);
                  }
                }}
                style={{ backgroundColor: theme.primary }}
                className="flex-1 py-2 text-xs font-semibold text-white rounded-xl hover:opacity-90"
              >
                Save & Pin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
