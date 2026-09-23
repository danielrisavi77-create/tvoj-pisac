import type { JSX, ReactNode } from "react";

type PublicPageShellProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function PublicPageShell({
  eyebrow,
  title,
  intro,
  children,
}: PublicPageShellProps): JSX.Element {
  return (
    <section className="public-page-shell">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      <p className="public-page-shell__intro">{intro}</p>
      {children}
    </section>
  );
}
