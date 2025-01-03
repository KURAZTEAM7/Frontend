import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "C:/Users/Windows 10 Pro/Desktop/search feature/Frontend/search-page/search-page/src/assets/logos.png";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState(''); // Handle API errors
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!form.firstName) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    if (!form.email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!form.password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    if (form.password !== form.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const requestBody = {
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
          password_confirmation: form.passwordConfirmation
        };

        // API call to register the user
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        // Check for successful registration (status code 201)
        if (response.status === 201) {
          const token = response.data.token;

          // Save token to local storage
          localStorage.setItem('authToken', token);

          // Redirect to the homepage after successful signup
          navigate('/');
        } else {
          setApiError('Registration failed. Please try again.');
        }
      } catch (err) {
        // Handle API errors
        setApiError('Registration failed. Please check your inputs or try again later.');
        console.error('API error:', err);
      }
    } else {
      console.log('Form validation failed', errors);
    }
  };

  // Navigate to login page
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container-wrapper">
      <div className="signup-container">
        <div className="left-section">
          <img src={logo} alt="logo" className="logo" />
          <p className="site-description">Compare smarter, buy better—where businesses and buyers meet</p>
        </div>

        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="name-inputs">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={form.middleName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-container password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <div className="input-container password-input">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={form.passwordConfirmation}
                onChange={handleChange}
                className={errors.passwordConfirmation ? 'error' : ''}
              />
              {errors.passwordConfirmation && <span className="error-message">{errors.passwordConfirmation}</span>}
              <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                <i className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>

          {/* Display API error messages */}
          {apiError && <p className="error-message">{apiError}</p>}

          <button onClick={handleLogin} className="login-link">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
