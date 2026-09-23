import { render, screen } from "@testing-library/react";
import { PublicCta } from "@/components/public/PublicCta";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import PackageCard from "@/components/public/PackageCard";
import Home from "@/app/(public)/page";
import PackagesPage from "@/app/(public)/paketi/page";
import { PUBLIC_PACKAGES } from "@/content/public";

describe("public experience components", () => {
  it("renders the named main navigation with approved CTA links", () => {
    render(<PublicHeader />);

    expect(
      screen.getByRole("navigation", { name: "Glavna navigacija" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
      "href",
      "/kontakt",
    );
    expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
      "href",
      "/paketi",
    );
    expect(
      screen.getByRole("link", { name: "Dogovori razgovor" }),
    ).toHaveAttribute("href", "/kontakt#razgovor");
  });

  it("states the no-backend boundary and does not render a fake submit button", () => {
    render(<PublicFooter />);

    expect(
      screen.getByText(/kontakt, privatni unos i povezanost radnog prostora nisu aktivni/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Pošalji" })).not.toBeInTheDocument();
  });

  it("renders internal CTA links for the approved destinations", () => {
    render(
      <>
        <PublicCta href="/kontakt" variant="primary">
          Zatraži ponudu
        </PublicCta>
        <PublicCta href="/paketi" variant="secondary">
          Odaberi paket
        </PublicCta>
      </>,
    );

    expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
      "href",
      "/kontakt",
    );
    expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
      "href",
      "/paketi",
    );
  });

  it("presents the home CTA without forbidden outcome claims", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Tvoj Pisac" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Zatraži ponudu" })).toHaveAttribute(
      "href",
      "/kontakt",
    );
    expect(screen.getByRole("link", { name: "Odaberi paket" })).toHaveAttribute(
      "href",
      "/paketi",
    );
    expect(document.body.textContent).not.toMatch(
      /garantiran[aeiou]* ocjen|zajamčen[aeiou]* prolaz|izbjegavanje detektor|checkout|plaćanje|upload|slanje prijave|stvaranje radnog prostora/i,
    );
  });

  it("renders all Foundation catalogue prices and scope boundaries", () => {
    render(<PackagesPage />);

    for (const price of ["€50", "€150", "€300", "€500", "€1.000"]) {
      expect(screen.getByText(price)).toBeInTheDocument();
    }
    expect(screen.getAllByText(/točan opseg, rok, formati i uvjeti/i)).toHaveLength(5);
  });

  it("renders a package card with its catalogue price, boundary, and detail link", () => {
    render(<PackageCard package={PUBLIC_PACKAGES[0]} />);

    expect(screen.getByText("€50")).toBeInTheDocument();
    expect(screen.getByText(/standardna cijena vrijedi/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /saznaj više/i })).toHaveAttribute(
      "href",
      "/paketi/seminarski",
    );
  });
});
