import { motion } from "framer-motion";
import { Stars } from "./Feedback";
import { useSettings } from "./settings";

interface Props {
  levelNumber: number;
  levelTitle: string;
  stars: number;
  served: number;
  mistakes: number;
  hints: number;
  hasNext: boolean;
  onReplay: () => void;
  onNext: () => void;
  onHome: () => void;
}

export function LevelComplete(p: Props) {
  const { tr } = useSettings();
  const headline = p.stars === 3 ? tr("done3") : p.stars === 2 ? tr("done1") : tr("done2");
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg overflow-hidden rounded-[2rem] border-4 border-wood-dark bg-paper text-center shadow-wood"
      >
        <div className="bg-awning h-6" aria-hidden />
        <div className="p-6">
          <div className="text-6xl" aria-hidden>
            🏪🎉
          </div>
          <p className="mt-2 font-bold text-muted-foreground">
            {tr("level")} {p.levelNumber} · {p.levelTitle}
          </p>
          <h1 className="font-display text-4xl font-extrabold text-wood-dark">{headline}</h1>
          <div className="my-4">
            <Stars count={p.stars} size="text-6xl" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              [tr("served"), p.served, "🧑‍🤝‍🧑"],
              [tr("mistakes"), p.mistakes, "🔁"],
              [tr("hintsUsed"), p.hints, "💡"],
            ].map(([l, v, e]) => (
              <div key={String(l)} className="rounded-2xl bg-cream p-2">
                <div className="text-2xl" aria-hidden>
                  {e}
                </div>
                <div className="font-display text-2xl font-extrabold">{v}</div>
                <div className="text-sm font-bold text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={p.onReplay}
              className="btn-press flex-1 rounded-2xl bg-sun py-3 font-display text-xl font-extrabold text-wood-dark shadow-wood"
            >
              {tr("replay")}
            </button>
            {p.hasNext && (
              <button
                autoFocus
                onClick={p.onNext}
                className="btn-press flex-1 rounded-2xl bg-leaf py-3 font-display text-xl font-extrabold text-primary-foreground shadow-chunky"
              >
                {tr("nextLevel")} ▶
              </button>
            )}
          </div>
          <button onClick={p.onHome} className="mt-3 font-bold text-wood underline">
            {tr("home")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
