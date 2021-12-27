import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { AuthenticationContext } from '../contexts';

test('Navigation.js: content with value {authenticated: false}', () => {
  render(<Navigation />);
  expect(screen.queryByText(/Sign out/)).toBeNull();
});

const customRender = (ui, { providerProps, ...renderOptions }) => render(
  <AuthenticationContext.Provider {...providerProps}>{ui}</AuthenticationContext.Provider>,
  renderOptions,
);

test('Navigation.js: content with value {authenticated: true}', () => {
  const providerProps = {
    value: {
      authenticated: 'true',
    },
  };
  customRender(<Navigation />, { providerProps });
  expect(screen.getByText(/Sign out/)).toBeInTheDocument();
});
