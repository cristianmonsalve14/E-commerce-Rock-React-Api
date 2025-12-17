import Layout from '../components/Layout';
import Catalogo from '../components/Catalogo';

function CatalogoPage({ onAddToCart }) {
  return (
    <Layout>
      <section className="catalogo-section">
        <Catalogo onAddToCart={onAddToCart} />
      </section>
    </Layout>
  );
}

export default CatalogoPage;