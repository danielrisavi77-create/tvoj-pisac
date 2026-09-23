import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_PROCESS_STEPS } from "@/content/public";

export default function ProcessPage() {
  return (
    <PublicPageShell
      title="Proces"
      intro="Jasan pregled koraka od početne kvalifikacije do Danielova završnog odobrenja."
    >
      <ol>
        {PUBLIC_PROCESS_STEPS.map((step) => (
          <li key={step.title}>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </PublicPageShell>
  );
}
