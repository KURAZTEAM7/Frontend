import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
import logo from "C:/Users/Windows 10 Pro/Desktop/search feature/Frontend/search-page/search-page/src/assets/logos.png"

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const [apiError, setApiError] = useState(''); // State for handling API error responses

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!form.email) {
      errors.email = 'Email or phone number is required';
      isValid = false;
    }
    if (!form.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append('email', form.email);
        formData.append('password', form.password);

        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Invalid email or password');
        }

        const data = await response.json();
        // Save the token in localStorage
        localStorage.setItem('authToken', data.token);

        console.log('Login successful', data);
        // Navigate to home page on success
        navigate('/');
      } catch (error) {
        console.error('Error logging in:', error.message);
        setApiError(error.message);
      }
    }
  };

  const handleSignup = () => {
    navigate('/signup'); // Navigate to Signup page when the button is clicked
  };

  return (
    <div className="container-wrapper">
      <div className="login-container">
        <div className="left-section">
          <img src={logo} alt="logo" className="logo" />
          <p className="site-description">Compare smarter, buy better—where businesses and buyers meet</p>
        </div>

        <div className="login-form">
          <h2>Welcome back!</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="email"
                placeholder="email or phone number"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-container">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between password and text
                name="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i> {/* FontAwesome eye icon */}
              </span>
            </div>

            {apiError && (
              <div className="api-error">
                <p>{apiError}</p>
              </div>
            )}

            <div className="forgot-password">
              <Link to=''>Forgot Password?</Link>
            </div>

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>

          <hr className='horizontal-line' />
          <button onClick={handleSignup} className="signup-btn">
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
