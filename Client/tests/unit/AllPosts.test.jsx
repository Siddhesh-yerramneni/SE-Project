import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AllPosts from '../../src/screens/AllPosts';
import * as api from '../../src/services/api';
import React from 'react';

global.localStorage = {
  getItem: vi.fn(() => JSON.stringify({ id: 1 })),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

vi.mock('../../src/components/PostCard', () => ({
  default: ({ post }) => <div data-testid="post">{post.title}</div>
}));

describe('AllPosts Component', () => {
  const mockPosts = [
    { id: 1, title: 'Post A', content: 'Content A' },
    { id: 2, title: 'Post B', content: 'Content B' },
  ];

  beforeEach(() => {
    vi.spyOn(api, 'getAllPosts').mockResolvedValue({ posts: mockPosts });
  });

  test('displays posts correctly', async () => {
    render(<MemoryRouter><AllPosts /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getAllByTestId('post')).toHaveLength(2);
    });
  });

  test('shows fallback message if no posts found', async () => {
    vi.spyOn(api, 'getAllPosts').mockResolvedValue({ posts: [] });
    render(<MemoryRouter><AllPosts /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText(/no posts available/i)).toBeInTheDocument();
    });
  });
});
