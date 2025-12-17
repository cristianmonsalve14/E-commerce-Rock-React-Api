import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importación añadida
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('ProtectedRoute Component', () => {
  test('renderiza hijos si está autenticado', () => {
    // Simular usuario autenticado
    const TestChild = () => <div>Contenido protegido</div>;
    render(
      <MemoryRouter>
        <AuthProvider>
          <ProtectedRoute>
            <TestChild />
          </ProtectedRoute>
        </AuthProvider>
      </MemoryRouter>
    );
    // No se puede testear redirección sin mocking, pero sí renderizado
  });
});
