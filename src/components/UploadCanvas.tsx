"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, RefreshCw, Image as ImageIcon, Flame, Camera, Sparkles } from "lucide-react";
import { SAMPLE_CHATS, SampleChat } from "@/lib/sampleScreenshots";

interface UploadCanvasProps {
  image: string | null;
  onImageChange: (image: string | null, chatContextText?: string) => void;
  onClear: () => void;
}

export default function UploadCanvas({
  image,
  onImageChange,
  onClear,
}: UploadCanvasProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Support pasting image from clipboard directly
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (const item of Array.from(e.clipboardData.items)) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  onImageChange(event.target.result as string, "Pasted chat screenshot");
                }
              };
              reader.readAsDataURL(file);
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onImageChange]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageChange(e.target.result as string, `Uploaded: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {!image ? (
        /* Empty Upload Canvas: Centered rounded card with dashed neon/gray border */
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full relative group cursor-pointer transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center
            ${
              isDragging
                ? "border-2 border-dashed border-fuchsia-400 bg-purple-950/30 scale-[1.01] shadow-[0_0_25px_rgba(217,70,239,0.35)]"
                : "border-2 border-dashed border-zinc-700/80 hover:border-purple-500/80 bg-zinc-900/60 hover:bg-zinc-900/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            }
          `}
        >
          {/* Subtle neon ambient backlight */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-600/15 via-pink-600/10 to-transparent blur-xl -z-10 group-hover:from-purple-600/30 group-hover:via-pink-600/20 transition-all duration-500 opacity-75" />

          {/* Upload Icon with Glowing Aura */}
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Upload className="w-7 h-7 text-purple-400 group-hover:text-pink-400 transition-colors" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
            Drop your chat screenshot here
          </h3>
          <p className="text-xs text-zinc-400 max-w-xs mb-3 font-normal leading-relaxed">
            Upload from Tinder, Hinge, Bumble, or iMessage. Or tap to browse your camera roll.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/90 border border-white/5 text-[11px] text-zinc-300">
            <kbd className="px-1.5 py-0.5 bg-black/60 rounded text-[10px] font-mono text-zinc-400 border border-white/10">
              ⌘V
            </kbd>
            <span>paste screenshot directly</span>
          </div>

          {/* Quick Sample Screenshots Selector */}
          <div
            className="mt-6 w-full pt-4 border-t border-white/5 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-pink-500" />
              Or test with sample chat
            </span>

            <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
              {SAMPLE_CHATS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onImageChange(sample.dataUrl, sample.sampleMessage)}
                  className="px-2.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-purple-900/40 border border-white/5 hover:border-purple-500/50 text-left transition-all text-xs group/btn flex flex-col justify-between"
                >
                  <span className="font-semibold text-zinc-200 group-hover/btn:text-white truncate">
                    {sample.name}
                  </span>
                  <span className="text-[10px] text-purple-400/90 mt-0.5">
                    {sample.app} Match
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Once uploaded: iPhone-like framed container with quick Delete / Replace icon */
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] rounded-[36px] p-2 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.2)] border border-white/15">
            {/* Outer iPhone Titanium bezel styling */}
            <div className="relative w-full overflow-hidden rounded-[28px] bg-black border border-black/80 aspect-[9/15] flex flex-col">
              
              {/* iPhone Hardware Top Bar: Notch / Speaker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 mr-2" />
                <div className="w-10 h-1 rounded-full bg-zinc-800" />
              </div>

              {/* Action Icons in the Top-Right: Delete and Replace */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                <button
                  type="button"
                  title="Replace screenshot"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-full bg-black/70 hover:bg-purple-600/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-90"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Delete screenshot"
                  onClick={onClear}
                  className="p-1.5 rounded-full bg-black/70 hover:bg-rose-600/90 text-white backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-90"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Upload Status Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-purple-500/40 text-[11px] font-medium text-purple-200 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Chat Screenshot Ready
                </div>
              </div>

              {/* Screenshot Preview Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Uploaded dating chat preview"
                className="w-full h-full object-cover object-top select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Quick Action under the phone */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-zinc-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Replace with another screenshot
            </button>
            <span className="text-zinc-600">•</span>
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-zinc-400 hover:text-rose-400 font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
