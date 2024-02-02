import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

test('renders LandingPage component', () => {
  render(<LandingPage />);
  
  // Verifica que el texto esté presente en el componente renderizado
  const welcomeText = screen.getByText(/welcome to/i);
  expect(welcomeText).toBeInTheDocument();

  // Verifica que el enlace esté presente y tenga la ruta correcta
  const exploreLink = screen.getByRole('link', { name: /let's explore it/i });
  expect(exploreLink).toHaveAttribute('href', '/home');

  // Verifica que el botón esté presente
  const exploreButton = screen.getByRole('button', { name: /let's explore it/i });
  expect(exploreButton).toBeInTheDocument();
});
