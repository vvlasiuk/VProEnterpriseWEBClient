import React from 'react';
import BrandsComponent from './BrandsComponent'; 

const menuItems = [
  { title: 'Бренди', command: 'openBrandsList', content: <BrandsComponent /> },
  { title: 'Користувачі', command: 'openBrandsList', content: <BrandsComponent /> },
  // { title: 'Звіти', command: 'openReports', content: <ReportsComponent /> }
];

const MainMenuPanel = ({ showMenu, setShowMenu, addTab }) => (
  showMenu && (
    <div style={{
      position: 'absolute',
      left: '10px',
      top: '40px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '12px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}>
      {menuItems.map(item => (
        <button key={item.command} onClick={() => { addTab(item); setShowMenu(false); }}>
          {item.title}
        </button>
      ))}      
      {/* <button onClick={() => { addTab('Бренди'); setShowMenu(false); }}>Бренди</button>
      <button onClick={() => { addTab('Документи'); setShowMenu(false); }}>Документи</button>
      <button onClick={() => { addTab('Звіти'); setShowMenu(false); }}>Звіти</button>
      <button onClick={() => { addTab('Користувачі'); setShowMenu(false); }}>Користувачі</button>
      <button onClick={() => setShowMenu(false)}>Закрити</button> */}
    </div>
  )
);

export default MainMenuPanel;