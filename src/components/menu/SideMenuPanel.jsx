// src/components/SideMenuPanel.jsx
import React from 'react';

const SideMenuPanel = ({ 
  items = [],
  params = {},                   // Параметри меню
  activeItem,                    // ID активного пункту
  onItemClick,                   // Callback при кліку на пункт
  onParamClick,
  isOpen = false,                // Стан відкрито/закрито
  onClose,                       // Callback для закриття
  width = '200px',               // Ширина панелі
  position = 'left',             // 'left' або 'right'
  closeOnItemClick = true,       // Закривати при кліку на пункт
  closeOnParamClick = false,     // Закривати при кліку на параметр
  showBackdrop = true,          // Показувати затемнення
  className = '',                // Додатковий CSS клас
  style = {}                     // Додаткові стилі
}) => {
  
  const handleItemClick = (itemId) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
    if (closeOnItemClick && onClose) {
      onClose();
    }
  };

  const handleParamClick = (paramType, paramId) => {
    if (onParamClick) {
      onParamClick(paramType, paramId);
    }
    if (closeOnParamClick && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop (затемнення) */}
      {showBackdrop && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 8
          }}
        />
      )}

      {/* Панель меню */}
      <div 
        className={`vertical-tabs-container ${className}`}
        style={{ 
          position: 'absolute',
          [position]: 0,
          top: 0,
          height: '100%',
          width: width,
          zIndex: 9,
          transition: 'transform 0.3s ease',
          ...style
        }}
      >
        {/* Секція параметрів */}
        {params && Object.keys(params).length > 0 && (
          <div className="menu-params-section" style={{
            borderBottom: '1px solid var(--border-color)',
            padding: '10px',
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap'
          }}>
            
            {/* Фільтри */}
            {params.filters && params.filters.length > 0 && (
              <div style={{ display: 'flex', gap: '5px' }}>
                {params.filters.map(filter => (
                  <button
                    key={filter.id}
                    className={`param-button ${filter.active ? 'active' : ''}`}
                    onClick={() => handleParamClick('filter', filter.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      backgroundColor: filter.active ? 'var(--accent-color)' : 'transparent'
                    }}
                  >
                    {filter.icon && <span>{filter.icon}</span>}
                    {filter.label && <span style={{ marginLeft: '4px' }}>{filter.label}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Сортування */}
            {params.sort && params.sort.options && (
              <div style={{ display: 'flex', gap: '5px' }}>
                {params.sort.options.map(sortOption => (
                  <button
                    key={sortOption.id}
                    className={`param-button ${params.sort.active === sortOption.id ? 'active' : ''}`}
                    onClick={() => handleParamClick('sort', sortOption.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      backgroundColor: params.sort.active === sortOption.id ? 'var(--accent-color)' : 'transparent'
                    }}
                  >
                    {sortOption.icon && <span>{sortOption.icon}</span>}
                    {sortOption.label && <span style={{ marginLeft: '4px' }}>{sortOption.label}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Дії */}
            {params.actions && params.actions.length > 0 && (
              <div style={{ display: 'flex', gap: '5px' }}>
                {params.actions.map(action => (
                  <button
                    key={action.id}
                    className="param-button action-button"
                    onClick={() => handleParamClick('action', action.id)}
                    style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px'
                    }}
                  >
                    {action.icon && <span>{action.icon}</span>}
                    {action.label && <span style={{ marginLeft: '4px' }}>{action.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Список пунктів меню */}
        {items.map(item => (
          <div
            key={item.id}
            className={`vertical-tab ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
            style={item.style || {}}
          >
            {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default SideMenuPanel;