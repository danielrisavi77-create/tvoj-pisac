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
  { path: "/o-nama", heading: "O nama" },
  { path: "/kontakt", heading: "Kontakt" },
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

test("an unknown article returns 404", async ({ page }) => {
  expect((await page.goto("/clanci/nepoznat"))?.status()).toBe(404);
});
