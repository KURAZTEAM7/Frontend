import React, { useState } from 'react';
import loadingSpinner from "./assets/loading-spinner.gif";

export default function AddItemModal({ isVisible, onClose }) {
    const [newItem, setNewItem] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: [],
        flexiblePricing: true,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/api/product/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });

            const responseData = await response.json();
            if (response.ok) {
                console.log("Item added successfully:", responseData);
                onClose();
            } else {
                setErrorMessage(responseData.message || "Failed to add item.");
            }
        } catch (error) {
            setErrorMessage("Failed to add item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal ${isVisible ? "d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Item</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddItemSubmit}>
                            {/* Form fields */}
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Item Title</label>
                                <input type="text" className="form-control" id="title" name="title" value={newItem.title} onChange={handleAddItemChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" value={newItem.description} onChange={handleAddItemChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={newItem.price} onChange={handleAddItemChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stock" name="stock" value={newItem.stock} onChange={handleAddItemChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select className="form-select" id="category" name="category" value={newItem.category} onChange={handleCategoryChange} required>
                                    <option value="">Choose Category</option>
                                    {/* Options */}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="images" className="form-label">Images</label>
                                <input type="file" className="form-control" id="images" name="images" multiple onChange={handleImageUpload} required />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="flexiblePricing" checked={newItem.flexiblePricing} onChange={handleFlexiblePricingToggle} />
                                <label className="form-check-label" htmlFor="flexiblePricing">Flexible Pricing</label>
                            </div>

                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                            <button type="submit" className="btn btn-primary">
                                {loading ? <img src={loadingSpinner} alt="loading" className="loading-spinner" /> : "Add Item"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
