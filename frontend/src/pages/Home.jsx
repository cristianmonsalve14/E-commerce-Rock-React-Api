import Layout from '../components/Layout';
import Hero from '../components/Hero';
import BlogAside from '../components/BlogAside';
import '../components/HomeLayout.css';
import { GiGuitarHead } from 'react-icons/gi';


function Home() {
  return (
    <Layout>
      <section className="home-header-box">
        <div className="home-title-row">
          <GiGuitarHead className="home-title-icon" />
          <h1 className="home-title">Bienvenido a Poleras de Rock</h1>
        </div>
        {/* Imagen animada eliminada por solicitud del usuario */}
        <div className="home-separator"></div>
        <p className="home-description">
          Bienvenido a la tienda online de poleras para fanáticos del rock. Descubre diseños exclusivos inspirados en las mejores bandas, calidad premium y novedades cada semana. ¡Exprésate con estilo y vive la música en tu outfit!
        </p>
      </section>
      <div className="home-main-layout">
        <main className="home-main-content">
          <section className="hero-section">
            <Hero />
          </section>
          <section className="hero poleras-img-section">
            <img src="/img/poleras.avif" alt="Poleras de Rock" className="hero-poleras-img" />
            <div className="hero-poleras-text">
              <h2>¡Exprésate con Estilo!</h2>
              <p>Descubre las poleras más icónicas del rock, calidad premium y diseños exclusivos para verdaderos fans. ¡Haz tu pedido hoy y lleva el espíritu del rock en tu outfit!</p>
              <a href="/catalogo" className="btn hero-poleras-btn">Visita nuestro catálogo</a>
            </div>
          </section>
        </main>
        <BlogAside />
      </div>
      <section className="home-incentivo-registro" style={{background:'#18191a',color:'#ffd700',padding:'2rem',borderRadius:'1rem',margin:'2rem 0',boxShadow:'0 2px 12px #0008',textAlign:'center'}}>
        <h2 style={{fontWeight:'bold',fontSize:'2rem',marginBottom:'1rem'}}>¡Participa y Gana!</h2>
        <p style={{fontSize:'1.2rem',color:'#fff'}}>Regístrate gratis para unirte a los debates y responder la <strong>pregunta del día</strong>. ¡Podrás ganar <span style={{color:'#ffd700'}}>descuentos exclusivos</span> y premios como <span style={{color:'#ffd700'}}>poleras de tus bandas favoritas</span>!</p>
        <a href="/registro" className="btn btn-warning mt-3" style={{fontWeight:'bold',fontSize:'1.1rem'}}>Crear cuenta y participar</a>
      </section>
    </Layout>
  );
}

export default Home;
