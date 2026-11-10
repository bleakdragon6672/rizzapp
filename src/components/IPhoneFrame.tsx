"use client";

import React, { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export default function IPhoneFrame({ children }: IPhoneFrameProps) {
  const [deviceMode, setDeviceMode] = useState<"phone" | "adaptive">("phone");

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-purple-900/20 via-pink-900/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[300px] bg-purple-950/20 blur-[120px] pointer-events-none -z-10" />

      {/* Desktop Top Toolbar: View switcher & info */}
      <div className="hidden lg:flex w-full max-w-4xl items-center justify-between px-6 py-3 mt-2 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            RIZZ – AI Dating Assistant (iOS Replica)
          </span>
          <span className="text-[10px] text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            v2.4 App Store Match
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-900/90 rounded-xl p-1 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setDeviceMode("phone")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                deviceMode === "phone"
                  ? "rizz-gradient-bg text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              iPhone 16 Pro View
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode("adaptive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                deviceMode === "adaptive"
                  ? "rizz-gradient-bg text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Expanded View
            </button>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      {deviceMode === "phone" ? (
        <div className="w-full flex justify-center py-0 lg:py-6 px-0 sm:px-4">
          {/* Realistic iPhone 16 Pro Container on desktop, full-width on mobile */}
          <div className="relative w-full max-w-[430px] lg:rounded-[54px] lg:p-3.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 lg:shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.2)] lg:border lg:border-white/15">
            {/* Inner screen border */}
            <div className="relative w-full bg-black lg:rounded-[44px] overflow-hidden min-h-screen lg:min-h-[880px] flex flex-col justify-between border border-black shadow-inner">
              {/* iPhone screen glass reflections */}
              <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl z-40" />

              <div className="flex-1 w-full px-4 sm:px-5 pb-8 flex flex-col">
                {children}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-full py-2 flex justify-center select-none bg-black">
                <div className="w-36 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Adaptive Expanded View */
        <div className="w-full max-w-lg px-4 py-4 min-h-screen flex flex-col justify-between">
          <div className="flex-1 w-full">{children}</div>
          <div className="w-full py-4 flex justify-center select-none">
            <div className="w-36 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
