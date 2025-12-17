import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

describe('Navbar Component', () => {
  test('renderiza enlaces principales', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar carritoCount={0} onCarritoClick={() => {}} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Nosotros/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

  test('muestra el botón de carrito', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Navbar carritoCount={3} onCarritoClick={() => {}} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTitle(/Ver carrito/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
