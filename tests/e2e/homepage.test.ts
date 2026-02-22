// E2E tests — uses Playwright
// Install: npm install -D @playwright/test && npx playwright install
// Run:     npx playwright test

import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows hero text", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Beans & Beyond")).toBeVisible();
  });

  test("Order Online button navigates to /order", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.getByRole("link", { name: /Order Online/i }).first().click();
    await expect(page).toHaveURL(/\/order/);
  });

  test("View Menu button navigates to /menu", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.getByRole("link", { name: /View Menu/i }).click();
    await expect(page).toHaveURL(/\/menu/);
  });
});

test.describe("Menu Page", () => {
  test("displays menu items", async ({ page }) => {
    await page.goto("http://localhost:3000/menu");
    await expect(page.getByRole("heading", { name: /Our Menu/i })).toBeVisible();
  });

  test("search filters results", async ({ page }) => {
    await page.goto("http://localhost:3000/menu");
    await page.getByPlaceholder("Search menu…").fill("latte");
    await expect(page.getByText("Latte")).toBeVisible();
  });
});

test.describe("Order Page", () => {
  test("shows order type selection", async ({ page }) => {
    await page.goto("http://localhost:3000/order");
    await expect(page.getByText("Dine In")).toBeVisible();
    await expect(page.getByText("Takeaway")).toBeVisible();
    await expect(page.getByText("Delivery")).toBeVisible();
  });
});
