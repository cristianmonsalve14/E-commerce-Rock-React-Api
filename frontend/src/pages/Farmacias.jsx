import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import './Farmacias.css';
import { FaClinicMedical, FaSearch, FaCopy, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function Farmacias() {
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [comunas, setComunas] = useState([]);
  const [copiado, setCopiado] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState('todo'); // todo, nombre, telefono, direccion
  const [ordenar, setOrdenar] = useState('nombre'); // nombre, comuna
  // eslint-disable-next-line no-unused-vars
  const [estado, setEstado] = useState('todos'); // todos, abiertos, cerrados - preparado para fase 2

  useEffect(() => {
    fetch('https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php')
      .then(res => res.json())
      .then(data => {
        setFarmacias(data);
        setLoading(false);
        // Extraer comunas únicas para el autocompletar
        const comunasUnicas = Array.from(new Set(data.map(f => f.comuna_nombre))).sort();
        setComunas(comunasUnicas);
      })
      .catch(() => {
        setError('No se pudo obtener la información de farmacias.');
        setLoading(false);
      });
  }, []);

  // Función para filtrar farmacias
  const farmaciasFiltradas = farmacias
    .filter(f => {
      let coincide = true;
      
      // Filtro de búsqueda por tipo
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase();
        if (tipoFiltro === 'todo') {
          coincide = f.comuna_nombre.toLowerCase().includes(busquedaLower) ||
                     f.local_nombre.toLowerCase().includes(busquedaLower) ||
                     f.local_telefono.includes(busqueda) ||
                     f.local_direccion.toLowerCase().includes(busquedaLower);
        } else if (tipoFiltro === 'nombre') {
          coincide = f.local_nombre.toLowerCase().includes(busquedaLower);
        } else if (tipoFiltro === 'telefono') {
          coincide = f.local_telefono.includes(busqueda);
        } else if (tipoFiltro === 'direccion') {
          coincide = f.local_direccion.toLowerCase().includes(busquedaLower);
        }
      }
      
      return coincide;
    })
    .sort((a, b) => {
      if (ordenar === 'nombre') {
        return a.local_nombre.localeCompare(b.local_nombre);
      } else if (ordenar === 'comuna') {
        return a.comuna_nombre.localeCompare(b.comuna_nombre);
      }
      return 0;
    });

  const limpiarFiltros = () => {
    setBusqueda('');
    setTipoFiltro('todo');
    setOrdenar('nombre');
    setEstado('todos');
  };

  const copiarAlPortapapeles = (texto, id) => {
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <Layout>
      <section className="farmacias-section">
        <div className="farmacias-header">
          <FaClinicMedical className="farmacias-header-icon" />
          <h2>Farmacias de Turno</h2>
        </div>
        <form className="farmacias-form" onSubmit={e => e.preventDefault()}>
          <div className="farmacias-search-row">
            <input
              type="text"
              className="farmacias-search-input"
              placeholder={
                tipoFiltro === 'nombre' ? 'Buscar por nombre...' :
                tipoFiltro === 'telefono' ? 'Buscar por teléfono...' :
                tipoFiltro === 'direccion' ? 'Buscar por dirección...' :
                'Buscar por cualquier campo...'
              }
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              list="comunas-list"
              autoComplete="off"
            />
            <button type="submit" className="farmacias-search-btn">
              <FaSearch style={{marginRight:'6px'}} />Buscar
            </button>
            <datalist id="comunas-list">
              {comunas.map((comuna, idx) => (
                <option key={idx} value={comuna} />
              ))}
            </datalist>
          </div>

          <div className="farmacias-filters">
            <div className="filter-group">
              <label>Buscar por:</label>
              <div className="filter-buttons">
                {['todo', 'nombre', 'telefono', 'direccion'].map(tipo => (
                  <button
                    key={tipo}
                    className={`filter-btn ${tipoFiltro === tipo ? 'active' : ''}`}
                    onClick={() => setTipoFiltro(tipo)}
                  >
                    {tipo === 'todo' && '🔍 Todo'}
                    {tipo === 'nombre' && '🏥 Nombre'}
                    {tipo === 'telefono' && '📞 Teléfono'}
                    {tipo === 'direccion' && '📍 Dirección'}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Ordenar por:</label>
              <div className="filter-buttons">
                {['nombre', 'comuna'].map(order => (
                  <button
                    key={order}
                    className={`filter-btn ${ordenar === order ? 'active' : ''}`}
                    onClick={() => setOrdenar(order)}
                  >
                    {order === 'nombre' && '🔤 Nombre A-Z'}
                    {order === 'comuna' && '🗺️ Comuna A-Z'}
                  </button>
                ))}
              </div>
            </div>

            <button className="clear-filters-btn" onClick={limpiarFiltros}>
              🗑️ Limpiar Filtros
            </button>
          </div>

          <div className="farmacias-counter">
            Encontradas <strong>{farmaciasFiltradas.length}</strong> farmacias
          </div>
          {loading && (
            <div className="farmacias-loader">
              <FaClinicMedical className="farmacias-loader-icon" />
            </div>
          )}
          {error && <p className="farmacias-error">{error}</p>}
          {!loading && !error && farmaciasFiltradas.length > 0 && (
            <div className="farmacias-list">
              {farmaciasFiltradas.map((f, idx) => (
                <div key={idx} className="farmacia-card">
                  <span className="farmacia-badge">{f.comuna_nombre}</span>
                  <h3>{f.local_nombre}</h3>
                  <div className="farmacia-info">
                    <p className="farmacia-item">
                      <strong>📞 Teléfono:</strong> {f.local_telefono}
                      <button 
                        className="copy-btn" 
                        onClick={() => copiarAlPortapapeles(f.local_telefono, idx)}
                        title="Copiar teléfono"
                      >
                        <FaCopy /> {copiado === idx ? '✓' : ''}
                      </button>
                    </p>
                    <p className="farmacia-item">
                      <strong>📍 Dirección:</strong> {f.local_direccion}
                      <a 
                        href={`https://maps.google.com/?q=${f.local_direccion}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-btn"
                        title="Abrir en Google Maps"
                      >
                        <FaMapMarkerAlt />
                      </a>
                    </p>
                    <p className="farmacia-item">
                      <strong>📅 Fecha:</strong> {f.fecha}
                    </p>
                    <p className="farmacia-item">
                      <strong><FaClock /> Hora Apertura:</strong> {f.funcionamiento_hora_apertura}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && farmaciasFiltradas.length === 0 && (
            <p className="farmacias-noresult">No se encontraron farmacias para esa comuna.</p>
          )}
        </form>
      </section>
    </Layout>
  );
}

export default Farmacias;
