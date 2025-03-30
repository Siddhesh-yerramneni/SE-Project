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

    expect(
      screen.getByText("Welcome to ShelfWise")
    ).toBeInTheDocument();
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

    expect(
      screen.getByRole("link", { name: "Browse Books" })
    ).toBeInTheDocument();
  });

  test("renders categories", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Non-Fiction")).toBeInTheDocument();
    expect(screen.getByText("Science Fiction")).toBeInTheDocument();
  });
});
