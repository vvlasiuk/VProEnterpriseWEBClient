import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { checkServerStatus } from '../utils/checkServer';
import ServerOffline from './ServerOffline';
import { checkDbEmptyStatus } from '../utils/checkServer';
import DbAdminComponent from '../components/DbAdminComponent';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isServerOnline, setIsServerOnline] = useState(true);
  const [isDbEmpty, setIsDbEmpty] = useState(false);

  useEffect(() => {
    checkServer();
  }, []);

  const checkServer = async () => {
    const online = await checkServerStatus(`${process.env.REACT_APP_API_URL}/health`);
    setIsServerOnline(online);
    if (online) {
      const dbEmpty = await checkDbEmptyStatus(`${process.env.REACT_APP_API_URL}/health/db_empty`);
      setIsDbEmpty(dbEmpty);
    }
  };

  useEffect(() => {
    authService.getUsers()
      .then(data => {
        setUsers(data.users);
        const lastUserId = localStorage.getItem('lastUserId');
        if (lastUserId && data.users.some(u => String(u.id) === lastUserId)) {
          setUsername(lastUserId);
        }
      })
      .catch(error => {
        // Тут обробляється таймаут або відсутність підключення
        setUsers([]);
        setError('Сервер недоступний або таймаут');
        setIsServerOnline(false); // якщо потрібно показати ServerOffline
      });
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

  const labelStyle = { fontWeight: 'bold', margin: 0, width: '100px', flexShrink: 0 };
  const inputStyle = { width: '100%', minWidth: '120px', maxWidth: '220px' };

  if (!isServerOnline) {
    return <ServerOffline onRetry={checkServer} />;
  }
  if (isDbEmpty) {
    return <DbAdminComponent />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: '20vh'
    }}>
      <form
        onSubmit={handleSubmit}
        className="form-block"
        style={{ display: 'flex', flexDirection: 'column', gap: '18px'
          // , background: 'transparent' 
        }}
      >
        <h2 style={{
          margin: 0,
          fontSize: '1.5em',
          textAlign: 'center'
        }}>
          Вхід до системи
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label htmlFor="username" style={labelStyle}>
            Користувач
          </label>
          <select
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="input"
            style={inputStyle}
          >
            {/* <option value="">Оберіть користувача</option> */}
            {Array.isArray(users) && users
              .filter(user => user.id && user.name)
              .map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label htmlFor="password" style={labelStyle}>
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input"
            style={inputStyle}
          />
        </div>
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