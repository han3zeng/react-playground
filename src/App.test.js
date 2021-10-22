import { render, screen } from '@testing-library/react';
import App from './App';

test('App.js: content', () => {
  render(<App />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
