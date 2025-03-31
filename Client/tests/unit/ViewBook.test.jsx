import { render, screen, waitFor } from '@testing-library/react';
import ViewBook from '../../src/screens/ViewBook';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '../../src/services/api';

vi.mock('../../src/services/api');
vi.mock('../../src/components/ReviewList', () => ({
  default: () => <div>Mocked ReviewList</div>,
}));

describe('ViewBook Page', () => {
  const mockBook = {
    id: 1,
    bookname: 'Test Book',
    author: 'Author A',
    description: 'Nice book',
    price: 0,
    category: 'Fiction',
  };

  beforeEach(() => {
    api.getBook.mockResolvedValue({ book: mockBook });

    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: 1, username: 'test', email: 'test@example.com' })
    );
  });

  test('shows loading text initially', () => {
    render(
      <MemoryRouter initialEntries={['/viewBook/1']}>
        <Routes>
          <Route path="/viewBook/:id" element={<ViewBook />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading book/i)).toBeInTheDocument();
  });

  test('renders book details and review list', async () => {
    render(
      <MemoryRouter initialEntries={['/viewBook/1']}>
        <Routes>
          <Route path="/viewBook/:id" element={<ViewBook />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText(/Author A/i)).toBeInTheDocument();
      expect(screen.getByText(/Nice book/i)).toBeInTheDocument();
      expect(screen.getByText(/₹0/)).toBeInTheDocument();
      expect(screen.getByText(/Fiction/)).toBeInTheDocument();
      expect(screen.getByText(/Mocked ReviewList/i)).toBeInTheDocument();
    });
  });
});
