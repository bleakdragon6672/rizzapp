"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-950/95 border border-purple-500/50 shadow-[0_8px_30px_rgba(168,85,247,0.4)] backdrop-blur-xl text-white text-xs font-semibold">
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
        <span className="tracking-wide">{message}</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
      </div>
    </div>
  );
}
