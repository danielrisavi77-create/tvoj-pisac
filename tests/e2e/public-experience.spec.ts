import { expect, test } from "@playwright/test";

const publicRoutes = [
  { path: "/", heading: "Tvoj Pisac" },
  { path: "/usluge", heading: "Usluge" },
  { path: "/paketi", heading: "Paketi" },
  { path: "/paketi/seminarski", heading: "Seminarski rad" },
  { path: "/paketi/zavrsni", heading: "Završni rad" },
  { path: "/paketi/diplomski", heading: "Diplomski/master's rad" },
  { path: "/paketi/specijalisticki", heading: "Specijalistički rad" },
  { path: "/paketi/doktorski", heading: "Doktorski rad" },
  { path: "/cijene", heading: "Cijene" },
  { path: "/proces", heading: "Proces" },
  { path: "/primjeri", heading: "Primjeri" },
  { path: "/faq", heading: "Česta pitanja" },
  { path: "/clanci", heading: "Članci" },
  {
    path: "/clanci/prije-nego-sto-zatrazi-ponudu",
    heading: "Što pripremiti prije nego što zatražiš ponudu",
  },
  { path: "/clanci/kako-izgleda-proces", heading: "Kako izgleda proces rada" },
  {
    path: "/clanci/kontrola-kvalitete-i-odobrenje",
    heading: "Kontrola kvalitete i završno odobrenje",
  },
  { path: "/o-nama", heading: "O nama" },
  { path: "/kontakt", heading: "Kontakt" },
];

for (const route of publicRoutes) {
  test(`${route.path} is usable on mobile with reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route.path);

    await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    expect(
      await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    ).toBe(true);
  });
}

test("the public scene is decorative and hidden from assistive technology", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".decorative-scene")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".decorative-scene [aria-hidden=\"true\"]")).toHaveCount(3);
});

test("keyboard users can reach visible header links and normal CTAs", async ({ page }) => {
  await page.goto("/");

  const header = page.getByRole("banner");
  const headerLinks = header.getByRole("link");
  const headerLinkCount = await headerLinks.count();

  for (let index = 0; index < headerLinkCount; index += 1) {
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
    expect(await page.locator(":focus").evaluate((element) => element.tagName)).toBe("A");
  }

  await expect(header.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
    "href",
    "/kontakt",
  );
  await expect(header.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
    "href",
    "/paketi",
  );
  await expect(header.getByRole("link", { name: "Dogovori razgovor" })).toHaveAttribute(
    "href",
    "/kontakt#razgovor",
  );
});

test("unknown public resources return 404", async ({ page }) => {
  expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
  expect((await page.goto("/clanci/nepoznat"))?.status()).toBe(404);
});
