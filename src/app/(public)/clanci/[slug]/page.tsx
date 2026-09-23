import type { JSX } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/components/public/PublicPageShell";
import { PUBLIC_ARTICLES } from "@/content/public";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return PUBLIC_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const article = PUBLIC_ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <PublicPageShell title={article.title} intro={article.summary}>
      <section aria-label="Edukativni članak">
        <h2>Sažetak</h2>
        <p>{article.summary}</p>
        <Link href="/clanci">Natrag na članke</Link>
      </section>
    </PublicPageShell>
  );
}
