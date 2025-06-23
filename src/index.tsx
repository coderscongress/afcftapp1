

// src/index.tsx
import '../i18n'; // <-- Important: this initializes i18next
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);