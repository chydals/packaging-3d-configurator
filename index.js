import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './src/MainApp'; // Points to the src folder
import './App.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
