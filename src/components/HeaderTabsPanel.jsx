import React from 'react';

const HeaderTabsPanel = ({ tabs, activeTab, setActiveTab, setTabs }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '4px 12px',
    minHeight: '28px'
  }}>
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
          fontWeight: activeTab === tab.title ? 'bold' : 'normal',
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
              const nextTab = tabs.find(t => t.title !== tab.title);
              setActiveTab(nextTab ? nextTab.title : '');
            }
          }}
          style={{
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
  </div>
);

export default HeaderTabsPanel;