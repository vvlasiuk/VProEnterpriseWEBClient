import React, { useEffect, useState } from 'react';
import authService from '../services/authService';

const InfoTab = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await authService.getMe();
        // console.log('API /me response:', data);
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    fetchMe();
  }, []);

  return (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
        Користувач: {user ? user.name || user.username || user.email : '...'}
      </div>
      <button onClick={async () => {
        await authService.logout();
        localStorage.clear();
        window.location.reload();
      }}>
        log off
      </button>
    </div>
  );
};

export default InfoTab;