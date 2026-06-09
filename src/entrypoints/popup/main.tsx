import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/assets/tailwind.css';

document.documentElement.classList.add('bg-black');
document.body.classList.add('m-0', 'p-0');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
