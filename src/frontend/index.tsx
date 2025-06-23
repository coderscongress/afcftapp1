
import '../i18n'; // <-- Important: this initializes i18next
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
