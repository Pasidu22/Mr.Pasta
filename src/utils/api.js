/**
 * API utility for communicating with the Mr. Pasta Node/MongoDB backend.
 */

const API_BASE = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
    : '/api';

export const api = {
    // User Sync & Profile
    syncUser: async (userData) => {
        const response = await fetch(`${API_BASE}/users/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    getUser: async (userId) => {
        const response = await fetch(`${API_BASE}/users/${userId}`);
        if (response.status === 404) return null;
        return response.json();
    },

    // Cart
    updateCart: async (userId, cart) => {
        const response = await fetch(`${API_BASE}/users/${userId}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart })
        });
        return response.json();
    },

    // Favorites
    updateFavorites: async (userId, favorites) => {
        const response = await fetch(`${API_BASE}/users/${userId}/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favorites })
        });
        return response.json();
    },

    // Orders
    getOrders: async (userId) => {
        const response = await fetch(`${API_BASE}/orders/${userId}`);
        return response.json();
    },

    createOrder: async (orderData) => {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || err.message || 'Failed to create order');
        }
        return response.json();
    },

    // Admin: Get all orders
    getAllOrders: async () => {
        const response = await fetch(`${API_BASE}/admin/orders`);
        return response.json();
    },

    updateOrderStatus: async (orderId, status) => {
        const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return response.json();
    },

    // Products
    getProducts: async () => {
        const response = await fetch(`${API_BASE}/products`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || err.message || 'Failed to fetch products');
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    },

    addProduct: async (productData) => {
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            let errorMsg = 'Failed to add product';
            try {
                const err = await response.json();
                errorMsg = err.error || err.message || errorMsg;
            } catch (e) {
                if (response.status === 413) errorMsg = 'Image file is too large for the server';
            }
            throw new Error(errorMsg);
        }
        return response.json();
    },

    updateProduct: async (productId, productData) => {
        const response = await fetch(`${API_BASE}/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            let errorMsg = 'Failed to update product';
            try {
                const err = await response.json();
                errorMsg = err.error || err.message || errorMsg;
            } catch (e) {
                if (response.status === 413) errorMsg = 'Image file is too large for the server';
            }
            throw new Error(errorMsg);
        }
        return response.json();
    },

    deleteProduct: async (productId) => {
        const response = await fetch(`${API_BASE}/products/${productId}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    rateProduct: async (productId, rating) => {
        const response = await fetch(`${API_BASE}/products/${productId}/rate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating })
        });
        return response.json();
    },

    // Settings
    getSettings: async () => {
        const response = await fetch(`${API_BASE}/settings`);
        return response.json();
    },

    updateSettings: async (settingsData) => {
        const response = await fetch(`${API_BASE}/settings`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settingsData)
        });
        return response.json();
    },

    seedDatabase: async () => {
        const response = await fetch(`${API_BASE}/admin/seed`, {
            method: 'POST'
        });
        return response.json();
    },

    // OTP Auth
    sendOTP: async (identifier, type, requireUser = false, preventDuplicate = false) => {
        const response = await fetch(`${API_BASE}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, type, requireUser, preventDuplicate })
        });
        return response.json();
    },

    verifyOTP: async (identifier, code, profileData) => {
        const response = await fetch(`${API_BASE}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, code, profileData })
        });
        return response.json();
    }
};
