/**
 * Customer Service Module
 * Handles API calls to the Express backend using Axios.
 */

import axios from 'axios';

// Base URL for the Customer API endpoints
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/customers';

const CustomerService = {
    /**
     * Fetch all customers or search by customer name
     * @param {string} searchKeyword 
     */
    getAllCustomers: async (searchKeyword = '') => {
        const url = searchKeyword ? `${API_BASE_URL}?search=${encodeURIComponent(searchKeyword)}` : API_BASE_URL;
        const response = await axios.get(url);
        return response.data;
    },

    /**
     * Fetch single customer by ID
     * @param {number} id 
     */
    getCustomerById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    /**
     * Create a new customer
     * @param {Object} customerData 
     */
    createCustomer: async (customerData) => {
        const response = await axios.post(API_BASE_URL, customerData);
        return response.data;
    },

    /**
     * Update an existing customer by ID
     * @param {number} id 
     * @param {Object} customerData 
     */
    updateCustomer: async (id, customerData) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, customerData);
        return response.data;
    },

    /**
     * Delete customer by ID
     * @param {number} id 
     */
    deleteCustomer: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    }
};

export default CustomerService;
