// Mocks the fetch API
Object.defineProperty(global, 'fetch', {
  value: jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) })),
})
