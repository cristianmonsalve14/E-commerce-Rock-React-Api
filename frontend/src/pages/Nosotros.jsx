import Layout from '../components/Layout';
import './Nosotros.css';

function NosotrosPage() {
  return (
    <Layout>
      <section className="nosotros-section">
        <h2>Sobre Nosotros</h2>
        <p className="nosotros-desc">
          Somos Poleras de Rock, una tienda apasionada por la música y la cultura rock. Nuestro objetivo es ofrecer poleras de alta calidad inspiradas en las bandas más legendarias, para que lleves tu pasión siempre contigo.
        </p>
        <div className="nosotros-equipo">
          <div className="equipo-card">
            <img src="/img/camila.jpg" alt="Camila" />
            <h3>Camila</h3>
            <p>Fundadora & Diseñadora</p>
          </div>
          <div className="equipo-card">
            <img src="/img/benjamin.jpg" alt="Benjamín" />
            <h3>Benjamín</h3>
            <p>Atención al Cliente</p>
          </div>
          <div className="equipo-card">
            <img src="/img/valentina.jpg" alt="Valentina" />
            <h3>Valentina</h3>
            <p>Marketing & RRSS</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default NosotrosPage;
