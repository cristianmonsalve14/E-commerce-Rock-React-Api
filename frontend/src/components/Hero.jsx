import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-catalogo-badge">🔥 Lo más vendido</div>
      <p>Las mejores poleras para los verdaderos fans del rock</p>
      <Link to="/catalogo" className="btn hero-catalogo-btn">
        <span>¡Descubre tu polera ideal!</span>
        <img src="/img/guitarra.jpg" alt="Guitarra" className="hero-catalogo-guitar" />
      </Link>
      <div className="hero-catalogo-subtext">Más de 50 diseños exclusivos · Nuevas bandas cada semana</div>
    </section>
  );
}

export default Hero;
