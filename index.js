import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './src/MainApp'; // This tells it to go into the src folder
import './App.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
