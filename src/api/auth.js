import { apiPost } from './apiClient.js';

export const signup = async (userData) => {
  return await apiPost('/api/users/', userData);
};

export const login = async (credentials) => {
  return await apiPost('/api/users/login', credentials);
};

export const verifyOtp = async (otpData) => {
  return await apiPost('/api/users/verify-otp', otpData);
};

export const resendOtp = async (email) => {
  return await apiPost('/api/users/resend-otp', { email });
};

export const changePassword = async (passwordData) => {
  return await apiPost('/api/users/change-password', passwordData);
};

export const requestPasswordReset = async (email) => {
  return await apiPost('/api/users/reset-password/request', { email });
};

export const performPasswordReset = async (resetData) => {
  return await apiPost('/api/users/reset-password/perform', resetData);
};