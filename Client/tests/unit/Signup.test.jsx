import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../../src/screens/Signup";

describe("Signup Component (Real API Calls)", () => {
  // Test 1: Renders the forms
  test("renders signup form with email, username, and password fields", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  // Updates the fields
  test("updates form fields on change", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  // Successful signup
  test("submits form and handles successful signup", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "test5@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "test5" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "test5" } });

    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => expect(screen.getByText(/User registered successfully/i)).toBeInTheDocument());
  });

  // Unsuccessful signup
  test("submits form and handles failed signup", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "test" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "test" } });

    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => expect(screen.getByText(/Error creating user/i)).toBeInTheDocument());
  });
});
