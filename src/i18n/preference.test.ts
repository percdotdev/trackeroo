import { beforeEach, describe, expect, it } from "vitest";
import { fakeBrowser } from "wxt/testing";
import {
  getStoredLocale,
  LOCALE_KEY,
  normalizeStoredLocale,
  setStoredLocale,
} from "./preference";

beforeEach(() => {
  fakeBrowser.reset();
});

describe("normalizeStoredLocale", () => {
  it("accepts supported locales", () => {
    expect(normalizeStoredLocale("de")).toBe("de");
    expect(normalizeStoredLocale("pt_BR")).toBe("pt_BR");
  });

  it("keeps the system sentinel", () => {
    expect(normalizeStoredLocale("system")).toBe("system");
  });

  it("falls back to system for unknown values", () => {
    expect(normalizeStoredLocale("xx")).toBe("system");
    expect(normalizeStoredLocale(42)).toBe("system");
    expect(normalizeStoredLocale(undefined)).toBe("system");
  });
});

describe("locale storage", () => {
  it("defaults to system when nothing is stored", async () => {
    expect(await getStoredLocale()).toBe("system");
  });

  it("round-trips a stored locale", async () => {
    await setStoredLocale("fr");
    expect(await getStoredLocale()).toBe("fr");
  });

  it("normalizes corrupt stored values", async () => {
    await fakeBrowser.storage.local.set({ [LOCALE_KEY]: "not-a-locale" });
    expect(await getStoredLocale()).toBe("system");
  });
});
