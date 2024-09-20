import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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

  const handleLogin = () => {
    navigate('/login');
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
            <div className="name-inputs">
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              <input
                type="text"
                name="middleName"
                placeholder="middle name"
                value={form.middleName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <input
                type="text"
                name="email"
                placeholder="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i> {/* FontAwesome eye icon */}
              </span>
            </div>

            <div className="input-container">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                <i className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i> {/* FontAwesome eye icon */}
              </span>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>

          <button onClick={handleLogin} className="login-link">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
