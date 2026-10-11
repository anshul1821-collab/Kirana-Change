import type { Lang, Scenario, SubmissionResult } from "@/game/types";

export interface DialogueContent {
  speaker: "shopkeeper" | "customer";
  speakerName: string;
  avatarEmoji: string;
  text: string;
}


/**
 * Welcome dialogue from the Shopkeeper when the shop opens
 */
export function getShopkeeperWelcome(lang: Lang): DialogueContent {
  return {
    speaker: "shopkeeper",
    speakerName: lang === "hi" ? "दुकानदार अंकल" : "Shopkeeper Uncle",
    avatarEmoji: "👨🏽‍🦳",
    text:
      lang === "hi"
        ? "नमस्ते! गुप्ता किराना स्टोर में स्वागत है! 🙏"
        : "Namaste! Welcome to Gupta Kirana Store! 🙏",
  };
}

/**
 * Shopkeeper celebration on correct change
 */
export function getShopkeeperPraise(lang: Lang): DialogueContent {
  return {
    speaker: "shopkeeper",
    speakerName: lang === "hi" ? "दुकानदार अंकल" : "Shopkeeper Uncle",
    avatarEmoji: "👨🏽‍🦳",
    text:
      lang === "hi"
        ? "शाबाश! बिल्कुल सही हिसाब! ⭐"
        : "Shabash! Perfect calculation! ⭐",
  };
}

/**
 * Customer arrival and order request with real scenario amounts
 */
export function getCustomerOrderDialogue(scenario: Scenario, lang: Lang): DialogueContent {
  const exact = scenario.paid === scenario.payable;

  let text = "";
  if (lang === "hi") {
    if (exact) {
      text = `नमस्ते! ये लीजिए पूरे ₹${scenario.paid}! 😊`;
    } else {
      text = `नमस्ते! ये लीजिए ₹${scenario.paid}, बाकी छुट्टे दे दीजिए! 😊`;
    }
  } else {
    if (exact) {
      text = `Namaste! Here is exact ₹${scenario.paid}! 😊`;
    } else {
      text = `Namaste! Here's ₹${scenario.paid}, change please! 😊`;
    }
  }

  return {
    speaker: "customer",
    speakerName: scenario.customer.name[lang],
    avatarEmoji: scenario.customer.emoji,
    text,
  };
}

/**
 * Contextual feedback dialogue when change is submitted
 */
export function getFeedbackDialogue(
  scenario: Scenario,
  result: SubmissionResult,
  lang: Lang,
): DialogueContent {
  const customerName = scenario.customer.name[lang];
  const emoji = scenario.customer.emoji;

  if (result.kind === "correct") {
    return {
      speaker: "customer",
      speakerName: customerName,
      avatarEmoji: emoji,
      text:
        lang === "hi"
          ? "बहुत-बहुत धन्यवाद! बिल्कुल सही हिसाब! 😊"
          : "Thank you! Perfect change! 😊",
    };
  }

  if (result.kind === "too-little") {
    return {
      speaker: "customer",
      speakerName: customerName,
      avatarEmoji: emoji,
      text:
        lang === "hi"
          ? `अरे, लगता है ₹${result.difference} कम हैं! 🤔`
          : `Looks like ₹${result.difference} short, please check! 🤔`,
    };
  }

  if (result.kind === "too-much") {
    return {
      speaker: "customer",
      speakerName: customerName,
      avatarEmoji: emoji,
      text:
        lang === "hi"
          ? `आपने ₹${result.difference} ज़्यादा दे दिए! देख लीजिए। 😊`
          : `You gave ₹${result.difference} extra! Please check. 😊`,
    };
  }

  // Timeout
  return {
    speaker: "customer",
    speakerName: customerName,
    avatarEmoji: emoji,
    text:
      lang === "hi"
        ? "कोई बात नहीं! आराम से छुट्टे गिनते हैं।"
        : "No problem! Take your time to count.",
  };
}

