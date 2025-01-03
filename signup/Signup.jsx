import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const navigate = useNavigate(); // This must be inside a Router component

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toggle password visibility for password and confirm password fields
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation (minimum 8 characters, number, and special character)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  // Form validation logic
  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (!form.firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!validatePassword(form.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain numbers and special characters';
      isValid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form submission logic to register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid. Sending request to the API...');
      try {
        // Logging the request body for debugging
        console.log('Sending the following data:', {
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          email: form.email,
          password: form.password
        });

        // Make request to the API
        const response = await axios.post('https://831a23bc8d53ce6f045bd044d07a997d.serveo.net/signup', {
          first_name: form.firstName,
          middle_name: form.middleName,
          last_name: form.lastName,
          email: form.email,
          password: form.password
        });

        console.log('Response from the server:', response);

        const { token } = response.data;

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        setApiSuccess('User registered successfully');
        setApiError('');

        // Redirect to homepage after successful signup
        navigate('/');

      } catch (error) {
        // Detailed logging of error information
        console.error('An error occurred during the signup process:', error);

        if (error.response) {
          console.error('Server responded with:', error.response.data);
          setApiError(error.response.data.message || 'Error during signup, please try again.');
        } else if (error.request) {
          console.error('No response received:', error.request);
          setApiError('No response from server.');
        } else {
          console.error('An error occurred while setting up the request:', error.message);
          setApiError('Error during signup, please try again.');
        }
        setApiSuccess('');
      }
    } else {
      console.log('Form validation failed. Please correct the errors.');
    }
  };

  return (
    <div className="container-wrapper">
      <div className="signup-container">
        <div className="left-section">
          <h1 className="site-title">PRICE COMPARE</h1>
          <p className="site-description">Compare smarter, buy better—where businesses and buyers meet</p>
        </div>

        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}

            <input
              type="text"
              name="middleName"
              placeholder="Middle name"
              value={form.middleName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <div className="password-field">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}

            <div className="password-field">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button type="button" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

            <button type="submit">Sign Up</button>
            {apiError && <span className="error-text">{apiError}</span>}
            {apiSuccess && <span className="success-text">{apiSuccess}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
