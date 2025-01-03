import React, { useState } from 'react';
import './Login.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted', form);
    }
  };

  return (
    <div className="container-wrapper">
      <div className="login-container">
        <div className="left-section">
          <h1 className="site-title">PRICE COMPARE</h1>
          <p className="site-description">
            Compare smarter, buy better—where businesses and buyers meet
          </p>
        </div>

        <div className="login-form">
          <h2>Welcome back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="email"
                placeholder="Email or phone number"
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
                placeholder="Password"
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

            <div className="forgot-password">
              <a href="#">Forgot Password?</a> {/* Replaced with anchor tag for navigation */}
            </div>

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>
          <hr className="horizontal-line" />
          <button className="signup-btn" onClick={() => alert('Signup page')}>
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
