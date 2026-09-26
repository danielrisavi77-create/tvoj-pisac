# Task 3 fix round 1 review package

Fix base: `0ac6379`
Head: `3696e2d`
Finding under verification: positive browser coverage for all five package variants.

## Diff

```diff
 tests/e2e/public-experience.spec.ts | 4 ++++
 1 file changed, 4 insertions(+)
diff --git a/tests/e2e/public-experience.spec.ts b/tests/e2e/public-experience.spec.ts
index 160d830..e4fbc22 100644
--- a/tests/e2e/public-experience.spec.ts
+++ b/tests/e2e/public-experience.spec.ts
@@ -5,6 +5,10 @@ const publicRoutes = [
   { path: "/usluge", heading: "Usluge" },
   { path: "/paketi", heading: "Paketi" },
   { path: "/paketi/seminarski", heading: "Seminarski rad" },
+  { path: "/paketi/zavrsni", heading: "Završni rad" },
+  { path: "/paketi/diplomski", heading: "Diplomski/master's rad" },
+  { path: "/paketi/specijalisticki", heading: "Specijalistički rad" },
+  { path: "/paketi/doktorski", heading: "Doktorski rad" },
   { path: "/cijene", heading: "Cijene" },
 ];
 
```

