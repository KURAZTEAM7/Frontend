import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './EditProfilePage.css'; // Make sure the CSS file is linked correctly

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('John Smith Doe');
  const [email, setEmail] = useState('johnsmithdoe@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    // Basic validation
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert('Name cannot contain numbers or underscores');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    console.log('Profile updated:', { name, email, password });
    navigate('/'); // Navigate back to profile page
  };

  return (
    <Container className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="edit-profile-header">
          <h4>Edit Profile</h4>
          <Button
            variant="light"
            onClick={() => navigate('/')}
            className="close-button"
          >
            ✕
          </Button>
        </div>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password:</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {password.length > 0 && password.length < 8 && (
              <small className="text-danger">Weak password</small>
            )}
          </Form.Group>
          <Button onClick={handleSave} className="save-button">
            Save Changes
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditProfilePage;
