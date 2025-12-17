import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BlogAside from './BlogAside';

describe('BlogAside Component', () => {
  test('renderiza el aside de noticias', () => {
    render(
      <MemoryRouter>
        <BlogAside />
      </MemoryRouter>
    );
    expect(screen.getByText(/Últimas Noticias/i)).toBeInTheDocument();
  });
});
