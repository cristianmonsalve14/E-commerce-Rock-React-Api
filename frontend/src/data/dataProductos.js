export function getProductos() {
  const data = localStorage.getItem('productos');
  if (data) return JSON.parse(data);
  return [
    {
      id: 1,
      nombre: "Polera Deep Purple",
      descripcion: "Polera de rock de alta calidad con diseño exclusivo inspirado en Deep Purple.",
      precio: 15990,
      stock: 10,
      imagen: "/img/deep-purple.jpg"
    },
    {
      id: 2,
      nombre: "Polera Guns N' Roses",
      descripcion: "Polera con el icónico diseño de Guns N' Roses.",
      precio: 14990,
      stock: 8,
      imagen: "/img/guns-roses.jpg"
    },
    {
      id: 3,
      nombre: "Polera Metallica",
      descripcion: "Polera negra con logo clásico de Metallica. ¡Ideal para fans del metal!",
      precio: 16990,
      stock: 12,
      imagen: "/img/metallica.jpg"
    },
    {
      id: 4,
      nombre: "Polera Iron Maiden",
      descripcion: "Polera con arte de Iron Maiden, perfecta para los amantes del heavy metal.",
      precio: 16490,
      stock: 9,
      imagen: "/img/iron-maiden.jpg"
    },
    {
      id: 5,
      nombre: "Polera Led Zeppelin",
      descripcion: "Polera con el legendario logo de Led Zeppelin. Estilo y rock clásico.",
      precio: 15490,
      stock: 7,
      imagen: "/img/led-zeppelin.jpg"
    },
    {
      id: 6,
      nombre: "Polera Red Hot Chili Peppers",
      descripcion: "Polera moderna con el logo de RHCP. Para fans del funk rock.",
      precio: 14990,
      stock: 11,
      imagen: "/img/red-hot-chili-peppers.jpg"
    }
  ];
}

export function saveProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

export function addProducto(producto) {
  const productos = getProductos();
  productos.push({ ...producto, id: Date.now() });
  saveProductos(productos);
  return productos;
}

export function updateProducto(producto) {
  let productos = getProductos();
  productos = productos.map(p => p.id === producto.id ? producto : p);
  saveProductos(productos);
  return productos;
}

export function deleteProducto(id) {
  let productos = getProductos();
  productos = productos.filter(p => p.id !== id);
  saveProductos(productos);
  return productos;
}
