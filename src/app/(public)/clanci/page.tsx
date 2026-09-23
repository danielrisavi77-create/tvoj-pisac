import Link from "next/link";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_ARTICLES } from "@/content/public";

export default function ArticlesPage() {
  return (
    <PublicPageShell
      title="Članci"
      intro="Kratki edukativni tekstovi za pripremu razgovora i razumijevanje procesa."
    >
      <ul>
        {PUBLIC_ARTICLES.map((article) => (
          <li key={article.slug}>
            <h2>
              <Link href={`/clanci/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </PublicPageShell>
  );
}
