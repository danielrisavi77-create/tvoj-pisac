# Task 5 review package

Base: `25d27cd`
Head: `c711464`
Commit: `c711464 feat: add responsive public visual baseline`

## Diff

```diff
 src/app/(public)/layout.tsx               |   2 +
 src/app/globals.css                       | 383 +++++++++++++++++++++++-------
 src/app/layout.tsx                        |   2 +-
 src/components/public/DecorativeScene.tsx |  11 +
 tests/e2e/public-experience.spec.ts       |  53 ++++-
 5 files changed, 354 insertions(+), 97 deletions(-)
diff --git a/src/app/(public)/layout.tsx b/src/app/(public)/layout.tsx
index 9fc95f0..8132dc3 100644
--- a/src/app/(public)/layout.tsx
+++ b/src/app/(public)/layout.tsx
@@ -1,10 +1,12 @@
 import type { ReactNode } from "react";
+import { DecorativeScene } from "@/components/public/DecorativeScene";
 import { PublicFooter } from "@/components/public/PublicFooter";
 import { PublicHeader } from "@/components/public/PublicHeader";
 
 export default function PublicLayout({ children }: { children: ReactNode }) {
   return (
     <div className="public-layout">
+      <DecorativeScene />
       <PublicHeader />
       <main>{children}</main>
       <PublicFooter />
diff --git a/src/app/globals.css b/src/app/globals.css
index 544230e..d72fcac 100644
--- a/src/app/globals.css
+++ b/src/app/globals.css
@@ -1,8 +1,22 @@
 @import "tailwindcss";
 
 :root {
-  --background: #ffffff;
-  --foreground: #171717;
+  --background: #f4efe5;
+  --foreground: #24313d;
+  --tp-color-ink: #24313d;
+  --tp-color-muted: #5c6870;
+  --tp-color-paper: #f4efe5;
+  --tp-color-surface: #fffdf8;
+  --tp-color-surface-strong: #eee3d0;
+  --tp-color-line: #d8cdbb;
+  --tp-color-accent: #a94b38;
+  --tp-color-focus: #075e7a;
+  --tp-shadow: 0 1.5rem 3.5rem rgb(53 42 25 / 0.09);
+  --tp-space-1: 0.5rem;
+  --tp-space-2: 1rem;
+  --tp-space-3: 1.5rem;
+  --tp-space-4: 2rem;
+  --tp-radius-card: 1.125rem;
 }
 
 @theme inline {
@@ -12,47 +26,28 @@
   --font-mono: var(--font-geist-mono);
 }
 
-@media (prefers-color-scheme: dark) {
-  :root {
-    --background: #0a0a0a;
-    --foreground: #ededed;
-  }
-}
-
-body {
-  background: var(--background);
-  color: var(--foreground);
-  font-family: Arial, Helvetica, sans-serif;
-}
-
-:root {
-  --tp-color-ink: #24313d;
-  --tp-color-muted: #667582;
-  --tp-color-paper: #f7f3ec;
-  --tp-color-surface: #fffdf8;
-  --tp-color-line: #ded7ca;
-  --tp-space-1: 0.5rem;
-  --tp-space-2: 1rem;
-  --tp-space-3: 1.5rem;
-  --tp-space-4: 2rem;
-  --tp-radius-card: 1rem;
-}
+* { box-sizing: border-box; }
 
-* {
-  box-sizing: border-box;
+html, body {
+  min-width: 320px;
+  overflow-x: hidden;
+  background: var(--tp-color-paper);
 }
 
 body {
-  min-width: 320px;
   min-height: 100vh;
   margin: 0;
-  background: var(--tp-color-paper);
   color: var(--tp-color-ink);
-  font-family: Arial, Helvetica, sans-serif;
+  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
+  line-height: 1.6;
 }
 
-a {
-  color: inherit;
+a { color: inherit; overflow-wrap: anywhere; }
+
+a:focus-visible, summary:focus-visible {
+  outline: 3px solid var(--tp-color-focus);
+  outline-offset: 4px;
+  border-radius: 0.25rem;
 }
 
 .app-shell {
@@ -73,16 +68,13 @@ a {
   padding: var(--tp-space-1) 0;
 }
 
-.app-header__brand {
-  font-weight: 700;
-  text-decoration: none;
-}
+.app-header__brand { font-weight: 700; text-decoration: none; }
 
-.app-header__surface,
-.eyebrow {
+.app-header__surface, .eyebrow {
   color: var(--tp-color-muted);
-  font-size: 0.875rem;
-  letter-spacing: 0.04em;
+  font-size: 0.75rem;
+  font-weight: 700;
+  letter-spacing: 0.12em;
   text-transform: uppercase;
 }
 
@@ -106,108 +98,315 @@ a {
   max-width: 42rem;
   color: var(--tp-color-muted);
   font-size: 1.125rem;
-  line-height: 1.6;
 }
 
 .public-layout {
+  position: relative;
+  isolation: isolate;
   display: flex;
   min-height: 100vh;
   flex-direction: column;
+  overflow: hidden;
+  background:
+    radial-gradient(circle at 84% 4%, rgb(238 227 208 / 0.9), transparent 20rem),
+    linear-gradient(145deg, #f8f4ec 0%, var(--tp-color-paper) 55%, #eee6d8 100%);
 }
 
-.public-header,
-.public-footer,
-.public-layout > main {
-  width: min(100%, 72rem);
+.public-header, .public-footer, .public-layout > main {
+  position: relative;
+  z-index: 1;
+  width: min(100%, 76rem);
   margin: 0 auto;
-  padding: var(--tp-space-2);
-}
-
-.public-header,
-.public-header__nav,
-.public-header__actions,
-.public-footer__nav {
-  display: flex;
-  align-items: center;
-  gap: var(--tp-space-1);
+  padding-inline: clamp(1rem, 4vw, 2rem);
 }
 
 .public-header {
-  flex-wrap: wrap;
-  justify-content: space-between;
+  display: grid;
+  grid-template-columns: auto minmax(0, 1fr) auto;
+  align-items: center;
+  gap: var(--tp-space-2);
+  padding-block: clamp(1rem, 3vw, 1.75rem);
 }
 
 .public-header__brand {
+  color: var(--tp-color-ink);
+  font-family: Georgia, "Times New Roman", serif;
+  font-size: clamp(1.25rem, 2vw, 1.55rem);
   font-weight: 700;
+  letter-spacing: -0.03em;
   text-decoration: none;
 }
 
-.public-header__nav,
-.public-header__actions,
-.public-footer__nav {
-  flex-wrap: wrap;
+.public-header__nav, .public-header__actions, .public-footer__nav {
+  display: flex;
+  align-items: center;
+  gap: 0.25rem 0.65rem;
 }
 
-.public-header__nav a,
-.public-footer__nav a {
-  padding: 0.25rem;
+.public-header__nav { justify-content: center; flex-wrap: wrap; }
+.public-header__actions, .public-footer__nav { flex-wrap: wrap; }
+
+.public-header__nav a, .public-footer__nav a {
+  padding: 0.3rem 0.15rem;
+  color: var(--tp-color-muted);
+  font-size: 0.875rem;
+  text-decoration-color: transparent;
+  text-underline-offset: 0.25rem;
+}
+
+.public-header__nav a:hover, .public-footer__nav a:hover, .public-page-shell a:not(.public-cta):hover {
+  color: var(--tp-color-accent);
+  text-decoration-color: currentcolor;
 }
 
 .public-layout > main {
   flex: 1;
+  min-width: 0;
+  padding-block: clamp(1rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem);
 }
 
 .public-page-shell {
-  padding: clamp(var(--tp-space-3), 8vw, 5rem);
-  border: 1px solid var(--tp-color-line);
+  min-width: 0;
+  padding: clamp(1.5rem, 7vw, 5rem);
+  border: 1px solid rgb(216 205 187 / 0.95);
   border-radius: var(--tp-radius-card);
-  background: var(--tp-color-surface);
+  background: rgb(255 253 248 / 0.88);
+  box-shadow: var(--tp-shadow);
+}
+
+.public-page-shell h1, .public-page-shell h2, .public-page-shell h3 {
+  color: var(--tp-color-ink);
+  font-family: Georgia, "Times New Roman", serif;
+  line-height: 1.12;
+  text-wrap: balance;
 }
 
 .public-page-shell h1 {
-  max-width: 36rem;
-  margin: var(--tp-space-1) 0 var(--tp-space-2);
-  font-size: clamp(2rem, 7vw, 4.5rem);
-  line-height: 1;
+  max-width: 13ch;
+  margin: 0.3rem 0 var(--tp-space-2);
+  font-size: clamp(2.5rem, 7vw, 5.25rem);
+  letter-spacing: -0.055em;
 }
 
-.public-page-shell__intro,
-.public-footer p {
-  max-width: 42rem;
+.public-page-shell h2 { margin: 0; font-size: clamp(1.45rem, 3vw, 2.3rem); }
+.public-page-shell h3 { margin: 0; font-size: 1.2rem; }
+
+.public-page-shell__intro, .public-footer p {
+  max-width: 64ch;
+  margin: 0;
   color: var(--tp-color-muted);
-  line-height: 1.6;
+  font-size: clamp(1rem, 2vw, 1.15rem);
+}
+
+.public-page-shell > :not(:first-child) { margin-top: clamp(1.25rem, 4vw, 2.5rem); }
+
+.public-page-shell section, .public-page-shell > ul, .public-page-shell > ol {
+  display: grid;
+  gap: 1rem;
+  max-width: 70ch;
+  padding: 0;
+  list-style-position: inside;
+}
+
+.public-page-shell li {
+  min-width: 0;
+  padding: 1.1rem 0;
+  border-top: 1px solid var(--tp-color-line);
+}
+
+.public-page-shell li p, .public-page-shell td p {
+  max-width: 66ch;
+  margin: 0.7rem 0 0;
+}
+
+.public-page-shell section > p { max-width: 66ch; }
+
+.public-page-shell section > ul, .public-page-shell section > ol {
+  display: grid;
+  gap: 1rem;
+  padding: 0;
+  list-style: none;
+}
+
+.public-page-shell section > ul li, .public-page-shell section > ol li {
+  padding: 1.25rem;
+  border: 1px solid var(--tp-color-line);
+  border-radius: 0.8rem;
+  background: rgb(255 253 248 / 0.72);
+}
+
+.public-package-card {
+  display: grid;
+  gap: 0.65rem;
+  padding: clamp(1.25rem, 4vw, 2rem);
+  border: 1px solid var(--tp-color-line);
+  border-radius: 0.9rem;
+  background: linear-gradient(145deg, var(--tp-color-surface), #faf5eb);
+  box-shadow: 0 0.75rem 1.8rem rgb(53 42 25 / 0.05);
+}
+
+.public-package-card__price {
+  margin: 0;
+  color: var(--tp-color-accent);
+  font-family: Georgia, "Times New Roman", serif;
+  font-size: clamp(1.75rem, 4vw, 2.4rem);
+  font-weight: 700;
+}
+
+.public-package-card a, .public-page-shell a:not(.public-cta) {
+  color: var(--tp-color-focus);
+  font-weight: 700;
+  text-decoration-thickness: 0.08em;
+  text-underline-offset: 0.18em;
 }
 
 .public-cta {
-  display: inline-block;
-  padding: 0.5rem 0.75rem;
+  display: inline-flex;
+  align-items: center;
+  justify-content: center;
+  min-height: 2.75rem;
+  margin: 0.35rem 0.35rem 0 0;
+  padding: 0.65rem 0.9rem;
   border: 1px solid var(--tp-color-ink);
-  border-radius: 0.5rem;
+  border-radius: 999px;
+  font-size: 0.9rem;
   font-weight: 700;
+  line-height: 1.2;
+  text-align: center;
   text-decoration: none;
 }
 
-.public-cta--primary {
-  background: var(--tp-color-ink);
-  color: var(--tp-color-surface);
+.public-cta--primary { background: var(--tp-color-ink); color: var(--tp-color-surface); }
+.public-cta--secondary { background: rgb(255 253 248 / 0.72); color: var(--tp-color-ink); }
+
+.public-cta:hover {
+  transform: translateY(-1px);
+  box-shadow: 0 0.4rem 0.9rem rgb(36 49 61 / 0.12);
 }
 
-.public-cta--secondary {
-  background: var(--tp-color-surface);
+.public-page-shell table {
+  display: block;
+  width: 100%;
+  max-width: 100%;
+  overflow-x: auto;
+  border-spacing: 0;
+  border-collapse: collapse;
+}
+
+.public-page-shell caption {
+  padding-bottom: 1rem;
+  color: var(--tp-color-muted);
+  font-size: 0.9rem;
+  text-align: left;
 }
 
-a:focus-visible {
-  outline: 3px solid #1d70a2;
-  outline-offset: 3px;
+.public-page-shell th, .public-page-shell td {
+  min-width: 9rem;
+  padding: 1rem;
+  border-bottom: 1px solid var(--tp-color-line);
+  vertical-align: top;
+  overflow-wrap: anywhere;
+  text-align: left;
+}
+
+.public-page-shell thead { background: var(--tp-color-surface-strong); }
+
+.public-page-shell details {
+  padding: 1rem 0;
+  border-top: 1px solid var(--tp-color-line);
+}
+
+.public-page-shell summary {
+  cursor: pointer;
+  color: var(--tp-color-ink);
+  font-family: Georgia, "Times New Roman", serif;
+  font-weight: 700;
+}
+
+.public-footer {
+  display: grid;
+  gap: 0.75rem;
+  padding-block: 1.5rem 2rem;
+  border-top: 1px solid rgb(216 205 187 / 0.8);
+}
+
+.decorative-scene {
+  position: absolute;
+  z-index: 0;
+  inset: 0;
+  overflow: hidden;
+  pointer-events: none;
+}
+
+.decorative-scene__orb, .decorative-scene__line {
+  position: absolute;
+  display: block;
+  pointer-events: none;
+}
+
+.decorative-scene__orb {
+  width: clamp(12rem, 26vw, 25rem);
+  aspect-ratio: 1;
+  border-radius: 50%;
+  filter: blur(1px);
+}
+
+.decorative-scene__orb--sun {
+  top: -8rem;
+  right: -7rem;
+  background: rgb(223 169 96 / 0.23);
+  animation: public-float 16s ease-in-out infinite alternate;
+}
+
+.decorative-scene__orb--ink {
+  bottom: 9rem;
+  left: -15rem;
+  background: rgb(7 94 122 / 0.1);
+  animation: public-float 20s ease-in-out infinite alternate-reverse;
+}
+
+.decorative-scene__line {
+  top: 23rem;
+  right: 8%;
+  width: min(38vw, 31rem);
+  height: 1px;
+  background: linear-gradient(90deg, transparent, rgb(169 75 56 / 0.5), transparent);
+  transform: rotate(-18deg);
+  animation: public-drift 18s ease-in-out infinite alternate;
+}
+
+@keyframes public-float {
+  to { transform: translate3d(-1rem, 1.5rem, 0) scale(1.04); }
+}
+
+@keyframes public-drift {
+  to { transform: translate3d(-1.5rem, 1rem, 0) rotate(-12deg); }
+}
+
+@media (max-width: 70rem) {
+  .public-header { grid-template-columns: auto 1fr; }
+  .public-header__nav { justify-content: flex-end; }
+  .public-header__actions { grid-column: 1 / -1; }
+}
+
+@media (max-width: 34rem) {
+  .public-header { display: flex; align-items: flex-start; flex-direction: column; }
+  .public-header__nav, .public-header__actions { width: 100%; justify-content: flex-start; }
+  .public-header__nav a { font-size: 0.8125rem; }
+  .public-page-shell { border-radius: 0.85rem; }
+  .public-page-shell th, .public-page-shell td { min-width: 7rem; padding: 0.75rem; }
 }
 
 @media (prefers-reduced-motion: reduce) {
-  *,
-  *::before,
-  *::after {
+  *, *::before, *::after {
     animation-duration: 0.01ms !important;
     animation-iteration-count: 1 !important;
-    transition-duration: 0.01ms !important;
     scroll-behavior: auto !important;
+    transition-duration: 0.01ms !important;
+  }
+
+  .decorative-scene__orb, .decorative-scene__line, .public-cta:hover {
+    animation: none !important;
+    transform: none !important;
   }
 }
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index 9050de5..8ce14d5 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -15,7 +15,7 @@ const geistMono = Geist_Mono({
 
 export const metadata: Metadata = {
   title: "Tvoj Pisac",
-  description: "Foundation aplikacije Tvoj Pisac",
+  description: "Pregledna hrvatska prezentacija usluge Tvoj Pisac u razvojnoj fazi.",
 };
 
 export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
diff --git a/src/components/public/DecorativeScene.tsx b/src/components/public/DecorativeScene.tsx
new file mode 100644
index 0000000..69d76b6
--- /dev/null
+++ b/src/components/public/DecorativeScene.tsx
@@ -0,0 +1,11 @@
+import type { JSX } from "react";
+
+export function DecorativeScene(): JSX.Element {
+  return (
+    <div aria-hidden="true" className="decorative-scene">
+      <span aria-hidden="true" className="decorative-scene__orb decorative-scene__orb--sun" />
+      <span aria-hidden="true" className="decorative-scene__orb decorative-scene__orb--ink" />
+      <span aria-hidden="true" className="decorative-scene__line" />
+    </div>
+  );
+}
diff --git a/tests/e2e/public-experience.spec.ts b/tests/e2e/public-experience.spec.ts
index 8f7df63..fca5882 100644
--- a/tests/e2e/public-experience.spec.ts
+++ b/tests/e2e/public-experience.spec.ts
@@ -18,21 +18,66 @@ const publicRoutes = [
     path: "/clanci/prije-nego-sto-zatrazi-ponudu",
     heading: "Što pripremiti prije nego što zatražiš ponudu",
   },
+  { path: "/clanci/kako-izgleda-proces", heading: "Kako izgleda proces rada" },
+  {
+    path: "/clanci/kontrola-kvalitete-i-odobrenje",
+    heading: "Kontrola kvalitete i završno odobrenje",
+  },
   { path: "/o-nama", heading: "O nama" },
   { path: "/kontakt", heading: "Kontakt" },
 ];
 
 for (const route of publicRoutes) {
-  test(`${route.path} renders its public heading`, async ({ page }) => {
+  test(`${route.path} is usable on mobile with reduced motion`, async ({ page }) => {
+    await page.emulateMedia({ reducedMotion: "reduce" });
     await page.goto(route.path);
+
     await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
+    await expect(page.locator("main")).toHaveCount(1);
+    await expect(page.locator("main")).toBeVisible();
+    expect(
+      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
+    ).toBe(true);
+    expect(
+      await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches),
+    ).toBe(true);
   });
 }
 
-test("an unknown package returns 404", async ({ page }) => {
-  expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
+test("the public scene is decorative and hidden from assistive technology", async ({ page }) => {
+  await page.goto("/");
+  await expect(page.locator(".decorative-scene")).toHaveAttribute("aria-hidden", "true");
+  await expect(page.locator(".decorative-scene [aria-hidden=\"true\"]")).toHaveCount(3);
+});
+
+test("keyboard users can reach visible header links and normal CTAs", async ({ page }) => {
+  await page.goto("/");
+
+  const header = page.getByRole("banner");
+  const headerLinks = header.getByRole("link");
+  const headerLinkCount = await headerLinks.count();
+
+  for (let index = 0; index < headerLinkCount; index += 1) {
+    await page.keyboard.press("Tab");
+    await expect(page.locator(":focus")).toBeVisible();
+    expect(await page.locator(":focus").evaluate((element) => element.tagName)).toBe("A");
+  }
+
+  await expect(header.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
+    "href",
+    "/kontakt",
+  );
+  await expect(header.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
+    "href",
+    "/paketi",
+  );
+  await expect(header.getByRole("link", { name: "Dogovori razgovor" })).toHaveAttribute(
+    "href",
+    "/kontakt#razgovor",
+  );
 });
 
-test("an unknown article returns 404", async ({ page }) => {
+test("unknown public resources return 404", async ({ page }) => {
+  expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
   expect((await page.goto("/clanci/nepoznat"))?.status()).toBe(404);
 });
```

