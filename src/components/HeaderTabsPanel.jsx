import React from 'react';

const HeaderTabsPanel = ({ tabs, activeTab, setActiveTab, setTabs }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '4px 0',  // Прибрати горизонтальний padding
    paddingLeft: '12px',  // І додати тільки лівий
    minHeight: '28px',
    overflowX: 'auto',           // Додаємо горизонтальне прокручування
    overflowY: 'hidden',          // Блокуємо вертикальне прокручування
    flexWrap: 'nowrap',           // Забороняємо перенесення табів на новий рядок
    maxWidth: '100vw',            // Обмежуємо ширину екраном
    WebkitOverflowScrolling: 'touch', // Плавне прокручування на iOS
    scrollBehavior: 'smooth',     // Плавна анімація прокручування
    // Приховування scrollbar (опціонально)
    scrollbarWidth: 'none',       // Firefox
    msOverflowStyle: 'none',      // IE/Edge
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
          position: 'relative',
          flexShrink: 0,             // Запобігаємо стисканню табів
          whiteSpace: 'nowrap',      // Текст не переноситься
          boxSizing: 'border-box',  // Додати це
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