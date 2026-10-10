import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { LevelDef, Progress } from "@/game/types";
import { isUnlocked } from "@/game/engine";
import { useSettings } from "./settings";

interface Props {
  levels: LevelDef[];
  progress: Progress;
  selected: number;
  onSelect: (index: number) => void;
}

export function LevelMap({ levels, progress, selected, onSelect }: Props) {
  const { lang, tr } = useSettings();
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
      {levels.map((lv, i) => {
        const open = isUnlocked(progress, i);
        const stars = progress.stars[i] ?? 0;
        const isSel = selected === i;
        return (
          <motion.li
            key={lv.number}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={i % 2 ? "sm:translate-y-4" : ""}
          >
            <button
              disabled={!open}
              onClick={() => onSelect(i)}
              aria-pressed={isSel}
              aria-label={`${tr("level")} ${lv.number}: ${lv.title[lang]}${open ? "" : ` (${tr("locked")})`}`}
              className={`group relative flex w-full flex-col items-center gap-1 rounded-3xl border-4 p-3 text-center transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange ${
                open ? "bg-paper shadow-wood hover:-translate-y-1" : "bg-cream/60 border-dashed"
              } ${isSel ? "border-leaf ring-4 ring-sun" : open ? "border-wood-light" : "border-border"}`}
            >
              <span
                className={`absolute -top-3 left-3 rounded-full px-2 text-sm font-extrabold ${open ? "bg-wood text-primary-foreground" : "bg-border text-muted-foreground"}`}
              >
                {lv.number}
              </span>
              <span className={`text-4xl ${open ? "" : "grayscale opacity-50"}`} aria-hidden>
                {lv.icon}
              </span>
              <span
                className={`text-sm font-extrabold leading-tight ${open ? "text-wood-dark" : "text-muted-foreground"}`}
              >
                {lv.title[lang]}
              </span>
              {open ? (
                <span className="text-base" aria-hidden>
                  {[0, 1, 2].map((s) => (
                    <span key={s} className={s < stars ? "" : "opacity-25 grayscale"}>
                      ⭐
                    </span>
                  ))}
                </span>
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" aria-hidden />
              )}
            </button>
          </motion.li>
        );
      })}
    </ol>
  );
}
