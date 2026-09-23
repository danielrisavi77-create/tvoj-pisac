import type { JSX } from "react";
import Link from "next/link";
import type { PublicPackageContent } from "@/content/public";

export function formatPublicPackagePrice(priceEur: number): string {
  return `€${priceEur.toLocaleString("hr-HR")}`;
}

export default function PackageCard({
  package: packageContent,
}: {
  package: PublicPackageContent;
}): JSX.Element {
  return (
    <article className="public-package-card">
      <h2>{packageContent.title}</h2>
      <p>{packageContent.shortDescription}</p>
      <p className="public-package-card__price">
        {formatPublicPackagePrice(packageContent.priceEur)}
      </p>
      <p>{packageContent.scopeNote}</p>
      <p>{packageContent.priceNote}</p>
      <Link href={`/paketi/${packageContent.slug}`}>
        Saznaj više o paketu {packageContent.title}
      </Link>
    </article>
  );
}
