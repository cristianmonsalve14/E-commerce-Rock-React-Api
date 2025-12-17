import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';

describe('Hero Component', () => {
  test('renderiza el título principal', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.getByText(/Lo más vendido/i)).toBeInTheDocument();
  });
});
