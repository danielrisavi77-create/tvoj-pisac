import type { JSX, ReactNode } from "react";
import Link from "next/link";

type PublicCtaProps = {
  href: "/kontakt" | "/paketi" | "/kontakt#razgovor";
  variant: "primary" | "secondary";
  children: ReactNode;
};

export function PublicCta({ href, variant, children }: PublicCtaProps): JSX.Element {
  return (
    <Link className={`public-cta public-cta--${variant}`} href={href}>
      {children}
    </Link>
  );
}
