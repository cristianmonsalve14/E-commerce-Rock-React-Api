import React, { useState } from 'react';
import './Carrito.css';
import { useAuth } from './AuthContext';
import { FaShoppingCart } from 'react-icons/fa';

function Carrito({ carrito, onRemove, onClear, onCheckout, onClose }) {
  const { user } = useAuth();
  const [showPago, setShowPago] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [recibo, setRecibo] = useState(null);
  const [descuentoSeleccionado, setDescuentoSeleccionado] = useState(null);
  const [descuentos, setDescuentos] = useState(() => {
    if (user?.email) {
      const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
      return (descuentosPorUsuario[user.email] || []).filter(d => !d.usado);
    }
    return [];
  });

  const totalSinDescuento = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuentoAplicado = descuentoSeleccionado ? 0.2 * totalSinDescuento : 0;
  const total = totalSinDescuento - descuentoAplicado;

  const handlePagarClick = () => {
    setShowPago(true);
  };

  const handleSimularPago = (e) => {
    e.preventDefault();
    // Marcar descuento como usado si se aplicó
    if (user?.email && descuentoSeleccionado) {
      const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
      const lista = descuentosPorUsuario[user.email] || [];
      const idx = lista.findIndex((d, i) => !d.usado && i === descuentoSeleccionado);
      if (idx !== -1) {
        lista[idx].usado = true;
        descuentosPorUsuario[user.email] = lista;
        localStorage.setItem('descuentosPorUsuario', JSON.stringify(descuentosPorUsuario));
      }
    }
    // Generar recibo simulado
    const fecha = new Date();
    setRecibo({
      id: Math.floor(Math.random()*1000000),
      fecha: fecha.toLocaleString(),
      usuario: user?.email || 'Invitado',
      items: carrito,
      total: total,
      descuento: descuentoAplicado,
    });
    setPagoExitoso(true);
    setShowPago(false);
    onClear();
    setDescuentoSeleccionado(null);
    // Actualizar descuentos disponibles
    if (user?.email) {
      const descuentosPorUsuario = JSON.parse(localStorage.getItem('descuentosPorUsuario') || '{}');
      setDescuentos((descuentosPorUsuario[user.email] || []).filter(d => !d.usado));
    }
  };

  return (
    <div className="carrito-modal-bg">
      <div className="carrito-modal">
        <button className="carrito-modal-close" onClick={onClose} title="Cerrar">&times;</button>
        <div className="carrito-modal-icon"><FaShoppingCart /></div>
        <section className="carrito-section">
          {pagoExitoso && recibo ? (
            <div className="pago-exito">
              <h2>¡Pago realizado con éxito!</h2>
              <p style={{color:'#2ecc40',fontWeight:'bold'}}>Tu compra ha sido procesada correctamente.</p>
              <div className="recibo-box" style={{background:'#f8f8f8',padding:'1.5rem',borderRadius:'1rem',margin:'1.5rem 0',boxShadow:'0 2px 12px #0001'}}>
                <h3>Recibo de compra</h3>
                <p><strong>ID de transacción:</strong> #{recibo.id}</p>
                <p><strong>Fecha:</strong> {recibo.fecha}</p>
                <p><strong>Usuario:</strong> {recibo.usuario}</p>
                <ul style={{margin:'1rem 0'}}>
                  {recibo.items.map((item, idx) => (
                    <li key={idx} style={{marginBottom:'0.5rem'}}>
                      {item.nombre} x{item.cantidad} - ${item.precio.toLocaleString()} c/u
                    </li>
                  ))}
                </ul>
                {recibo.descuento > 0 && <p style={{color:'green'}}><strong>Descuento aplicado:</strong> -${recibo.descuento.toLocaleString()}</p>}
                <p style={{fontSize:'1.2em'}}><strong>Total pagado:</strong> ${recibo.total.toLocaleString()}</p>
              </div>
              <button className="btn btn-primary" onClick={() => { setPagoExitoso(false); setRecibo(null); onClose(); }}>Cerrar</button>
            </div>
          ) : (
            <>
              <h2>Carrito de Compras</h2>
              {carrito.length === 0 ? (
                <div className="carrito-vacio">Tu carrito está vacío.<br />¡Agrega tus poleras favoritas y aprovecha los descuentos!</div>
              ) : (
                <>
                  <ul className="carrito-lista">
                    {carrito.map(item => (
                      <li key={item.id} className="carrito-item">
                        <img src={item.imagen} alt={item.nombre} />
                        <div className="carrito-info">
                          <h4>{item.nombre}</h4>
                          <span className="carrito-desc">{item.descripcion}</span>
                          <span>Cantidad: {item.cantidad}</span>
                          <span>Precio unitario: ${item.precio.toLocaleString()}</span>
                          <span>Subtotal: <strong>${(item.precio * item.cantidad).toLocaleString()}</strong></span>
                        </div>
                        <button className="carrito-remove" onClick={() => onRemove(item.id)}>&times;</button>
                      </li>
                    ))}
                  </ul>
                  <div className="carrito-total">
                    {user && descuentos.length > 0 && (
                      <div style={{marginTop:'1rem'}}>
                        <label htmlFor="select-descuento"><strong>Canjear descuento:</strong></label>
                        <select
                          id="select-descuento"
                          value={descuentoSeleccionado ?? ''}
                          onChange={e => setDescuentoSeleccionado(e.target.value === '' ? null : Number(e.target.value))}
                          style={{marginLeft:'0.5rem'}}>
                          <option value="">No usar descuento</option>
                          {descuentos.map((d, i) => (
                            <option value={i} key={i}>{d.descripcion} ({d.fecha})</option>
                          ))}
                        </select>
                        {descuentoSeleccionado !== null && (
                          <div style={{color:'green',fontWeight:'bold'}}>Descuento aplicado: -${descuentoAplicado.toLocaleString()}</div>
                        )}
                      </div>
                    )}
                    <div style={{marginTop:'0.5rem'}}>
                      <strong>Total a pagar: ${total.toLocaleString()}</strong>
                    </div>
                  </div>
                  <div className="carrito-actions">
                    <button className="btn btn-secondary" onClick={onClear}>Vaciar Carrito</button>
                    <button className="btn btn-warning" onClick={onCheckout}>Finalizar Compra</button>
                    <button className="btn btn-transbank" onClick={handlePagarClick} style={{background:'#ff0033',color:'#fff',marginLeft:'1rem'}}>Pagar con Transbank</button>
                  </div>
                  {showPago && (
                    <form className="pago-form" onSubmit={handleSimularPago}>
                      <h3>Pago con Transbank</h3>
                      <label>
                        Nombre en la tarjeta
                        <input type="text" required placeholder="Ej: Juan Pérez" />
                      </label>
                      <label>
                        Número de tarjeta
                        <input type="text" required maxLength={16} pattern="[0-9]{16}" placeholder="1234 5678 9012 3456" />
                      </label>
                      <div className="pago-row">
                        <label>
                          Vencimiento
                          <input type="text" required placeholder="MM/AA" pattern="[0-9]{2}/[0-9]{2}" />
                        </label>
                        <label>
                          CVC
                          <input type="text" required maxLength={3} pattern="[0-9]{3}" placeholder="123" />
                        </label>
                      </div>
                      <button type="submit" className="btn btn-transbank">Pagar ahora</button>
                    </form>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Carrito;
