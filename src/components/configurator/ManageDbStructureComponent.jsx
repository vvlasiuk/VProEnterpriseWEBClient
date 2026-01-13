// src/components/configurator/ManageDbStructureComponent.jsx
import React, { useState } from 'react';
import SideMenuPanel from '../menu/SideMenuPanel';
import MenuBar from '../menu/MenuBar';
import MenuButton from '../menu/MenuButton';

const ManageDbStructureComponent = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [showTabs, setShowTabs] = useState(false);
  const [showVersionsMenu, setShowVersionsMenu] = useState(false);  // Новий state
  const [showVersionParamsMenu, setShowVersionParamsMenu] = useState(false); // Новий state
  const [selectedVersion, setSelectedVersion] = useState('v1');

  // Конфігурація основного меню
  const menuItems = [
    { id: 'info', label: 'Сповіщення', icon: '🔔' },
    { id: 'app_structure', label: 'Базове рішення', icon: '📦' },
    { id: 'sys_structure', label: 'Платформа', icon: '⚙️' }
  ];

  // Конфігурація меню версій
  const versionItems = [
    { id: 'v1', label: 'Версія 1', icon: '1️⃣' },
    { id: 'v2', label: 'Версія 2', icon: '2️⃣' }
  ];

  const versionParametrsItems = [
    { id: 'version_not_updated', label: 'Не оновлені', icon: '⚙️' },
    { id: 'version_all', label: 'Всі', icon: '🔧' },
    { id: 'version__updated', label: 'Оновлені', icon: '⚙️' }
  ];
  // Знайти активний пункт меню
  const activeMenuItem = menuItems.find(item => item.id === activeSection);
  // Знайти обрану версію
  const activeVersionItem = versionItems.find(item => item.id === selectedVersion);

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return <div>Тут ми виводимо різну інформацію котра потребує уваги. оновити платформу на реліз, оновити рішення та плагіни.
          Тобто по АПІ ми отримуємо текст повідомлень, що в нас є якісь оновлення. Обрана версія: {selectedVersion}</div>;
      case 'app_structure':
        return <div>Структура таблиць. Версія: {selectedVersion}</div>;
      case 'sys_structure':
        return <div>Оновлення платформи. Версія: {selectedVersion}</div>;
      default:
        return null;
    }
  };

  const sectionsWithVersions = ['app_structure', 'sys_structure'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Верхня панель з кнопками */}
      <MenuBar gap="10px" showBorder={true} justify="flex-start">
        <MenuButton 
          onClick={() => setShowTabs(!showTabs)}
        >
          ☰ {activeMenuItem?.icon} {activeMenuItem?.label}
        </MenuButton>
        
        {sectionsWithVersions.includes(activeSection) && (
          <>
            <MenuButton 
              onClick={() => setShowVersionsMenu(!showVersionsMenu)}
            >
              ☰ {activeVersionItem?.icon} {activeVersionItem?.label}
            </MenuButton>
            
            <MenuButton 
              onClick={() => setShowVersionParamsMenu(!showVersionParamsMenu)}
            >
              ⚒︎
            </MenuButton>
          </>
        )}
      </MenuBar>

      {/* Контентна частина */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <SideMenuPanel
          items={menuItems}
          activeItem={activeSection}
          onItemClick={setActiveSection}
          isOpen={showTabs}
          onClose={() => setShowTabs(false)}
        />

        <SideMenuPanel
          items={versionItems}
          activeItem={selectedVersion}
          onItemClick={setSelectedVersion}
          isOpen={showVersionsMenu}
          onClose={() => setShowVersionsMenu(false)}
        />
        <SideMenuPanel
          items={versionParametrsItems}
          // activeItem={selectedVersion}
          onItemClick={setSelectedVersion}
          // isOpen={showVersionsMenu}
          // onClose={() => setShowVersionsMenu(false)}
        />

        {/* Контент */}
        <div style={{ flex: 1, padding: '20px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ManageDbStructureComponent;