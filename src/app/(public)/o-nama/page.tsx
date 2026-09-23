import { PublicPageShell } from "@/components/public/PublicPageShell";

export default function AboutPage() {
  return (
    <PublicPageShell
      title="O nama"
      intro="Transparentan opis načina rada usluge Tvoj Pisac."
    >
      <section aria-label="O usluzi">
        <h2>Daniel vodi Tvoj Pisac</h2>
        <p>
          Usluga je usmjerena na jasnu komunikaciju o potrebi, potvrđenome
          opsegu i odgovornom korištenju podrške pri akademskim projektima.
        </p>
      </section>
    </PublicPageShell>
  );
}
