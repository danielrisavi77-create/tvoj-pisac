import { render, screen } from "@testing-library/react";
import { PublicCta } from "@/components/public/PublicCta";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

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
});
