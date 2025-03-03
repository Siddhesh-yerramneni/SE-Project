import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../src/screens/Login";

describe("Login Component", () => {
  test("renders login form with username and password fields", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("updates username and password on change", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "test1" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "test1" } });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText(/Login successful!/i)).toBeInTheDocument());
  });

  test("handles failed login", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "wrongpassword" } });
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument());
  });
});
