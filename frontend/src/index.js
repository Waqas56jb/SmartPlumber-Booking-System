import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// i mount the spa under root with strict mode for safer hooks in dev
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <App />
  </React.StrictMode>);
