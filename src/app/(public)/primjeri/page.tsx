import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_EXAMPLES } from "@/content/public";

export default function ExamplesPage() {
  return (
    <PublicPageShell
      title="Primjeri"
      intro="Primjeri služe samo za objašnjenje mogućih struktura i procesa."
    >
      <ul>
        {PUBLIC_EXAMPLES.map((example) => (
          <li key={example.label}>
            <h2>{example.label}</h2>
            <p>{example.description}</p>
            <p>{example.disclaimer}</p>
          </li>
        ))}
      </ul>
    </PublicPageShell>
  );
}
