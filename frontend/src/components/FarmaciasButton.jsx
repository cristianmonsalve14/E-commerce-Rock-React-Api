import React from 'react';
import './FarmaciasButton.css';
import { useNavigate } from 'react-router-dom';

function FarmaciasButton() {
  const navigate = useNavigate();
  return (
    <button
      className="farmacias-btn-palpitante"
      title="Farmacias de Turno"
      onClick={() => navigate('/farmacias')}
    >
      Farmacias de Turno
    </button>
  );
}

export default FarmaciasButton;
