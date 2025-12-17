import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Catalogo from './Catalogo';
import * as api from '../services/api';

// Mock del servicio API
jest.mock('../services/api');

const productosMock = [
  {
    _id: '1',
    nombre: 'Polera Deep Purple',
    descripcion: 'Polera de rock clásico',
    precio: 15990,
    imagen: '/img/deep-purple.jpg',
    stock: 10
  },
  {
    _id: '2',
    nombre: 'Polera Metallica',
    descripcion: 'Polera de metal',
    precio: 16990,
    imagen: '/img/metallica.jpg',
    stock: 12
  }
];

describe('Catalogo Component', () => {
  beforeEach(() => {
    // Mock de la API para que devuelva productos
    api.productosAPI.obtenerTodos = jest.fn().mockResolvedValue(productosMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el título del catálogo', () => {
    render(<Catalogo />);
    expect(screen.getByText(/Nuestro Catálogo/i)).toBeInTheDocument();
  });

  it('renderiza productos desde la API', async () => {
    render(<Catalogo />);
    
    // Esperar a que carguen los productos
    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });
    
    // Verificar que se muestran los productos
    expect(screen.getByText(/Deep Purple/i)).toBeInTheDocument();
    expect(screen.getByText(/Metallica/i)).toBeInTheDocument();
  });

  it('llama a onAddToCart al hacer click en el botón', async () => {
    const mockAddToCart = jest.fn();
    render(<Catalogo onAddToCart={mockAddToCart} />);
    
    // Esperar a que carguen los productos
    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /añadir al carrito/i }).length).toBeGreaterThan(0);
    });
    
    const button = screen.getAllByRole('button', { name: /añadir al carrito/i })[0];
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalled();
  });

  it('muestra mensaje de carga mientras obtiene productos', () => {
    render(<Catalogo />);
    expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument();
  });
});
