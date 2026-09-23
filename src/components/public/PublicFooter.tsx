import type { JSX } from "react";
import Link from "next/link";
import { PUBLIC_NAV_ITEMS } from "@/content/public";

export function PublicFooter(): JSX.Element {
  return (
    <footer className="public-footer">
      <nav aria-label="Sekundarna navigacija" className="public-footer__nav">
        {PUBLIC_NAV_ITEMS.filter((item) => item.secondary).map((item) => (
          <Link key={item.path} href={item.path}>
            {item.label} — razvojni shell
          </Link>
        ))}
      </nav>
      <p>
        Kontakt, privatni unos i povezanost radnog prostora nisu aktivni u ovoj
        preglednoj fazi.
      </p>
    </footer>
  );
}
