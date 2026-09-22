import { render, screen } from "@testing-library/react";
import Home from "@/app/(public)/page";

it("renders product name", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: /Tvoj Pisac/i })).toBeInTheDocument();
});
