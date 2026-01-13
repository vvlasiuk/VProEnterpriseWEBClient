// src/components/configurator/ManageDbStructureComponent.jsx
import React, { useState } from 'react';

const ManageDbStructureComponent = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [showTabs, setShowTabs] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return <div>Тут ми виводимо різну інформацію котра потребує уваги. оновити платформу на реліз, оновити рішення та плагіни.
          Тобто по АПІ ми отримуємо текст повідомлень, що в нас є якісь оновлення. </div>;
      case 'app_structure':
        return <div>Структура таблиць</div>;
      case 'sys_structure':
        return <div>Оновлення платформи</div>;
      default:
        return null;
    }
  };

  const handleTabClick = (section) => {
    setActiveSection(section);
    setShowTabs(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Верхня панель з кнопками */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        padding: '10px',
        borderBottom: '1px solid #ccc'  // Опціонально
      }}>
        <button 
          onClick={() => setShowTabs(!showTabs)}
          style={{ 
            width: '40px',
            height: '40px',
            padding: '0'
          }}
        >
          ☰
        </button>
        
        <button 
          onClick={() => setShowTabs(!showTabs)}
          style={{ 
            width: '40px',
            height: '40px',
            padding: '0'
          }}
        >
          ☰ {/* або інша іконка */}
        </button>
      </div>

      {/* Контентна частина */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Ліва панель */}
        {showTabs && (
          <div 
            className="vertical-tabs-container" 
            style={{ 
              position: 'absolute',        // Абсолютне позиціонування
              left: 0,
              top: 0,
              height: '100%',
              zIndex: 9,                   // Поверх контенту
              paddingTop: '60px',
              // backgroundColor: 'white',    // Фон панелі
              // boxShadow: '2px 0 8px rgba(0,0,0,0.15)', // Тінь для виразності
              transition: 'transform 0.3s ease', // Анімація (опціонально)
            }}
          >
            <div
              className={`vertical-tab ${activeSection === 'info' ? 'active' : ''}`}
              onClick={() => handleTabClick('info')}
            >
              Сповіщення
            </div>
            <div
              className={`vertical-tab ${activeSection === 'app_structure' ? 'active' : ''}`}
              onClick={() => handleTabClick('app_structure')}
            >
              Базове рішення
            </div>
            <div
              className={`vertical-tab ${activeSection === 'sys_structure' ? 'active' : ''}`}
              onClick={() => handleTabClick('sys_structure')}
            >
              Платформа
            </div>
          </div>
        )}

        {/* Права панель */}
        <div style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ManageDbStructureComponent;