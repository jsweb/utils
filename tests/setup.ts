// Mocks
Object.defineProperties(global, {
  fetch: {
    value: jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) })),
  },
  Response: {
    value: jest.fn(),
  },
})
