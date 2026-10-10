import { motion } from "framer-motion";
import shopHero from "@/assets/shop-hero.jpg";
import type { LevelDef, Progress } from "@/game/types";
import { LevelMap } from "./LevelMap";
import { SettingsBar, useSettings } from "./settings";

interface Props {
  levels: LevelDef[];
  progress: Progress;
  selected: number;
  onSelect: (i: number) => void;
  onPlay: () => void;
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-sun text-2xl shadow-wood" aria-hidden>
        🏪<span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-orange text-xs font-extrabold text-wood-dark">₹</span>
      </span>
      <span className="font-display text-xl font-extrabold leading-none text-wood-dark">
        Kirana<span className="block text-leaf-dark">Change</span>
      </span>
    </div>
  );
}

export function HomeScreen({ levels, progress, selected, onSelect, onPlay }: Props) {
  const { tr, lang } = useSettings();
  return (
    <div className="min-h-screen">
      <div className="bg-awning h-6 rounded-b-[2rem] shadow-soft" aria-hidden />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <SettingsBar />
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <section className="grid items-center gap-6 lg:grid-cols-[1fr_1.15fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight text-wood-dark sm:text-7xl">
              {tr("title")}
            </h1>
            <p className="mt-2 font-display text-2xl font-bold text-orange sm:text-3xl">{tr("tagline")}</p>
            {lang === "en" && <p className="font-display text-lg font-bold text-leaf-dark">हर रुपया मायने रखता है!</p>}
            <p className="mx-auto mt-3 max-w-md text-lg font-semibold text-muted-foreground lg:mx-0">{tr("intro")}</p>
            <button
              onClick={onPlay}
              className="btn-press mt-6 rounded-3xl bg-leaf px-10 py-4 font-display text-3xl font-extrabold text-primary-foreground shadow-chunky hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sun"
            >
              {tr("play")} ▶
            </button>
            <p className="mt-3 font-bold text-wood">
              {tr("level")} {levels[selected]?.number}: {levels[selected]?.title[lang]}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 -rotate-2 rounded-xl border-4 border-wood-dark bg-sun px-5 py-1 font-display text-xl font-extrabold text-wood-dark shadow-wood">
                🪔 Kirana Store 🪔
              </div>
              <img src={shopHero} alt="A friendly shopkeeper waving from a colourful kirana shop" width={1536} height={1024} className="w-full rounded-[2rem] border-8 border-wood shadow-soft" />
            </div>
          </motion.div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-center font-display text-3xl font-extrabold text-wood-dark">🗺️ {tr("levels")}</h2>
          <div className="rounded-[2rem] bg-wood-grain border-4 border-wood-dark p-4 shadow-wood sm:p-6">
            <LevelMap levels={levels} progress={progress} selected={selected} onSelect={onSelect} />
          </div>
        </section>
      </main>
    </div>
  );
}
