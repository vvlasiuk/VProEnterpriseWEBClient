import React, { useEffect, useState } from 'react';
import { checkDbEmptyStatus } from '../utils/checkServer';

const DbAdminComponent = () => {
  const [isDbEmpty, setIsDbEmpty] = useState(false);

  useEffect(() => {
    const fetchDbStatus = async () => {
      const dbEmpty = await checkDbEmptyStatus(`${process.env.REACT_APP_API_URL}/health/db_empty`);
      setIsDbEmpty(dbEmpty);
    };
    fetchDbStatus();
  }, []);

  const handleCreateDb = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health/db_create_table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        // Таблиці створено успішно
      } else {
        // Помилка створення таблиць
      }
    } catch (error) {
      // Обробка помилки мережі
    }
  };

  const handleDropDb = () => {
    console.log('Dropping database tables...');
    // тут логіка видалення таблиць бази даних (API-запит)
  };

  const handleUpdateDb = async() => {
    const token = localStorage.getItem('token');

     try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health/db_update_table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        // Таблиці створено успішно
      } else {
        // Помилка створення таблиць
      }
    } catch (error) {
      // Обробка помилки мережі
    }
  }

  const handleManageDb = () => {
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Адміністрування бази даних
      </h2>
      <button onClick={handleManageDb}>Управління структурою бази даних</button>
      {/* <button onClick={handleCreateDb} disabled={!isDbEmpty}>Створити таблиці бази даних</button> */}
      <button onClick={handleDropDb} disabled={isDbEmpty}>Видалити таблиці бази даних</button>
      <button onClick={handleUpdateDb} disabled={isDbEmpty}>Оновити таблиці бази даних</button>
    </div>
  );
};

export default DbAdminComponent;