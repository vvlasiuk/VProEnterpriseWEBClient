import React from 'react';

const DbAdminComponent = () => {
  const handleClearDb = () => {
    // тут логіка очищення бази (API-запит)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
      <button onClick={handleClearDb}>Очистити базу даних</button>
      {/* Додавайте інші кнопки тут, якщо потрібно */}
    </div>
  );
};

export default DbAdminComponent;