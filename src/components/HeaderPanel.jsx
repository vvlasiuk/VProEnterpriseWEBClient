// src/components/HeaderPanel.jsx
import React from 'react';

const HeaderPanel = ({ onMenuClick, onInfoClick }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0px',
    minHeight: '6px',
    background: 'var(--color-bg-secondary)',
    color: 'var(--color-header-text)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }}>
    <button onClick={onMenuClick}>☰</button>
    <div style={{
      margin: '0 auto',
      fontWeight: 'bold',
      fontSize: '1.1em'
    }}>
      VLAS PRO Enterprise
    </div>
    <button onClick={onInfoClick}>VPE</button>
  </div>
);

export default HeaderPanel;