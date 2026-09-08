import React, { useEffect, useState } from 'react';
import { triggerHaptic } from '../utils/haptics';

export interface TelemetryStats {
  latency: number; // in ms
  fps: number;
  bitrate: number; // in Mbps
  packetLoss: number; // in %
  jitter: number; // in ms
  meshQuality: string;
  signalBars: number; // 1 to 4
  connectionType: '5G Ultra' | 'Wi-Fi 6E' | '5G Spatial';
}

export const CallSignalLatencyMonitor: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState<TelemetryStats>({
    latency: 24,
    fps: 60,
    bitrate: 18.4,
    packetLoss: 0.0,
    jitter: 1.1,
    meshQuality: 'Optimal 3D',
    signalBars: 4,
    connectionType: '5G Spatial',
  });

  const [history, setHistory] = useState<number[]>([23, 25, 24, 26, 22, 24, 25, 24]);

  // Periodic telemetry fluctuation simulating live 3D volumetric stream monitor
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        // Minor natural variance
        const latencyDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const nextLatency = Math.max(18, Math.min(38, prev.latency + latencyDelta));
        
        const bitrateDelta = (Math.random() * 0.8 - 0.4);
        const nextBitrate = +(Math.max(14.2, Math.min(22.5, prev.bitrate + bitrateDelta))).toFixed(1);

        const jitterDelta = (Math.random() * 0.4 - 0.2);
        const nextJitter = +(Math.max(0.6, Math.min(2.4, prev.jitter + jitterDelta))).toFixed(1);

        setHistory((hist) => [...hist.slice(-9), nextLatency]);

        return {
          ...prev,
          latency: nextLatency,
          bitrate: nextBitrate,
          jitter: nextJitter,
          fps: nextLatency > 34 ? 59 : 60,
          meshQuality: nextLatency > 32 ? 'High Fidelity' : 'Optimal 3D',
        };
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const getQualityColor = () => {
    if (stats.latency <= 28) return 'text-emerald-500 bg-emerald-500';
    if (stats.latency <= 45) return 'text-amber-500 bg-amber-500';
    return 'text-rose-500 bg-rose-500';
  };

  const toggleExpand = () => {
    triggerHaptic('light');
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="pointer-events-auto transition-all duration-300">
      {/* Compact HUD Pill */}
      {!isExpanded ? (
        <button
          onClick={toggleExpand}
          className="flex items-center gap-2 bg-black/60 hover:bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg text-white text-[11px] font-mono tracking-tight transition-all active:scale-95 cursor-pointer"
          title="Click to view full 3D stream telemetry"
        >
          {/* Signal 4-Bar Icon */}
          <div className="flex items-end gap-[2px] h-3.5 pr-0.5" aria-label="Signal Strength">
            <span className={`w-[2.5px] rounded-xs ${stats.signalBars >= 1 ? 'h-1.5 bg-emerald-400' : 'h-1.5 bg-white/30'}`} />
            <span className={`w-[2.5px] rounded-xs ${stats.signalBars >= 2 ? 'h-2 bg-emerald-400' : 'h-2 bg-white/30'}`} />
            <span className={`w-[2.5px] rounded-xs ${stats.signalBars >= 3 ? 'h-2.5 bg-emerald-400' : 'h-2.5 bg-white/30'}`} />
            <span className={`w-[2.5px] rounded-xs ${stats.signalBars >= 4 ? 'h-3.5 bg-emerald-400' : 'h-3.5 bg-white/30'}`} />
          </div>

          {/* Latency & Pulse */}
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${getQualityColor().split(' ')[1]} animate-ping`} />
            <span className="font-semibold">{stats.latency}ms</span>
          </div>

          <span className="text-white/40">•</span>
          <span className="text-white/80">{stats.connectionType}</span>

          <span className="material-symbols-outlined text-white/60 text-[14px] ml-0.5">
            insights
          </span>
        </button>
      ) : (
        /* Detailed Expanded Telemetry Overlay Card */
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/25 rounded-2xl p-3.5 shadow-2xl text-white w-[290px] animate-scale-up space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              {/* Signal Bars */}
              <div className="flex items-end gap-[2px] h-3.5">
                <span className="w-[2.5px] h-1.5 bg-emerald-400 rounded-xs" />
                <span className="w-[2.5px] h-2 bg-emerald-400 rounded-xs" />
                <span className="w-[2.5px] h-2.5 bg-emerald-400 rounded-xs" />
                <span className="w-[2.5px] h-3.5 bg-emerald-400 rounded-xs" />
              </div>
              <span className="text-xs font-bold text-white tracking-tight">3D Stream Quality</span>
            </div>

            <button
              onClick={toggleExpand}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Latency RTT */}
            <div className="bg-white/5 rounded-xl p-2 border border-white/10 flex flex-col">
              <span className="text-[10px] text-white/60 font-sans">Roundtrip Latency</span>
              <div className="flex items-baseline gap-1 mt-0.5 font-mono">
                <span className="text-base font-bold text-emerald-400">{stats.latency}</span>
                <span className="text-[10px] text-emerald-400/80">ms</span>
              </div>
            </div>

            {/* Volumetric Bitrate */}
            <div className="bg-white/5 rounded-xl p-2 border border-white/10 flex flex-col">
              <span className="text-[10px] text-white/60 font-sans">Depth Bitrate</span>
              <div className="flex items-baseline gap-1 mt-0.5 font-mono">
                <span className="text-base font-bold text-blue-400">{stats.bitrate}</span>
                <span className="text-[10px] text-blue-400/80">Mbps</span>
              </div>
            </div>

            {/* Frame Rate */}
            <div className="bg-white/5 rounded-xl p-2 border border-white/10 flex flex-col">
              <span className="text-[10px] text-white/60 font-sans">Volumetric Mesh</span>
              <div className="flex items-baseline gap-1 mt-0.5 font-mono">
                <span className="text-base font-bold text-violet-400">{stats.fps}</span>
                <span className="text-[10px] text-violet-400/80">FPS</span>
              </div>
            </div>

            {/* Jitter & Loss */}
            <div className="bg-white/5 rounded-xl p-2 border border-white/10 flex flex-col">
              <span className="text-[10px] text-white/60 font-sans">Jitter / Loss</span>
              <div className="flex items-baseline gap-1 mt-0.5 font-mono">
                <span className="text-base font-bold text-cyan-400">{stats.jitter}</span>
                <span className="text-[10px] text-cyan-400/80">ms (0%)</span>
              </div>
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="bg-white/5 rounded-xl p-2 border border-white/10">
            <div className="flex items-center justify-between text-[10px] text-white/60 mb-1.5 font-sans">
              <span>Latency Stability</span>
              <span className="text-emerald-400 font-mono font-semibold">{stats.meshQuality}</span>
            </div>
            <div className="h-7 flex items-end gap-1.5 px-1">
              {history.map((val, idx) => {
                const heightPercent = Math.min(100, Math.max(25, ((val - 15) / 25) * 100));
                return (
                  <div
                    key={idx}
                    style={{ height: `${heightPercent}%` }}
                    className="flex-1 bg-emerald-400/80 rounded-t-[2px] transition-all duration-300"
                    title={`${val}ms`}
                  />
                );
              })}
            </div>
          </div>

          {/* Status footer */}
          <div className="flex items-center justify-between text-[10px] text-white/70 pt-0.5 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Binaural Spatial Sync: OK
            </span>
            <span className="text-white/50">{stats.connectionType}</span>
          </div>
        </div>
      )}
    </div>
  );
};
