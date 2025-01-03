import React from 'react';
import Homepage from './homepage/App'; // Import the Home component
import Search from './search/App';
import ProductDetails from './detailpage/ProductDetails';
import Login from './login-and-signup/Login';
import Signup from './login-and-signup/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LicenseForm from './submit'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* These Routes will render the components based on the URL path */}
        <Route path="/" element={<Homepage />} />  {/* Home Page */}
        <Route path="/search" element={<Search />} />  {/* Search Page */}
        <Route path="/detailpage/:id" element={<ProductDetails />} /> {/* Product Page */}
        <Route path="/login" element={<Login />} />  {/* Login Page */}
        <Route path="/signup" element={<Signup />} />  {/* Signup Page */}
        <Route path="/testimage" element={<LicenseForm />} />  {/* Signup Page */}

      </Routes>
    </Router>
  );
};

export default App;
