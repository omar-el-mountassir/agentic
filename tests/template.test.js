import { describe, it, expect } from "vitest";
import { renderTemplate } from "../packages/template/src/index.js";

describe("renderTemplate", () => {
  it("replaces single variable", () => {
    const out = renderTemplate("Hello {{NAME}}", { NAME: "World" });
    expect(out).toBe("Hello World");
  });

  it("trims whitespace around tokens", () => {
    const out = renderTemplate("Hello {{  NAME   }}!", { NAME: "X" });
    expect(out).toBe("Hello X!");
  });

  it("leaves missing variables empty and can signal via callback", () => {
    const missing = [];
    const out = renderTemplate("Hi {{A}} {{B}}", { A: "a" }, (k) =>
      missing.push(k)
    );
    expect(out).toBe("Hi a ");
    expect(missing).toEqual(["B"]);
  });

  it("handles non-string values by casting", () => {
    const out = renderTemplate("v={{V}}", { V: 123 });
    expect(out).toBe("v=123");
  });

  it("throws on non-string content", () => {
    // @ts-ignore
    expect(() => renderTemplate(null, {})).toThrow();
  });
});
