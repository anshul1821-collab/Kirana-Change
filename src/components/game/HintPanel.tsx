import { useState } from "react";
import { motion } from "framer-motion";
import type { HintStep } from "@/game/types";
import { denomById } from "@/game/engine";
import { CurrencyPiece } from "./Currency";
import { useSettings } from "./settings";

interface Props {
  price: number;
  paid: number;
  steps: HintStep[];
  onShowPieces: () => void;
  onClose: () => void;
}

export function HintPanel({ price, paid, steps, onShowPieces, onClose }: Props) {
  const { tr } = useSettings();
  const [cur, setCur] = useState(0);
  const points = [price, ...steps.map((s) => s.to)];

  return (
    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-3xl border-4 border-sky bg-paper p-4 shadow-soft">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl font-extrabold text-teal">💡 {tr("hintTitle")}</h3>
        <p className="font-bold">{tr("price")}: ₹{price} · {tr("paid")}: ₹{paid}</p>
      </div>
      <p className="text-muted-foreground font-semibold">{tr("hintIntro")}</p>

      <div className="my-3 flex flex-wrap items-center gap-1 text-lg font-extrabold">
        {points.map((p, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-wood-light">→</span>}
            <span className={`rounded-full px-3 py-1 transition-colors ${i <= cur + 1 && i > 0 ? "bg-sun" : i === 0 ? "bg-peach" : "bg-cream text-muted-foreground"}`}>₹{p}</span>
          </span>
        ))}
      </div>

      {steps.length > 0 && (
        <motion.div key={cur} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-4 rounded-2xl bg-mint p-3">
          <CurrencyPiece denom={denomById(steps[cur].denom)} />
          <div>
            <p className="text-sm font-extrabold tracking-widest text-leaf-dark">{tr("step")} {cur + 1} / {steps.length}</p>
            <p className="font-display text-2xl font-extrabold">
              ₹{steps[cur].from} + ₹{denomById(steps[cur].denom).value} = ₹{steps[cur].to}
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <button disabled={cur === 0} onClick={() => setCur(cur - 1)} className="rounded-full border-2 border-wood-light bg-cream px-4 py-2 font-bold disabled:opacity-40">{tr("prev")}</button>
        <button disabled={cur >= steps.length - 1} onClick={() => setCur(cur + 1)} className="rounded-full bg-sky px-4 py-2 font-extrabold disabled:opacity-40">{tr("next")}</button>
        <button onClick={onShowPieces} className="rounded-full bg-sun px-4 py-2 font-extrabold">{tr("showPieces")}</button>
        <button onClick={onClose} className="ml-auto rounded-full bg-leaf px-4 py-2 font-extrabold text-primary-foreground">{tr("close")}</button>
      </div>
    </motion.div>
  );
}
