import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authService.login(username, password);
      navigate('/');
    } catch (err) {
      setError('Невірний користувач або пароль');
    }
  };

  return (
    <div>
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ім'я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  );
};

export default Login;