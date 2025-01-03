import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import logo from "./assets/logos.png";
import profile from "./assets/profile-icon.png";
import searchIcon from "./assets/search-icon.png";
import loadingSpinner from "./assets/loading-spinner.gif";

export default function Navbar({ onSearch = (query) => console.log(`Searching for: ${query}`) }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState("");
    const [licenseFile, setLicenseFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isBusinessUser, setIsBusinessUser] = useState(false);
    const [newItem, setNewItem] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: [],
        flexiblePricing: true,
    });

    const navigate = useNavigate();

    // Check for token and user status on component mount
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userStatus = localStorage.getItem("userStatus");
        setIsLoggedIn(!!token);
        setIsBusinessUser(userStatus === "saved as a business");
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            onSearch(searchTerm);
            navigate(`/search?query=${searchTerm}`);
        }
    };

    const handleProfileClick = () => {
        setShowPopup(!showPopup);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleRegisterAsBusiness = () => {
        setShowRegisterModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setIsBusinessUser(false);
        setShowPopup(false);
        navigate("/");
    };

    const handleCloseModal = () => {
        setShowRegisterModal(false);
        setShowAddItemModal(false);
    };

    const handleAddNewItemClick = () => {
        setShowAddItemModal(true);
    };

    const handleAddItemChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    };

    const handleCategoryChange = (e) => {
        setNewItem({
            ...newItem,
            category: e.target.value
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewItem({
            ...newItem,
            images: files
        });
    };


    const handleFlexiblePricingToggle = (e) => {
        setNewItem({
            ...newItem,
            flexiblePricing: e.target.checked
        });
    };

    const handleAddItemSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        if (!token) {
            setErrorMessage("User not authenticated.");
            return;
        }

        const formData = new FormData();
        formData.append("title", newItem.title);
        formData.append("description", newItem.description);
        formData.append("price", newItem.price);
        formData.append("flexible_pricing", newItem.flexiblePricing ? 1 : 0);
        formData.append("remaining_stock", newItem.stock);
        formData.append("category_id", newItem.category);

        newItem.images.forEach((image) => {
            formData.append("images[]", image);
        });

        try {
            const response = await fetch("http://127.0.0.1:8000/api/product/add", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Accept": "application/json",
                },
                body: formData
              });


            const responseData = await response.json();
            if (response.ok) {
                console.log("Item added successfully:", responseData);
                setShowAddItemModal(false);
            } else {
                setErrorMessage(responseData.message || "Failed to add item.");
            }
        } catch (error) {
            setErrorMessage("Failed to add item. Please try again.");
        }
    };

    const handleFileChange = (event) => {
        setLicenseFile(event.target.files[0]);
    };

    const handleVendorRegistration = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.log("Error: No token found");
            setErrorMessage("User not authenticated.");
            setLoading(false);
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('license_number', licenseNumber);
            formData.append('license', licenseFile);
    
            const headers = {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            };
    
            const response = await fetch("http://127.0.0.1:8000/api/vendor/register/bylicense", {
                method: 'POST',
                headers,
                body: formData
            });
    
            const responseData = await response.json();
            console.log("Server Response:", responseData); // Log the server response for debugging
    
            if (response.status === 201) {
                // Vendor registration is successful based on the status code
                setShowRegisterModal(false);
                localStorage.setItem("userStatus", "saved as a business");
                setIsBusinessUser(true);
                setShowSuccess(true);
    
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            } else {
                // Handle any other error messages from the server
                setErrorMessage(responseData.message || "Registration failed. Please check your input.");
            }
        } catch (error) {
            setErrorMessage("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="nav-bar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand logos" href="/">
                        <img src={logo} alt="logo" />
                    </a>
                    <button
                        className="navbar-toggler shadow-none border-0"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                <img src={logo} alt="logo" />
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body">
                            <div className="container-fluid" id="search-div">
                                <form className="d-flex justify-content-center" role="search" onSubmit={handleSearchSubmit}>
                                    <div className="position-relative search-container">
                                        <input
                                            type="search"
                                            id="search-field"
                                            className="form-control"
                                            placeholder="Search items"
                                            aria-label="Search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button className="btn search-btn btn-outline-success position-absolute" type="submit">
                                            <img src={searchIcon} alt="search-button" className="search-button" />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item ms-3">
                                    <a className="nav-link" href="/orders" style={{ fontSize: "1.25rem" }}>
                                        Order
                                    </a>
                                </li>
                                <li className="nav-item ms-3">
                                    <a className="nav-link" href="/wishlist" style={{ fontSize: "1.25rem" }}>
                                        Wishlist
                                    </a>
                                </li>
                                <li className="nav-item ms-3 position-relative">
                                    <a className="nav-link" href="#" onClick={handleProfileClick} style={{ fontSize: "2rem" }}>
                                        <img src={profile} alt="profile" className="profile-pic" />
                                    </a>
                                    {showPopup && (
                                        <div className="profile-popup">
                                            {isLoggedIn ? (
                                                <>
                                                    {isBusinessUser ? (
                                                        <button onClick={handleAddNewItemClick} className="add-item-button">Add Item</button>
                                                    ) : (
                                                        <button onClick={handleRegisterAsBusiness} className="upgrade-button">Register as Business</button>
                                                    )}
                                                    <button onClick={handleLogout} className="logout-button">Logout</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={handleLogin} className="login-button">Login</button>
                                                    <button onClick={handleSignUp} className="signup-button">Sign Up</button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Add Item Modal */}
            {showAddItemModal && (
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Item</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddItemSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Item Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={newItem.title}
                                            onChange={handleAddItemChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={newItem.description}
                                            onChange={handleAddItemChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            name="price"
                                            value={newItem.price}
                                            onChange={handleAddItemChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select
                                            className="form-select"
                                            id="category"
                                            name="category"
                                            value={newItem.category}
                                            onChange={handleCategoryChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {/* Replace with dynamic categories */}
                                            <option value="1">Animals & Pet Supplies</option>
                                                <option value="2">Arts & Entertainment</option>
                                                <option value="3">Baby & Toddler</option>
                                                <option value="4">Business & Industrial</option>
                                                <option value="5">Cameras & Optics</option>
                                                <option value="6">Clothing & Accessories</option>
                                                <option value="7">Electronics</option>
                                                <option value="8">Food, Beverages & Tobacco</option>
                                                <option value="9">Furniture</option>
                                                <option value="10">Hardware</option>
                                                <option value="11">Health & Beauty</option>
                                                <option value="12">Home & Garden</option>
                                                <option value="13">Luggage & Bags</option>
                                                <option value="14">Mature</option>
                                                <option value="15">Media</option>
                                                <option value="16">Office Supplies</option>
                                                <option value="17">Religious & Ceremonial</option>
                                                <option value="18">Software</option>
                                                <option value="19">Sporting Goods</option>
                                                <option value="20">Toys & Games</option>
                                                <option value="21">Vehicles & Parts</option>

                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="stock"
                                            name="stock"
                                            value={newItem.stock}
                                            onChange={handleAddItemChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">Upload Images</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="images"
                                            name="images"
                                            multiple
                                            onChange={handleImageUpload}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="flexiblePricing"
                                            name="flexiblePricing"
                                            checked={newItem.flexiblePricing}
                                            onChange={handleFlexiblePricingToggle}
                                        />
                                        <label className="form-check-label" htmlFor="flexiblePricing">Flexible Pricing</label>
                                    </div>
                                    {loading && <img src={loadingSpinner} alt="Loading..." />}
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <button type="submit" className="btn btn-primary">Add Item</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {showRegisterModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={handleCloseModal}>x</button>
                        <h3>Register as Business</h3>
                        <form onSubmit={handleVendorRegistration}>
                            <input
                                type="text"
                                placeholder="Enter license number"
                                className="license-input"
                                value={licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="license-input"
                            />
                            <button type="submit" className="submit-license">
                                {loading ? <img src={loadingSpinner} alt="loading..." /> : "Submit"}
                            </button>
                            {errorMessage && <p className="error">{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
