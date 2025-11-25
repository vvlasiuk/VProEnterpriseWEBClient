import React, { useState, useRef } from 'react';

const ServerOffline = ({ onRetry }) => {
  const [server, setServer] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('sa');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [appDir, setAppDir] = useState('');

  // const handleCreateDb = async (e) => {
  //   e.preventDefault();
  //   setMessage('');
  //   // Тут запит на бекенд для створення бази
  //   try {
  //     // await fetch('/api/create-db', { ... });
  //     setMessage('Базу успішно створено!');
  //   } catch (err) {
  //     setMessage('Помилка при створенні бази.');
  //   }
  // };

  // const handleInstallServer = () => {
  //   // Тут запит на бекенд для встановлення сервера
  //   // await fetch('/api/install-server', { ... });
  //   setMessage('Сервер успішно встановлено!');
  // };

  // const handleChoosePath = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  // const fileInputRef = useRef(null);

  // const handleDirChange = (e) => {
  //   const files = e.target.files;
  //   if (files.length > 0) {
  //     // Отримати шлях до каталогу (наприклад, з першого файлу)
  //     const path = files[0].webkitRelativePath.split('/')[0];
  //     setAppDir(path);
  //   }
  // };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Сервер недоступний</h2>
      <p>Будь ласка, перевірте підключення або спробуйте ще раз.</p>
      <button onClick={onRetry}>Спробувати ще раз</button>

      {/* <hr style={{ margin: '40px 0' }} />
      
      <div style={{ marginBottom: '32px', textAlign: 'left', maxWidth: '100%' }}>
        <h3>Vlas Pro Enterprise Server</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ minWidth: '180px' }}>Каталог встановлення сервера</label>
          <input
            type="text"
            placeholder="Шлях до каталога"
            value={appDir}
            onChange={e => setAppDir(e.target.value)}
            style={{ width: '320px' }}
          />
          <button type="button" onClick={handleInstallServer}>Встановити сервер в теку</button>
        </div>
      </div>

      <h3>Створити базу SQL</h3>
      <form onSubmit={handleCreateDb} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', maxWidth: '100%', margin: '0 auto' }}>
        <label style={{ minWidth: '120px' }}>Адреса сервера</label>
        <input type="text" placeholder="Адреса сервера" value={server} onChange={e => setServer(e.target.value)} />

        <label style={{ minWidth: '90px' }}>Назва бази</label>
        <input type="text" placeholder="Назва бази" value={database} onChange={e => setDatabase(e.target.value)} />

        <label style={{ minWidth: '120px' }}>Ім’я користувача</label>
        <input type="text" placeholder="Ім’я користувача" value={username} onChange={e => setUsername(e.target.value)} />

        <label style={{ minWidth: '80px' }}>Пароль</label>
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />

        <button type="submit">Створити базу</button>
      </form>
      {message && <div style={{ marginTop: '16px', color: '#e01717' }}>{message}</div>} */}

    </div>
  );
};

export default ServerOffline;

