import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_PAGE_COPY } from "@/content/public";

const SERVICE_CATEGORIES = [
  {
    title: "Planiranje i struktura",
    description: "Podrška pri razradi teme, cilja i jasne strukture rada.",
  },
  {
    title: "Razrada materijala",
    description: "Podrška pri organizaciji izvora, poglavlja i radnih materijala.",
  },
  {
    title: "Provjera jasnoće",
    description: "Podrška pri provjeri razumljivosti, dosljednosti i usklađenosti materijala.",
  },
] as const;

export default function ServicesPage() {
  return (
    <PublicPageShell
      title={PUBLIC_PAGE_COPY.services.title}
      intro={PUBLIC_PAGE_COPY.services.description}
    >
      <section aria-label="Kategorije usluga">
        <h2>Odgovorno korištenje podrške</h2>
        <p>
          Podrška služi razumijevanju i organizaciji vlastitog rada; korisnik
          zadržava odgovornost za svoje odluke i pravila ustanove.
        </p>
        <ul>
          {SERVICE_CATEGORIES.map((service) => (
            <li key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </PublicPageShell>
  );
}
