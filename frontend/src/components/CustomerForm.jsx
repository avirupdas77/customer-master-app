/**
 * CustomerForm Component
 * Renders customer input form with real-time field validation, reset option, and edit support.
 */

import React, { useState, useEffect } from 'react';

const initialFormState = {
    CustomerId: '',
    CustomerCode: '',
    CustomerName: '',
    Email: '',
    MobileNo: '',
    Address: '',
    City: '',
    State: '',
    Status: 'Active',
    CreatedDate: new Date().toISOString().slice(0, 10)
};

const CustomerForm = ({ selectedCustomer, onSave, onCancelEdit }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate form when editing an existing customer
    useEffect(() => {
        if (selectedCustomer) {
            setFormData({
                CustomerId: selectedCustomer.CustomerId || '',
                CustomerCode: selectedCustomer.CustomerCode || '',
                CustomerName: selectedCustomer.CustomerName || '',
                Email: selectedCustomer.Email || '',
                MobileNo: selectedCustomer.MobileNo || '',
                Address: selectedCustomer.Address || '',
                City: selectedCustomer.City || '',
                State: selectedCustomer.State || '',
                Status: selectedCustomer.Status || 'Active',
                CreatedDate: selectedCustomer.CreatedDate || new Date().toISOString().slice(0, 10)
            });
            setErrors({});
        } else {
            handleReset();
        }
    }, [selectedCustomer]);

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error for field on type
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Client-side Validation Logic
    const validateForm = () => {
        const newErrors = {};

        // Required field: Customer Code
        if (!formData.CustomerCode.trim()) {
            newErrors.CustomerCode = 'Customer Code is required.';
        }

        // Required field: Customer Name
        if (!formData.CustomerName.trim()) {
            newErrors.CustomerName = 'Customer Name is required.';
        }

        // Email validation format
        if (formData.Email && formData.Email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.Email.trim())) {
                newErrors.Email = 'Please enter a valid email address.';
            }
        }

        // Mobile Number validation (Exactly 10 digits)
        if (formData.MobileNo && formData.MobileNo.trim() !== '') {
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(formData.MobileNo.trim())) {
                newErrors.MobileNo = 'Mobile number must be exactly 10 digits.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSave(formData);
            if (!formData.CustomerId) {
                handleReset();
            }
        } catch (error) {
            console.error('Form submission failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset Form Handler
    const handleReset = () => {
        setFormData(initialFormState);
        setErrors({});
        if (selectedCustomer && onCancelEdit) {
            onCancelEdit();
        }
    };

    const isEditMode = Boolean(formData.CustomerId);

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className={`card-header text-white d-flex justify-content-between align-items-center ${isEditMode ? 'bg-warning text-dark' : 'bg-primary'}`}>
                <h5 className="mb-0">
                    <i className={`bi ${isEditMode ? 'bi-pencil-square' : 'bi-person-plus-fill'} me-2`}></i>
                    {isEditMode ? 'Edit Customer Master' : 'Add New Customer'}
                </h5>
                {isEditMode && (
                    <span className="badge bg-dark">Editing ID: #{formData.CustomerId}</span>
                )}
            </div>

            <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                        {/* Customer Code */}
                        <div className="col-md-4">
                            <label className="form-label">
                                Customer Code <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.CustomerCode ? 'is-invalid' : ''}`}
                                name="CustomerCode"
                                value={formData.CustomerCode}
                                onChange={handleChange}
                                placeholder="e.g., CUST001"
                                disabled={isEditMode}
                            />
                            {errors.CustomerCode && (
                                <div className="invalid-feedback">{errors.CustomerCode}</div>
                            )}
                        </div>

                        {/* Customer Name */}
                        <div className="col-md-4">
                            <label className="form-label">
                                Customer Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.CustomerName ? 'is-invalid' : ''}`}
                                name="CustomerName"
                                value={formData.CustomerName}
                                onChange={handleChange}
                                placeholder="e.g., John Doe"
                            />
                            {errors.CustomerName && (
                                <div className="invalid-feedback">{errors.CustomerName}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="col-md-4">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                placeholder="e.g., john@example.com"
                            />
                            {errors.Email && (
                                <div className="invalid-feedback">{errors.Email}</div>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div className="col-md-4">
                            <label className="form-label">Mobile Number</label>
                            <input
                                type="text"
                                className={`form-control ${errors.MobileNo ? 'is-invalid' : ''}`}
                                name="MobileNo"
                                value={formData.MobileNo}
                                onChange={handleChange}
                                placeholder="e.g., 9876543210"
                                maxLength={10}
                            />
                            {errors.MobileNo && (
                                <div className="invalid-feedback">{errors.MobileNo}</div>
                            )}
                        </div>

                        {/* Status (Active / Inactive) */}
                        <div className="col-md-4">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                name="Status"
                                value={formData.Status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Created Date */}
                        <div className="col-md-4">
                            <label className="form-label">Created Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="CreatedDate"
                                value={formData.CreatedDate}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Address */}
                        <div className="col-md-6">
                            <label className="form-label">Street Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                placeholder="e.g., 123 Main Street, Suite 4B"
                            />
                        </div>

                        {/* City */}
                        <div className="col-md-3">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="City"
                                value={formData.City}
                                onChange={handleChange}
                                placeholder="e.g., Mumbai"
                            />
                        </div>

                        {/* State */}
                        <div className="col-md-3">
                            <label className="form-label">State</label>
                            <input
                                type="text"
                                className="form-control"
                                name="State"
                                value={formData.State}
                                onChange={handleChange}
                                placeholder="e.g., Maharashtra"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
                        <button
                            type="button"
                            className="btn btn-outline-secondary px-4"
                            onClick={handleReset}
                            disabled={isSubmitting}
                        >
                            <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
                        </button>
                        <button
                            type="submit"
                            className={`btn ${isEditMode ? 'btn-warning' : 'btn-primary'} px-4`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className={`bi ${isEditMode ? 'bi-check-circle' : 'bi-save'} me-1`}></i>
                                    {isEditMode ? 'Update Customer' : 'Save Customer'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
