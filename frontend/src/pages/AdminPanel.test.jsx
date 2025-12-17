import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminPanel from './AdminPanel';
import { AuthProvider } from '../components/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock ResizeObserver para entorno de test
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('AdminPanel Component', () => {
  test('renderiza el panel de administración', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AdminPanel />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Panel de Administración/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Productos/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Usuarios/i })).toBeInTheDocument();
    expect(screen.getByText(/Descuentos/i)).toBeInTheDocument();
    expect(screen.getByText(/Comentarios/i)).toBeInTheDocument();
  });
});
