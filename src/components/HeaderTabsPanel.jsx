import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

const iconMap = {
  'AddIcon': <AddIcon />,
  'EditIcon': <EditIcon />,
  'InfoIcon': <InfoIcon />,
  // додай інші
};

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
        key={tab.command}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 18px',
          marginRight: '8px',
          borderRadius: '6px 6px 0 0',
          border: activeTab === tab.command ? '1px solid #ffd600' : '1px solid #e0e0e0',
          fontWeight: activeTab === tab.command ? 'bold' : 'normal',
          cursor: 'pointer',
          position: 'relative',
          flexShrink: 0,             // Запобігаємо стисканню табів
          whiteSpace: 'nowrap',      // Текст не переноситься
          boxSizing: 'border-box',  // Додати це
        }}
      >
        <span onClick={() => setActiveTab(tab.command)} style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {/* {tab.icon} */}
          {tab.iconName && iconMap[tab.iconName]}
          {tab.title}
        </span>
        <span
          onClick={e => {
            e.stopPropagation();
            setTabs(tabs.filter(t => t.command !== tab.command));
            if (activeTab === tab.command && tabs.length > 1) {
              const nextTab = tabs.find(t => t.command !== tab.command);
              setActiveTab(nextTab ? nextTab.command : '');
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