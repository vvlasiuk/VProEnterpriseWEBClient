
import React from 'react';
import authService from '../services/authService';

const InfoTab = ({ username }) => (
  <div>
    <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
      Користувач: {username}
    </div>
    <button
      onClick={async() => {
        await authService.logout();
        localStorage.clear();
        window.location.reload();
      }}
    >
      log off
    </button>
  </div>
);

export default InfoTab;