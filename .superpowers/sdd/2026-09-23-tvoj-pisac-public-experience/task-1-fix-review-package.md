# Task 1 fix round 1 review package

Fix base: `e36a688`
Head: `beba701`
Finding under verification: add an explicit Croatian disclosure for deliverables/isporuke and material scope changes before offer acceptance, and reuse the wording in process/FAQ content.

## Diff stat

```text
 src/content/public.ts        |  6 +++---
 tests/content/public.test.ts | 17 +++++++++++++++++
 2 files changed, 20 insertions(+), 3 deletions(-)
```

## Diff

```diff
diff --git a/src/content/public.ts b/src/content/public.ts
index 593bf9b..67f2a67 100644
--- a/src/content/public.ts
+++ b/src/content/public.ts
@@ -42,7 +42,7 @@ export type PublicPackageContent = {
 };
 
 const SCOPE_NOTE =
-  "Točan opseg, rok, formati i uvjeti potvrđuju se prije prihvata ponude.";
+  "Točan opseg, rok, formati i uvjeti potvrđuju se prije prihvata ponude. Isporuke i sve materijalne izmjene opsega potvrđuju se prije prihvata ponude.";
 const PRICE_NOTE =
   "Standardna cijena vrijedi za definirani standardni paket; složeniji ili nestandardni rad ide na ručnu procjenu.";
 
@@ -107,7 +107,7 @@ export const PUBLIC_PROCESS_STEPS: readonly PublicProcessStep[] = [
   },
   {
     title: "Potvrda opsega",
-    description: "Opseg, rok, formati i uvjeti potvrđuju se prije prihvata ponude.",
+    description: SCOPE_NOTE,
   },
   {
     title: "Rad i provjera",
diff --git a/tests/content/public.test.ts b/tests/content/public.test.ts
index 5167d51..f32f88c 100644
--- a/tests/content/public.test.ts
+++ b/tests/content/public.test.ts
@@ -2,9 +2,11 @@ import { describe, expect, it } from "vitest";
 import {
   PUBLIC_ARTICLES,
   PUBLIC_EXAMPLES,
+  PUBLIC_FAQS,
   PUBLIC_PACKAGES,
+  PUBLIC_PROCESS_STEPS,
   getPublicPackageBySlug,
 } from "@/content/public";
@@ -28,4 +30,21 @@ describe("public content contract", () => {
       true,
     );
   });
+
+  it("discloses deliverables and material scope changes before offer acceptance", () => {
+    const requiredDisclosure =
+      "Isporuke i sve materijalne izmjene opsega potvrđuju se prije prihvata ponude.";
+
+    expect(
+      PUBLIC_PACKAGES.every((item) => item.scopeNote.includes(requiredDisclosure)),
+    ).toBe(true);
+    expect(
+      PUBLIC_PROCESS_STEPS.some((step) =>
+        step.description.includes(requiredDisclosure),
+      ),
+    ).toBe(true);
+    expect(
+      PUBLIC_FAQS.some((faq) => faq.answer.includes(requiredDisclosure)),
+    ).toBe(true);
+  });
 });
```
