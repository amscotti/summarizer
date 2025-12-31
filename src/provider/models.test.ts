import { afterEach, beforeEach, expect, spyOn, test } from "bun:test";
import type { LanguageModel } from "ai";
import { getAvailableProvider } from "./models.ts";

let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  const env = process.env as Record<string, string | undefined>;
  env.ANTHROPIC_API_KEY = undefined;
  env.GOOGLE_API_KEY = undefined;
  env.XAI_API_KEY = undefined;
  env.OPENAI_API_KEY = undefined;
});

afterEach(() => {
  process.env = originalEnv;
});

test("returns Anthropic when only ANTHROPIC_API_KEY is set", () => {
  process.env.ANTHROPIC_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Anthropic");
  expect(provider.envKey).toBe("ANTHROPIC_API_KEY");
  expect(provider.model).toBeDefined();
});

test("returns Google when only GOOGLE_API_KEY is set", () => {
  process.env.GOOGLE_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Google");
  expect(provider.envKey).toBe("GOOGLE_API_KEY");
  expect(provider.model).toBeDefined();
});

test("returns xAI when only XAI_API_KEY is set", () => {
  process.env.XAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("xAI");
  expect(provider.envKey).toBe("XAI_API_KEY");
  expect(provider.model).toBeDefined();
});

test("returns OpenAI when only OPENAI_API_KEY is set", () => {
  process.env.OPENAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("OpenAI");
  expect(provider.envKey).toBe("OPENAI_API_KEY");
  expect(provider.model).toBeDefined();
});

test("prefers Anthropic over Google when both are set", () => {
  process.env.ANTHROPIC_API_KEY = "test-key";
  process.env.GOOGLE_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Anthropic");
});

test("prefers Anthropic over xAI when both are set", () => {
  process.env.ANTHROPIC_API_KEY = "test-key";
  process.env.XAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Anthropic");
});

test("prefers Anthropic over OpenAI when both are set", () => {
  process.env.ANTHROPIC_API_KEY = "test-key";
  process.env.OPENAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Anthropic");
});

test("prefers Google over xAI when both are set", () => {
  process.env.GOOGLE_API_KEY = "test-key";
  process.env.XAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Google");
});

test("prefers Google over OpenAI when both are set", () => {
  process.env.GOOGLE_API_KEY = "test-key";
  process.env.OPENAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Google");
});

test("prefers xAI over OpenAI when both are set", () => {
  process.env.XAI_API_KEY = "test-key";
  process.env.OPENAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("xAI");
});

test("selects Anthropic when all four API keys are set (priority test)", () => {
  process.env.ANTHROPIC_API_KEY = "test-key";
  process.env.GOOGLE_API_KEY = "test-key";
  process.env.XAI_API_KEY = "test-key";
  process.env.OPENAI_API_KEY = "test-key";
  const provider = getAvailableProvider();
  expect(provider.name).toBe("Anthropic");
});

test("exits with error when no API key is set", () => {
  const exitSpy = spyOn(process, "exit").mockImplementation(() => {
    throw new Error("process.exit called");
  });
  const errorSpy = spyOn(console, "error").mockImplementation(() => {});

  expect(() => getAvailableProvider()).toThrow("process.exit called");

  expect(errorSpy).toHaveBeenCalledTimes(2);
  expect(errorSpy).toHaveBeenCalledWith("Error: No AI provider API key found.");
  expect(errorSpy).toHaveBeenCalledWith(
    "Set one of: ANTHROPIC_API_KEY, GOOGLE_API_KEY, XAI_API_KEY, OPENAI_API_KEY",
  );
  expect(exitSpy).toHaveBeenCalledWith(1);

  exitSpy.mockRestore();
  errorSpy.mockRestore();
});
