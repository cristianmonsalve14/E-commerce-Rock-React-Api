import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-float-icons">
        <img src="/img/polera-algodon.jpg" alt="Polera" className="footer-float polera" />
        <img src="/img/guitarra.jpg" alt="Guitarra" className="footer-float guitarra" />
        <img src="/img/rockandroll.jpg" alt="Rock" className="footer-float rock" />
      </div>
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/public/img/facebook.png" alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/public/img/instagram.webp" alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/public/img/twitter_x.png" alt="Twitter" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/public/img/Youtube.png" alt="YouTube" />
          </a>
        </div>
        <div className="footer-links">
          <a href="/contacto" style={{color:'#fff', textDecoration:'underline'}}>Contacto</a> |
          <a href="/nosotros" style={{color:'#fff', textDecoration:'underline', marginLeft:'0.5rem'}}>Nosotros</a>
        </div>
        <p>&copy; 2025 Poleras de Rock. Todos los derechos reservados.</p>
        <p>Desarrollado por tu equipo Fullstack II</p>
      </div>
    </footer>
  );
}

export default Footer;
