import { render, screen } from "@testing-library/react";
import { PublicCta } from "@/components/public/PublicCta";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import PackageCard from "@/components/public/PackageCard";
import Home from "@/app/(public)/page";
import PackagesPage from "@/app/(public)/paketi/page";
import ProcessPage from "@/app/(public)/proces/page";
import ExamplesPage from "@/app/(public)/primjeri/page";
import FaqPage from "@/app/(public)/faq/page";
import ArticlesPage from "@/app/(public)/clanci/page";
import AboutPage from "@/app/(public)/o-nama/page";
import ContactPage from "@/app/(public)/kontakt/page";
import ServicesPage from "@/app/(public)/usluge/page";
import { PUBLIC_FAQS, PUBLIC_PACKAGES } from "@/content/public";

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

  it("makes quality control and Daniel's final approval explicit in the process", () => {
    render(<ProcessPage />);

    expect(
      screen.getByText("Završna kontrola kvalitete"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Danielovo završno odobrenje"),
    ).toBeInTheDocument();
    expect(screen.getByText(/automatizirana isporuka/i)).toBeInTheDocument();
  });

  it("discloses software and AI assistance with human review", () => {
    render(<ServicesPage />);

    expect(
      screen.getByText(
        /namjenski softver i alati potpomognuti umjetnom inteligencijom.*ljudsku provjeru prije isporuke/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders exactly three visible illustrative-example disclaimers", () => {
    render(<ExamplesPage />);

    expect(
      screen.getAllByText(
        "Ilustrativni primjer — nije stvarni klijentski rezultat.",
      ),
    ).toHaveLength(3);
  });

  it("uses native details and summary controls for each FAQ", () => {
    const { container } = render(<FaqPage />);

    expect(container.querySelectorAll("details")).toHaveLength(PUBLIC_FAQS.length);
    expect(container.querySelectorAll("details > summary")).toHaveLength(
      PUBLIC_FAQS.length,
    );
  });

  it("lists the educational articles and describes Daniel-led service without proof claims", () => {
    render(
      <>
        <ArticlesPage />
        <AboutPage />
      </>,
    );

    expect(
      screen.getByRole("link", {
        name: "Što pripremiti prije nego što zatražiš ponudu",
      }),
    ).toHaveAttribute("href", "/clanci/prije-nego-sto-zatrazi-ponudu");
    expect(screen.getByText(/Daniel vodi Tvoj Pisac/i)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(
      /tim stručnjaka|certifikat|godina iskustva|uspješan rezultat/i,
    );
  });

  it("keeps contact static, linked internally, and explicitly disconnected", () => {
    const { container } = render(<ContactPage />);

    expect(container.querySelector("section#razgovor")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Paketi" })).toHaveAttribute(
      "href",
      "/paketi",
    );
    expect(screen.getByRole("link", { name: "Proces" })).toHaveAttribute(
      "href",
      "/proces",
    );
    expect(
      screen.getByText(/kontaktni ili privatni unos nije povezan u ovoj fazi/i),
    ).toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector("a[href^='mailto:']")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /pošalji/i })).not.toBeInTheDocument();
  });
});
