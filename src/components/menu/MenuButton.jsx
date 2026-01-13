// src/components/menu/MenuButton.jsx
import React from 'react';

const MenuButton = ({ 
  onClick, 
  children, 
  variant = 'default',  // 'default', 'primary', 'icon'
  disabled = false,
  style = {},
  ...props 
}) => {
  const baseStyle = {
    height: '40px',
    padding: '0 12px',
    whiteSpace: 'nowrap',
    minWidth: '40px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  };

  // Варіанти стилів
  const variantStyles = {
    default: {},
    primary: {
      fontWeight: 'bold'
    },
    icon: {
      padding: '0',
      width: '40px'
    }
  };

  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ 
        ...baseStyle, 
        ...variantStyles[variant],
        ...style 
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default MenuButton;