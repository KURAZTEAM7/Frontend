import React from 'react';
import Signup from './Signup.jsx';
import './App.css';
import { useNavigation } from 'react-router-dom';

const App = () => {
  return (
    <div className="app-container">
      <Signup /> {/* Directly render the Login component */}
    </div>
  );
};

export default App;
