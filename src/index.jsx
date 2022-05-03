import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import ErrorBoundary from './ErrorBoundary';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mainpage from './components/Mainpage';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
