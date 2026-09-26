# Task 2 review package

Base: `beba701`
Head: `fcaa3b3`
Commit: `fcaa3b3 feat: add public experience shell`

## Diff

```diff
 src/app/(public)/layout.tsx               | 13 +++++
 src/app/(public)/page.tsx                 | 23 ++++----
 src/app/globals.css                       | 92 +++++++++++++++++++++++++++++++
 src/components/public/PublicCta.tsx       | 16 ++++++
 src/components/public/PublicFooter.tsx    | 21 +++++++
 src/components/public/PublicHeader.tsx    | 32 +++++++++++
 src/components/public/PublicPageShell.tsx | 24 ++++++++
 tests/components/public.test.tsx          | 56 +++++++++++++++++++
 8 files changed, 265 insertions(+), 12 deletions(-)
diff --git a/src/app/(public)/layout.tsx b/src/app/(public)/layout.tsx
new file mode 100644
index 0000000..9fc95f0
--- /dev/null
+++ b/src/app/(public)/layout.tsx
@@ -0,0 +1,13 @@
+import type { ReactNode } from "react";
+import { PublicFooter } from "@/components/public/PublicFooter";
+import { PublicHeader } from "@/components/public/PublicHeader";
+
+export default function PublicLayout({ children }: { children: ReactNode }) {
+  return (
+    <div className="public-layout">
+      <PublicHeader />
+      <main>{children}</main>
+      <PublicFooter />
+    </div>
+  );
+}
diff --git a/src/app/(public)/page.tsx b/src/app/(public)/page.tsx
index d1c2f06..79f9c1f 100644
--- a/src/app/(public)/page.tsx
+++ b/src/app/(public)/page.tsx
@@ -1,17 +1,16 @@
-import { AppHeader } from "@/components/shell/AppHeader";
+import { PublicCta } from "@/components/public/PublicCta";
+import { PublicPageShell } from "@/components/public/PublicPageShell";
 
 export default function PublicPage() {
   return (
-    <div className="app-shell">
-      <AppHeader surface="Foundation" />
-      <main className="surface-card">
-        <p className="eyebrow">Javni prostor</p>
-        <h1>Tvoj Pisac</h1>
-        <p>
-          Osnovni prostor za upoznavanje usluge, dogovor opsega i komunikaciju o
-          projektu.
-        </p>
-      </main>
-    </div>
+    <PublicPageShell
+      eyebrow="Javni prostor"
+      title="Tvoj Pisac"
+      intro="Osnovni prostor za upoznavanje usluge, dogovor opsega i komunikaciju o projektu."
+    >
+      <PublicCta href="/kontakt" variant="primary">
+        Zatraži ponudu
+      </PublicCta>
+    </PublicPageShell>
   );
 }
diff --git a/src/app/globals.css b/src/app/globals.css
index 2d54cc8..544230e 100644
--- a/src/app/globals.css
+++ b/src/app/globals.css
@@ -109,6 +109,98 @@ a {
   line-height: 1.6;
 }
 
+.public-layout {
+  display: flex;
+  min-height: 100vh;
+  flex-direction: column;
+}
+
+.public-header,
+.public-footer,
+.public-layout > main {
+  width: min(100%, 72rem);
+  margin: 0 auto;
+  padding: var(--tp-space-2);
+}
+
+.public-header,
+.public-header__nav,
+.public-header__actions,
+.public-footer__nav {
+  display: flex;
+  align-items: center;
+  gap: var(--tp-space-1);
+}
+
+.public-header {
+  flex-wrap: wrap;
+  justify-content: space-between;
+}
+
+.public-header__brand {
+  font-weight: 700;
+  text-decoration: none;
+}
+
+.public-header__nav,
+.public-header__actions,
+.public-footer__nav {
+  flex-wrap: wrap;
+}
+
+.public-header__nav a,
+.public-footer__nav a {
+  padding: 0.25rem;
+}
+
+.public-layout > main {
+  flex: 1;
+}
+
+.public-page-shell {
+  padding: clamp(var(--tp-space-3), 8vw, 5rem);
+  border: 1px solid var(--tp-color-line);
+  border-radius: var(--tp-radius-card);
+  background: var(--tp-color-surface);
+}
+
+.public-page-shell h1 {
+  max-width: 36rem;
+  margin: var(--tp-space-1) 0 var(--tp-space-2);
+  font-size: clamp(2rem, 7vw, 4.5rem);
+  line-height: 1;
+}
+
+.public-page-shell__intro,
+.public-footer p {
+  max-width: 42rem;
+  color: var(--tp-color-muted);
+  line-height: 1.6;
+}
+
+.public-cta {
+  display: inline-block;
+  padding: 0.5rem 0.75rem;
+  border: 1px solid var(--tp-color-ink);
+  border-radius: 0.5rem;
+  font-weight: 700;
+  text-decoration: none;
+}
+
+.public-cta--primary {
+  background: var(--tp-color-ink);
+  color: var(--tp-color-surface);
+}
+
+.public-cta--secondary {
+  background: var(--tp-color-surface);
+}
+
+a:focus-visible {
+  outline: 3px solid #1d70a2;
+  outline-offset: 3px;
+}
+
 @media (prefers-reduced-motion: reduce) {
   *,
   *::before,
diff --git a/src/components/public/PublicCta.tsx b/src/components/public/PublicCta.tsx
new file mode 100644
index 0000000..064e37d
--- /dev/null
+++ b/src/components/public/PublicCta.tsx
@@ -0,0 +1,16 @@
+import type { JSX, ReactNode } from "react";
+import Link from "next/link";
+
+type PublicCtaProps = {
+  href: "/kontakt" | "/paketi" | "/kontakt#razgovor";
+  variant: "primary" | "secondary";
+  children: ReactNode;
+};
+
+export function PublicCta({ href, variant, children }: PublicCtaProps): JSX.Element {
+  return (
+    <Link className={`public-cta public-cta--${variant}`} href={href}>
+      {children}
+    </Link>
+  );
+}
diff --git a/src/components/public/PublicFooter.tsx b/src/components/public/PublicFooter.tsx
new file mode 100644
index 0000000..1219c6d
--- /dev/null
+++ b/src/components/public/PublicFooter.tsx
@@ -0,0 +1,21 @@
+import type { JSX } from "react";
+import Link from "next/link";
+import { PUBLIC_NAV_ITEMS } from "@/content/public";
+
+export function PublicFooter(): JSX.Element {
+  return (
+    <footer className="public-footer">
+      <nav aria-label="Sekundarna navigacija" className="public-footer__nav">
+        {PUBLIC_NAV_ITEMS.filter((item) => item.secondary).map((item) => (
+          <Link key={item.path} href={item.path}>
+            {item.label} — razvojni shell
+          </Link>
+        ))}
+      </nav>
+      <p>
+        Kontakt, privatni unos i povezanost radnog prostora nisu aktivni u ovoj
+        preglednoj fazi.
+      </p>
+    </footer>
+  );
+}
diff --git a/src/components/public/PublicHeader.tsx b/src/components/public/PublicHeader.tsx
new file mode 100644
index 0000000..a6b6f1f
--- /dev/null
+++ b/src/components/public/PublicHeader.tsx
@@ -0,0 +1,32 @@
+import type { JSX } from "react";
+import Link from "next/link";
+import { PUBLIC_NAV_ITEMS } from "@/content/public";
+import { PublicCta } from "./PublicCta";
+
+export function PublicHeader(): JSX.Element {
+  return (
+    <header className="public-header">
+      <Link className="public-header__brand" href="/">
+        Tvoj Pisac
+      </Link>
+      <nav aria-label="Glavna navigacija" className="public-header__nav">
+        {PUBLIC_NAV_ITEMS.filter((item) => !item.secondary).map((item) => (
+          <Link key={item.path} href={item.path}>
+            {item.label}
+          </Link>
+        ))}
+      </nav>
+      <div className="public-header__actions">
+        <PublicCta href="/kontakt" variant="primary">
+          Zatraži ponudu
+        </PublicCta>
+        <PublicCta href="/paketi" variant="secondary">
+          Odaberi paket
+        </PublicCta>
+        <PublicCta href="/kontakt#razgovor" variant="secondary">
+          Dogovori razgovor
+        </PublicCta>
+      </div>
+    </header>
+  );
+}
diff --git a/src/components/public/PublicPageShell.tsx b/src/components/public/PublicPageShell.tsx
new file mode 100644
index 0000000..a6df749
--- /dev/null
+++ b/src/components/public/PublicPageShell.tsx
@@ -0,0 +1,24 @@
+import type { JSX, ReactNode } from "react";
+
+type PublicPageShellProps = {
+  eyebrow?: string;
+  title: string;
+  intro: string;
+  children: ReactNode;
+};
+
+export function PublicPageShell({
+  eyebrow,
+  title,
+  intro,
+  children,
+}: PublicPageShellProps): JSX.Element {
+  return (
+    <section className="public-page-shell">
+      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
+      <h1>{title}</h1>
+      <p className="public-page-shell__intro">{intro}</p>
+      {children}
+    </section>
+  );
+}
diff --git a/tests/components/public.test.tsx b/tests/components/public.test.tsx
new file mode 100644
index 0000000..7878e6d
--- /dev/null
+++ b/tests/components/public.test.tsx
@@ -0,0 +1,56 @@
+import { render, screen } from "@testing-library/react";
+import { PublicCta } from "@/components/public/PublicCta";
+import { PublicFooter } from "@/components/public/PublicFooter";
+import { PublicHeader } from "@/components/public/PublicHeader";
+
+describe("public experience components", () => {
+  it("renders the named main navigation with approved CTA links", () => {
+    render(<PublicHeader />);
+
+    expect(
+      screen.getByRole("navigation", { name: "Glavna navigacija" }),
+    ).toBeInTheDocument();
+    expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
+      "href",
+      "/kontakt",
+    );
+    expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
+      "href",
+      "/paketi",
+    );
+    expect(
+      screen.getByRole("link", { name: "Dogovori razgovor" }),
+    ).toHaveAttribute("href", "/kontakt#razgovor");
+  });
+
+  it("states the no-backend boundary and does not render a fake submit button", () => {
+    render(<PublicFooter />);
+
+    expect(
+      screen.getByText(/kontakt, privatni unos i povezanost radnog prostora nisu aktivni/i),
+    ).toBeInTheDocument();
+    expect(screen.queryByRole("button", { name: "Pošalji" })).not.toBeInTheDocument();
+  });
+
+  it("renders internal CTA links for the approved destinations", () => {
+    render(
+      <>
+        <PublicCta href="/kontakt" variant="primary">
+          Zatraži ponudu
+        </PublicCta>
+        <PublicCta href="/paketi" variant="secondary">
+          Odaberi paket
+        </PublicCta>
+      </>,
+    );
+
+    expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
+      "href",
+      "/kontakt",
+    );
+    expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
+      "href",
+      "/paketi",
+    );
+  });
+});
```

