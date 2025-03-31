import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewList from '../../src/components/ReviewList';
import * as api from '../../src/services/api';

vi.mock('../../src/services/api');

describe('ReviewList Component', () => {
  const mockReviews = [
    { id: 1, user_id: 1, review: 'My Review' },
    { id: 2, user_id: 2, review: 'Other Review' },
  ];

  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
    api.getReviews.mockResolvedValue({ reviews: mockReviews });
  });

  test('renders all reviews', async () => {
    render(<ReviewList bookId={1} currentUserId={1} />);

    expect(await screen.findByText('My Review')).toBeInTheDocument();
    expect(screen.getByText('Other Review')).toBeInTheDocument();
  });

  test('shows Edit/Delete for current user', async () => {
    render(<ReviewList bookId={1} currentUserId={1} />);

    expect(await screen.findByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });

  test('enters edit mode on Edit click', async () => {
    render(<ReviewList bookId={1} currentUserId={1} />);

    fireEvent.click(await screen.findByText(/edit/i));

    expect(await screen.findByText(/editing your review/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('My Review')).toBeInTheDocument();
  });

  test('deletes a review', async () => {
    api.deleteReview.mockResolvedValue({ msg: 'Deleted' });

    render(<ReviewList bookId={1} currentUserId={1} />);

    fireEvent.click(await screen.findByText(/delete/i));

    await waitFor(() => {
      expect(api.deleteReview).toHaveBeenCalledWith(1);
    });
  });
});
