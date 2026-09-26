# Task 3 review package

Base: `fcaa3b3`
Head: `0ac6379`
Commit: `0ac6379 feat: present public services and catalogue`

## Diff

```diff
 src/app/(public)/cijene/page.tsx        | 35 +++++++++++++++++++++++++++
 src/app/(public)/page.tsx               |  8 +++++--
 src/app/(public)/paketi/[slug]/page.tsx | 42 +++++++++++++++++++++++++++++++++
 src/app/(public)/paketi/page.tsx        | 18 ++++++++++++++
 src/app/(public)/usluge/page.tsx        | 42 +++++++++++++++++++++++++++++++++
 src/components/public/PackageCard.tsx   | 28 ++++++++++++++++++++++
 tests/components/public.test.tsx        | 41 ++++++++++++++++++++++++++++++++
 tests/components/shell.test.tsx         |  7 +++++-
 tests/e2e/public-experience.spec.ts     | 20 ++++++++++++++++
 9 files changed, 238 insertions(+), 3 deletions(-)
diff --git a/src/app/(public)/cijene/page.tsx b/src/app/(public)/cijene/page.tsx
new file mode 100644
index 0000000..f26f35d
--- /dev/null
+++ b/src/app/(public)/cijene/page.tsx
@@ -0,0 +1,35 @@
+import { formatPublicPackagePrice } from "@/components/public/PackageCard";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_PACKAGES } from "@/content/public";
+
+export default function PricingPage() {
+  return (
+    <PublicPageShell
+      title="Cijene"
+      intro="Standardne cijene služe kao pregled početne ponude za jasno definirane pakete."
+    >
+      <table>
+        <caption>Standardne cijene paketa</caption>
+        <thead>
+          <tr>
+            <th scope="col">Paket</th>
+            <th scope="col">Cijena</th>
+            <th scope="col">Napomena</th>
+          </tr>
+        </thead>
+        <tbody>
+          {PUBLIC_PACKAGES.map((packageContent) => (
+            <tr key={packageContent.slug}>
+              <th scope="row">{packageContent.title}</th>
+              <td>{formatPublicPackagePrice(packageContent.priceEur)}</td>
+              <td>
+                <p>{packageContent.scopeNote}</p>
+                <p>{packageContent.priceNote}</p>
+              </td>
+            </tr>
+          ))}
+        </tbody>
+      </table>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/page.tsx b/src/app/(public)/page.tsx
index 79f9c1f..a744369 100644
--- a/src/app/(public)/page.tsx
+++ b/src/app/(public)/page.tsx
@@ -1,16 +1,20 @@
 import { PublicCta } from "@/components/public/PublicCta";
 import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_PAGE_COPY } from "@/content/public";
 
 export default function PublicPage() {
   return (
     <PublicPageShell
-      eyebrow="Javni prostor"
+      eyebrow={PUBLIC_PAGE_COPY.home.eyebrow}
       title="Tvoj Pisac"
-      intro="Osnovni prostor za upoznavanje usluge, dogovor opsega i komunikaciju o projektu."
+      intro={PUBLIC_PAGE_COPY.home.description}
     >
       <PublicCta href="/kontakt" variant="primary">
         Zatraži ponudu
       </PublicCta>
+      <PublicCta href="/paketi" variant="secondary">
+        Odaberi paket
+      </PublicCta>
     </PublicPageShell>
   );
 }
diff --git a/src/app/(public)/paketi/[slug]/page.tsx b/src/app/(public)/paketi/[slug]/page.tsx
new file mode 100644
index 0000000..b2fa135
--- /dev/null
+++ b/src/app/(public)/paketi/[slug]/page.tsx
@@ -0,0 +1,42 @@
+import type { JSX } from "react";
+import Link from "next/link";
+import { notFound } from "next/navigation";
+import { formatPublicPackagePrice } from "@/components/public/PackageCard";
+import { PublicCta } from "@/components/public/PublicCta";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { getPublicPackageBySlug, PUBLIC_PACKAGES } from "@/content/public";
+
+type PackageDetailPageProps = {
+  params: Promise<{ slug: string }>;
+};
+
+export function generateStaticParams(): { slug: string }[] {
+  return PUBLIC_PACKAGES.map((packageContent) => ({ slug: packageContent.slug }));
+}
+
+export default async function PackageDetailPage({
+  params,
+}: PackageDetailPageProps): Promise<JSX.Element> {
+  const { slug } = await params;
+  const packageContent = getPublicPackageBySlug(slug);
+
+  if (!packageContent) {
+    notFound();
+  }
+
+  return (
+    <PublicPageShell
+      eyebrow="Paket"
+      title={packageContent.title}
+      intro={packageContent.shortDescription}
+    >
+      <p>{formatPublicPackagePrice(packageContent.priceEur)}</p>
+      <p>{packageContent.scopeNote}</p>
+      <p>{packageContent.priceNote}</p>
+      <PublicCta href="/kontakt" variant="primary">
+        Zatraži ponudu
+      </PublicCta>
+      <Link href="/proces">Pogledaj proces</Link>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/paketi/page.tsx b/src/app/(public)/paketi/page.tsx
new file mode 100644
index 0000000..38eea72
--- /dev/null
+++ b/src/app/(public)/paketi/page.tsx
@@ -0,0 +1,18 @@
+import PackageCard from "@/components/public/PackageCard";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_PACKAGES } from "@/content/public";
+
+export default function PackagesPage() {
+  return (
+    <PublicPageShell
+      title="Paketi"
+      intro="Pregled standardnih paketa za različite vrste akademskih projekata."
+    >
+      <section aria-label="Katalog paketa">
+        {PUBLIC_PACKAGES.map((packageContent) => (
+          <PackageCard key={packageContent.slug} package={packageContent} />
+        ))}
+      </section>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/usluge/page.tsx b/src/app/(public)/usluge/page.tsx
new file mode 100644
index 0000000..3d22ff5
--- /dev/null
+++ b/src/app/(public)/usluge/page.tsx
@@ -0,0 +1,42 @@
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_PAGE_COPY } from "@/content/public";
+
+const SERVICE_CATEGORIES = [
+  {
+    title: "Planiranje i struktura",
+    description: "Podrška pri razradi teme, cilja i jasne strukture rada.",
+  },
+  {
+    title: "Razrada materijala",
+    description: "Podrška pri organizaciji izvora, poglavlja i radnih materijala.",
+  },
+  {
+    title: "Provjera jasnoće",
+    description: "Podrška pri provjeri razumljivosti, dosljednosti i usklađenosti materijala.",
+  },
+] as const;
+
+export default function ServicesPage() {
+  return (
+    <PublicPageShell
+      title={PUBLIC_PAGE_COPY.services.title}
+      intro={PUBLIC_PAGE_COPY.services.description}
+    >
+      <section aria-label="Kategorije usluga">
+        <h2>Odgovorno korištenje podrške</h2>
+        <p>
+          Podrška služi razumijevanju i organizaciji vlastitog rada; korisnik
+          zadržava odgovornost za svoje odluke i pravila ustanove.
+        </p>
+        <ul>
+          {SERVICE_CATEGORIES.map((service) => (
+            <li key={service.title}>
+              <h3>{service.title}</h3>
+              <p>{service.description}</p>
+            </li>
+          ))}
+        </ul>
+      </section>
+    </PublicPageShell>
+  );
+}
diff --git a/src/components/public/PackageCard.tsx b/src/components/public/PackageCard.tsx
new file mode 100644
index 0000000..2a96b56
--- /dev/null
+++ b/src/components/public/PackageCard.tsx
@@ -0,0 +1,28 @@
+import type { JSX } from "react";
+import Link from "next/link";
+import type { PublicPackageContent } from "@/content/public";
+
+export function formatPublicPackagePrice(priceEur: number): string {
+  return `€${priceEur.toLocaleString("hr-HR")}`;
+}
+
+export default function PackageCard({
+  package: packageContent,
+}: {
+  package: PublicPackageContent;
+}): JSX.Element {
+  return (
+    <article className="public-package-card">
+      <h2>{packageContent.title}</h2>
+      <p>{packageContent.shortDescription}</p>
+      <p className="public-package-card__price">
+        {formatPublicPackagePrice(packageContent.priceEur)}
+      </p>
+      <p>{packageContent.scopeNote}</p>
+      <p>{packageContent.priceNote}</p>
+      <Link href={`/paketi/${packageContent.slug}`}>
+        Saznaj više o paketu {packageContent.title}
+      </Link>
+    </article>
+  );
+}
diff --git a/tests/components/public.test.tsx b/tests/components/public.test.tsx
index 7878e6d..9a476e7 100644
--- a/tests/components/public.test.tsx
+++ b/tests/components/public.test.tsx
@@ -2,6 +2,10 @@ import { render, screen } from "@testing-library/react";
 import { PublicCta } from "@/components/public/PublicCta";
 import { PublicFooter } from "@/components/public/PublicFooter";
 import { PublicHeader } from "@/components/public/PublicHeader";
+import PackageCard from "@/components/public/PackageCard";
+import Home from "@/app/(public)/page";
+import PackagesPage from "@/app/(public)/paketi/page";
+import { PUBLIC_PACKAGES } from "@/content/public";
 
 describe("public experience components", () => {
   it("renders the named main navigation with approved CTA links", () => {
@@ -53,4 +57,41 @@ describe("public experience components", () => {
       "/paketi",
     );
   });
+
+  it("presents the home CTA without forbidden outcome claims", () => {
+    render(<Home />);
+
+    expect(screen.getByRole("heading", { name: "Tvoj Pisac" })).toBeInTheDocument();
+    expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
+      "href",
+      "/kontakt",
+    );
+    expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
+      "href",
+      "/paketi",
+    );
+    expect(document.body.textContent).not.toMatch(
+      /garantiran[aeiou]* ocjen|zajamčen[aeiou]* prolaz|izbjegavanje detektor|checkout|plaćanje|upload|slanje prijave|stvaranje radnog prostora/i,
+    );
+  });
+
+  it("renders all Foundation catalogue prices and scope boundaries", () => {
+    render(<PackagesPage />);
+
+    for (const price of ["€50", "€150", "€300", "€500", "€1.000"]) {
+      expect(screen.getByText(price)).toBeInTheDocument();
+    }
+    expect(screen.getAllByText(/točan opseg, rok, formati i uvjeti/i)).toHaveLength(5);
+  });
+
+  it("renders a package card with its catalogue price, boundary, and detail link", () => {
+    render(<PackageCard package={PUBLIC_PACKAGES[0]} />);
+
+    expect(screen.getByText("€50")).toBeInTheDocument();
+    expect(screen.getByText(/standardna cijena vrijedi/i)).toBeInTheDocument();
+    expect(screen.getByRole("link", { name: /saznaj više/i })).toHaveAttribute(
+      "href",
+      "/paketi/seminarski",
+    );
+  });
 });
diff --git a/tests/components/shell.test.tsx b/tests/components/shell.test.tsx
index a493e96..31ab3f2 100644
--- a/tests/components/shell.test.tsx
+++ b/tests/components/shell.test.tsx
@@ -1,11 +1,16 @@
 import { render, screen } from "@testing-library/react";
 import AdminPage from "@/app/(admin)/admin/page";
 import PortalPage from "@/app/(client)/portal/page";
+import PublicLayout from "@/app/(public)/layout";
 import PublicPage from "@/app/(public)/page";
 
 describe("route shells", () => {
   it("renders the shared product header and one main landmark", () => {
-    render(<PublicPage />);
+    render(
+      <PublicLayout>
+        <PublicPage />
+      </PublicLayout>,
+    );
 
     expect(screen.getByRole("banner")).toBeInTheDocument();
     expect(screen.getByRole("link", { name: "Tvoj Pisac" })).toHaveAttribute(
diff --git a/tests/e2e/public-experience.spec.ts b/tests/e2e/public-experience.spec.ts
new file mode 100644
index 0000000..160d830
--- /dev/null
+++ b/tests/e2e/public-experience.spec.ts
@@ -0,0 +1,20 @@
+import { expect, test } from "@playwright/test";
+
+const publicRoutes = [
+  { path: "/", heading: "Tvoj Pisac" },
+  { path: "/usluge", heading: "Usluge" },
+  { path: "/paketi", heading: "Paketi" },
+  { path: "/paketi/seminarski", heading: "Seminarski rad" },
+  { path: "/cijene", heading: "Cijene" },
+];
+
+for (const route of publicRoutes) {
+  test(`${route.path} renders its public heading`, async ({ page }) => {
+    await page.goto(route.path);
+    await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
+  });
+}
+
+test("an unknown package returns 404", async ({ page }) => {
+  expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
+});
```

