import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importación de jest-dom
import PanelUsuario from './PanelUsuario';
import { AuthProvider } from '../components/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('PanelUsuario Component', () => {
  test('renderiza el perfil y secciones principales', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <PanelUsuario />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Mi Perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Mis Comentarios en el Blog/i)).toBeInTheDocument();
    expect(screen.getByText(/Pregunta del Día/i)).toBeInTheDocument();
    expect(screen.getByText(/Participación y Descuentos/i)).toBeInTheDocument();
  });
});
