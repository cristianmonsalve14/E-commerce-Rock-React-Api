import React from 'react';
import Layout from '../components/Layout';
import './Blog.css';
import BlogSocialIcons from './BlogSocialIcons';

function BlogPage() {
  return (
    <Layout>
      <section className="blog-section">
        <h2>Últimas Noticias del Rock</h2>
        <div className="blog-list">
          <article className="blog-card">
            <img src="/img/blog2.webp" alt="Nuevos diseños exclusivos" />
            <div className="blog-content">
              <h3>¡Nuevos diseños exclusivos!</h3>
              <p>Descubre la nueva colección de poleras inspiradas en bandas legendarias. ¡No te pierdas los lanzamientos de este mes!</p>
              <span className="blog-date">Octubre 2025</span>
              <BlogSocialIcons />
            </div>
          </article>
          <article className="blog-card">
            <img src="/img/polera-algodon.jpg" alt="¿Por qué el algodón es el mejor material?" />
            <div className="blog-content">
              <h3>¿Por qué el algodón es el mejor material?</h3>
              <p>Te contamos por qué nuestras poleras son cómodas y resistentes. ¡Conoce los beneficios del algodón premium!</p>
              <span className="blog-date">Septiembre 2025</span>
              <BlogSocialIcons />
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}

export default BlogPage;
