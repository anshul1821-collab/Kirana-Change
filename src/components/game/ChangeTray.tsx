import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { DenomId, Denomination, TotalState, Tray } from "@/game/types";
import { CurrencyPiece } from "./Currency";
import { useSettings } from "./settings";

interface TrayProps {
  tray: Tray;
  denominations: Denomination[];
  onDrop: (id: DenomId) => void;
  onRemove: (id: DenomId) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function ChangeTray({ tray, denominations, onDrop, onRemove, onClear, disabled }: TrayProps) {
  const { tr } = useSettings();
  const [over, setOver] = useState(false);
  const entries = denominations.filter((d) => (tray[d.id] ?? 0) > 0).sort((a, b) => b.value - a.value);

  return (
    <section
      aria-label={tr("tray")}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/denom") as DenomId;
        if (id && !disabled) onDrop(id);
      }}
      className={`relative rounded-3xl border-4 border-dashed p-3 transition-colors ${
        over ? "border-leaf bg-mint" : "border-wood-light bg-peach/70"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-extrabold tracking-wide text-wood">{tr("tray")}</h2>
        {entries.length > 0 && (
          <button onClick={onClear} disabled={disabled} className="rounded-full bg-paper px-3 py-1 text-sm font-bold text-wood-dark border-2 border-wood-light hover:bg-cream">
            {tr("clear")}
          </button>
        )}
      </div>
      <div className="flex min-h-28 flex-wrap items-center gap-3">
        {entries.length === 0 && (
          <p className="w-full text-center font-bold text-muted-foreground">
            <span className="mb-1 block text-3xl" aria-hidden>🪙</span>
            {tr("trayEmpty")}
          </p>
        )}
        <AnimatePresence>
          {entries.map((d) => (
            <motion.div
              key={d.id}
              layout
              initial={{ scale: 0.3, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="relative"
            >
              <CurrencyPiece denom={d} />
              <motion.span
                key={tray[d.id]}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -left-2 grid h-7 min-w-7 place-items-center rounded-full bg-sun px-1 text-sm font-extrabold text-wood-dark border-2 border-paper"
              >
                ×{tray[d.id]}
              </motion.span>
              <button
                onClick={() => onRemove(d.id)}
                disabled={disabled}
                aria-label={`${tr("remove")} ₹${d.value}`}
                className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-coral text-destructive-foreground border-2 border-paper hover:scale-110 transition-transform"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function RunningTotal({ total, state }: { total: number; state: TotalState }) {
  const { tr } = useSettings();
  // Deliberately neutral: never reveals whether the amount is right before submission.
  const empty = state === "empty";
  const msg = empty ? tr("st_empty") : total < 10 ? tr("st_below") : tr("st_ready");
  return (
    <div className={`rounded-3xl border-4 p-3 text-center shadow-soft transition-colors ${empty ? "bg-paper border-wood-light" : "bg-paper border-sky"}`} aria-live="polite">
      <p className="text-sm font-extrabold tracking-widest text-muted-foreground">{tr("giving")}</p>
      <motion.p key={total} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className="font-display text-5xl font-extrabold text-wood-dark">
        ₹{total}
      </motion.p>
      <p className="font-bold text-wood">{msg}</p>
    </div>
  );
}
