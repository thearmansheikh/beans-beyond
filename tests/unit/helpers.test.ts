// Unit tests for src/utils/helpers.ts
// Run with: npx jest tests/unit/helpers.test.ts
// Install: npm install -D jest @types/jest ts-jest

import { formatPrice, isValidEmail, isValidPhone, isValidPostcode } from "../../src/utils/helpers";

describe("formatPrice", () => {
  it("formats integer prices", () => {
    expect(formatPrice(9)).toBe("£9.00");
  });
  it("formats decimal prices", () => {
    expect(formatPrice(3.5)).toBe("£3.50");
  });
});

describe("isValidEmail", () => {
  it("accepts valid email", () => {
    expect(isValidEmail("hello@bbcafe.co.uk")).toBe(true);
  });
  it("rejects invalid email", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts UK mobile", () => {
    expect(isValidPhone("+44 7700 000000")).toBe(true);
  });
  it("accepts landline", () => {
    expect(isValidPhone("020 0000 0000")).toBe(true);
  });
});

describe("isValidPostcode", () => {
  it("accepts E14 postcode", () => {
    expect(isValidPostcode("E14 7HG")).toBe(true);
  });
  it("rejects invalid postcode", () => {
    expect(isValidPostcode("not-a-postcode")).toBe(false);
  });
});
