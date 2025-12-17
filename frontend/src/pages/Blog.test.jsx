import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { AuthProvider } from '../components/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Blog Component', () => {
  test('renderiza el blog', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Blog />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Últimas Noticias del Rock/i)).toBeInTheDocument();
  });
});
