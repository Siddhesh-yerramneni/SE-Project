global.localStorage = {
    getItem: vi.fn(() => JSON.stringify({ id: 1 })),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  