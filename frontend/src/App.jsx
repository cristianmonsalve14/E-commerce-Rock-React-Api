import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Home from './pages/Home';
import CatalogoPage from './pages/Catalogo';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/Login';
import RegistroPage from './pages/Registro';
import ContactoPage from './pages/Contacto';
import NosotrosPage from './pages/Nosotros';
import BlogPage from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PanelUsuario from './pages/PanelUsuario';
import ProtectedRoute from './components/ProtectedRoute';
import Farmacias from './pages/Farmacias';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const [carrito, setCarrito] = useState([]);
  const [showCarrito, setShowCarrito] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('carrito');
    if (data) setCarrito(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleAddToCart = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCarrito([]);
  };

  const handleCheckout = () => {
    alert('¡Gracias por tu compra!');
    setCarrito([]);
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar onCarritoClick={() => setShowCarrito(true)} carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogoPage onAddToCart={handleAddToCart} />} />
          <Route path="/farmacias" element={<Farmacias />} />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/blog" element={
            <ProtectedRoute>
              <BlogPage />
            </ProtectedRoute>
          } />
          <Route path="/blog/:id" element={
            <ProtectedRoute>
              <BlogPost />
            </ProtectedRoute>
          } />
          <Route path="/usuario" element={
            <ProtectedRoute>
              <PanelUsuario />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
      {showCarrito && (
        <Carrito
          carrito={carrito}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          onCheckout={handleCheckout}
          onClose={() => setShowCarrito(false)}
        />
      )}
    </>
  );
}

export default App;

