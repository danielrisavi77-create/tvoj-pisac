import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_FAQS } from "@/content/public";

export default function FaqPage() {
  return (
    <PublicPageShell
      title="Česta pitanja"
      intro="Odgovori na osnovna pitanja o opsegu, uvjetima i odgovornom korištenju podrške."
    >
      <section aria-label="Česta pitanja i odgovori">
        {PUBLIC_FAQS.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </PublicPageShell>
  );
}
