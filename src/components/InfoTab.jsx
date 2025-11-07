import React, { useEffect, useState } from 'react';
import authService from '../services/authService';

const InfoTab = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await authService.getMe();
        setUser(data);
      } catch (err) {      
        setUser(null);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Якщо 401 — все одно чистимо і перенаправляємо
      if (err?.response?.status === 401 || err?.status === 401) {
        // 401 — токен вже невалідний, дія така ж як при звичайному виході
      }
    }
    // localStorage.clear();
    localStorage.removeItem('token');
    window.location.href = '/login'; // або navigate('/login')
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
        Користувач: {user ? user.full_name: '...'}
      </div>
      <button onClick={handleLogout}>
        log off
      </button>
    </div>
  );
};

export default InfoTab;