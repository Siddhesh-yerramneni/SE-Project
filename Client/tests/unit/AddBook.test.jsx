import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddBook from "../../src/screens/AddBook";

describe("Add Book Page", () => {
  test("renders Add Book form", () => {
    render(
      <BrowserRouter>
        <AddBook />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Book Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Category")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Book" })).toBeInTheDocument();
  });

  test("allows typing into form fields", () => {
    render(
      <BrowserRouter>
        <AddBook />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Book Name"), { target: { value: "Test Book" } });
    fireEvent.change(screen.getByPlaceholderText("Author"), { target: { value: "Test Author" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "Test Description" } });
    fireEvent.change(screen.getByPlaceholderText("Price"), { target: { value: "199" } });
    fireEvent.change(screen.getByPlaceholderText("Category"), { target: { value: "Testing" } });

    expect(screen.getByPlaceholderText("Book Name")).toHaveValue("Test Book");
    expect(screen.getByPlaceholderText("Author")).toHaveValue("Test Author");
    expect(screen.getByPlaceholderText("Description")).toHaveValue("Test Description");
    expect(screen.getByPlaceholderText("Price")).toHaveValue(199);
    expect(screen.getByPlaceholderText("Category")).toHaveValue("Testing");
  });
});
