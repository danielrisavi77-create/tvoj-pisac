import type { JSX } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPublicPackagePrice } from "@/components/public/PackageCard";
import { PublicCta } from "@/components/public/PublicCta";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { getPublicPackageBySlug, PUBLIC_PACKAGES } from "@/content/public";

type PackageDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return PUBLIC_PACKAGES.map((packageContent) => ({ slug: packageContent.slug }));
}

export default async function PackageDetailPage({
  params,
}: PackageDetailPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const packageContent = getPublicPackageBySlug(slug);

  if (!packageContent) {
    notFound();
  }

  return (
    <PublicPageShell
      eyebrow="Paket"
      title={packageContent.title}
      intro={packageContent.shortDescription}
    >
      <p>{formatPublicPackagePrice(packageContent.priceEur)}</p>
      <p>{packageContent.scopeNote}</p>
      <p>{packageContent.priceNote}</p>
      <PublicCta href="/kontakt" variant="primary">
        Zatraži ponudu
      </PublicCta>
      <Link href="/proces">Pogledaj proces</Link>
    </PublicPageShell>
  );
}
