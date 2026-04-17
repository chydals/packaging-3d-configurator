import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp'; // This looks for MainApp.js in the same folder
import './App.css'; // This looks for App.css in the same folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
