import { motion } from "framer-motion";
import { Volume2, X } from "lucide-react";
import type { DialogueContent } from "./dialogue";
import type { Lang } from "@/game/types";

interface Props {
  dialogue: DialogueContent;
  lang: Lang;
  onDismiss?: () => void;
}

export function SpeechBubble3D({ dialogue, lang, onDismiss }: Props) {
  const isShopkeeper = dialogue.speaker === "shopkeeper";

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(dialogue.text);
    u.lang = lang === "hi" ? "hi-IN" : "en-IN";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  return (
    <motion.div
      key={dialogue.speaker + dialogue.text}
      initial={{ scale: 0.85, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 6 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      style={{
        top: isShopkeeper ? "clamp(46px, 18%, 80px)" : "clamp(48px, 22%, 92px)",
        ...(isShopkeeper
          ? { right: "clamp(12px, 12%, 180px)" }
          : { left: "clamp(12px, 14%, 180px)" }),
      }}
      onClick={onDismiss}
      className="pointer-events-auto absolute z-20 w-max max-w-[210px] sm:max-w-[260px] select-none cursor-pointer"
      title={lang === "hi" ? "हटाने के लिए क्लिक करें" : "Click to dismiss"}
    >
      {/* Speech Bubble Container */}
      <div className="relative rounded-2xl border border-[#8b5a2b]/30 bg-[#fffdf8]/95 px-3 py-2 sm:px-3.5 sm:py-2.5 text-[#3d200e] shadow-[0_8px_25px_rgba(45,20,5,0.18)] backdrop-blur-md transition-transform hover:scale-[1.02]">
        {/* Header: Speaker Name Pill + Action Buttons */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 rounded-full bg-[#f4ebd9]/90 px-2 py-0.5 text-[11px] font-extrabold text-[#5c3317] border border-[#dfceb4]">
            <span className="text-xs">{dialogue.avatarEmoji}</span>
            <span className="truncate max-w-[95px] sm:max-w-[130px]">{dialogue.speakerName}</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio TTS Button */}
            <button
              onClick={speak}
              type="button"
              aria-label="Listen to dialogue"
              className="grid h-5 w-5 place-items-center rounded-full bg-amber-100/90 text-[#5c3317] hover:bg-amber-200 transition-colors"
            >
              <Volume2 className="h-3 w-3" />
            </button>

            {/* Dismiss Button */}
            {onDismiss && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
                type="button"
                aria-label="Close dialogue"
                className="grid h-5 w-5 place-items-center rounded-full text-[#8b5a2b]/60 hover:text-[#5c3317] hover:bg-black/5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Dialogue Text */}
        <p className="mt-1 font-display text-xs sm:text-[13px] font-extrabold leading-snug tracking-tight text-[#3d200e]">
          {dialogue.text}
        </p>

        {/* Directional Speech Pointer */}
        {isShopkeeper ? (
          // Shopkeeper bubble sits on upper-right, pointer angles down-left toward shopkeeper
          <>
            <div className="absolute -bottom-2 left-6 h-0 w-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-[#fffdf8]" />
            <div className="absolute -bottom-2.5 left-6 -z-10 h-0 w-0 border-x-[8px] border-x-transparent border-t-[9px] border-t-[#8b5a2b]/35" />
          </>
        ) : (
          // Customer bubble sits on upper-left, pointer angles down-right toward customer
          <>
            <div className="absolute -bottom-2 right-8 h-0 w-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-[#fffdf8]" />
            <div className="absolute -bottom-2.5 right-8 -z-10 h-0 w-0 border-x-[8px] border-x-transparent border-t-[9px] border-t-[#8b5a2b]/35" />
          </>
        )}
      </div>
    </motion.div>
  );
}

