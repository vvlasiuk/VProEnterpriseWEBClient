// src/components/HeaderPanel.jsx
import React from 'react';

const HeaderPanel = ({ onMenuClick, onInfoClick }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0px',
    minHeight: '6px'
  }}>
    <button onClick={onMenuClick}>menu</button>
    <div style={{
      margin: '0 auto',
      fontWeight: 'bold',
      fontSize: '1.1em'
    }}>
      VLAS PRO Enterprise
    </div>
    <button onClick={onInfoClick}>info</button>
  </div>
);

export default HeaderPanel;