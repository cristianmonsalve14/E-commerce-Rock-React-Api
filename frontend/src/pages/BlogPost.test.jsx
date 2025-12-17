import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from './BlogPost';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('BlogPost Component', () => {
  test('renderiza el post del blog', () => {
    render(
      <MemoryRouter>
        <BlogPost />
      </MemoryRouter>
    );
    expect(screen.getByText(/Post no encontrado/i)).toBeInTheDocument();
  });
});
