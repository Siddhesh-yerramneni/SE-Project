import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../src/screens/Home";

describe("Home Page", () => {
  test("renders hero section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText("Welcome to ShelfWise")).toBeInTheDocument();
    expect(
      screen.getByText("Discover your next great read today!")
    ).toBeInTheDocument();
  });

  test("renders Browse Books button", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("link", { name: /Browse Books/i })).toBeInTheDocument();
  });

  test("renders categories", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Assert visible category headings
    expect(screen.getByText("Science-Fiction")).toBeInTheDocument();
    expect(screen.getByText("Non-Fiction")).toBeInTheDocument();
    expect(screen.getByText("Self-Help")).toBeInTheDocument();
    expect(screen.getByText("Romance")).toBeInTheDocument();
    expect(screen.getByText("Mystery")).toBeInTheDocument();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
  });
});
