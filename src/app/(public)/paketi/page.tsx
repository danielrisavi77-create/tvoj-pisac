import PackageCard from "@/components/public/PackageCard";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_PACKAGES } from "@/content/public";

export default function PackagesPage() {
  return (
    <PublicPageShell
      title="Paketi"
      intro="Pregled standardnih paketa za različite vrste akademskih projekata."
    >
      <section aria-label="Katalog paketa">
        {PUBLIC_PACKAGES.map((packageContent) => (
          <PackageCard key={packageContent.slug} package={packageContent} />
        ))}
      </section>
    </PublicPageShell>
  );
}
