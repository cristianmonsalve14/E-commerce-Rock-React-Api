import React from 'react';
import './DashboardAdmin.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

const icons = {
  ventas: '💰',
  productos: '🛒',
  usuarios: '👤',
  masVendidos: '🔥',
  ventasRecientes: '🕒',
  stock: '📦',
};

export default function DashboardAdmin({ resumen, productos, usuarios, ventas }) {
  // Simulación de stock para cada producto (puedes reemplazar por datos reales)
  const productosConStock = (productos || []).map((p, i) => ({
    nombre: p.nombre,
    stock: p.stock ?? (Math.floor(Math.random() * 50) + 1),
  }));

  return (
    <div className="dashboard-admin">
      <h2 className="dashboard-title">Panel de Control <span className="dashboard-title-highlight">Admin</span></h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-icon">{icons.ventas}</div>
          <h3>Ventas Totales</h3>
          <p className="dashboard-card-value">{resumen?.ventasTotales ?? 0}</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-icon">{icons.productos}</div>
          <h3>Productos</h3>
          <p className="dashboard-card-value">{productos?.length ?? 0}</p>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-icon">{icons.usuarios}</div>
          <h3>Usuarios</h3>
          <p className="dashboard-card-value">{usuarios?.length ?? 0}</p>
        </div>
      </div>
      <div className="dashboard-sections">
        <div className="dashboard-section dashboard-section-half">
          <h4 className="dashboard-section-title">{icons.masVendidos} Productos más vendidos</h4>
          {(resumen?.masVendidos?.length > 0) ? (
            <table className="dashboard-table">
              <thead>
                <tr><th>Producto</th><th>Ventas</th></tr>
              </thead>
              <tbody>
                {resumen.masVendidos.map((prod, i) => (
                  <tr key={i}>
                    <td>{prod.nombre}</td>
                    <td>{prod.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="dashboard-placeholder">No hay datos de productos más vendidos.</p>
          )}
        </div>
        <div className="dashboard-section dashboard-section-half">
          <h4 className="dashboard-section-title">{icons.ventasRecientes} Últimas ventas</h4>
          {(ventas?.length > 0) ? (
            <table className="dashboard-table">
              <thead>
                <tr><th>ID</th><th>Fecha</th><th>Total</th></tr>
              </thead>
              <tbody>
                {ventas.slice(0,5).map((venta, i) => (
                  <tr key={i}>
                    <td>#{venta.id}</td>
                    <td>{venta.fecha}</td>
                    <td>${venta.total.toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="dashboard-placeholder">No hay ventas recientes.</p>
          )}
        </div>
      </div>
      <div className="dashboard-section dashboard-section-full">
        <h4 className="dashboard-section-title">{icons.stock} Stock de productos</h4>
        {productosConStock.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={productosConStock}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              barSize={28}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#fff" fontSize={13} />
              <YAxis dataKey="nombre" type="category" stroke="#fff" fontSize={13} width={120} />
              <Tooltip cursor={{ fill: '#222' }} contentStyle={{ background: '#232323', border: '1px solid #444', color: '#fff' }} />
              <Bar dataKey="stock" fill="#90caf9">
                <LabelList dataKey="stock" position="right" fill="#ffd700" fontWeight={700} fontSize={15} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="dashboard-placeholder">No hay datos de stock de productos.</p>
        )}
      </div>
    </div>
  );
}
