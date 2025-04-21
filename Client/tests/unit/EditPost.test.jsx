import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EditPost from '../../src/screens/EditPost';
import * as api from '../../src/services/api';

vi.mock('../../src/services/api', () => ({
  editPost: vi.fn(),
  getPostsByAuthor: vi.fn(),
}));

describe('EditPost Component', () => {
  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
    api.getPostsByAuthor.mockResolvedValue({
      posts: [{ id: 10, title: 'Old Title', content: 'Old Content' }],
    });
  });

  test('loads existing post and allows editing', async () => {
    render(
      <MemoryRouter initialEntries={['/editPost/10']}>
        <Routes>
          <Route path="/editPost/:id" element={<EditPost />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Old Title')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Old Content')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/post title/i), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByPlaceholderText(/post content/i), { target: { value: 'New Content' } });

    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(api.editPost).toHaveBeenCalledWith('10', {
        title: 'New Title',
        content: 'New Content',
      });
    });
  });
});
