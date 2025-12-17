import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthContext';
import { FaShoppingCart } from 'react-icons/fa';

function Navbar({ onCarritoClick, carritoCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Poleras de Rock</div>
      <button className={`navbar-toggle${menuOpen ? ' open' : ''}`} onClick={handleToggle} aria-label="Abrir menú">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links${menuOpen ? ' active' : ''}`}>
        <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
        <li><Link to="/catalogo" onClick={handleLinkClick}>Catálogo</Link></li>
        <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
        <li><Link to="/nosotros" onClick={handleLinkClick}>Nosotros</Link></li>
        <li><Link to="/contacto" onClick={handleLinkClick}>Contacto</Link></li>
        {!user && <li><Link to="/registro" onClick={handleLinkClick}>Registro</Link></li>}
        {!user && <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>}
        {user && <li><Link to="/usuario" onClick={handleLinkClick}>Mi Panel</Link></li>}
        {user && user.correo === 'admin@admin.com' && (
          <li><Link to="/admin" onClick={handleLinkClick}>Admin</Link></li>
        )}
        {user && (
          <li><button className="btn btn-sm btn-danger ms-2" onClick={() => { logout(); handleLinkClick(); }}>Cerrar sesión</button></li>
        )}
        <li>
          <button className="navbar-cart-btn" onClick={onCarritoClick} title="Ver carrito">
            <FaShoppingCart className="navbar-cart-icon" />
            {carritoCount > 0 && <span className="navbar-cart-count">{carritoCount}</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
