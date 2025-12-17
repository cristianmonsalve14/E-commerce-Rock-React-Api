import React, { useState } from 'react';
import CrudProductos from './CrudProductos';
import CrudUsuarios from './CrudUsuarios';

function PanelAdmin() {
  const [vista, setVista] = useState('productos');

  return (
    <div className="container py-5">
      <div className="row">
        {/* Menú lateral */}
        <aside className="col-md-3 mb-4">
          <div className="list-group">
            <button className={`list-group-item list-group-item-action${vista === 'productos' ? ' active' : ''}`} onClick={() => setVista('productos')}>
              Productos
            </button>
            <button className={`list-group-item list-group-item-action${vista === 'usuarios' ? ' active' : ''}`} onClick={() => setVista('usuarios')}>
              Usuarios
            </button>
          </div>
        </aside>
        {/* Contenido central */}
        <main className="col-md-9">
          {vista === 'productos' && <CrudProductos />}
          {vista === 'usuarios' && <CrudUsuarios />}
        </main>
      </div>
    </div>
  );
}

export default PanelAdmin;
