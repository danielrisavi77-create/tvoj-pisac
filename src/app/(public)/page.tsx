import { PublicCta } from "@/components/public/PublicCta";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_PAGE_COPY } from "@/content/public";

export default function PublicPage() {
  return (
    <PublicPageShell
      eyebrow={PUBLIC_PAGE_COPY.home.eyebrow}
      title="Tvoj Pisac"
      intro={PUBLIC_PAGE_COPY.home.description}
    >
      <PublicCta href="/kontakt" variant="primary">
        Zatraži ponudu
      </PublicCta>
      <PublicCta href="/paketi" variant="secondary">
        Odaberi paket
      </PublicCta>
    </PublicPageShell>
  );
}
