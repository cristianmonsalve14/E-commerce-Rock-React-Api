import React from 'react';
import { Link } from 'react-router-dom';
import './BlogAside.css';

function BlogAside() {
  return (
    <aside className="blog-aside">
      <h3 className="blog-aside-title">Últimas Noticias</h3>
      <div className="blog-card">
        <img src="/img/iron-maiden.jpg" alt="Iron Maiden" />
        <div className="blog-card-body">
          <h5 className="blog-card-title">¡Nuevos diseños exclusivos!</h5>
          <p className="blog-card-text">Descubre la nueva colección de poleras inspiradas en bandas legendarias. <Link to="/blog">Leer más</Link></p>
        </div>
      </div>
      <div className="blog-card">
        <img src="/img/polera-algodon.jpg" alt="Polera Algodón" />
        <div className="blog-card-body">
          <h5 className="blog-card-title">¿Por qué el algodón es el mejor material?</h5>
          <p className="blog-card-text">Te contamos por qué nuestras poleras son cómodas y resistentes. <Link to="/blog">Leer más</Link></p>
        </div>
      </div>
    </aside>
  );
}

export default BlogAside;
