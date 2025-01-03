import React, { useState } from 'react';
import axios from 'axios';

const LicenseForm = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseFile, setLicenseFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    if (!licenseNumber || !licenseFile) {
      console.error('Both license number and file are required.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('license_number', licenseNumber.trim());
    formData.append('license', licenseFile);

    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }      

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/vendor/register/bylicense',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );
      console.log('API response:', response.data);
    } catch (error) {
    console.error('Error response from server:', error.response?.data || error.message);
      console.error('Error submitting form:', error);
    }
  };

  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="license_number">License Number:</label>
        <input
          type="text"
          id="license_number"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="license">Upload License File:</label>
        <input
          type="file"
          id="license"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LicenseForm;
