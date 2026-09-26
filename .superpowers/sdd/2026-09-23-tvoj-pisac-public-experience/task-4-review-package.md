# Task 4 review package

Base: `3696e2d`
Head: `25d27cd`
Commit: `25d27cd feat: add public informational pages`

## Diff

```diff
 src/app/(public)/clanci/[slug]/page.tsx | 34 ++++++++++++++
 src/app/(public)/clanci/page.tsx        | 23 ++++++++++
 src/app/(public)/faq/page.tsx           | 20 +++++++++
 src/app/(public)/kontakt/page.tsx       | 23 ++++++++++
 src/app/(public)/o-nama/page.tsx        | 18 ++++++++
 src/app/(public)/primjeri/page.tsx      | 21 +++++++++
 src/app/(public)/proces/page.tsx        | 20 +++++++++
 src/content/public.ts                   | 16 ++++---
 tests/components/public.test.tsx        | 78 ++++++++++++++++++++++++++++++++-
 tests/e2e/public-experience.spec.ts     | 14 ++++++
 10 files changed, 260 insertions(+), 7 deletions(-)
diff --git a/src/app/(public)/clanci/[slug]/page.tsx b/src/app/(public)/clanci/[slug]/page.tsx
new file mode 100644
index 0000000..e8abcfa
--- /dev/null
+++ b/src/app/(public)/clanci/[slug]/page.tsx
@@ -0,0 +1,34 @@
+import type { JSX } from "react";
+import Link from "next/link";
+import { notFound } from "next/navigation";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_ARTICLES } from "@/content/public";
+
+type ArticleDetailPageProps = {
+  params: Promise<{ slug: string }>;
+};
+
+export function generateStaticParams(): { slug: string }[] {
+  return PUBLIC_ARTICLES.map((article) => ({ slug: article.slug }));
+}
+
+export default async function ArticleDetailPage({
+  params,
+}: ArticleDetailPageProps): Promise<JSX.Element> {
+  const { slug } = await params;
+  const article = PUBLIC_ARTICLES.find((item) => item.slug === slug);
+
+  if (!article) {
+    notFound();
+  }
+
+  return (
+    <PublicPageShell title={article.title} intro={article.summary}>
+      <section aria-label="Edukativni članak">
+        <h2>Sažetak</h2>
+        <p>{article.summary}</p>
+        <Link href="/clanci">Natrag na članke</Link>
+      </section>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/clanci/page.tsx b/src/app/(public)/clanci/page.tsx
new file mode 100644
index 0000000..c5e40bc
--- /dev/null
+++ b/src/app/(public)/clanci/page.tsx
@@ -0,0 +1,23 @@
+import Link from "next/link";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_ARTICLES } from "@/content/public";
+
+export default function ArticlesPage() {
+  return (
+    <PublicPageShell
+      title="Članci"
+      intro="Kratki edukativni tekstovi za pripremu razgovora i razumijevanje procesa."
+    >
+      <ul>
+        {PUBLIC_ARTICLES.map((article) => (
+          <li key={article.slug}>
+            <h2>
+              <Link href={`/clanci/${article.slug}`}>{article.title}</Link>
+            </h2>
+            <p>{article.summary}</p>
+          </li>
+        ))}
+      </ul>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/faq/page.tsx b/src/app/(public)/faq/page.tsx
new file mode 100644
index 0000000..84dce83
--- /dev/null
+++ b/src/app/(public)/faq/page.tsx
@@ -0,0 +1,20 @@
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_FAQS } from "@/content/public";
+
+export default function FaqPage() {
+  return (
+    <PublicPageShell
+      title="Česta pitanja"
+      intro="Odgovori na osnovna pitanja o opsegu, uvjetima i odgovornom korištenju podrške."
+    >
+      <section aria-label="Česta pitanja i odgovori">
+        {PUBLIC_FAQS.map((faq) => (
+          <details key={faq.question}>
+            <summary>{faq.question}</summary>
+            <p>{faq.answer}</p>
+          </details>
+        ))}
+      </section>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/kontakt/page.tsx b/src/app/(public)/kontakt/page.tsx
new file mode 100644
index 0000000..2ec1741
--- /dev/null
+++ b/src/app/(public)/kontakt/page.tsx
@@ -0,0 +1,23 @@
+import Link from "next/link";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+
+export default function ContactPage() {
+  return (
+    <PublicPageShell
+      title="Kontakt"
+      intro="Pregled sljedećeg koraka prije bilo kakve potvrde opsega."
+    >
+      <section id="razgovor" aria-label="Dogovori razgovor">
+        <h2>Dogovori razgovor</h2>
+        <p>
+          Kontaktni ili privatni unos nije povezan u ovoj fazi, pa se ovdje ne
+          šalje zahtjev niti prikupljaju podaci.
+        </p>
+        <p>
+          Prije razgovora možeš pregledati <Link href="/paketi">Paketi</Link>{" "}
+          i <Link href="/proces">Proces</Link>.
+        </p>
+      </section>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/o-nama/page.tsx b/src/app/(public)/o-nama/page.tsx
new file mode 100644
index 0000000..bcf06ac
--- /dev/null
+++ b/src/app/(public)/o-nama/page.tsx
@@ -0,0 +1,18 @@
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+
+export default function AboutPage() {
+  return (
+    <PublicPageShell
+      title="O nama"
+      intro="Transparentan opis načina rada usluge Tvoj Pisac."
+    >
+      <section aria-label="O usluzi">
+        <h2>Daniel vodi Tvoj Pisac</h2>
+        <p>
+          Usluga je usmjerena na jasnu komunikaciju o potrebi, potvrđenome
+          opsegu i odgovornom korištenju podrške pri akademskim projektima.
+        </p>
+      </section>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/primjeri/page.tsx b/src/app/(public)/primjeri/page.tsx
new file mode 100644
index 0000000..882b7ac
--- /dev/null
+++ b/src/app/(public)/primjeri/page.tsx
@@ -0,0 +1,21 @@
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_EXAMPLES } from "@/content/public";
+
+export default function ExamplesPage() {
+  return (
+    <PublicPageShell
+      title="Primjeri"
+      intro="Primjeri služe samo za objašnjenje mogućih struktura i procesa."
+    >
+      <ul>
+        {PUBLIC_EXAMPLES.map((example) => (
+          <li key={example.label}>
+            <h2>{example.label}</h2>
+            <p>{example.description}</p>
+            <p>{example.disclaimer}</p>
+          </li>
+        ))}
+      </ul>
+    </PublicPageShell>
+  );
+}
diff --git a/src/app/(public)/proces/page.tsx b/src/app/(public)/proces/page.tsx
new file mode 100644
index 0000000..9dd4d3d
--- /dev/null
+++ b/src/app/(public)/proces/page.tsx
@@ -0,0 +1,20 @@
+import { PublicPageShell } from "@/components/public/PublicPageShell";
+import { PUBLIC_PROCESS_STEPS } from "@/content/public";
+
+export default function ProcessPage() {
+  return (
+    <PublicPageShell
+      title="Proces"
+      intro="Jasan pregled koraka od početne kvalifikacije do Danielova završnog odobrenja."
+    >
+      <ol>
+        {PUBLIC_PROCESS_STEPS.map((step) => (
+          <li key={step.title}>
+            <h2>{step.title}</h2>
+            <p>{step.description}</p>
+          </li>
+        ))}
+      </ol>
+    </PublicPageShell>
+  );
+}
diff --git a/src/content/public.ts b/src/content/public.ts
index 67f2a67..6513d59 100644
--- a/src/content/public.ts
+++ b/src/content/public.ts
@@ -102,20 +102,24 @@ export type PublicProcessStep = {
 
 export const PUBLIC_PROCESS_STEPS: readonly PublicProcessStep[] = [
   {
-    title: "Razgovor o potrebi",
-    description: "Prikupljaju se osnovne informacije o temi, cilju i očekivanom opsegu.",
+    title: "Kvalifikacija",
+    description: "U početnom razgovoru provjeravaju se tema, cilj i očekivani opseg.",
   },
   {
     title: "Potvrda opsega",
     description: SCOPE_NOTE,
   },
   {
-    title: "Rad i provjera",
-    description: "Dogovoreni materijali prolaze radnu i završnu provjeru.",
+    title: "Rad",
+    description: "Rad se odvija prema prethodno potvrđenome opsegu.",
   },
   {
-    title: "Završno odobrenje",
-    description: "Prije završetka provjerava se da isporuka odgovara potvrđenom opsegu.",
+    title: "Završna kontrola kvalitete",
+    description: "Provjerava se odgovaraju li dogovoreni materijali potvrđenome opsegu.",
+  },
+  {
+    title: "Danielovo završno odobrenje",
+    description: "Nakon kontrole kvalitete Daniel daje završno odobrenje; automatizirana isporuka se ne koristi.",
   },
 ];
 
diff --git a/tests/components/public.test.tsx b/tests/components/public.test.tsx
index 9a476e7..14e7e3e 100644
--- a/tests/components/public.test.tsx
+++ b/tests/components/public.test.tsx
@@ -5,7 +5,13 @@ import { PublicHeader } from "@/components/public/PublicHeader";
 import PackageCard from "@/components/public/PackageCard";
 import Home from "@/app/(public)/page";
 import PackagesPage from "@/app/(public)/paketi/page";
-import { PUBLIC_PACKAGES } from "@/content/public";
+import ProcessPage from "@/app/(public)/proces/page";
+import ExamplesPage from "@/app/(public)/primjeri/page";
+import FaqPage from "@/app/(public)/faq/page";
+import ArticlesPage from "@/app/(public)/clanci/page";
+import AboutPage from "@/app/(public)/o-nama/page";
+import ContactPage from "@/app/(public)/kontakt/page";
+import { PUBLIC_FAQS, PUBLIC_PACKAGES } from "@/content/public";
 
 describe("public experience components", () => {
   it("renders the named main navigation with approved CTA links", () => {
@@ -94,4 +100,74 @@ describe("public experience components", () => {
       "/paketi/seminarski",
     );
   });
+
+  it("makes quality control and Daniel's final approval explicit in the process", () => {
+    render(<ProcessPage />);
+
+    expect(
+      screen.getByText("Završna kontrola kvalitete"),
+    ).toBeInTheDocument();
+    expect(
+      screen.getByText("Danielovo završno odobrenje"),
+    ).toBeInTheDocument();
+    expect(screen.getByText(/automatizirana isporuka/i)).toBeInTheDocument();
+  });
+
+  it("renders exactly three visible illustrative-example disclaimers", () => {
+    render(<ExamplesPage />);
+
+    expect(
+      screen.getAllByText(
+        "Ilustrativni primjer — nije stvarni klijentski rezultat.",
+      ),
+    ).toHaveLength(3);
+  });
+
+  it("uses native details and summary controls for each FAQ", () => {
+    const { container } = render(<FaqPage />);
+
+    expect(container.querySelectorAll("details")).toHaveLength(PUBLIC_FAQS.length);
+    expect(container.querySelectorAll("details > summary")).toHaveLength(
+      PUBLIC_FAQS.length,
+    );
+  });
+
+  it("lists the educational articles and describes Daniel-led service without proof claims", () => {
+    render(
+      <>
+        <ArticlesPage />
+        <AboutPage />
+      </>,
+    );
+
+    expect(
+      screen.getByRole("link", {
+        name: "Što pripremiti prije nego što zatražiš ponudu",
+      }),
+    ).toHaveAttribute("href", "/clanci/prije-nego-sto-zatrazi-ponudu");
+    expect(screen.getByText(/Daniel vodi Tvoj Pisac/i)).toBeInTheDocument();
+    expect(document.body.textContent).not.toMatch(
+      /tim stručnjaka|certifikat|godina iskustva|uspješan rezultat/i,
+    );
+  });
+
+  it("keeps contact static, linked internally, and explicitly disconnected", () => {
+    const { container } = render(<ContactPage />);
+
+    expect(container.querySelector("section#razgovor")).toBeInTheDocument();
+    expect(screen.getByRole("link", { name: "Paketi" })).toHaveAttribute(
+      "href",
+      "/paketi",
+    );
+    expect(screen.getByRole("link", { name: "Proces" })).toHaveAttribute(
+      "href",
+      "/proces",
+    );
+    expect(
+      screen.getByText(/kontaktni ili privatni unos nije povezan u ovoj fazi/i),
+    ).toBeInTheDocument();
+    expect(container.querySelector("form")).not.toBeInTheDocument();
+    expect(container.querySelector("a[href^='mailto:']")).not.toBeInTheDocument();
+    expect(screen.queryByRole("button", { name: /pošalji/i })).not.toBeInTheDocument();
+  });
 });
diff --git a/tests/e2e/public-experience.spec.ts b/tests/e2e/public-experience.spec.ts
index e4fbc22..8f7df63 100644
--- a/tests/e2e/public-experience.spec.ts
+++ b/tests/e2e/public-experience.spec.ts
@@ -10,6 +10,16 @@ const publicRoutes = [
   { path: "/paketi/specijalisticki", heading: "Specijalistički rad" },
   { path: "/paketi/doktorski", heading: "Doktorski rad" },
   { path: "/cijene", heading: "Cijene" },
+  { path: "/proces", heading: "Proces" },
+  { path: "/primjeri", heading: "Primjeri" },
+  { path: "/faq", heading: "Česta pitanja" },
+  { path: "/clanci", heading: "Članci" },
+  {
+    path: "/clanci/prije-nego-sto-zatrazi-ponudu",
+    heading: "Što pripremiti prije nego što zatražiš ponudu",
+  },
+  { path: "/o-nama", heading: "O nama" },
+  { path: "/kontakt", heading: "Kontakt" },
 ];
 
 for (const route of publicRoutes) {
@@ -22,3 +32,7 @@ for (const route of publicRoutes) {
 test("an unknown package returns 404", async ({ page }) => {
   expect((await page.goto("/paketi/nepoznat"))?.status()).toBe(404);
 });
+
+test("an unknown article returns 404", async ({ page }) => {
+  expect((await page.goto("/clanci/nepoznat"))?.status()).toBe(404);
+});
```

