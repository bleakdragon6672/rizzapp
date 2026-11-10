"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, Flame, ShieldAlert, ArrowRight, RotateCw } from "lucide-react";
import confetti from "canvas-confetti";
import { RizzResponseItem } from "@/app/api/generate/route";

interface ResultsCardsProps {
  suggestions: RizzResponseItem[];
  onRegenerate: () => void;
  isLoading: boolean;
  onCopySuccess: (text: string) => void;
}

export default function ResultsCards({
  suggestions,
  onRegenerate,
  isLoading,
  onCopySuccess,
}: ResultsCardsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"stacked" | "swipeable">("stacked");

  const handleCopy = async (item: RizzResponseItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.text);
      setCopiedId(item.id);
      onCopySuccess(item.text);

      // Trigger celebratory micro-confetti
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#A855F7", "#EC4899", "#8B5CF6", "#F43F5E", "#FFFFFF"],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        setCopiedId((prev) => (prev === item.id ? null : prev));
      }, 2500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3 my-4 select-none animate-fadeIn">
      {/* Header bar with Mode Switcher & Regenerate */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Top Rizzponses
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">
            Tap card to copy
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle: Stacked vs Swipeable */}
          <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-white/10 text-[10px]">
            <button
              type="button"
              onClick={() => setViewMode("stacked")}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                viewMode === "stacked"
                  ? "bg-purple-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("swipeable")}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                viewMode === "swipeable"
                  ? "bg-purple-600 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Swipe
            </button>
          </div>

          {/* Regenerate Button */}
          <button
            type="button"
            title="Generate new variations"
            disabled={isLoading}
            onClick={onRegenerate}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-purple-300 transition-colors disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mode 1: Stacked View */}
      {viewMode === "stacked" && (
        <div className="flex flex-col gap-3.5">
          {suggestions.map((item, idx) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id || idx}
                onClick={(e) => handleCopy(item, e)}
                className={`relative group rounded-3xl p-5 rizz-card transition-all duration-300 cursor-pointer overflow-hidden
                  hover:scale-[1.01] hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)]
                  ${
                    isCopied
                      ? "ring-2 ring-emerald-400/80 border-emerald-400/50 bg-emerald-950/20"
                      : "border border-white/10"
                  }
                `}
              >
                {/* Glowing border sheen */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                {/* Card Header: Category Badge & Score */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold rizz-gradient-bg text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      {item.vibe}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {item.score}
                    </span>
                    {/* Copy Icon Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCopy(item, e)}
                      className={`p-1.5 rounded-full transition-all duration-200 ${
                        isCopied
                          ? "bg-emerald-500 text-black scale-110 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                          : "bg-zinc-800 text-zinc-300 group-hover:text-white group-hover:bg-purple-600"
                      }`}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Reply Text */}
                <p className="text-sm sm:text-base font-semibold text-white tracking-normal leading-relaxed mb-3 pr-2">
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Delivery Tip */}
                <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-400/90 truncate mr-2">
                    <Flame className="w-3 h-3 text-pink-400 flex-shrink-0" />
                    <span className="truncate">{item.deliveryTip}</span>
                  </span>
                  <span className="text-[10px] font-bold text-purple-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                    {isCopied ? "Copied! ✓" : "Tap to copy"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Swipeable / Carousel View */}
      {viewMode === "swipeable" && (
        <div className="w-full flex flex-col gap-2">
          {/* Card Carousel Tabs */}
          <div className="flex gap-2 justify-center mb-1">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === idx
                    ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                Option {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Card */}
          {suggestions[activeTab] && (
            <div
              onClick={(e) => handleCopy(suggestions[activeTab], e)}
              className={`relative rounded-3xl p-6 rizz-card transition-all duration-300 cursor-pointer overflow-hidden border
                hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(168,85,247,0.3)]
                ${
                  copiedId === suggestions[activeTab].id
                    ? "ring-2 ring-emerald-400/80 border-emerald-400/50 bg-emerald-950/20"
                    : "border-white/10"
                }
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold rizz-gradient-bg text-white shadow-md">
                  {suggestions[activeTab].category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {suggestions[activeTab].score}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all ${
                      copiedId === suggestions[activeTab].id
                        ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                        : "bg-zinc-800 text-white"
                    }`}
                  >
                    {copiedId === suggestions[activeTab].id ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              <p className="text-base sm:text-lg font-bold text-white tracking-tight leading-relaxed mb-4">
                &ldquo;{suggestions[activeTab].text}&rdquo;
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Flame className="w-3.5 h-3.5 text-pink-400" />
                  {suggestions[activeTab].deliveryTip}
                </span>
                <span className="font-bold text-purple-400">
                  {copiedId === suggestions[activeTab].id ? "Copied!" : "1-Tap Copy"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
