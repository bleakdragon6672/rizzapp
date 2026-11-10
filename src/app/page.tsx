"use client";

import React, { useState, useEffect } from "react";
import IPhoneFrame from "@/components/IPhoneFrame";
import Header from "@/components/Header";
import UploadCanvas from "@/components/UploadCanvas";
import ToneSelector, { ToneType } from "@/components/ToneSelector";
import GenerateButton from "@/components/GenerateButton";
import ResultsCards from "@/components/ResultsCards";
import Toast from "@/components/Toast";
import { RizzResponseItem } from "@/app/api/generate/route";
import { MessageSquareText, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [chatContext, setChatContext] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<ToneType>("flirty");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<RizzResponseItem[] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showManualText, setShowManualText] = useState<boolean>(false);
  const [engineInfo, setEngineInfo] = useState<{ isLiveAI: boolean; name: string } | null>(null);

  const handleImageChange = (newImage: string | null, contextText?: string) => {
    setImage(newImage);
    if (contextText) {
      setChatContext(contextText);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setChatContext("");
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tone: selectedTone,
          image,
          text: chatContext,
        }),
      });

      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setEngineInfo({
          isLiveAI: data.isLiveAI ?? false,
          name: data.engine || "RIZZ AI",
        });
      }
    } catch (err) {
      console.error("Failed to generate rizz:", err);
      showToast("Generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <IPhoneFrame>
      {/* 1. Header with iOS Status Bar & Stylized Brand Logo Badge */}
      <Header isLiveAI={engineInfo?.isLiveAI} />

      <main className="w-full flex flex-col gap-4 mt-2">
        {/* 2. Media Upload Canvas */}
        <section aria-label="Media Upload Canvas" className="w-full">
          <UploadCanvas
            image={image}
            onImageChange={handleImageChange}
            onClear={handleClearImage}
          />
        </section>

        {/* Optional Manual Context Snippet Toggle */}
        <div className="w-full px-1">
          <button
            type="button"
            onClick={() => setShowManualText(!showManualText)}
            className="text-[11px] text-zinc-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-purple-400" />
            <span>{showManualText ? "Hide optional text prompt" : "+ Add text context / what they said"}</span>
          </button>

          {showManualText && (
            <div className="mt-2 animate-fadeIn">
              <textarea
                value={chatContext}
                onChange={(e) => setChatContext(e.target.value)}
                placeholder="e.g. 'She asked what my favorite coffee spot in Williamsburg is, keep it flirty and confident...'"
                rows={2}
                className="w-full p-3 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          )}
        </div>

        {/* 3. Vibe / Tone Selector (Horizontally scrollable chips) */}
        <section aria-label="Vibe and Tone Selector" className="w-full">
          <ToneSelector
            selectedTone={selectedTone}
            onSelectTone={(tone) => {
              setSelectedTone(tone);
              // If results already exist, optionally generate fresh in that tone
              if (suggestions) {
                // Keep smooth flow
              }
            }}
          />
        </section>

        {/* 4. Action Button: Full-width, high-radius pill button */}
        <section aria-label="Action Button" className="w-full">
          <GenerateButton
            onClick={handleGenerate}
            isLoading={isLoading}
            hasScreenshot={!!image}
          />
        </section>

        {/* Engine status indicator */}
        {engineInfo && (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Generated with: <strong className="text-zinc-200">{engineInfo.name}</strong></span>
          </div>
        )}

        {/* 5. Generated Results Cards */}
        {suggestions && (
          <section aria-label="Generated Results" className="w-full">
            <ResultsCards
              suggestions={suggestions}
              onRegenerate={handleGenerate}
              isLoading={isLoading}
              onCopySuccess={(text) => {
                showToast("Copied to clipboard! Ready to send.");
              }}
            />
          </section>
        )}
      </main>

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </IPhoneFrame>
  );
}
