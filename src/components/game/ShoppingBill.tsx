import type { Scenario } from "@/game/types";
import { useSettings } from "./settings";

export function ShoppingBill({
  scenario,
  calculatedTotal,
  onChangeTotal,
  disabled,
}: {
  scenario: Scenario;
  calculatedTotal: number | "";
  onChangeTotal: (v: number | "") => void;
  disabled?: boolean;
}) {
  const { lang, tr } = useSettings();
  return (
    <div className="paper-receipt relative rounded-xl border-2 border-border p-4 shadow-soft">
      <p className="text-center font-display text-xl font-extrabold tracking-[0.3em] text-wood">
        🧾 {tr("bill")}
      </p>
      <div className="my-2 border-t-2 border-dashed border-border" />
      <ul className="space-y-1">
        {scenario.items.map((i) => (
          <li key={i.productId} className="flex items-start justify-between gap-3">
            <span className="min-w-0 font-bold">
              {i.emoji} {i.name[lang]}
              {i.qty > 1 && (
                <span className="block text-sm text-muted-foreground">
                  {i.qty} × ₹{i.unitPrice}
                </span>
              )}
            </span>
            <span className="font-extrabold tabular-nums">₹{i.unitPrice * i.qty}</span>
          </li>
        ))}
      </ul>
      <div className="my-2 border-t-2 border-dashed border-border" />
      <div className="flex justify-between font-bold">
        <span>{tr("subtotal")}</span>
        <span className="tabular-nums">
          {calculatedTotal === scenario.payable ? `₹${scenario.subtotal}` : "???"}
        </span>
      </div>
      {scenario.discount && (
        <div className="flex justify-between gap-3 font-bold text-leaf-dark">
          <span>🏷️ {scenario.discount.label[lang]}</span>
          <span className="tabular-nums">−₹{scenario.discount.amount}</span>
        </div>
      )}
      <div className="mt-2 flex items-center justify-between rounded-lg bg-sun/60 px-2 py-1">
        <span className="font-extrabold">{tr("totalToPay")}</span>
        <div className="flex items-center gap-0.5">
          <span className="font-display text-2xl font-extrabold tabular-nums">₹</span>
          <input
            type="number"
            value={calculatedTotal}
            onChange={(e) => onChangeTotal(e.target.value ? Number(e.target.value) : "")}
            disabled={disabled || calculatedTotal === scenario.payable}
            className={`w-16 rounded-md border-2 px-1 text-right font-display text-2xl font-extrabold tabular-nums outline-none transition-colors ${
              calculatedTotal === scenario.payable
                ? "border-leaf-dark bg-leaf/20 text-leaf-dark"
                : "border-wood-dark/30 bg-white focus:border-orange"
            } ${disabled ? "opacity-75" : ""}`}
            placeholder="?"
            aria-label={tr("totalToPay")}
          />
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between rounded-lg bg-mint px-2 py-1">
        <span className="font-extrabold">{tr("customerGave")}</span>
        <span className="font-display text-2xl font-extrabold tabular-nums">₹{scenario.paid}</span>
      </div>
    </div>
  );
}
