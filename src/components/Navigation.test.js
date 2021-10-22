import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Navigation from './Navigation';
import { AuthenticationContext } from '../contexts'

test('Navigation.js: content with value {authenticated: false}', () => {
  render(<Navigation />, { wrapper: MemoryRouter });
  expect(screen.queryByText(/Sign out/)).toBeNull()
})

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <AuthenticationContext.Provider {...providerProps}>{ui}</AuthenticationContext.Provider>,
    renderOptions,
  )
}

test('Navigation.js: content with value {authenticated: true}', () => {
  const providerProps = {
    value: {
      authenticated: 'true',
    }
  }
  customRender(<Navigation />, { providerProps,  wrapper: MemoryRouter })
  expect(screen.getByText(/Sign out/)).toBeInTheDocument();
})
