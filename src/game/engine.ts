import type {
  Customer,
  DenomId,
  Denomination,
  Discount,
  HintStep,
  LevelDef,
  LineItem,
  Progress,
  Scenario,
  SubmissionResult,
  TotalState,
  Tray,
} from "./types";

export const DENOMINATIONS: Denomination[] = [
  { id: "c1", value: 1, kind: "coin" },
  { id: "c2", value: 2, kind: "coin" },
  { id: "c5", value: 5, kind: "coin" },
  { id: "c10", value: 10, kind: "coin" },
  { id: "n10", value: 10, kind: "note" },
  { id: "n20", value: 20, kind: "note" },
  { id: "n50", value: 50, kind: "note" },
  { id: "n100", value: 100, kind: "note" },
  { id: "n200", value: 200, kind: "note" },
  { id: "n500", value: 500, kind: "note" },
];

export const denomById = (id: DenomId) => DENOMINATIONS.find((d) => d.id === id)!;

export const LEVELS: LevelDef[] = [
  { number: 1, icon: "🏪", title: { en: "First Day at the Shop", hi: "दुकान का पहला दिन" }, customers: 4 },
  { number: 2, icon: "🛍️", title: { en: "Busy Little Shop", hi: "व्यस्त छोटी दुकान" }, customers: 5 },
  { number: 3, icon: "🧮", title: { en: "Tricky Prices", hi: "मुश्किल दाम" }, customers: 5 },
  { number: 4, icon: "📝", title: { en: "Shopping List", hi: "खरीदारी की सूची" }, customers: 5 },
  { number: 5, icon: "📦", title: { en: "Buy More, Save More", hi: "ज़्यादा लो, बचत करो" }, customers: 5 },
  { number: 6, icon: "🏷️", title: { en: "Special Discounts", hi: "खास छूट" }, customers: 5 },
  { number: 7, icon: "🎁", title: { en: "Combo Offers", hi: "कॉम्बो ऑफ़र" }, customers: 5 },
  { number: 8, icon: "💯", title: { en: "Percentage Discounts", hi: "प्रतिशत छूट" }, customers: 5 },
  { number: 9, icon: "🛒", title: { en: "Big Shopping Day", hi: "बड़ी खरीदारी" }, customers: 5 },
  { number: 10, icon: "⏱️", title: { en: "Rush Hour", hi: "भीड़ का समय" }, customers: 6 },
];

const PRODUCTS: { id: string; emoji: string; name: { en: string; hi: string } }[] = [
  { id: "biscuits", emoji: "🍪", name: { en: "Biscuits", hi: "बिस्किट" } },
  { id: "milk", emoji: "🥛", name: { en: "Milk Packet", hi: "दूध का पैकेट" } },
  { id: "bananas", emoji: "🍌", name: { en: "Bananas", hi: "केले" } },
  { id: "chips", emoji: "🥔", name: { en: "Chips", hi: "चिप्स" } },
  { id: "chocolate", emoji: "🍫", name: { en: "Chocolate", hi: "चॉकलेट" } },
  { id: "pencil", emoji: "✏️", name: { en: "Pencil", hi: "पेंसिल" } },
  { id: "notebook", emoji: "📒", name: { en: "Notebook", hi: "कॉपी" } },
  { id: "bread", emoji: "🍞", name: { en: "Bread", hi: "ब्रेड" } },
  { id: "eggs", emoji: "🥚", name: { en: "Eggs", hi: "अंडे" } },
  { id: "tea", emoji: "🍵", name: { en: "Tea Leaves", hi: "चाय पत्ती" } },
  { id: "soap", emoji: "🧼", name: { en: "Soap", hi: "साबुन" } },
  { id: "rice", emoji: "🍚", name: { en: "Rice (1 kg)", hi: "चावल (1 किलो)" } },
];

export const CUSTOMERS: Customer[] = [
  { id: "uncle", emoji: "👨🏽‍🦳", name: { en: "Sharma Uncle", hi: "शर्मा अंकल" }, greeting: { en: "Namaste, beta!", hi: "नमस्ते, बेटा!" } },
  { id: "aunty", emoji: "👩🏽", name: { en: "Priya Aunty", hi: "प्रिया आंटी" }, greeting: { en: "Hello, dear!", hi: "नमस्ते, बच्चे!" } },
  { id: "student", emoji: "🧒🏽", name: { en: "Rohan", hi: "रोहन" }, greeting: { en: "Hi bhaiya!", hi: "हाय भैया!" } },
  { id: "parent", emoji: "👩🏽‍👧🏽", name: { en: "Meera & Anu", hi: "मीरा और अनु" }, greeting: { en: "Good morning!", hi: "सुप्रभात!" } },
  { id: "delivery", emoji: "🧑🏽‍🔧", name: { en: "Raju", hi: "राजू" }, greeting: { en: "Ram Ram ji!", hi: "राम राम जी!" } },
  { id: "dadi", emoji: "👵🏽", name: { en: "Dadi Ji", hi: "दादी जी" }, greeting: { en: "Jeete raho!", hi: "जीते रहो!" } },
];

type Rng = () => number;
const randInt = (rng: Rng, lo: number, hi: number, step = 1) =>
  lo + step * Math.floor(rng() * (Math.floor((hi - lo) / step) + 1));
const pick = <T,>(rng: Rng, arr: T[]) => arr[Math.floor(rng() * arr.length)];

function pickProducts(rng: Rng, n: number) {
  const pool = [...PRODUCTS];
  const out: typeof PRODUCTS = [];
  for (let i = 0; i < n; i++) out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
  return out;
}

const item = (p: (typeof PRODUCTS)[number], unitPrice: number, qty = 1): LineItem => ({
  productId: p.id,
  emoji: p.emoji,
  name: p.name,
  unitPrice,
  qty,
});

const PAY_NOTES = [10, 20, 50, 100, 200, 500];

/** Choose what the customer hands over: a single natural note (sometimes two). */
export function choosePayment(rng: Rng, payable: number, allowExact: boolean): { paid: number; pieces: DenomId[] } {
  if (allowExact && rng() < 0.12 && PAY_NOTES.includes(payable)) {
    return { paid: payable, pieces: [`n${payable}` as DenomId] };
  }
  const options = PAY_NOTES.filter((n) => n > payable);
  if (options.length) {
    const note = options.length > 1 && rng() < 0.25 ? options[1] : options[0];
    return { paid: note, pieces: [`n${note}` as DenomId] };
  }
  // larger than 500: pay with multiple ₹500 notes
  const count = Math.ceil((payable + 1) / 500);
  return { paid: count * 500, pieces: Array(count).fill("n500") };
}

export function generateScenario(level: number, index: number, rng: Rng = Math.random): Scenario {
  let items: LineItem[] = [];
  let discount: Discount | null = null;

  switch (level) {
    case 1: {
      const [p] = pickProducts(rng, 1);
      items = [item(p, randInt(rng, 5, 45, 5))];
      break;
    }
    case 2: {
      const [p] = pickProducts(rng, 1);
      items = [item(p, randInt(rng, 10, 95, 5))];
      break;
    }
    case 3: {
      const [p] = pickProducts(rng, 1);
      let price = randInt(rng, 11, 98);
      if (price % 5 === 0) price += 2;
      items = [item(p, price)];
      break;
    }
    case 4: {
      const n = randInt(rng, 2, 3);
      items = pickProducts(rng, n).map((p) => item(p, randInt(rng, 6, 40)));
      break;
    }
    case 5: {
      const [p] = pickProducts(rng, 1);
      const qty = randInt(rng, 3, 5);
      items = [item(p, randInt(rng, 8, 25), qty)];
      const off = qty >= 4 ? 10 : 5;
      discount = { label: { en: `Buy 3+, save ₹${off}`, hi: `3+ लो, ₹${off} बचाओ` }, amount: off };
      break;
    }
    case 6: {
      const n = randInt(rng, 1, 2);
      items = pickProducts(rng, n).map((p) => item(p, randInt(rng, 25, 80)));
      const off = pick(rng, [10, 15, 20]);
      discount = { label: { en: `Special offer: ₹${off} off`, hi: `खास ऑफ़र: ₹${off} छूट` }, amount: off };
      break;
    }
    case 7: {
      const ps = pickProducts(rng, 2);
      items = ps.map((p) => item(p, randInt(rng, 15, 60)));
      const off = pick(rng, [5, 8, 10, 12]);
      discount = { label: { en: `Combo deal: save ₹${off}`, hi: `कॉम्बो: ₹${off} बचत` }, amount: off };
      break;
    }
    case 8: {
      const [p] = pickProducts(rng, 1);
      const qty = randInt(rng, 1, 3);
      items = [item(p, randInt(rng, 20, 120, 10), qty)];
      const pct = pick(rng, [10, 20, 50]);
      const sub = items[0].unitPrice * qty;
      discount = { label: { en: `${pct}% off`, hi: `${pct}% छूट` }, amount: (sub * pct) / 100 };
      break;
    }
    case 9: {
      const n = randInt(rng, 3, 4);
      items = pickProducts(rng, n).map((p) => item(p, randInt(rng, 20, 140), randInt(rng, 1, 2)));
      break;
    }
    default: {
      const n = randInt(rng, 1, 3);
      items = pickProducts(rng, n).map((p) => item(p, randInt(rng, 7, 90)));
      if (rng() < 0.4) {
        const off = pick(rng, [5, 10]);
        discount = { label: { en: `Rush deal: ₹${off} off`, hi: `झटपट ऑफ़र: ₹${off} छूट` }, amount: off };
      }
    }
  }

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const payable = Math.max(1, subtotal - (discount?.amount ?? 0));
  const { paid, pieces } = choosePayment(rng, payable, level >= 2);

  return {
    id: `L${level}-${index}-${Math.floor(rng() * 1e6)}`,
    level,
    customer: CUSTOMERS[(index + level) % CUSTOMERS.length],
    items,
    subtotal,
    discount,
    payable,
    paid,
    paidPieces: pieces,
    timeLimit: level === 10 ? 45 : null,
  };
}

export const requiredChange = (s: Scenario) => s.paid - s.payable;

export function trayTotal(tray: Tray): number {
  return Object.entries(tray).reduce((s, [id, n]) => s + denomById(id as DenomId).value * (n ?? 0), 0);
}

export function trayState(tray: Tray, required: number): TotalState {
  const t = trayTotal(tray);
  if (t === 0) return required === 0 ? "exact" : "empty";
  if (t < required) return "below";
  if (t === required) return "exact";
  return "above";
}

export function evaluate(tray: Tray, scenario: Scenario, mistakes: number, hintsUsed: number): SubmissionResult {
  const diff = trayTotal(tray) - requiredChange(scenario);
  if (diff < 0) return { kind: "too-little", difference: -diff };
  if (diff > 0) return { kind: "too-much", difference: diff };
  return { kind: "correct", stars: customerStars(mistakes, hintsUsed) };
}

export const customerStars = (mistakes: number, hintsUsed: number) =>
  mistakes === 0 && hintsUsed === 0 ? 3 : mistakes + hintsUsed <= 2 ? 2 : 1;

/** Level stars = rounded average of customer stars. */
export const levelStars = (customerStarList: number[]) =>
  customerStarList.length
    ? Math.max(1, Math.round(customerStarList.reduce((a, b) => a + b, 0) / customerStarList.length))
    : 0;

const COUNT_UP_DENOMS: DenomId[] = ["n500", "n200", "n100", "n50", "n20", "n10", "c5", "c2", "c1"];

/**
 * Count-up hint: starting at the price, add one piece at a time,
 * preferring the largest piece that lands on a "round" number for that piece.
 */
export function countUpSteps(price: number, paid: number): HintStep[] {
  const steps: HintStep[] = [];
  let cur = price;
  while (cur < paid) {
    const rem = paid - cur;
    let chosen = COUNT_UP_DENOMS.find((id) => {
      const v = denomById(id).value;
      return v <= rem && (cur + v) % v === 0;
    });
    if (!chosen) chosen = COUNT_UP_DENOMS.find((id) => denomById(id).value <= rem)!;
    const v = denomById(chosen).value;
    steps.push({ from: cur, to: cur + v, denom: chosen });
    cur += v;
  }
  return steps;
}

export function stepsToTray(steps: HintStep[]): Tray {
  const t: Tray = {};
  for (const s of steps) t[s.denom] = (t[s.denom] ?? 0) + 1;
  return t;
}

export const isUnlocked = (progress: Progress, levelIndex: number) =>
  levelIndex === 0 || (progress.stars[levelIndex - 1] ?? 0) > 0;

export const emptyProgress = (): Progress => ({ stars: Array(LEVELS.length).fill(0) });
