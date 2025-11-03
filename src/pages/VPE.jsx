import React from 'react';
import MainMenuPanel from '../components/MainMenuPanel';
import BrandsComponent from '../components/BrandsComponent';
import InfoTab from '../components/InfoTab';
import HeaderPanel from '../components/HeaderPanel';
import HeaderTabsPanel from '../components/HeaderTabsPanel';


const VPE = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const initialTabs = JSON.parse(localStorage.getItem('tabs') || '[]');
  const [tabs, setTabs] = React.useState(initialTabs);
  const initialActiveTab = localStorage.getItem('activeTab') || (tabs.length > 0 ? tabs[0] : '');
  const [activeTab, setActiveTab] = React.useState(initialActiveTab);
  const username = localStorage.getItem('username') || 'err user';

  const addTab = (menuItem) => {
    if (!tabs.some(tab => tab.title === menuItem.title)) {
      setTabs([...tabs, menuItem]);
      setActiveTab(menuItem.title);
    } else {
      setActiveTab(menuItem.title);
    }
  };

  React.useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const activeTabObj = tabs.find(tab => tab.title === activeTab);

  const getTabContent = (tab) => {
  switch (tab.command) {
    case 'openBrandsList':
      return <BrandsComponent />;
    case 'openInfo':
      return <InfoTab username={username} />;
    default:
      return null;
    } 
  };

  return (
    <div>
      <HeaderPanel
        onMenuClick={() => setShowMenu(true)}
        onInfoClick={() => addTab({ title: 'Інфо', command: 'openInfo' })}
      />
    <HeaderTabsPanel
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setTabs={setTabs}
    />      
      <MainMenuPanel showMenu={showMenu} setShowMenu={setShowMenu} addTab={addTab} />
      <div style={{ padding: '16px' }}>
        {activeTabObj && getTabContent(activeTabObj)}
    </div>
      <style jsx>{`
        .tab-item:hover {
        }
      `}</style>
    </div>
    
  );
  
};

export default VPE;

