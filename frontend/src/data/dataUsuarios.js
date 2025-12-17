export function getUsuarios() {
  const data = localStorage.getItem('usuarios');
  if (data) return JSON.parse(data);
  return [
    {
      id: 1,
      run: "19011022K",
      nombre: "Juan",
      apellidos: "Pérez Soto",
      correo: "juan@duoc.cl",
      tipo: "Cliente"
    },
    {
      id: 2,
      run: "20123456K",
      nombre: "Ana",
      apellidos: "Gómez Ruiz",
      correo: "ana@gmail.com",
      tipo: "Administrador"
    }
  ];
}

export function saveUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

export function addUsuario(usuario) {
  const usuarios = getUsuarios();
  usuarios.push({ ...usuario, id: Date.now() });
  saveUsuarios(usuarios);
  return usuarios;
}

export function updateUsuario(usuario) {
  let usuarios = getUsuarios();
  usuarios = usuarios.map(u => u.id === usuario.id ? usuario : u);
  saveUsuarios(usuarios);
  return usuarios;
}

export function deleteUsuario(id) {
  let usuarios = getUsuarios();
  usuarios = usuarios.filter(u => u.id !== id);
  saveUsuarios(usuarios);
  return usuarios;
}
