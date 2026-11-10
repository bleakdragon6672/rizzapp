"use client";

import React from "react";
import { Sparkles, Loader2, Zap } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  hasScreenshot?: boolean;
}

export default function GenerateButton({
  onClick,
  isLoading,
  disabled = false,
  hasScreenshot = false,
}: GenerateButtonProps) {
  return (
    <div className="w-full relative my-2 group">
      {/* Outer ambient pulsing glow aura */}
      <div
        className={`absolute -inset-1 rounded-full rizz-gradient-bg opacity-70 blur-lg transition-all duration-500
          ${isLoading ? "opacity-100 animate-pulse-glow" : "group-hover:opacity-100 group-hover:blur-xl"}
          ${disabled ? "opacity-20 pointer-events-none" : ""}
        `}
      />

      {/* Primary Pill Action Button */}
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`relative w-full py-4 px-6 rounded-full rizz-gradient-bg text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] shadow-[0_4px_25px_rgba(168,85,247,0.45)] border border-white/20 select-none
          ${
            disabled
              ? "opacity-60 cursor-not-allowed"
              : "cursor-pointer hover:shadow-[0_0_35px_rgba(236,72,153,0.65)] hover:brightness-110"
          }
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white" />
            <span className="animate-pulse tracking-tight">
              Cooking up the rizz...
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-white/90 animate-spin" style={{ animationDuration: "5s" }} />
            <span className="drop-shadow-sm uppercase tracking-wider text-sm font-black">
              Generate Rizz
            </span>
            <Zap className="w-4 h-4 fill-white text-white drop-shadow-sm" />
          </>
        )}
      </button>

      {/* Micro-hint under button */}
      <div className="mt-1.5 text-center">
        <p className="text-[10px] text-zinc-500 font-medium">
          {hasScreenshot
            ? "⚡ Multimodal screenshot analysis ready"
            : "💡 Tip: Drop a chat screenshot for hyper-personalized openers"}
        </p>
      </div>
    </div>
  );
}
