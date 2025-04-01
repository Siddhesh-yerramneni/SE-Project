import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Login from "../../src/screens/Login";

// Mock store setup
const mockStore = configureStore({
  reducer: {},
});

describe("Login Component", () => {
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={mockStore}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </Provider>
    );
  };

  test("renders login form with username and password fields", () => {
    renderWithProviders(<Login />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("updates username and password on change", () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "test1" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "test1" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText(/Login successful/i)).toBeInTheDocument());
  });

  test("handles failed login", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument());
  });
});
