import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp'; // Removed /src/ because we are now inside src
import './App.css'; // Removed /src/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
