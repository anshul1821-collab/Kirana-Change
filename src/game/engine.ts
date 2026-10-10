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
  {
    number: 1,
    icon: "🏪",
    title: { en: "First Day at the Shop", hi: "दुकान का पहला दिन" },
    customers: 4,
  },
  {
    number: 2,
    icon: "🛍️",
    title: { en: "Busy Little Shop", hi: "व्यस्त छोटी दुकान" },
    customers: 5,
  },
  { number: 3, icon: "🧮", title: { en: "Tricky Prices", hi: "मुश्किल दाम" }, customers: 5 },
  { number: 4, icon: "📝", title: { en: "Shopping List", hi: "खरीदारी की सूची" }, customers: 5 },
  {
    number: 5,
    icon: "📦",
    title: { en: "Buy More, Save More", hi: "ज़्यादा लो, बचत करो" },
    customers: 5,
  },
  { number: 6, icon: "🏷️", title: { en: "Special Discounts", hi: "खास छूट" }, customers: 5 },
  { number: 7, icon: "🎁", title: { en: "Combo Offers", hi: "कॉम्बो ऑफ़र" }, customers: 5 },
  { number: 8, icon: "💯", title: { en: "Percentage Discounts", hi: "प्रतिशत छूट" }, customers: 5 },
  { number: 9, icon: "🛒", title: { en: "Big Shopping Day", hi: "बड़ी खरीदारी" }, customers: 5 },
  { number: 10, icon: "⏱️", title: { en: "Rush Hour", hi: "भीड़ का समय" }, customers: 6 },
];

const PRODUCTS: { id: string; emoji: string; name: { en: string; hi: string }; price: number }[] = [
  { id: "toffee", emoji: "🍬", name: { en: "Toffee", hi: "टॉफी" }, price: 1 },
  { id: "matchbox", emoji: "🪔", name: { en: "Matchbox", hi: "माचिस" }, price: 2 },
  { id: "pencil", emoji: "✏️", name: { en: "Pencil", hi: "पेंसिल" }, price: 5 },
  { id: "eraser", emoji: "🧽", name: { en: "Eraser", hi: "रबर" }, price: 5 },
  { id: "biscuits", emoji: "🍪", name: { en: "Biscuits", hi: "बिस्किट" }, price: 10 },
  { id: "pen", emoji: "🖊️", name: { en: "Pen", hi: "पेन" }, price: 10 },
  { id: "maggi", emoji: "🍜", name: { en: "Noodles", hi: "नूडल्स" }, price: 14 },
  { id: "battery", emoji: "🔋", name: { en: "Battery", hi: "बैटरी" }, price: 15 },
  { id: "chips", emoji: "🥔", name: { en: "Chips", hi: "चिप्स" }, price: 20 },
  { id: "juice", emoji: "🧃", name: { en: "Juice Box", hi: "जूस" }, price: 20 },
  { id: "salt", emoji: "🧂", name: { en: "Salt (1 kg)", hi: "नमक (1 किलो)" }, price: 22 },
  { id: "potato", emoji: "🥔", name: { en: "Potato (1 kg)", hi: "आलू (1 किलो)" }, price: 25 },
  { id: "chocolate", emoji: "🍫", name: { en: "Chocolate", hi: "चॉकलेट" }, price: 25 },
  { id: "icecream", emoji: "🍦", name: { en: "Ice Cream", hi: "आइसक्रीम" }, price: 25 },
  { id: "soap", emoji: "🧼", name: { en: "Soap", hi: "साबुन" }, price: 28 },
  { id: "milk", emoji: "🥛", name: { en: "Milk Packet", hi: "दूध का पैकेट" }, price: 30 },
  { id: "onion", emoji: "🧅", name: { en: "Onion (1 kg)", hi: "प्याज़ (1 किलो)" }, price: 35 },
  { id: "bread", emoji: "🍞", name: { en: "Bread", hi: "ब्रेड" }, price: 35 },
  { id: "bananas", emoji: "🍌", name: { en: "Bananas (1 Doz)", hi: "केले (1 दर्जन)" }, price: 40 },
  { id: "tomato", emoji: "🍅", name: { en: "Tomato (1 kg)", hi: "टमाटर (1 किलो)" }, price: 40 },
  { id: "colddrink", emoji: "🥤", name: { en: "Cold Drink", hi: "कोल्ड ड्रिंक" }, price: 40 },
  { id: "notebook", emoji: "📒", name: { en: "Notebook", hi: "कॉपी" }, price: 40 },
  { id: "eggs", emoji: "🥚", name: { en: "Eggs (6 pcs)", hi: "अंडे (6 पीस)" }, price: 42 },
  { id: "sugar", emoji: "🧂", name: { en: "Sugar (1 kg)", hi: "चीनी (1 किलो)" }, price: 45 },
  { id: "toothpaste", emoji: "🪥", name: { en: "Toothpaste", hi: "टूथपेस्ट" }, price: 55 },
  { id: "rice", emoji: "🍚", name: { en: "Rice (1 kg)", hi: "चावल (1 किलो)" }, price: 65 },
  { id: "dal", emoji: "🥣", name: { en: "Dal (500g)", hi: "दाल (500g)" }, price: 75 },
  { id: "tea", emoji: "🍵", name: { en: "Tea Leaves (250g)", hi: "चाय पत्ती (250g)" }, price: 95 },
  { id: "shampoo", emoji: "🧴", name: { en: "Shampoo Bottle", hi: "शैम्पू" }, price: 110 },
  { id: "oil", emoji: "🛢️", name: { en: "Oil (1 Ltr)", hi: "तेल (1 लीटर)" }, price: 120 },
];

export const CUSTOMERS: Customer[] = [
  {
    id: "uncle",
    emoji: "👨🏽‍🦳",
    name: { en: "Sharma Uncle", hi: "शर्मा अंकल" },
    greeting: { en: "Namaste, beta!", hi: "नमस्ते, बेटा!" },
  },
  {
    id: "aunty",
    emoji: "👩🏽",
    name: { en: "Priya Aunty", hi: "प्रिया आंटी" },
    greeting: { en: "Hello, dear!", hi: "नमस्ते, बच्चे!" },
  },
  {
    id: "student",
    emoji: "🧒🏽",
    name: { en: "Rohan", hi: "रोहन" },
    greeting: { en: "Hi bhaiya!", hi: "हाय भैया!" },
  },
  {
    id: "parent",
    emoji: "👩🏽‍👧🏽",
    name: { en: "Meera & Anu", hi: "मीरा और अनु" },
    greeting: { en: "Good morning!", hi: "सुप्रभात!" },
  },
  {
    id: "delivery",
    emoji: "🧑🏽‍🔧",
    name: { en: "Raju", hi: "राजू" },
    greeting: { en: "Ram Ram ji!", hi: "राम राम जी!" },
  },
  {
    id: "dadi",
    emoji: "👵🏽",
    name: { en: "Dadi Ji", hi: "दादी जी" },
    greeting: { en: "Jeete raho!", hi: "जीते रहो!" },
  },
];

type Rng = () => number;
const randInt = (rng: Rng, lo: number, hi: number, step = 1) =>
  lo + step * Math.floor(rng() * (Math.floor((hi - lo) / step) + 1));
const pick = <T>(rng: Rng, arr: T[]): T => arr[Math.floor(rng() * arr.length)]!;

function pickProducts(
  rng: Rng,
  n: number,
  filterFn?: (p: (typeof PRODUCTS)[number]) => boolean,
): typeof PRODUCTS {
  const pool = filterFn ? PRODUCTS.filter(filterFn) : [...PRODUCTS];
  if (pool.length < n) return pickProducts(rng, n); // fallback if filter too strict
  const out = [];
  const p2 = [...pool];
  for (let i = 0; i < n; i++) out.push(p2.splice(Math.floor(rng() * p2.length), 1)[0]!);
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
export function choosePayment(
  rng: Rng,
  payable: number,
  allowExact: boolean,
): { paid: number; pieces: DenomId[] } {
  if (allowExact && rng() < 0.12 && PAY_NOTES.includes(payable)) {
    return { paid: payable, pieces: [`n${payable}` as DenomId] };
  }
  const options = PAY_NOTES.filter((n) => n > payable);
  if (options.length) {
    const note = (options.length > 1 && rng() < 0.25 ? options[1] : options[0])!;
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
      // First Coins (Simple multiples of 5, small)
      const ps = pickProducts(rng, 1, (p) => p.price <= 30 && p.price % 5 === 0);
      items = [item(ps[0]!, ps[0]!.price, randInt(rng, 1, 2))];
      break;
    }
    case 2: {
      // Shop Basics (Slightly larger, multiples of 5)
      const ps = pickProducts(rng, 2, (p) => p.price >= 10 && p.price <= 60 && p.price % 5 === 0);
      items = ps.map((p) => item(p, p.price));
      break;
    }
    case 3: {
      // Tricky Prices (Non-multiples of 5)
      const n = randInt(rng, 2, 3);
      const ps = pickProducts(rng, n, (p) => p.price <= 45); // Mix of tricky and normal
      items = ps.map((p) => item(p, p.price));
      break;
    }
    case 4: {
      // Shopping Basket (3-4 items)
      const n = randInt(rng, 3, 4);
      const ps = pickProducts(rng, n, (p) => p.price <= 45);
      items = ps.map((p) => item(p, p.price));
      break;
    }
    case 5: {
      // Buy More Save More (Qty 3-5 on one item, plus another item)
      const ps1 = pickProducts(rng, 1, (p) => p.price >= 5 && p.price <= 30);
      const ps2 = pickProducts(rng, 1, (p) => p.price >= 10 && p.price <= 40);
      const qty = randInt(rng, 3, 5);
      items = [item(ps1[0]!, ps1[0]!.price, qty), item(ps2[0]!, ps2[0]!.price, 1)];
      const off = qty >= 4 ? 10 : 5;
      discount = { label: { en: `Buy 3+, save ₹${off}`, hi: `3+ लो, ₹${off} बचाओ` }, amount: off };
      break;
    }
    case 6: {
      // Special Offers (3 items, flat discount)
      const n = 3;
      const ps = pickProducts(rng, n, (p) => p.price >= 15 && p.price <= 60);
      items = ps.map((p) => item(p, p.price));
      const off = pick(rng, [15, 20, 25]);
      discount = {
        label: { en: `Special offer: ₹${off} off`, hi: `खास ऑफ़र: ₹${off} छूट` },
        amount: off,
      };
      break;
    }
    case 7: {
      // Combo Offers (3-4 items)
      const n = randInt(rng, 3, 4);
      const ps = pickProducts(rng, n, (p) => p.price >= 15 && p.price <= 70);
      items = ps.map((p) => item(p, p.price));
      const off = pick(rng, [10, 15, 20]);
      discount = {
        label: { en: `Combo deal: save ₹${off}`, hi: `कॉम्बो: ₹${off} बचत` },
        amount: off,
      };
      break;
    }
    case 8: {
      // Percentage Discounts (2-3 items)
      const n = randInt(rng, 2, 3);
      const qty = randInt(rng, 1, 3);
      const pct = pick(rng, [10, 20, 50]);
      const ps = pickProducts(rng, n, (p) => p.price >= 15);

      const discountP = pickProducts(
        rng,
        1,
        (p) => p.price >= 20 && (p.price * qty * pct) % 100 === 0,
      )[0]!;

      items = [item(discountP, discountP.price, qty)];
      for (let i = 1; i < n; i++) items.push(item(ps[i]!, ps[i]!.price, 1));

      const sub = discountP.price * qty;
      discount = {
        label: {
          en: `${pct}% off on ${discountP.name.en}`,
          hi: `${discountP.name.hi} पर ${pct}% छूट`,
        },
        amount: (sub * pct) / 100,
      };
      break;
    }
    case 9: {
      // Big Shopping Day (4-5 items, qty 1-3)
      const n = randInt(rng, 4, 5);
      const ps = pickProducts(rng, n, (p) => p.price >= 10);
      items = ps.map((p) => item(p, p.price, randInt(rng, 1, 3)));
      break;
    }
    default: {
      // Rush Hour (4-6 items, random)
      const n = randInt(rng, 4, 6);
      const ps = pickProducts(rng, n, (p) => p.price >= 5 && p.price <= 60);
      items = ps.map((p) => item(p, p.price, randInt(rng, 1, 2)));
      if (rng() < 0.5) {
        const off = pick(rng, [10, 15, 20]);
        discount = {
          label: { en: `Rush deal: ₹${off} off`, hi: `झटपट ऑफ़र: ₹${off} छूट` },
          amount: off,
        };
      }
    }
  }

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const payable = Math.max(1, subtotal - (discount?.amount ?? 0));
  const { paid, pieces } = choosePayment(rng, payable, level >= 2);

  return {
    id: `L${level}-${index}-${Math.floor(rng() * 1e6)}`,
    level,
    customer: CUSTOMERS[(index + level) % CUSTOMERS.length]!,
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
  return Object.entries(tray).reduce(
    (s, [id, n]) => s + denomById(id as DenomId).value * (n ?? 0),
    0,
  );
}

export function trayState(tray: Tray, required: number): TotalState {
  const t = trayTotal(tray);
  if (t === 0) return required === 0 ? "exact" : "empty";
  if (t < required) return "below";
  if (t === required) return "exact";
  return "above";
}

export function evaluate(
  tray: Tray,
  scenario: Scenario,
  mistakes: number,
  hintsUsed: number,
): SubmissionResult {
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
