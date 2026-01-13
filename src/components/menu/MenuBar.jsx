// src/components/menu/MenuBar.jsx
import React from 'react';

const MenuBar = ({ 
  children,                      // Вміст панелі (кнопки)
  style = {},                    // Додаткові стилі
  showBorder = true,             // Показувати нижню лінію
  justify = 'flex-start',        // 'flex-start', 'center', 'flex-end', 'space-between'
  gap = '10px',                  // Відступ між елементами
  padding = '10px'               // Внутрішні відступи
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
      {children}
    </div>
  );
};

export default MenuBar;