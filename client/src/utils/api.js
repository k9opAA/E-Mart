// API Configuration
// This file contains the base URL and common API functions for the application

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// API Endpoints
export const API_ENDPOINTS = {
    // Products
    PRODUCTS: `${API_BASE_URL}/products`,
    PRODUCT_CREATE: `${API_BASE_URL}/products/create`,
    PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
    
    // Categories
    CATEGORIES: `${API_BASE_URL}/category`,
    CATEGORY_CREATE: `${API_BASE_URL}/category/create`,
    CATEGORY_BY_ID: (id) => `${API_BASE_URL}/category/${id}`,
    
    // Orders
    ORDERS: `${API_BASE_URL}/orders`,
    ORDER_CREATE: `${API_BASE_URL}/orders/create`,
    ORDER_BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
};

// Common fetch wrapper with error handling
export const apiRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return { success: true, data };
    } catch (error) {
        console.error('API Request Error:', error);
        return { success: false, error: error.message };
    }
};

// Order API functions
export const orderAPI = {
    // Create a new order
    create: async (orderData) => {
        return await apiRequest(API_ENDPOINTS.ORDER_CREATE, {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    },

    // Get all orders
    getAll: async () => {
        return await apiRequest(API_ENDPOINTS.ORDERS);
    },

    // Get order by ID
    getById: async (id) => {
        return await apiRequest(API_ENDPOINTS.ORDER_BY_ID(id));
    },

    // Get orders by user email
    getByEmail: async (email) => {
        return await apiRequest(`${API_ENDPOINTS.ORDERS}?email=${encodeURIComponent(email)}`);
    },

    // Update order status
    updateStatus: async (id, status) => {
        return await apiRequest(API_ENDPOINTS.ORDER_BY_ID(id), {
            method: 'PUT',
            body: JSON.stringify({ orderStatus: status }),
        });
    },

    // Delete order
    delete: async (id) => {
        return await apiRequest(API_ENDPOINTS.ORDER_BY_ID(id), {
            method: 'DELETE',
        });
    },
};

// Product API functions
export const productAPI = {
    getAll: async () => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS);
    },

    getById: async (id) => {
        return await apiRequest(API_ENDPOINTS.PRODUCT_BY_ID(id));
    },
};

// Category API functions
export const categoryAPI = {
    getAll: async () => {
        return await apiRequest(API_ENDPOINTS.CATEGORIES);
    },

    getById: async (id) => {
        return await apiRequest(API_ENDPOINTS.CATEGORY_BY_ID(id));
    },
};

export default API_BASE_URL;
