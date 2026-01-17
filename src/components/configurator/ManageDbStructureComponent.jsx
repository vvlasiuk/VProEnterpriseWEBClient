// src/components/configurator/ManageDbStructureComponent.jsx
import React, { useState, useEffect } from 'react';
import SideMenuPanel from '../menu/SideMenuPanel';
import MenuBar from '../menu/MenuBar';
import MenuButton from '../menu/MenuButton';
import configuratorServices from '../../services/configuratorServices';

const ManageDbStructureComponent = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [showTabs, setShowTabs] = useState(false);
  const [showVersionsMenu, setShowVersionsMenu] = useState(false);  // Новий state
  const [versionItems, setVersionItems] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isLoadingVersions, setIsLoadingVersions] = useState(false);

  // Конфігурація основного меню
  const menuItems = [
    { id: 'info', label: 'Сповіщення', icon: '🔔' },
    { id: 'app_structure', label: 'Базове рішення', icon: '📦' },
    { id: 'sys_structure', label: 'Платформа', icon: '⚙️' }
  ];

  // // Конфігурація меню версій
  // const versionItems = [
  //   { id: 'v1', label: 'Версія 1', icon: '1️⃣' },
  //   { id: 'v2', label: 'Версія 2', icon: '2️⃣' }
  // ];

//  const [versionItems, setVersionItems] = useState([]);

 
 const versionParams = {
    actions: [
    { id: 'version_settings', label: 'Налаштування', icon: '⚙️' },
  ]
}; 
  // Знайти активний пункт меню
  const activeMenuItem = menuItems.find(item => item.id === activeSection);
  // Знайти обрану версію
  const activeVersionItem = versionItems.find(item => item.id === selectedVersion);

  useEffect(() => {
    const sectionsWithVersions = ['app_structure', 'sys_structure'];
    
    if (sectionsWithVersions.includes(activeSection)) {
      loadVersions(activeSection);
    }
  }, [activeSection]);

  const loadVersions = async (section) => {
    setIsLoadingVersions(true);
    try {
      const response = await configuratorServices.getDBStructureVersions(section);
      
      // Обробка нової структури відповіді
      const versions = (response?.schemas || []).map((schema, index) => ({
        id: schema.folder_name || `v${index + 1}`,
        label: `${schema.version}${schema.updated ? '  ✔️' : ' ➖'}`,
        icon: `📋`,
        metadata: {
          version: schema.version,
          date: schema.version_date,
          title: schema.title,
          author: schema.author,
          type: schema.type_database_schemas,
          folderName: schema.folder_name
        }
      }));
      
      setVersionItems(versions);
      
      if (!selectedVersion && versions.length > 0) {
        setSelectedVersion(versions[0].id);
      }
      
    } catch (error) {
      console.error('Помилка завантаження версій:', error);
      setVersionItems([]);
    } finally {
      setIsLoadingVersions(false);
    }
  };

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
        
        {sectionsWithVersions.includes(activeSection) && versionItems.length > 0 && (
          <MenuButton onClick={() => setShowVersionsMenu(!showVersionsMenu)}>
            ☰ {activeVersionItem?.icon} {activeVersionItem?.label || 'Оберіть версію'}
          </MenuButton>
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
          params={versionParams}
          activeItem={selectedVersion}
          onItemClick={setSelectedVersion}
          isOpen={showVersionsMenu}
          onClose={() => setShowVersionsMenu(false)}
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