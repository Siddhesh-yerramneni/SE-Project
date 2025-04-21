import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createPost } from '../../src/services/api';
import CreatePost from '../../src/screens/CreatePost';

vi.mock('../../src/services/api', () => ({
  createPost: vi.fn(),
}));

describe('CreatePost Component', () => {
  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
  });

  test('renders form and allows input', () => {
    render(<MemoryRouter><CreatePost /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText(/post title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText(/write your content/i), { target: { value: 'Test Content' } });

    expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    createPost.mockResolvedValueOnce({});
    render(<MemoryRouter><CreatePost /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText(/post title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText(/write your content/i), { target: { value: 'Test Content' } });

    fireEvent.click(screen.getByRole('button', { name: /publish/i }));

    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith({
        title: 'Test Title',
        content: 'Test Content',
        author_id: 1,
      });
    });
  });
});
