/**
 * CustomerList Component
 * Displays customer database entries with serial numbers, search functionality, status badges, and action buttons.
 */

import React, { useState } from 'react';

const CustomerList = ({ customers, onEdit, onDelete, onSearch, isLoading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    const handleDeleteClick = (customer) => {
        const confirmMessage = `Are you sure you want to delete customer "${customer.CustomerName}" (${customer.CustomerCode})?`;
        if (window.confirm(confirmMessage)) {
            onDelete(customer.CustomerId);
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
                <h5 className="mb-0 text-dark fw-bold">
                    <i className="bi bi-people-fill text-primary me-2"></i>
                    Customer Master Records
                    <span className="badge bg-primary-subtle text-primary rounded-pill ms-2 fs-6">
                        {customers ? customers.length : 0} Total
                    </span>
                </h5>

                {/* Search Bar */}
                <div className="d-flex align-items-center" style={{ minWidth: '280px' }}>
                    <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control bg-light border-start-0 ps-0"
                            placeholder="Search by Customer Name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {searchTerm && (
                            <button
                                className="btn btn-outline-secondary border-start-0"
                                type="button"
                                onClick={handleClearSearch}
                                title="Clear Search"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="ps-3" style={{ width: '60px' }}># S.No</th>
                                <th scope="col">Code</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile No</th>
                                <th scope="col">City / State</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created Date</th>
                                <th scope="col" className="text-end pe-4" style={{ width: '160px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="9" className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading customers...</span>
                                        </div>
                                        <p className="mt-2 text-muted mb-0">Fetching customer master data...</p>
                                    </td>
                                </tr>
                            ) : customers && customers.length > 0 ? (
                                customers.map((customer, index) => (
                                    <tr key={customer.CustomerId}>
                                        {/* Serial Number */}
                                        <td className="ps-3 fw-medium text-secondary">{index + 1}</td>
                                        
                                        {/* Customer Code */}
                                        <td>
                                            <span className="badge bg-light text-dark border font-monospace">
                                                {customer.CustomerCode}
                                            </span>
                                        </td>

                                        {/* Customer Name */}
                                        <td className="fw-semibold text-dark">
                                            {customer.CustomerName}
                                        </td>

                                        {/* Email */}
                                        <td>
                                            {customer.Email ? (
                                                <a href={`mailto:${customer.Email}`} className="text-decoration-none text-body">
                                                    <i className="bi bi-envelope me-1 text-muted"></i>
                                                    {customer.Email}
                                                </a>
                                            ) : (
                                                <span className="text-muted fst-italic">N/A</span>
                                            )}
                                        </td>

                                        {/* Mobile Number */}
                                        <td>
                                            {customer.MobileNo ? (
                                                <span>
                                                    <i className="bi bi-telephone me-1 text-muted"></i>
                                                    {customer.MobileNo}
                                                </span>
                                            ) : (
                                                <span className="text-muted fst-italic">N/A</span>
                                            )}
                                        </td>

                                        {/* Location */}
                                        <td>
                                            {customer.City || customer.State ? (
                                                <span>
                                                    {customer.City}{customer.City && customer.State ? ', ' : ''}{customer.State}
                                                </span>
                                            ) : (
                                                <span className="text-muted fst-italic">N/A</span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td>
                                            {customer.Status === 'Active' ? (
                                                <span className="badge-status-active">
                                                    <i className="bi bi-check-circle-fill me-1"></i> Active
                                                </span>
                                            ) : (
                                                <span className="badge-status-inactive">
                                                    <i className="bi bi-x-circle-fill me-1"></i> Inactive
                                                </span>
                                            )}
                                        </td>

                                        {/* Created Date */}
                                        <td>
                                            <small className="text-muted">
                                                {customer.CreatedDate || 'N/A'}
                                            </small>
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="text-end pe-4">
                                            <div className="btn-group btn-group-sm" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-action"
                                                    onClick={() => onEdit(customer)}
                                                    title="Edit Customer"
                                                >
                                                    <i className="bi bi-pencil-fill"></i> Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-action"
                                                    onClick={() => handleDeleteClick(customer)}
                                                    title="Delete Customer"
                                                >
                                                    <i className="bi bi-trash-fill"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-5 text-muted">
                                        <i className="bi bi-inbox fs-1 d-block mb-2 text-secondary"></i>
                                        {searchTerm ? (
                                            <span>No customers found matching "<strong>{searchTerm}</strong>".</span>
                                        ) : (
                                            <span>No customer records available. Add a new customer above to get started.</span>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
