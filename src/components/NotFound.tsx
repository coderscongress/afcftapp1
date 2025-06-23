
// src/components/NotFound.tsx

import React from 'react';
import { debounce } from 'lodash';
import './NotFound.css'; // optional for styling

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <img
        src="/assets/404.png" // or use an external URL
        alt="Page Not Found"
        className="not-found-image"
      />
      <h1>Oops! Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" className="home-link">Go Back Home</a>
    </div>
  );
};

export default NotFound;
