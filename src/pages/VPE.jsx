import React from 'react';
import MainMenuPanel from '../components/MainMenuPanel';
import BrandsComponent from '../components/BrandsComponent';
// const initialTabs = [
//   { title: 'Бренди', command: 'openBrandsList', content: <BrandsComponent /> }
// ];

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
    // інші кейси
    default:
      return null;
    } 
  };

  return (
    <div>
      {/* Верхня панель */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#faf6f2',
        borderBottom: '1px solid #e0e0e0',
        padding: '1px 0px',
        minHeight: '6px'
      }}>
        <button
          style={{
            background: '#ffd600',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 12px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => setShowMenu(true)}
        >
          menu
        </button>
        <div style={{
          margin: '0 auto',
          fontWeight: 'bold',
          fontSize: '1.1em',
          color: '#222'
        }}>
          VLAS PRO Enterprise
        </div>
        <span style={{ color: '#e01717ff', marginLeft: '6px', cursor: 'pointer' }}>info</span>
      </div>
      {/* Панель закладок */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
        padding: '4px 12px',
        minHeight: '28px'
      }}>
        {/* Тут перелік відкритих закладок */}
        {tabs.map(tab => (
  <div
    key={tab.title}
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '6px 18px',
      marginRight: '8px',
      borderRadius: '6px 6px 0 0',
      border: activeTab === tab.title ? '1px solid #ffd600' : '1px solid #e0e0e0',
      borderBottom: activeTab === tab.title ? '2px solid #fff' : '1px solid #e0e0e0',
      background: activeTab === tab.title ? '#fffbe6' : '#f5f5f5',
      fontWeight: activeTab === tab.title ? 'bold' : 'normal',
      color: activeTab === tab.title ? '#222' : '#888',
      cursor: 'pointer',
      position: 'relative'
    }}
  >
    <span onClick={() => setActiveTab(tab.title)} style={{ marginRight: '8px' }}>
      {tab.title}
    </span>
    <span
      onClick={e => {
        e.stopPropagation();
        setTabs(tabs.filter(t => t.title !== tab.title));
        if (activeTab === tab.title && tabs.length > 1) {
          // Переключити на іншу вкладку, якщо закривається активна
          const nextTab = tabs.find(t => t.title !== tab.title);
          setActiveTab(nextTab ? nextTab.title : '');
        }
      }}
      style={{
        color: '#888',
        marginLeft: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
      title="Закрити"
    >
      ×
    </span>
  </div>
))}
        {/* ...інші закладки... */}
      </div>
      <MainMenuPanel showMenu={showMenu} setShowMenu={setShowMenu} addTab={addTab} />
      <div style={{ padding: '16px' }}>
        {/* {activeTabObj && activeTabObj.content} */}
        {activeTabObj && getTabContent(activeTabObj)}
    </div>
      <style jsx>{`
        .tab-item:hover {
          background: #fffde7;
        }
      `}</style>
    </div>
    
  );
  
};

export default VPE;

