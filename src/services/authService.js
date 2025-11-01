import { useNavigate } from 'react-router-dom';

const base_url = "http://192.168.0.158:8000";
// const base_url = "http://localhost:8000";

const authService = {
  login: async (username, password) => {
    const login_url = `${base_url}/api/v1/auth/login`;
    console.log('юзер:', username, 'пароль:', password);
    try {
      const response = await fetch(login_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      console.log('Відповідь сервера:', data);
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('username', username);
      }
      return data;
    } catch (error) {
      console.error('Помилка запиту:', error);
      throw error;
    }
  }
};

export default authService;