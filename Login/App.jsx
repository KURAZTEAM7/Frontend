import React from 'react';
import Login from './Login.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Login /> {/* Directly render the Login component */}
    </div>
  );
};

export default App;
