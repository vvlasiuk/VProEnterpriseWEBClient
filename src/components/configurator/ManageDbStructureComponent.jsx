// src/components/configurator/ManageDbStructureComponent.jsx
import React, { useState } from 'react';

const ManageDbStructureComponent = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [showTabs, setShowTabs] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return <div>Тут ми виводимо різну інформацію котра потребує уваги. оновити платформу на реліз, оновити рішення та плагіни</div>;
      case 'structure':
        return <div>Структура таблиць</div>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
      {/* Кнопка меню */}
      <button 
        onClick={() => setShowTabs(!showTabs)}
        style={{ 
          position: 'absolute',
          left: '10px',
          top: '10px',
          zIndex: 10,
          width: '40px',
          height: '40px',
          padding: '0'
        }}
      >
        ☰
      </button>

      {/* Ліва панель з вкладками */}
      {showTabs && (
        <div className="vertical-tabs-container" style={{ paddingTop: '60px' }}>
          <div
            className={`vertical-tab ${activeSection === 'info' ? 'active' : ''}`}
            onClick={() => setActiveSection('info')}
          >
            Інформація
          </div>
          <div
            className={`vertical-tab ${activeSection === 'structure' ? 'active' : ''}`}
            onClick={() => setActiveSection('structure')}
          >
            Структура таблиць
          </div>
        </div>
      )}

      {/* Права панель з вмістом */}
      <div style={{ flex: 1, padding: '20px', paddingLeft: showTabs ? '20px' : '60px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ManageDbStructureComponent;