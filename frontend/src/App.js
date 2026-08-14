/**
 * App.js
 * Root Component referencing CustomerForm.jsx
 */

import React from 'react';
import CustomerForm from './components/CustomerForm';
import './App.css';

function App() {
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

            {/* Main Content Area Rendering Merged Customer Form & List */}
            <main className="container my-4 flex-grow-1">
                <CustomerForm />
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
