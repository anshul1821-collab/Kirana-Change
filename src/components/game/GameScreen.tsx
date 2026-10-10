import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { DenomId, LevelDef, SubmissionResult, Tray } from "@/game/types";
import {
  DENOMINATIONS,
  countUpSteps,
  evaluate,
  generateScenario,
  requiredChange,
  stepsToTray,
  trayState,
  trayTotal,
} from "@/game/engine";
import { CashDrawer } from "./CashDrawer";
import { ChangeTray, RunningTotal } from "./ChangeTray";
import { CustomerBubble } from "./CustomerBubble";
import { Feedback } from "./Feedback";
import { HintPanel } from "./HintPanel";
import { ShoppingBill } from "./ShoppingBill";
import { SettingsBar, useSettings } from "./settings";

export interface LevelStats {
  stars: number[];
  mistakes: number;
  hints: number;
}

interface Props {
  level: LevelDef;
  onExit: () => void;
  onComplete: (stats: LevelStats) => void;
}

export function GameScreen({ level, onExit, onComplete }: Props) {
  const { tr, lang, play } = useSettings();
  const [index, setIndex] = useState(0);
  const scenario = useMemo(() => generateScenario(level.number, index), [level.number, index]);
  const [tray, setTray] = useState<Tray>({});
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [stats, setStats] = useState<LevelStats>({ stars: [], mistakes: 0, hints: 0 });
  const [timeLeft, setTimeLeft] = useState<number | null>(scenario.timeLimit);
  const [calculatedTotal, setCalculatedTotal] = useState<number | "">("");

  const required = requiredChange(scenario);
  const total = trayTotal(tray);
  const steps = useMemo(() => countUpSteps(scenario.payable, scenario.paid), [scenario]);

  useEffect(() => {
    setTimeLeft(scenario.timeLimit);
  }, [scenario]);

  useEffect(() => {
    if (timeLeft === null || result) return;
    if (timeLeft <= 0) {
      setResult({ kind: "timeout" });
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => (t === null ? t : t - 1)), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, result]);

  const add = (id: DenomId) => {
    play("tap");
    setTray((t) => ({ ...t, [id]: (t[id] ?? 0) + 1 }));
  };
  const remove = (id: DenomId) => setTray((t) => ({ ...t, [id]: Math.max(0, (t[id] ?? 0) - 1) }));

  const submit = () => {
    const r = evaluate(tray, scenario, mistakes, hintsUsed);
    if (r.kind !== "correct") setMistakes((m) => m + 1);
    play(r.kind === "correct" ? "success" : "oops");
    setResult(r);
  };

  const next = () => {
    if (result?.kind !== "correct") return;
    const s: LevelStats = {
      stars: [...stats.stars, result.stars],
      mistakes: stats.mistakes + mistakes,
      hints: stats.hints + hintsUsed,
    };
    setResult(null);
    setTray({});
    setCalculatedTotal("");
    setShowHint(false);
    setMistakes(0);
    setHintsUsed(0);
    if (index + 1 >= level.customers) onComplete(s);
    else {
      setStats(s);
      setIndex(index + 1);
    }
  };

  const retry = () => {
    if (result?.kind === "timeout") {
      setTray({});
      setTimeLeft(scenario.timeLimit);
    }
    setResult(null);
  };

  const openHint = () => {
    if (!showHint) setHintsUsed((h) => h + 1);
    setShowHint(true);
  };

  const busy = result !== null;

  return (
    <div className="min-h-screen pb-6">
      <div className="bg-awning h-4" aria-hidden />
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-3 py-2">
        <button
          onClick={onExit}
          className="flex items-center gap-1 rounded-full bg-paper px-3 py-2 font-extrabold border-2 border-wood-light shadow-soft"
          aria-label={tr("home")}
        >
          <ArrowLeft className="h-5 w-5" /> <span className="hidden sm:inline">{tr("home")}</span>
        </button>
        <div className="flex-1 min-w-40 px-2">
          <p className="text-center font-display font-extrabold leading-tight">
            {level.icon} {tr("level")} {level.number}: {level.title[lang]}
          </p>
          <div
            className="mx-auto mt-1 flex max-w-xs gap-1"
            aria-label={`${tr("customer")} ${index + 1} ${tr("of")} ${level.customers}`}
          >
            {Array.from({ length: level.customers }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 rounded-full ${i < index ? "bg-leaf" : i === index ? "bg-sun" : "bg-border"}`}
              />
            ))}
          </div>
        </div>
        <SettingsBar />
      </header>

      <main className="mx-auto grid max-w-6xl gap-4 px-3">
        {timeLeft !== null && (
          <div
            className="mx-auto rounded-full bg-paper px-4 py-1 font-extrabold border-2 border-orange"
            aria-live="polite"
          >
            ⏱️ {timeLeft} {tr("timeLeft")}
          </div>
        )}
        {/* Customer + bill */}
        <section className="grid items-start gap-4 md:grid-cols-[1.5fr_1fr]">
          <CustomerBubble
            scenario={scenario}
            mood={result?.kind === "correct" ? "happy" : result ? "thinking" : "speaking"}
          />
          <ShoppingBill
            scenario={scenario}
            calculatedTotal={calculatedTotal}
            onChangeTotal={setCalculatedTotal}
            disabled={busy}
          />
        </section>

        {/* Counter */}
        <section className="rounded-[2rem] border-4 border-wood-dark bg-wood-light/40 p-3 shadow-wood sm:p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <ChangeTray
              tray={tray}
              denominations={DENOMINATIONS}
              onDrop={add}
              onRemove={remove}
              onClear={() => setTray({})}
              disabled={busy}
            />
            <div className="flex flex-col gap-3 md:w-64">
              <RunningTotal total={total} state={trayState(tray, required)} />
              <button
                onClick={submit}
                disabled={busy || calculatedTotal !== scenario.payable}
                className="btn-press rounded-2xl bg-leaf py-4 font-display text-2xl font-extrabold text-primary-foreground shadow-chunky disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sun"
              >
                {total === 0 ? tr("noChange") : tr("give")}
              </button>
              <button
                onClick={openHint}
                disabled={busy}
                className="rounded-2xl border-2 border-sky bg-paper py-2 font-extrabold text-teal hover:bg-mint"
              >
                💡 {tr("hint")}
              </button>
            </div>
          </div>
        </section>

        {showHint && (
          <HintPanel
            key={scenario.id}
            price={scenario.payable}
            paid={scenario.paid}
            steps={steps}
            onShowPieces={() => setTray(stepsToTray(steps))}
            onClose={() => setShowHint(false)}
          />
        )}

        <CashDrawer denominations={DENOMINATIONS} onAdd={add} disabled={busy} />
      </main>

      {result && <Feedback result={result} onContinue={next} onRetry={retry} />}
    </div>
  );
}
