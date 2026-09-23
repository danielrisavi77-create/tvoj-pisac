import Link from "next/link";
import { PublicPageShell } from "@/components/public/PublicPageShell";

export default function ContactPage() {
  return (
    <PublicPageShell
      title="Kontakt"
      intro="Pregled sljedećeg koraka prije bilo kakve potvrde opsega."
    >
      <section id="razgovor" aria-label="Dogovori razgovor">
        <h2>Dogovori razgovor</h2>
        <p>
          Kontaktni ili privatni unos nije povezan u ovoj fazi, pa se ovdje ne
          šalje zahtjev niti prikupljaju podaci.
        </p>
        <p>
          Prije razgovora možeš pregledati <Link href="/paketi">Paketi</Link>{" "}
          i <Link href="/proces">Proces</Link>.
        </p>
      </section>
    </PublicPageShell>
  );
}
