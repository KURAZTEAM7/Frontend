// src/App.js

import React, { useEffect } from 'react';
import api, { setAuthToken } from './axiosConfig';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); // Set token if available
    }
  }, []);

  return (
    <div className="App">
      {/* Your Routes and Components */}
    </div>
  );
};

export default App;
