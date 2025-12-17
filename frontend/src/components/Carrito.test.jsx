import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import Carrito from './Carrito';

describe('Carrito Component', () => {
  it('muestra el mensaje de carrito vacío', () => {
    render(
      <AuthProvider>
        <Carrito carrito={[]} />
      </AuthProvider>
    );
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it('muestra productos en el carrito', () => {
    const productos = [
      { id: 1, nombre: 'Polera Metallica', precio: 10000, cantidad: 2 }
    ];
    render(
      <AuthProvider>
        <Carrito carrito={productos} />
      </AuthProvider>
    );
    expect(screen.getByText(/Polera Metallica/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('10.000'))).toBeInTheDocument();
  });
});
