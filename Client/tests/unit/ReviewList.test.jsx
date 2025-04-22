import { render, screen, fireEvent } from '@testing-library/react';
import ReviewList from '../../src/components/ReviewList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as api from '../../src/services/api';

const mockStore = configureStore([]);
const store = mockStore({
  user: { id: 1, name: 'User1' }
});

const mockReviews = [
  {
    id: 1,
    review: "Good book",
    user_id: 1,
    user: { name: "User1" }
  },
  {
    id: 2,
    review: "Not bad",
    user_id: 2,
    user: { name: "User2" }
  }
];

vi.mock('../../src/services/api', async () => {
  const actual = await vi.importActual('../../src/services/api');
  return {
    ...actual,
    deleteReview: vi.fn(() => Promise.resolve())
  };
});

describe('ReviewList Component', () => {
  const renderComponent = (customUserId = 1) =>
    render(
      <Provider store={store}>
        <ReviewList
          bookId={123}
          currentUserId={customUserId}
          initialReviews={mockReviews}
        />
      </Provider>
    );

  test('renders all reviews', () => {
    renderComponent();
    expect(screen.getByText(/Good book/i)).toBeInTheDocument();
    expect(screen.getByText(/Not bad/i)).toBeInTheDocument();
  });

  test('shows Edit/Delete for current user', () => {
    renderComponent();
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  });

  test('enters edit mode on Edit click', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByRole('button', { name: /update review/i })).toBeInTheDocument();
  });

  test('deletes a review', async () => {
    window.confirm = vi.fn(() => true); // Simulate confirm dialog
    const mockRefresh = vi.fn();
    render(
      <Provider store={store}>
        <ReviewList
          bookId={123}
          currentUserId={1}
          initialReviews={mockReviews}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Delete/i));
    expect(api.deleteReview).toHaveBeenCalledWith(1);
  });
});
