import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from './Contacto';

describe('Contacto Component', () => {
  it('renderiza el formulario de contacto', () => {
    render(<Contacto />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  it('valida que el correo sea obligatorio', () => {
    render(<Contacto />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Hola' } });
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(screen.getByText(/El correo es requerido/i)).toBeInTheDocument();
  });
});
