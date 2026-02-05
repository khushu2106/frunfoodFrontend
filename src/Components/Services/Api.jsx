import axios from 'axios';

// Base URL
const API = axios.create({
    baseURL: 'http://localhost:5000/api/delivery-boy'
});

// All delivery boy api 
export const getDashboardData = (id) => API.get(`/dashboard/${id}`);
export const getAssignedOrders = (id) => API.get(`/orders/${id}`);
export const updateStatus = (data) => API.put('/order-status', data);
export const updateOrderStatus = (orderId, status) => API.put('/order-status', { orderId, status });
export const getEarnings = (id) => API.get(`/earnings/${id}`);
export const toggleAvailability = (data) => API.put('/availability', data);

export default API;