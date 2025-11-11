import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_API_URL; //"http://192.168.0.158:8000";
// const base_url = "http://localhost:8000";

const authService = {
  login: async (username, password) => {
    const login_url = `${base_url}/api/v1/auth/login`;
    try {
      const response = await fetch(login_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      // console.log('Відповідь сервера:', data);
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        // localStorage.setItem('username', username);
        // console.log('lastUserId:', data.user._id);
        localStorage.setItem('lastUserId', data.user._id);  // Зберігаємо id користувача
      }
      return data;
    } catch (error) {
      console.error('Помилка запиту:', error);
      throw error;
    }
  },
  logout: async () => {
    await fetch(`${base_url}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  },
  getUsers: async () => {
      const response = await fetch(`${base_url}/api/v1/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Не вдалося отримати список користувачів');
      return await response.json();
  },
  getMe: async () => {
    const response = await fetch(`${base_url}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Not authorized');
    return response.json();
  },
  checkToken: async () => {
    const response = await fetch(`${base_url}/api/v1/auth/protected`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    // if (!response.ok) throw new Error('Token not valid');
    return response.ok;
  },
  createUser: async (userData) => {
    const response = await fetch(`${base_url}/api/v1/users/create_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Не вдалося створити користувача');
    return await response.json();
  }  
};

export default authService;