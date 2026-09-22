import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders product name", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: /Tvoj Pisac/i })).toBeInTheDocument();
});
