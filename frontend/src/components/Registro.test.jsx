import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importación añadida
import { AuthProvider } from './AuthContext';
import Registro from './Registro';
import { MemoryRouter } from 'react-router-dom';

describe('Registro Component', () => {
  test('renderiza el formulario de registro', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Registro />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tus apellidos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
  });

  test('muestra error si los campos están vacíos y se intenta enviar', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Registro />
        </AuthProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Registrarse/i));
    expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/Los apellidos son requeridos/i)).toBeInTheDocument();
    expect(screen.getByText(/El correo es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/La contraseña es requerida/i)).toBeInTheDocument();
  });
});
