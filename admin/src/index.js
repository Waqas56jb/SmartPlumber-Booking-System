import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// i bootstrap the admin spa the same way as main react 18 docs
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
    <App />
  </React.StrictMode>);
