import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VPE from './pages/VPE';
import PrivateRoute from './routes/PrivateRoute';
import authService from './services/authService';
import './styles/theme_green.css';

function App() {
  // БЕЗКІНЕЧНИЙ ПЕРЕВІРКИ ТОКЕНА - ВІДКЛЮЧЕНО ДЛЯ СПРОЩЕННЯ
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     authService.checkToken()
  //       .then(() => {
  //         // токен валідний, нічого не робимо
  //       })
  //       .catch(() => {
  //         // токен невалідний
  //         localStorage.removeItem('token');
  //         window.location.href = '/login';
  //       });
  //   } else {
  //     window.location.href = '/login';
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <VPE />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;