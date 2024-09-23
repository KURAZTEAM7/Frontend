import React, { useRef, useState } from 'react';
import { Button, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import personImage from '../assets/person.jpg'; // Default image
import './ProfilePage.css'; // Importing CSS
import { FaTimes } from 'react-icons/fa'; // Importing close icon

const ProfilePage = () => {
    const [profileImage, setProfileImage] = useState(personImage); // State for profile image
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [tinNumber, setTinNumber] = useState(''); // State for TIN number
    const [showMessageCard, setShowMessageCard] = useState(false); // State for message card visibility
    const fileInputRef = useRef(null); // Reference for the file input
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-profile');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Update profile image
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleUpgradeClick = () => {
        setShowModal(true); // Show the modal
    };

    const handleConfirm = () => {
        if (!tinNumber) {
            alert('Please enter your TIN number.'); // Alert for empty input
            return;
        }
        setShowModal(false); // Close the modal
        setTinNumber(''); // Reset TIN number
        setShowMessageCard(true); // Show the message card
    };

    const handleCloseMessageCard = () => {
        setShowMessageCard(false); // Close the message card
    };

    return (
        <div className="profile-page" style={{ backgroundColor: '#F6E3FF', fontFamily: 'Poppins' }}>
            <nav className="navbar">
                <h1 className="navbar-title">PRICO</h1>
                <div 
                    className="profile-pic" 
                    style={{ backgroundImage: `url(${profileImage})` }} 
                    onClick={() => fileInputRef.current.click()} // Trigger file input on click
                ></div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} // Hide the file input
                    accept="image/*" 
                    onChange={handleImageChange} // Handle image selection
                />
            </nav>

            <Container className="d-flex justify-content-center align-items-center vh-100 flex-column" style={{ position: 'relative' }}>
                {/* Message Card Display */}
                {showMessageCard && (
                    <Card className="tin-message-card" style={{ position: 'absolute', top: '20%', width: '300px', height: '200px', textAlign: 'center', backgroundColor: 'gray', borderRadius: '10px', zIndex: 1000 }}>
                        <div style={{ position: 'relative' }}>
                            <FaTimes 
                                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'red' }} 
                                onClick={handleCloseMessageCard} // Close icon action
                            />
                        </div>
                        <Card.Body>
                            <Card.Text style={{ fontSize: '1rem', color: 'white' }}>
                                Your TIN number has been added for review. We will get back to you as soon as possible.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button 
                                variant="outline-danger" 
                                onClick={handleCloseMessageCard} 
                                style={{ borderColor: 'red', color: 'red', backgroundColor: 'white' }} // White background for close button
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#400090'; e.currentTarget.style.color = 'white'; }} 
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'red'; }}
                            >
                                Close
                            </Button>
                        </Card.Footer>
                    </Card>
                )}

                <Card className="profile-card" style={{ width: '35rem', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' }}>
                    <Card.Body>
                        <div className="profile-info">
                            <span className="profile-icon" style={{ backgroundImage: `url(${profileImage})` }}></span>
                            <div className="profile-text">
                                <Card.Text>
                                    <strong>Full Name:</strong> John Smith Doe
                                </Card.Text>
                                <Card.Text>
                                    <span className="email-icon">📧</span>
                                    <strong>Email:</strong> johnsmithdoe@gmail.com
                                </Card.Text>
                                <Card.Text>
                                    <span className="password-icon">🔒</span>
                                    <strong>Password:</strong> *********
                                </Card.Text>
                            </div>
                        </div>
                        <Button 
                            variant="outline-danger" 
                            className="edit-button" 
                            onClick={handleEditClick}
                        >
                            Edit Profile
                        </Button>
                        <Button 
                            className="btn upgrade-button" 
                            onClick={handleUpgradeClick} // Show modal on click
                        >
                            Upgrade to Business Account
                        </Button>
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal for TIN Input */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: 'gray' }}>
                    <Modal.Title style={{ color: '#400090', fontFamily: 'Poppins', textAlign: 'center' }}>Enter TIN Number</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'gray', padding: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <input 
                            type="text"
                            id="tinNumber"
                            value={tinNumber}
                            onChange={(e) => setTinNumber(e.target.value)}
                            placeholder="Enter TIN Number"
                            style={{ 
                                width: '80%', 
                                padding: '10px', 
                                borderRadius: '20px', 
                                border: '1px solid #400090', 
                                backgroundColor: '#ffffff', // White background for input
                                color: '#000', // Black text color
                                marginBottom: '0', // Remove margin to avoid white space
                                outline: 'none' // Remove outline
                            }} 
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center', backgroundColor: 'gray' }}>
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowModal(false)} 
                        style={{ backgroundColor: 'white', color: 'red', borderColor: 'red' }} 
                    >
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleConfirm} 
                        style={{ backgroundColor: '#400090', borderColor: '#400090' }} 
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfilePage;