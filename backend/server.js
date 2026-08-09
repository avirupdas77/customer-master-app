/**
 * Main Express Application Server Entry Point
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customerRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Express Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'Inventory Management System API - Customer Master Module is Running' });
});

// Customer Routes Setup
app.use('/customers', customerRoutes);
app.use('/api/customers', customerRoutes); // Alias for flexibility

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Requested endpoint not found.' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Customer Master Backend Server is running on port ${PORT}`);
    console.log(`🌐 API Endpoints accessible at http://localhost:${PORT}/customers`);
});
