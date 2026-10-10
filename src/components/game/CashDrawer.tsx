import { motion } from "framer-motion";
import type { DenomId, Denomination } from "@/game/types";
import { CurrencyPiece } from "./Currency";
import { useSettings } from "./settings";

interface Props {
  denominations: Denomination[];
  onAdd: (id: DenomId) => void;
  disabled?: boolean;
}

/** Unlimited supply drawer: tap or drag a piece to add a copy to the tray. */
export function CashDrawer({ denominations, onAdd, disabled }: Props) {
  const { tr } = useSettings();
  const coins = denominations.filter((d) => d.kind === "coin");
  const notes = denominations.filter((d) => d.kind === "note");
  const Slot = ({ d }: { d: Denomination }) => (
    <motion.button
      type="button"
      disabled={disabled}
      draggable={!disabled}
      onDragStart={(e) => {
        const ev = e as unknown as React.DragEvent;
        ev.dataTransfer.setData("text/denom", d.id);
        ev.dataTransfer.effectAllowed = "copy";
      }}
      onClick={() => onAdd(d.id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Add ₹${d.value} ${d.kind}`}
      className="grid min-h-20 shrink-0 cursor-grab place-items-center rounded-xl bg-wood-dark/60 px-2 py-2 shadow-[inset_0_3px_6px_color-mix(in_oklab,var(--wood-dark)_70%,transparent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sun disabled:opacity-50 active:cursor-grabbing"
    >
      <CurrencyPiece denom={d} />
    </motion.button>
  );
  return (
    <section
      aria-label={tr("drawer")}
      className="bg-wood-grain rounded-3xl border-4 border-wood-dark p-3 shadow-wood"
    >
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 px-1">
        <h2 className="font-display text-xl font-extrabold text-sun">🗄️ {tr("drawer")}</h2>
        <p className="text-sm font-bold text-cream">{tr("drawerHint")}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {notes.map((d) => (
            <Slot key={d.id} d={d} />
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {coins.map((d) => (
            <Slot key={d.id} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
