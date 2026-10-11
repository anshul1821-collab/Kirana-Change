import type { Lang } from "./types";

const STRINGS = {
  title: { en: "KIRANA CHANGE", hi: "किराना चेंज" },
  tagline: { en: "Every Rupee Counts!", hi: "हर रुपया मायने रखता है!" },
  intro: {
    en: "Run your own little shop, help customers, and become a money master!",
    hi: "अपनी छोटी दुकान चलाओ, ग्राहकों की मदद करो और पैसों के उस्ताद बनो!",
  },
  play: { en: "LET'S PLAY!", hi: "चलो खेलें!" },
  levels: { en: "Your Shop Journey", hi: "तुम्हारी दुकान की यात्रा" },
  level: { en: "Level", hi: "स्तर" },
  locked: { en: "Locked", hi: "बंद" },
  customer: { en: "Customer", hi: "ग्राहक" },
  of: { en: "of", hi: "में से" },
  bill: { en: "BILL", hi: "बिल" },
  subtotal: { en: "Subtotal", hi: "कुल" },
  discount: { en: "Discount", hi: "छूट" },
  totalToPay: { en: "TOTAL TO PAY", hi: "देने हैं" },
  customerGave: { en: "CUSTOMER GAVE", hi: "ग्राहक ने दिए" },
  drawer: { en: "Cash Drawer", hi: "गल्ला" },
  drawerHint: { en: "Tap or drag money into the tray", hi: "पैसों को टैप करो या ट्रे में खींचो" },
  tray: { en: "CHANGE FOR THE CUSTOMER", hi: "ग्राहक के लिए छुट्टे" },
  trayEmpty: { en: "Choose notes and coins from the drawer!", hi: "गल्ले से नोट और सिक्के चुनो!" },
  giving: { en: "YOU ARE GIVING", hi: "तुम दे रहे हो" },
  clear: { en: "Clear", hi: "हटाओ" },
  remove: { en: "Remove one", hi: "एक हटाओ" },
  st_empty: { en: "Start counting!", hi: "गिनना शुरू करो!" },
  st_below: { en: "Keep counting!", hi: "गिनते रहो!" },
  st_check: { en: "Check your change!", hi: "छुट्टे जाँचो!" },
  st_ready: { en: "Ready to serve your customer?", hi: "ग्राहक को देने के लिए तैयार?" },
  give: { en: "GIVE CHANGE", hi: "छुट्टे दो" },
  noChange: { en: "NO CHANGE NEEDED", hi: "छुट्टे नहीं चाहिए" },
  hint: { en: "Show hint", hi: "संकेत दिखाओ" },
  hintTitle: { en: "Count Up!", hi: "ऊपर गिनो!" },
  hintIntro: {
    en: "Start at the price and add money until you reach what the customer paid.",
    hi: "दाम से शुरू करो और ग्राहक के दिए पैसों तक जोड़ते जाओ।",
  },
  price: { en: "Price", hi: "दाम" },
  paid: { en: "Customer paid", hi: "ग्राहक ने दिए" },
  step: { en: "STEP", hi: "कदम" },
  next: { en: "Next step", hi: "अगला कदम" },
  prev: { en: "Previous", hi: "पिछला" },
  showPieces: { en: "Show me the pieces", hi: "पैसे रख दो" },
  close: { en: "Got it!", hi: "समझ गया!" },
  correct: {
    en: "Perfect! You're a smart shopkeeper!",
    hi: "बहुत बढ़िया! तुम समझदार दुकानदार हो!",
  },
  correctSub: { en: "The customer is happy!", hi: "ग्राहक खुश है!" },
  tooLittle: {
    en: "Almost there! The customer needs ₹{x} more.",
    hi: "बस थोड़ा और! ग्राहक को ₹{x} और चाहिए।",
  },
  tooMuch: {
    en: "Oops! That's ₹{x} too much. Let's make it fair.",
    hi: "अरे! ये ₹{x} ज़्यादा है। चलो ठीक करें।",
  },
  timeout: {
    en: "Time's up! Let's try this customer again.",
    hi: "समय खत्म! चलो फिर से कोशिश करें।",
  },
  tryAgain: { en: "Try again", hi: "फिर से" },
  continue: { en: "Continue", hi: "आगे बढ़ो" },
  done1: { en: "Wonderful work!", hi: "शानदार काम!" },
  done2: { en: "Your shop is getting busier!", hi: "तुम्हारी दुकान चल पड़ी है!" },
  done3: { en: "You're becoming a money master!", hi: "तुम पैसों के उस्ताद बन रहे हो!" },
  served: { en: "Customers served", hi: "ग्राहक संभाले" },
  mistakes: { en: "Tries to fix", hi: "सुधार" },
  hintsUsed: { en: "Hints used", hi: "संकेत लिए" },
  replay: { en: "Play again", hi: "फिर खेलो" },
  nextLevel: { en: "Next level", hi: "अगला स्तर" },
  home: { en: "Home", hi: "घर" },
  sound: { en: "Sound", hi: "आवाज़" },
  speak: { en: "Read aloud", hi: "पढ़कर सुनाओ" },
  timeLeft: { en: "seconds left", hi: "सेकंड बाकी" },
  wants: {
    en: "I'd like {items}. Here's ₹{paid}!",
    hi: "मुझे {items} चाहिए। ये लो ₹{paid}!",
  },
  wantsExact: {
    en: "I'd like {items}. Here's exactly ₹{paid}!",
    hi: "मुझे {items} चाहिए। ये लो पूरे ₹{paid}!",
  },
  and: { en: "and", hi: "और" },
} as const;

export type StringKey = keyof typeof STRINGS;

export function t(lang: Lang, key: StringKey, vars: Record<string, string | number> = {}) {
  let s: string = STRINGS[key][lang];
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
