import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { TextEncoder, TextDecoder } from 'util';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe('Login Component', () => {
  it('renderiza el formulario de login', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('muestra mensaje de error si los campos están vacíos', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    
    // Los mensajes de validación ahora son específicos por campo
    await waitFor(() => {
      expect(screen.getByText(/El correo es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error si las credenciales son incorrectas', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { name: 'correo', value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { name: 'password', value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));
    
    // Esperar a que aparezca el mensaje de error del backend
    await waitFor(() => {
      // El backend devuelve "Credenciales inválidas"
      const errorElement = screen.queryByText(/Credenciales inválidas/i);
      expect(errorElement).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
