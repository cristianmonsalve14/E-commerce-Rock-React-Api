import React, { useState } from 'react';
import ComentarioForm from '../components/ComentarioForm';
import ComentariosList from '../components/ComentariosList';
import { useParams } from 'react-router-dom';

// Simulación de datos de post
const posts = {
  1: { titulo: '¡Bienvenido al Blog Rockero!', contenido: 'Participa comentando y gana descuentos.' },
  2: { titulo: 'Novedades de la tienda', contenido: 'Descubre los nuevos lanzamientos y promociones.' },
};

export default function BlogPost() {
  const { id } = useParams();
  const post = posts[id];
  const [comentarios, setComentarios] = useState([]);

  const agregarComentario = (comentario) => {
    setComentarios([...comentarios, comentario]);
  };

  if (!post) return <p>Post no encontrado.</p>;

  return (
    <section>
      <h2>{post.titulo}</h2>
      <p>{post.contenido}</p>
      <ComentarioForm onAdd={agregarComentario} />
      <ComentariosList comentarios={comentarios} />
    </section>
  );
}
