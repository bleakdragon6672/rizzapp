"use strict";
"use client";

import React from "react";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";

interface HeaderProps {
  isLiveAI?: boolean;
}

export default function Header({ isLiveAI }: HeaderProps) {
  return (
    <header className="relative w-full pt-2 pb-4 flex flex-col items-center select-none">
      {/* iOS Status Bar Simulation */}
      <div className="w-full flex items-center justify-between px-6 py-1 text-xs text-zinc-400 font-medium">
        <span className="font-semibold tracking-tight text-white">9:41</span>
        
        {/* Dynamic Island pill */}
        <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center gap-1.5 px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400/90 animate-pulse" />
          <span className="text-[10px] text-zinc-300 font-mono tracking-wider">RIZZ.AI</span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-300">
          {/* Signal bars */}
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-white rounded-full"></span>
            <span className="w-0.5 h-1.5 bg-white rounded-full"></span>
            <span className="w-0.5 h-2 bg-white rounded-full"></span>
            <span className="w-0.5 h-2.5 bg-white rounded-full"></span>
          </div>
          {/* 5G / Wifi */}
          <span className="text-[10px] font-semibold">5G</span>
          {/* Battery */}
          <div className="w-5 h-2.5 rounded-sm border border-zinc-400 p-0.5 flex items-center">
            <div className="w-full h-full bg-white rounded-xs"></div>
          </div>
        </div>
      </div>

      {/* Main RIZZ Logo / Badge Header */}
      <div className="mt-4 flex flex-col items-center text-center">
        {/* Glowing Badge */}
        <div className="group relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full rizz-card border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.25)] mb-2.5 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-white bg-clip-text text-transparent uppercase tracking-wider text-[11px] font-bold">
            #1 AI Dating Wingman
          </span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-pink-500" />
        </div>

        {/* Wordmark Logo */}
        <div className="relative flex items-center justify-center gap-1">
          <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_15px_rgba(168,85,247,0.4)]">
            RIZZ
          </h1>
          <div className="relative -top-2">
            <span className="inline-flex items-center justify-center p-1 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)]">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </span>
          </div>
        </div>

        <p className="mt-0.5 text-xs text-zinc-400 font-medium tracking-wide">
          Screenshot to Instant Game • Never Get Left on Read
        </p>
      </div>
    </header>
  );
}
