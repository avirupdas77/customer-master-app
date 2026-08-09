/**
 * App.js
 * Root Component for the Customer Master Module in Inventory Management System.
 */

import React, { useState, useEffect, useCallback } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import CustomerService from './services/CustomerService';
import './App.css';

function App() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    // Display Alert banner
    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => {
            setAlert({ show: false, type: '', message: '' });
        }, 5000);
    };

    // Dismiss Alert banner manually
    const dismissAlert = () => {
        setAlert({ show: false, type: '', message: '' });
    };

    // Load Customer List from backend
    const loadCustomers = useCallback(async (searchQuery = '') => {
        setIsLoading(true);
        try {
            const response = await CustomerService.getAllCustomers(searchQuery);
            if (response.success) {
                setCustomers(response.data);
            } else {
                showAlert('danger', response.message || 'Failed to fetch customer records.');
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            const errorMsg = error.response?.data?.message || 'Unable to connect to backend server. Make sure Node.js server is running.';
            showAlert('danger', errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    // Handle Create or Update Customer
    const handleSaveCustomer = async (formData) => {
        try {
            if (formData.CustomerId) {
                // Update Existing Customer
                const response = await CustomerService.updateCustomer(formData.CustomerId, formData);
                if (response.success) {
                    showAlert('success', 'Customer record updated successfully.');
                    setSelectedCustomer(null);
                    loadCustomers();
                }
            } else {
                // Create New Customer
                const response = await CustomerService.createCustomer(formData);
                if (response.success) {
                    showAlert('success', 'New customer added successfully.');
                    loadCustomers();
                }
            }
        } catch (error) {
            console.error('Save customer error:', error);
            const errorMsg = error.response?.data?.message || (error.response?.data?.errors ? error.response.data.errors.join(' ') : 'An error occurred while saving.');
            showAlert('danger', errorMsg);
            throw error; // Re-throw so form component handles button loading state
        }
    };

    // Handle Edit Customer action
    const handleEditCustomer = (customer) => {
        setSelectedCustomer(customer);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Cancel Edit Mode
    const handleCancelEdit = () => {
        setSelectedCustomer(null);
    };

    // Handle Delete Customer action
    const handleDeleteCustomer = async (customerId) => {
        try {
            const response = await CustomerService.deleteCustomer(customerId);
            if (response.success) {
                showAlert('success', 'Customer deleted successfully.');
                if (selectedCustomer && selectedCustomer.CustomerId === customerId) {
                    setSelectedCustomer(null);
                }
                loadCustomers();
            } else {
                showAlert('danger', response.message || 'Failed to delete customer.');
            }
        } catch (error) {
            console.error('Delete customer error:', error);
            const errorMsg = error.response?.data?.message || 'An error occurred while deleting customer.';
            showAlert('danger', errorMsg);
        }
    };

    // Search Handler
    const handleSearch = (searchKeyword) => {
        loadCustomers(searchKeyword);
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            {/* Top Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#home">
                        <i className="bi bi-box-seam-fill text-primary me-2 fs-4"></i>
                        <span>Inventory Management System</span>
                    </a>
                    <span className="navbar-text text-light-50 fs-6">
                        <i className="bi bi-person-lines-fill me-1"></i> Customer Master Module
                    </span>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="container my-4 flex-grow-1">
                {/* Status Alert Notification */}
                {alert.show && (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show shadow-sm mb-4`} role="alert">
                        <div className="d-flex align-items-center">
                            <i className={`bi ${alert.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2 fs-5`}></i>
                            <div>{alert.message}</div>
                        </div>
                        <button type="button" className="btn-close" onClick={dismissAlert} aria-label="Close"></button>
                    </div>
                )}

                {/* Customer Input Form */}
                <CustomerForm
                    selectedCustomer={selectedCustomer}
                    onSave={handleSaveCustomer}
                    onCancelEdit={handleCancelEdit}
                />

                {/* Customer Data Table */}
                <CustomerList
                    customers={customers}
                    onEdit={handleEditCustomer}
                    onDelete={handleDeleteCustomer}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />
            </main>

            {/* Footer */}
            <footer className="bg-white border-top py-3 text-center text-muted mt-auto">
                <div className="container">
                    <small>Inventory Management System &copy; {new Date().getFullYear()} Customer Master Module. Built with Node.js & React.</small>
                </div>
            </footer>
        </div>
    );
}

export default App;
