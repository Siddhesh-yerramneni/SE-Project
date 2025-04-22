/// <reference types="vitest" />
import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// MOCK API BEFORE importing AllPosts
vi.mock("../../src/services/api", async () => {
  const actual = await vi.importActual("../../src/services/api");
  return {
    ...actual,
    getAllPosts: vi.fn().mockResolvedValue({
      posts: [
        {
          id: "1",
          title: "Post 1",
          content: "Content 1",
          author: { id: "user1", username: "testuser" },
        },
      ],
    }),
    deletePost: vi.fn().mockResolvedValue({ success: true }),
  };
});

import AllPosts from "../../src/screens/AllPosts";
import * as api from "../../src/services/api";

beforeEach(() => {
  localStorage.setItem("currentUser", JSON.stringify({ id: "user1" }));
});

describe("AllPosts Component", () => {
  it("deletes a post when confirmed", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <BrowserRouter>
        <AllPosts />
      </BrowserRouter>
    );

    expect(await screen.findByText("Post 1")).toBeInTheDocument();

    const deleteBtn = screen.getByLabelText("Delete");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(api.deletePost).toHaveBeenCalledWith("1");
    });
  });
});
