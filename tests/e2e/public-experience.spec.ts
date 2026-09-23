import { expect, test } from "@playwright/test";

const publicRoutes = [
  { path: "/", heading: "Tvoj Pisac" },
  { path: "/usluge", heading: "Usluge" },
  { path: "/paketi", heading: "Paketi" },
  { path: "/paketi/seminarski", heading: "Seminarski rad" },
  { path: "/cijene", heading: "Cijene" },
];

for (const route of publicRoutes) {
  test(`${route.path} renders its public heading`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
  });
}

test("an unknown package returns 404", async ({ page }) => {
  expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
});
