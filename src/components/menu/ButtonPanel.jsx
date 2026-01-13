// src/components/menu/ButtonPanel.jsx
import React from 'react';
import MenuButton from './MenuButton';

const ButtonPanel = ({ 
  buttons = [],                  // Масив об'єктів кнопок
  style = {},                    
  showBorder = true,
  justify = 'flex-start',
  gap = '10px',
  padding = '10px'
}) => {
  const baseStyle = {
    display: 'flex',
    justifyContent: justify,
    gap: gap,
    padding: padding,
    borderBottom: showBorder ? '1px solid #ccc' : 'none'
  };

  return (
    <div style={{ ...baseStyle, ...style }}>
      {buttons.map((button, index) => (
        <MenuButton
          key={button.id || index}
          onClick={button.onClick}
          variant={button.variant || 'default'}
          disabled={button.disabled}
          style={button.style}
        >
          {button.label || button.icon}
        </MenuButton>
      ))}
    </div>
  );
};

export default ButtonPanel;