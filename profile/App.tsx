import React, { useState, useRef } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

interface UserProfileProps {
  fullName: string;
  email: string;
  password: string
}


const UserProfile: React.FC<UserProfileProps> = ({ fullName, email, password }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [editedName, setEditedName] = useState(fullName);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPassword, setEditedPassword] = useState(password);
  const [tinNumber, setTinNumber] = useState('');

  const popupRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    popupRef.current?.classList.remove('hidden');
    profileRef.current?.classList.add('blur');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(fullName);
    setEditedEmail(email);
    setEditedPassword(password);
    popupRef.current?.classList.add('hidden');
    profileRef.current?.classList.remove('blur');
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    popupRef.current?.classList.add('hidden');
    profileRef.current?.classList.remove('blur');
  };

  const handleUpgradeClick = () => {
    setIsUpgrading(true);
  };

  const handleCloseUpgrade = () => {
    setIsUpgrading(false);
    setTinNumber('');
  };

  const handleTinSubmit = () => {
    console.log('TIN Submitted: ' + tinNumber);
    setIsUpgrading(false);
    setIsConfirmationVisible(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationVisible(false);
    setTinNumber('');
  };

  const handleCloseProfileBox = () => {
    setIsEditing(false);
    popupRef.current?.classList.add('hidden');
    profileRef.current?.classList.remove('blur');
  };

  const handleCloseConfirmationPopup = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div style={{ backgroundColor: '#FBF3FF', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ backgroundColor: '#FBF3FF', padding: '10px', borderRadius: '10px 10px 0 0', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '15px' }}>
        <h1 style={{ color: '#8A2BE2', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Prico</h1> 
      </div>
      <div style={{ height: '2px', backgroundColor: '#ccc', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} /> 
      <div style={{ backgroundColor: '#FBF3FF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <div ref={profileRef} style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          width: '400px',
          height: '238px',
        }}>
          {/* X Button for Profile Box */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <button onClick={handleCloseProfileBox} style={{ backgroundColor: 'transparent', color: '#333', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>X</button>
          </div>

          {/* Display Edited Full Name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'flex-start',
            width: '70%',
          }}>
            <FaUser style={{ color: '#8A2BE2' }} /> 
            <p style={{ color: '#8A2BE2', fontWeight: 'bold', margin: 0 }}>Full Name: {editedName}</p>

</div>
          {/* Display Edited Email */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'flex-start',
              width: '70%',
            }}>
              <FaEnvelope style={{ color: '#8A2BE2' }} />
              <p style={{ color: '#8A2BE2', fontWeight: 'bold', margin: 0 }}>Email: {editedEmail}</p>
            </div>

            {/* Display Edited Password */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'flex-start',
              width: '70%',
            }}>
              <FaLock style={{ color: '#8A2BE2' }} />
              <p style={{ color: '#8A2BE2', fontWeight: 'bold', margin: 0 }}>Password: {editedPassword}</p>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleEditClick}
              style={{
                color: '#FF00BB',
                border: '2px solid #FF00BB',
                backgroundColor: 'transparent',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Edit Profile
            </button>

            {/* Upgrade to Business Account Button */}
            <button
              onClick={handleUpgradeClick}
              style={{
                backgroundColor: '#8A2BE2',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Upgrade to Business Account
            </button>
          </div>

          {isEditing && (
            <div ref={popupRef} className="popup" style={{
              backgroundColor: '#FBF3FF',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '300px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <button onClick={handleCancelEdit} style={{ backgroundColor: 'transparent', color: '#333', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>X</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ color: '#29006C' }}>Full Name:</label>
                <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '2px solid #29006C', backgroundColor: '#D9D9D9' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ color: '#29006C' }}>Email:</label>
                <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '2px solid #29006C', backgroundColor: '#D9D9D9' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ color: '#29006C' }}>Password:</label>
                <input type="password" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '2px solid #29006C', backgroundColor: '#D9D9D9' }} />
              </div>

<div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleSaveChanges} style={{
                  backgroundColor: 'transparent',
                  color: '#FF00B8',
                  border: '2px solid #FF00B8',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}>
                  Save Changes
                </button>
              </div>
            </div>
      )}

              {isUpgrading && (
                <div className="upgrade-popup" style={{
                  backgroundColor: '#D9D9D9',
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  width: '300px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <button onClick={handleCloseUpgrade} style={{ backgroundColor: 'transparent', color: '#333', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>X</button>
                  </div>
                  <label style={{ color: '#29006C', textAlign: 'center' }}>Enter TIN Number:</label>
                  <input type="text" value={tinNumber} onChange={(e) => setTinNumber(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '2px solid #29006C', backgroundColor: 'white', color: '#29006C' }} />
                  <button onClick={handleTinSubmit} style={{
                    backgroundColor: 'white',
                    color: '#FF00B8',
                    border: '2px solid #FF00B8',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    alignSelf: 'center',
                  }}>
                    Confirm
                  </button>
                </div>
              )}

              {isConfirmationVisible && (
                <div className="confirmation-popup" style={{
                  backgroundColor: '#D9D9D9',
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  width: '300px'
                }}>
                  {/* X Button for Go Back to Homepage Confirmation Popup */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <button onClick={handleCloseConfirmationPopup} style={{ backgroundColor: 'transparent', color: '#333', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>X</button>
                  </div>
                  <div style={{ color: '#29006C', textAlign: 'center', marginTop: '10px' }}> <p>Your TIN number has been added for review. We will get back to you as soon as possible.</p>
                    <a href="/" style={{ color: '#FF00BB', textDecoration: 'none', fontWeight: 'bold' }}>Go back to homepage</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      };

      export default UserProfile;