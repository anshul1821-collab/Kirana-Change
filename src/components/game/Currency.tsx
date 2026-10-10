import type { CSSProperties } from "react";
import type { Denomination } from "@/game/types";

const COLOR: Record<string, string> = {
  c1: "var(--cur-1)",
  c2: "var(--cur-2)",
  c5: "var(--cur-5)",
  c10: "var(--cur-10c)",
  n10: "var(--cur-10)",
  n20: "var(--cur-20)",
  n50: "var(--cur-50)",
  n100: "var(--cur-100)",
  n200: "var(--cur-200)",
  n500: "var(--cur-500)",
};

interface Props {
  denom: Denomination;
  size?: "sm" | "md";
  className?: string;
}

/** Purely visual currency piece (original, simplified design). */
export function CurrencyPiece({ denom, size = "md", className = "" }: Props) {
  const style = { "--c": COLOR[denom.id] } as CSSProperties;
  if (denom.kind === "coin") {
    const dim = size === "sm" ? "h-11 w-11 text-base" : "h-16 w-16 text-xl";
    return (
      <div
        style={style}
        className={`${dim} relative grid shrink-0 place-items-center rounded-full font-display font-extrabold text-wood-dark ${className}`}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--c) 40%, var(--paper)), var(--c) 60%, color-mix(in oklab, var(--c) 70%, var(--wood-dark)))",
            boxShadow: "inset 0 -3px 0 color-mix(in oklab, var(--c) 60%, var(--wood-dark)), 0 3px 6px -2px color-mix(in oklab, var(--wood-dark) 50%, transparent)",
          }}
        />
        <span className="absolute inset-1.5 rounded-full border-2 border-dashed" style={{ borderColor: "color-mix(in oklab, var(--c) 50%, var(--wood-dark))" }} />
        <span className="relative leading-none" style={{ textShadow: "0 1px 0 color-mix(in oklab, var(--paper) 70%, transparent)" }}>
          ₹{denom.value}
        </span>
      </div>
    );
  }
  const dim = size === "sm" ? "h-11 w-20 text-base" : "h-16 w-28 text-2xl";
  return (
    <div
      style={{
        ...style,
        background:
          "repeating-linear-gradient(45deg, transparent 0 6px, color-mix(in oklab, var(--paper) 18%, transparent) 6px 8px), linear-gradient(135deg, color-mix(in oklab, var(--c) 70%, var(--paper)), var(--c))",
        boxShadow: "0 3px 6px -2px color-mix(in oklab, var(--wood-dark) 45%, transparent)",
      }}
      className={`${dim} relative flex shrink-0 items-center justify-between rounded-lg px-2 font-display font-extrabold text-wood-dark ${className}`}
    >
      <span className="absolute inset-1 rounded-md border-2" style={{ borderColor: "color-mix(in oklab, var(--c) 45%, var(--wood-dark))" }} />
      <span
        className="relative grid h-[70%] aspect-square place-items-center rounded-full text-[0.6em]"
        style={{ background: "color-mix(in oklab, var(--paper) 55%, transparent)" }}
      >
        ₹
      </span>
      <span className="relative pr-1 leading-none">{denom.value}</span>
    </div>
  );
}
