"use client";

import React, { useRef } from "react";

export type ToneType = "flirty" | "savage" | "witty" | "chill" | "bold";

export interface ToneOption {
  id: ToneType;
  label: string;
  emoji: string;
  tagline: string;
}

export const TONE_OPTIONS: ToneOption[] = [
  {
    id: "flirty",
    label: "Flirty",
    emoji: "🔥",
    tagline: "Warm & Magnetic",
  },
  {
    id: "savage",
    label: "Savage / Roast",
    emoji: "😈",
    tagline: "Playful Negging",
  },
  {
    id: "witty",
    label: "Witty",
    emoji: "🧠",
    tagline: "Clever & Sharp",
  },
  {
    id: "chill",
    label: "Chill",
    emoji: "🧊",
    tagline: "Casual & Low Pressure",
  },
  {
    id: "bold",
    label: "Bold",
    emoji: "🎯",
    tagline: "Direct Closer",
  },
];

interface ToneSelectorProps {
  selectedTone: ToneType;
  onSelectTone: (tone: ToneType) => void;
}

export default function ToneSelector({
  selectedTone,
  onSelectTone,
}: ToneSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex flex-col gap-2 my-2 select-none">
      {/* Label and Hint */}
      <div className="flex items-center justify-between px-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          Choose Your Vibe
        </label>
        <span className="text-[11px] text-zinc-500 font-medium">
          Swipe tones ➔
        </span>
      </div>

      {/* Horizontally scrollable snap row */}
      <div className="relative w-full">
        {/* Subtle horizontal gradient edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory py-2 px-1 no-scrollbar scroll-smooth"
        >
          {TONE_OPTIONS.map((item) => {
            const isActive = selectedTone === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTone(item.id)}
                className={`flex-shrink-0 snap-start inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer
                  ${
                    isActive
                      ? "rizz-gradient-bg text-white shadow-[0_0_22px_rgba(168,85,247,0.55),0_0_35px_rgba(236,72,153,0.35)] scale-[1.03] ring-1 ring-white/40"
                      : "bg-zinc-900/90 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-zinc-200 hover:bg-zinc-800/80"
                  }
                `}
              >
                <span className="text-sm select-none">{item.emoji}</span>
                <span className="tracking-tight whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Vibe Subtitle */}
      <div className="text-center">
        <span className="text-[11px] text-purple-300/80 font-medium tracking-wide">
          {TONE_OPTIONS.find((t) => t.id === selectedTone)?.tagline}
        </span>
      </div>
    </div>
  );
}
