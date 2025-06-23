import express from 'express';
import path from 'path';
// src/index.tsx
import './i18n'; // <-- Important: this initializes i18next


const app = express();
const PORT = process.env.PORT || 5000;

// Serve static React files
app.use(express.static(path.join(__dirname, '../dist')));

// All other routes return index.html to support React Router
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
