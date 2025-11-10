import React, { useState } from 'react';
import authService from '../services/authService';

const UserFormComponent = ({ onSave }) => {
  const [name, setName] = useState('');
  const [full_name, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.createUser({ name, full_name, password });
      // Можна додати повідомлення про успіх або закрити вкладку
    } catch (err) {
      // Обробка помилки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Назва:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Повна назва:</label>
        <input value={full_name} onChange={e => setFullname(e.target.value)} required />
      </div>
      <div>
        <label>Пароль:</label>
        <input autoComplete="new-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Записати</button>
    </form>
  );
};

export default UserFormComponent;