import { test, expect } from "@playwright/test";

test("has header", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header");
  await expect(header).toBeVisible();
});
