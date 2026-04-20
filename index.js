import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './src/MainApp'; // Change this line
import './App.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './src/MainApp'; // Added /src/ here
import './App.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
