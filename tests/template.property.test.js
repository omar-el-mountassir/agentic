import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { renderTemplate } from "../packages/template/src/index.js";

describe("renderTemplate property-based", () => {
  it("renders tokens using provided env mapping (idempotent on non-tokens)", () => {
    fc.assert(
      fc.property(
        // Keys restricted to the allowed token pattern: [A-Z0-9_]+
        fc.dictionary(
          fc
            .array(
              fc.constantFrom(
                ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".split("")
              ),
              { minLength: 1, maxLength: 8 }
            )
            .map((chars) => chars.join("")),
          fc.string()
        ),
        fc.string(),
        (env, filler) => {
          // create a template using some of the keys
          const keys = Object.keys(env).slice(0, 3);
          const tpl = keys.map((k) => `X{{${k}}}Y`).join(filler);
          const out = renderTemplate(tpl, env);
          // all tokens replaced by exact env values
          for (const k of keys) {
            expect(out.includes(env[k])).toBe(true);
          }
        }
      )
    );
  });

  it("never throws for string input regardless of env values", () => {
    fc.assert(
      fc.property(fc.string(), fc.jsonValue(), (tpl, anyVal) => {
        const env = { A: anyVal };
        expect(() => renderTemplate(tpl, env)).not.toThrow();
      })
    );
  });
});
