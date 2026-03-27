import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css'; // ← основные CSS-переменные
import App from './App';

// Установка темы по умолчанию (можно взять из localStorage)
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);