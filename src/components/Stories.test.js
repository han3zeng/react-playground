import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Stories from './Stories';

test('Stories.js: content with API request', async () => {
  render(<Stories csrfToken="test-csrf-token" />, { wrapper: MemoryRouter });
  expect(await screen.findByText(/Story One/)).toBeInTheDocument();
})
