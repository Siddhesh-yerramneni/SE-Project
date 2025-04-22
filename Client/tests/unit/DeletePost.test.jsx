import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AllPosts from "../../src/screens/AllPosts";
import * as api from "../../src/services/api";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../src/services/api");

const mockPosts = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
    user: { username: "testuser" },
    user_id: 1,
  },
];

describe("AllPosts Component", () => {
  beforeEach(() => {
    localStorage.setItem("currentUser", JSON.stringify({ id: 1, username: "testuser" }));
    api.getAllPosts.mockResolvedValue({ posts: mockPosts });
    api.deletePost.mockResolvedValue({ msg: "Post deleted" });
  });

  test("deletes a post when confirmed", async () => {
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
      expect(api.deletePost).toHaveBeenCalledWith(1);
      expect(screen.getByText(/post deleted/i)).toBeInTheDocument();
    });
  });
});
