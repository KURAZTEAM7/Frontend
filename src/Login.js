import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
      setLoading(true);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        const responseData = await response.json();
        if (response.ok) {
          navigate('/dashboard'); // Navigate on successful login
        } else {
          setErrors({
            email: responseData.error.includes('email') ? 'Email not valid' : '',
            password: responseData.error.includes('password') ? 'Password not valid' : '',
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignup = () => {
    navigate('/signup');
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
            </div>

            <div className="forgot-password">
              <Link to="">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          {errors.general && <span className="error-message">{errors.general}</span>}
          <hr className='horizontal-line'/>
          <button onClick={handleSignup} className="signup-btn">
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
