import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import type { Scenario } from "@/game/types";
import { useSettings } from "./settings";

export type Mood = "speaking" | "thinking" | "happy";

export function CustomerBubble({ scenario, mood }: { scenario: Scenario; mood: Mood }) {
  const { lang, tr } = useSettings();
  const names = scenario.items.map((i) => (i.qty > 1 ? `${i.qty} ${i.name[lang]}` : i.name[lang]));
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} ${tr("and")} ${names[names.length - 1]}` : names[0];
  const exact = scenario.paid === scenario.payable;
  const text = `${scenario.customer.greeting[lang]} ${tr(exact ? "wantsExact" : "wants", { items: list, total: scenario.payable, paid: scenario.paid })}`;

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "hi" ? "hi-IN" : "en-IN";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  return (
    <div className="flex items-end gap-3">
      <motion.div
        key={scenario.id + mood}
        initial={{ y: 20, opacity: 0 }}
        animate={mood === "happy" ? { y: [0, -14, 0], opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex shrink-0 flex-col items-center"
      >
        <div className="grid h-24 w-24 place-items-center rounded-full bg-sky/40 border-4 border-paper text-6xl shadow-soft sm:h-28 sm:w-28 sm:text-7xl" aria-hidden>
          {scenario.customer.emoji}
        </div>
        <span className="absolute -right-1 top-0 text-3xl" aria-hidden>
          {mood === "happy" ? "👍" : mood === "thinking" ? "🤔" : ""}
        </span>
        <span className="mt-1 rounded-full bg-wood px-3 py-0.5 text-sm font-extrabold text-primary-foreground">{scenario.customer.name[lang]}</span>
      </motion.div>
      <motion.div
        key={scenario.id + lang}
        initial={{ scale: 0.8, opacity: 0, x: -10 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative mb-8 flex-1 rounded-3xl rounded-bl-md border-4 border-wood-light bg-paper p-4 shadow-soft"
      >
        <span className="absolute -left-3 bottom-3 h-5 w-5 rotate-45 border-b-4 border-l-4 border-wood-light bg-paper" aria-hidden />
        <p className="text-lg font-bold leading-snug text-wood-dark sm:text-xl">{text}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {scenario.items.map((i) => (
            <span key={i.productId} className="rounded-full bg-cream px-2 py-0.5 text-2xl" aria-hidden>
              {i.emoji}
              {i.qty > 1 && <span className="ml-0.5 text-sm font-extrabold">×{i.qty}</span>}
            </span>
          ))}
          <button onClick={speak} aria-label={tr("speak")} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-sky/50 text-wood-dark hover:bg-sky">
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
