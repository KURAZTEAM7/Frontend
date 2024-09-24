import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      evaluatePasswordStrength(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const evaluatePasswordStrength = (password) => {
    let strength = '';
    if (password.length < 6) {
      strength = 'Poor';
    } else if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
      strength = 'Good';
    } else {
      strength = 'Strong';
    }
    setPasswordStrength(strength);
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
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        const responseData = await response.json();
        if (response.ok) {
          navigate('/login');
        } else {
          setErrors({ email: responseData.message || 'Signup failed. Please try again.' });
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ email: 'An unexpected error occurred. Please try again.' });
      } finally {
        setLoading(false);
      }
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
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
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
            </div>

            <div className="input-container">
              <input
                type="text"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
              {form.password && <span className="password-strength">{passwordStrength}</span>}
            </div>

            <div className="input-container">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                <i className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
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
