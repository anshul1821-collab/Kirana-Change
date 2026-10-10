import { describe, expect, it } from "vitest";
import { countUpSteps, evaluate, generateScenario, trayTotal, isUnlocked, emptyProgress } from "./engine";
import type { Scenario } from "./types";

const base = (payable: number, paid: number) =>
  ({ ...generateScenario(1, 0), payable, paid }) as Scenario;

describe("engine", () => {
  it("count-up from 35 to 50 is +5 then +10", () => {
    expect(countUpSteps(35, 50).map((s) => s.to)).toEqual([40, 50]);
  });
  it("count-up steps always reach the paid amount", () => {
    for (let p = 1; p < 500; p += 7) {
      const s = countUpSteps(p, 500);
      expect(s[s.length - 1].to).toBe(500);
    }
  });
  it("tray total counts coins and notes", () => {
    expect(trayTotal({ c5: 1, n10: 2 })).toBe(25);
  });
  it("evaluates too little, too much and correct", () => {
    const sc = base(35, 50);
    expect(evaluate({ c5: 1 }, sc, 0, 0)).toEqual({ kind: "too-little", difference: 10 });
    expect(evaluate({ n20: 1 }, sc, 0, 0)).toEqual({ kind: "too-much", difference: 5 });
    expect(evaluate({ c5: 1, n10: 1 }, sc, 0, 0)).toEqual({ kind: "correct", stars: 3 });
  });
  it("customer always pays at least the payable amount", () => {
    for (let l = 1; l <= 10; l++)
      for (let i = 0; i < 30; i++) {
        const s = generateScenario(l, i);
        expect(s.paid).toBeGreaterThanOrEqual(s.payable);
        expect(Number.isInteger(s.payable)).toBe(true);
      }
  });
  it("level 2 unlocks only after level 1 has stars", () => {
    const p = emptyProgress();
    expect(isUnlocked(p, 1)).toBe(false);
    p.stars[0] = 1;
    expect(isUnlocked(p, 1)).toBe(true);
  });
});
