import { render, screen } from "@testing-library/react";
import AdminPage from "@/app/(admin)/admin/page";
import PortalPage from "@/app/(client)/portal/page";
import PublicPage from "@/app/(public)/page";

describe("route shells", () => {
  it("renders the shared product header and one main landmark", () => {
    render(<PublicPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tvoj Pisac" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });

  it("labels the client surface as a development shell", () => {
    render(<PortalPage />);

    expect(
      screen.getByRole("heading", { name: /klijentski portal.*razvojni shell/i }),
    ).toBeInTheDocument();
  });

  it("labels the admin surface as a development shell", () => {
    render(<AdminPage />);

    expect(
      screen.getByRole("heading", { name: /administracija.*razvojni shell/i }),
    ).toBeInTheDocument();
  });
});
