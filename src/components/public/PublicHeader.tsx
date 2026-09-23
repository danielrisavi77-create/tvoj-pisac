import type { JSX } from "react";
import Link from "next/link";
import { PUBLIC_NAV_ITEMS } from "@/content/public";
import { PublicCta } from "./PublicCta";

export function PublicHeader(): JSX.Element {
  return (
    <header className="public-header">
      <Link className="public-header__brand" href="/">
        Tvoj Pisac
      </Link>
      <nav aria-label="Glavna navigacija" className="public-header__nav">
        {PUBLIC_NAV_ITEMS.filter((item) => !item.secondary).map((item) => (
          <Link key={item.path} href={item.path}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="public-header__actions">
        <PublicCta href="/kontakt" variant="primary">
          Zatraži ponudu
        </PublicCta>
        <PublicCta href="/paketi" variant="secondary">
          Odaberi paket
        </PublicCta>
        <PublicCta href="/kontakt#razgovor" variant="secondary">
          Dogovori razgovor
        </PublicCta>
      </div>
    </header>
  );
}
