import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    authService.getUsers().then(data => setUsers(data.users));
  }, []);

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
      // background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)'
    }}>
      <form
        onSubmit={handleSubmit}
        className="form-block"
        style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
      >
        <h2 style={{
          margin: 0,
          fontSize: '1.5em',
          textAlign: 'center'
        }}>
          Вхід до системи
        </h2>
        <select
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="input"
        >
          <option value="">Оберіть користувача</option>
          {Array.isArray(users) && users
            .filter(user => user.id && user.name)
            .map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
        </select>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input"
        />
        {error && (
          <div style={{ color: '#e01717', textAlign: 'center', fontSize: '0.95em' }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          className="button"
        >
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;