import { PublicCta } from "@/components/public/PublicCta";
import { PublicPageShell } from "@/components/public/PublicPageShell";

export default function PublicPage() {
  return (
    <PublicPageShell
      eyebrow="Javni prostor"
      title="Tvoj Pisac"
      intro="Osnovni prostor za upoznavanje usluge, dogovor opsega i komunikaciju o projektu."
    >
      <PublicCta href="/kontakt" variant="primary">
        Zatraži ponudu
      </PublicCta>
    </PublicPageShell>
  );
}
