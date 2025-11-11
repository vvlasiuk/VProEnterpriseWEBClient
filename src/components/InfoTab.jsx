import React, { useEffect, useState } from 'react';
import authService from '../services/authService';

const InfoTab = ({ addTab }) => {
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

  const handleOpenDbAdmin = () => {
    addTab({ title: 'Адміністрування БД', command: 'openDbAdmin' });
  };

  return (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
        Користувач: {user ? user.full_name: '...'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
        <button onClick={handleOpenDbAdmin}>Адміністрування бази даних</button>
        <button onClick={handleLogout}>log off</button>
      </div>
    </div>
  );
};

export default InfoTab;