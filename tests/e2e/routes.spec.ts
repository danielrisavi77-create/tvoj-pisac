import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: /Tvoj Pisac/i },
  { path: "/portal", heading: /Klijentski portal.*razvojni shell/i },
  { path: "/admin", heading: /Administracija.*razvojni shell/i },
];

for (const route of routes) {
  test(`${route.path} renders on a mobile viewport without horizontal overflow`, async ({
    page,
  }) => {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}
