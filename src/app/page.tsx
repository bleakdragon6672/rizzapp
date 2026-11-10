"use client";

import React, { useState } from "react";
import IPhoneFrame from "@/components/IPhoneFrame";
import Header from "@/components/Header";
import UploadCanvas from "@/components/UploadCanvas";
import ToneSelector, { ToneType } from "@/components/ToneSelector";
import GenerateButton from "@/components/GenerateButton";
import ResultsCards from "@/components/ResultsCards";
import Toast from "@/components/Toast";
import { RizzResponseItem } from "@/app/api/generate/route";
import { MessageSquareText, Sparkles, AlertCircle } from "lucide-react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [chatContext, setChatContext] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<ToneType>("flirty");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<RizzResponseItem[] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [engineInfo, setEngineInfo] = useState<{
    isLiveAI: boolean;
    name: string;
    keyDetected?: boolean;
    lastError?: string | null;
  } | null>(null);

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
          keyDetected: data.keyDetected,
          lastError: data.lastError,
        });

        if (data.isLiveAI) {
          showToast(`⚡ Generated live with ${data.engine}!`);
        } else if (data.lastError) {
          showToast("AI call failed, showing backup suggestions.");
        }
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
    }, 3000);
  };

  return (
    <IPhoneFrame>
      {/* 1. Header with iOS Status Bar & Stylized Brand Logo Badge */}
      <Header isLiveAI={engineInfo?.isLiveAI} />

      <main className="w-full flex flex-col gap-3.5 mt-2">
        {/* 2. Media Upload Canvas */}
        <section aria-label="Media Upload Canvas" className="w-full">
          <UploadCanvas
            image={image}
            onImageChange={handleImageChange}
            onClear={handleClearImage}
          />
        </section>

        {/* Chat Context / What they said */}
        <div className="w-full px-1">
          <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/10 flex flex-col gap-1.5 focus-within:border-purple-500/60 transition-colors">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-purple-300">
                <MessageSquareText className="w-3.5 h-3.5" />
                What did they say / their bio:
              </span>
              <span className="text-[10px] text-zinc-500 font-normal">
                {chatContext ? "Context active" : "Optional"}
              </span>
            </div>
            <textarea
              value={chatContext}
              onChange={(e) => setChatContext(e.target.value)}
              placeholder="e.g. 'She asked what my favorite Soho pizza spot is' or paste their bio..."
              rows={2}
              className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* 3. Vibe / Tone Selector (Horizontally scrollable chips) */}
        <section aria-label="Vibe and Tone Selector" className="w-full">
          <ToneSelector
            selectedTone={selectedTone}
            onSelectTone={(tone) => setSelectedTone(tone)}
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
          <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  engineInfo.isLiveAI
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-amber-400"
                }`}
              />
              <span>
                Engine:{" "}
                <strong className={engineInfo.isLiveAI ? "text-emerald-300" : "text-amber-300"}>
                  {engineInfo.name}
                </strong>
              </span>
            </div>

            {!engineInfo.isLiveAI && (
              <p className="text-[10px] text-zinc-500 text-center max-w-xs">
                {engineInfo.lastError
                  ? `Notice: ${engineInfo.lastError}`
                  : "Using backup engine. Did you redeploy Vercel after adding your API key?"}
              </p>
            )}
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
