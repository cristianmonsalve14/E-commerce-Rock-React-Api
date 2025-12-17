import Layout from '../components/Layout';
import '../components/Contacto.css';

function ContactoPage() {
  return (
    <Layout>
      <section className="contacto-section">
        <h2>Contáctanos</h2>
        <p>¿Tienes dudas, sugerencias o quieres colaborar? Escríbenos y te responderemos pronto.</p>

        <form className="contacto-form">
          <label>
            Nombre
            <input type="text" name="nombre" placeholder="Tu nombre" required />
          </label>

          <label>
            Correo
            <input type="email" name="correo" placeholder="tu@email.com" required />
          </label>

          <label>
            Mensaje
            <textarea name="mensaje" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
          </label>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </Layout>
  );
}

export default ContactoPage;
