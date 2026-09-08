import React, { useEffect, useRef, useState } from 'react';
import { ASSETS } from '../data/mockData';
import { triggerHaptic } from '../utils/haptics';
import { CallSignalLatencyMonitor } from './CallSignalLatencyMonitor';
import { useTheme } from '../context/ThemeContext';

interface ActiveCallScreenProps {
  callerName?: string;
  onEndCall: () => void;
}

export const ActiveCallScreen: React.FC<ActiveCallScreenProps> = ({
  callerName = 'Sarah Chen',
  onEndCall,
}) => {
  const { theme } = useTheme();
  const [seconds, setSeconds] = useState(870); // starts around 14:30
  const [is3DActive, setIs3DActive] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [pipSwapped, setPipSwapped] = useState(false);

  // 3D Orbit State
  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(0);
  const isDraggingRef = useRef(false);
  const startCoordRef = useRef({ x: 0, y: 0 });
  const currentAngleRef = useRef({ x: 0, y: 0 });

  // Call duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Drag handlers for 3D orbital perspective
  const handleStart = (clientX: number, clientY: number) => {
    if (!is3DActive) return;
    isDraggingRef.current = true;
    startCoordRef.current = {
      x: clientX - currentAngleRef.current.y,
      y: clientY - currentAngleRef.current.x,
    };
    if (showHint) setShowHint(false);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || !is3DActive) return;
    const rawY = (clientX - startCoordRef.current.x) * 0.12;
    const rawX = (clientY - startCoordRef.current.y) * -0.08;
    const clampedY = Math.max(-18, Math.min(18, rawY));
    const clampedX = Math.max(-10, Math.min(10, rawX));

    setAngleY(clampedY);
    setAngleX(clampedX);
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    currentAngleRef.current = { x: angleX, y: angleY };
  };

  const handleRecenter = () => {
    triggerHaptic('medium');
    setAngleX(0);
    setAngleY(0);
    currentAngleRef.current = { x: 0, y: 0 };
  };

  const handleEndCallWithHaptics = () => {
    triggerHaptic('callEnd');
    onEndCall();
  };

  const handleToggleMode = (mode3D: boolean) => {
    triggerHaptic('modeSwitch');
    setIs3DActive(mode3D);
    if (!mode3D) {
      handleRecenter();
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-[100dvh] bg-[#131b2e] flex flex-col justify-between overflow-hidden select-none"
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
    >
      {/* Full-screen 3D / Video Stream Surface */}
      <div
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
      >
        <img
          alt={`${callerName} video stream`}
          className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-200 ease-out will-change-transform"
          src={pipSwapped ? ASSETS.selfPip : ASSETS.callerStream}
          style={{
            transform: is3DActive
              ? `scale(1.08) perspective(900px) rotateY(${angleY}deg) rotateX(${angleX}deg) translateX(${angleY * -1.2}px)`
              : 'scale(1) rotateY(0deg) rotateX(0deg)',
          }}
        />

        {/* Top and Bottom Lighting Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70 pointer-events-none" />

        {/* Spatial Horizon Ring */}
        {is3DActive && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-35 transition-opacity duration-300">
            <div
              className="w-72 h-72 rounded-full border border-white/25 transition-transform duration-150"
              style={{
                transform: `perspective(600px) rotateY(${angleY * 1.5}deg) rotateX(${angleX * 1.5}deg) scale(${1 + Math.abs(angleY) / 100})`,
              }}
            />
          </div>
        )}
      </div>

      {/* Top HUD Area */}
      <header className="relative z-20 w-full pt-safe px-4 pt-3 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-start justify-between w-full">
          {/* Caller Name & Timer Pill */}
          <div className="pointer-events-auto flex items-center gap-2.5 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-full shadow-md border border-white/30">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: theme.primary }}
            />
            <div className="flex flex-col pr-1">
              <span className="text-xs font-semibold text-[#131b2e] leading-tight">
                {callerName}
              </span>
              <span className="text-[11px] text-[#434655] leading-tight font-mono">
                {formatTime(seconds)}
              </span>
            </div>
          </div>

          {/* Right HUD Controls: 3D Mode Indicator & PiP */}
          <div className="pointer-events-auto flex items-start gap-2">
            {/* 3D Spatial Indicator Pill */}
            <div className="flex items-center gap-1 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-white/30">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{
                  color: theme.primary,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                view_in_ar
              </span>
              <span className="text-xs font-bold" style={{ color: theme.primary }}>
                {is3DActive ? '3D' : '2D'}
              </span>
            </div>

            {/* Floating Self PiP Tile */}
            <div
              onClick={() => {
                triggerHaptic('light');
                setPipSwapped(!pipSwapped);
              }}
              className="relative w-[68px] h-[92px] rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 bg-slate-200 cursor-pointer active:scale-95 transition-transform"
              title="Tap to switch view"
            >
              <img
                alt="Self preview"
                className="w-full h-full object-cover"
                src={pipSwapped ? ASSETS.callerStream : ASSETS.selfPip}
              />
              <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs rounded-full p-0.5 leading-none flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[12px]">
                  flip_camera_ios
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Signal Strength & Latency Monitor HUD Overlay */}
        <div className="flex items-center justify-start mt-0.5 pointer-events-none">
          <CallSignalLatencyMonitor />
        </div>
      </header>

      {/* Center Floating Gesture Hint */}
      {showHint && (
        <div className="relative z-10 w-full flex justify-center pointer-events-none mt-2 transition-all duration-300">
          <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/40 animate-bounce">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ color: theme.primary }}
            >
              360
            </span>
            <span className="text-xs font-medium text-[#131b2e]">Drag to rotate</span>
            <button
              onClick={() => setShowHint(false)}
              aria-label="Dismiss hint"
              className="ml-0.5 text-[#434655] hover:text-[#131b2e] flex items-center justify-center rounded-full p-0.5"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls Region */}
      <footer className="relative z-20 w-full px-4 pb-safe pb-4 flex flex-col items-center gap-3 pointer-events-none mt-auto">
        {/* 2D / 3D Mode Pill Switch */}
        <div
          className="pointer-events-auto bg-white/90 backdrop-blur-md p-1 rounded-full shadow-md border border-white/30 flex items-center gap-1"
          role="tablist"
        >
          <button
            onClick={() => handleToggleMode(false)}
            className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 ${
              !is3DActive
                ? 'font-semibold bg-[#131b2e] text-white shadow-xs'
                : 'font-medium text-[#434655] hover:text-[#131b2e]'
            }`}
            type="button"
          >
            2D
          </button>
          <button
            onClick={() => handleToggleMode(true)}
            style={is3DActive ? { backgroundColor: theme.primary } : {}}
            className={`px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all duration-200 ${
              is3DActive
                ? 'font-semibold text-white shadow-xs'
                : 'font-medium text-[#434655] hover:text-[#131b2e]'
            }`}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              layers
            </span>
            3D Live
          </button>
        </div>

        {/* Main Bottom Action Floating Toolbar */}
        <div className="pointer-events-auto w-full max-w-[370px] bg-white/95 backdrop-blur-xl rounded-full shadow-2xl px-4 py-2.5 flex items-center justify-between border border-white/40">
          {/* Microphone Mute Toggle */}
          <button
            onClick={() => {
              triggerHaptic('light');
              setIsMicMuted(!isMicMuted);
            }}
            aria-label="Toggle Microphone"
            className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-xs ${
              isMicMuted
                ? 'bg-[#ffdad6] text-[#ba1a1a]'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMicMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          {/* Camera Switch Toggle */}
          <button
            onClick={() => {
              triggerHaptic('light');
              setPipSwapped(!pipSwapped);
            }}
            aria-label="Flip Camera"
            className="w-12 h-12 rounded-full bg-[#f2f3ff] text-[#131b2e] flex items-center justify-center active:scale-90 transition-transform shadow-xs hover:bg-[#eaedff]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">cameraswitch</span>
          </button>

          {/* Speakerphone Audio Toggle */}
          <button
            onClick={() => {
              triggerHaptic('light');
              setIsSpeakerMuted(!isSpeakerMuted);
            }}
            aria-label="Toggle Speaker"
            className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-xs ${
              isSpeakerMuted
                ? 'bg-[#ffdad6] text-[#ba1a1a]'
                : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isSpeakerMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Recenter Field of View */}
          <button
            onClick={handleRecenter}
            aria-label="Recenter View"
            title="Recenter 3D View"
            style={{ color: theme.primary }}
            className="w-12 h-12 rounded-full bg-[#f2f3ff] flex items-center justify-center active:scale-90 transition-transform shadow-xs hover:bg-[#eaedff]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">
              filter_tilt_shift
            </span>
          </button>

          {/* End Call Button (Tactile Haptic Crimson Trigger) */}
          <button
            onClick={handleEndCallWithHaptics}
            aria-label="End Call"
            className="w-12 h-12 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center active:scale-90 transition-transform shadow-md hover:opacity-95 cursor-pointer ring-2 ring-rose-500/20"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              call_end
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
};
