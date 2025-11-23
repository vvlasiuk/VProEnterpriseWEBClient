import React from 'react';

const ServerOffline = ({ onRetry }) => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Сервер недоступний</h2>
    <p>Будь ласка, перевірте підключення або спробуйте ще раз.</p>
    <button onClick={onRetry}>Спробувати ще раз</button>
  </div>
);

export default ServerOffline;

// СУПЕР