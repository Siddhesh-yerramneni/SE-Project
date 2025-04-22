import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import ReviewForm from "../../src/components/ReviewForm";

const mockStore = configureStore([]);

describe("ReviewForm Component", () => {
  const mockUser = {
    id: 1,
    username: "testuser",
    email: "test@example.com"
  };

  const store = mockStore({ user: mockUser });

  test("renders input and submit button for new review", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm bookId={1} refreshReviews={vi.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Write your review...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("submits a new review", async () => {
    const mockSubmit = vi.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm bookId={1} refreshReviews={mockSubmit} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Write your review..."), {
      target: { value: "Great book!" }
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test("renders form in edit mode", async () => {
    const mockEditReview = {
      id: 2,
      review: "Old review"
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm
            bookId={1}
            existingReview={mockEditReview}
            refreshReviews={vi.fn()}
          />
        </BrowserRouter>
      </Provider>
    );

    // Wait for useEffect to populate the reviewText
    await waitFor(() => {
      expect(screen.getByDisplayValue("Old review")).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });
});
