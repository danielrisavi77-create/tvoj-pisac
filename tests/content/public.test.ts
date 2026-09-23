import { describe, expect, it } from "vitest";
import {
  PUBLIC_ARTICLES,
  PUBLIC_EXAMPLES,
  PUBLIC_PACKAGES,
  getPublicPackageBySlug,
} from "@/content/public";

describe("public content contract", () => {
  it("exposes the five approved catalogue prices", () => {
    expect(PUBLIC_PACKAGES.map((item) => item.priceEur)).toEqual([
      50, 150, 300, 500, 1000,
    ]);
  });

  it("returns undefined for an unknown package slug", () => {
    expect(getPublicPackageBySlug("nepoznato")).toBeUndefined();
  });

  it("labels every example as illustrative", () => {
    expect(PUBLIC_EXAMPLES.every((example) => example.isIllustrative)).toBe(
      true,
    );
  });

  it("does not present articles as fabricated client proof", () => {
    expect(PUBLIC_ARTICLES.every((article) => article.isEducational)).toBe(
      true,
    );
  });
});
