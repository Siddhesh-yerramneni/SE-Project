import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from '../../src/components/ReviewForm';
import * as api from '../../src/services/api';

vi.mock('../../src/services/api');

describe('ReviewForm Component', () => {
  const mockRefresh = vi.fn();

  test('renders input and submit button for new review', () => {
    render(
      <ReviewForm
        bookId={1}
        userId={2}
        existingReview={null}
        refreshReviews={mockRefresh}
      />
    );

    expect(screen.getByPlaceholderText(/write your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit review/i })).toBeInTheDocument();
  });

  test('submits a new review', async () => {
    api.addReview.mockResolvedValue({ msg: 'Review added' });

    render(
      <ReviewForm
        bookId={1}
        userId={2}
        existingReview={null}
        refreshReviews={mockRefresh}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/write your review/i), {
      target: { value: 'Great book!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit review/i }));

    await waitFor(() => {
      expect(api.addReview).toHaveBeenCalledWith({
        book_id: 1,
        user_id: 2,
        review: 'Great book!',
      });
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test('renders form in edit mode', () => {
    render(
      <ReviewForm
        bookId={1}
        userId={2}
        existingReview={{ id: 5, review: 'Old Review' }}
        refreshReviews={mockRefresh}
      />
    );

    expect(screen.getByDisplayValue('Old Review')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update review/i })).toBeInTheDocument();
  });

  test('submits updated review', async () => {
    api.editReview.mockResolvedValue({ msg: 'Updated' });

    render(
      <ReviewForm
        bookId={1}
        userId={2}
        existingReview={{ id: 5, review: 'Old Review' }}
        refreshReviews={mockRefresh}
      />
    );

    fireEvent.change(screen.getByDisplayValue('Old Review'), {
      target: { value: 'Updated review' },
    });

    fireEvent.click(screen.getByRole('button', { name: /update review/i }));

    await waitFor(() => {
      expect(api.editReview).toHaveBeenCalledWith(5, { review: 'Updated review' });
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
