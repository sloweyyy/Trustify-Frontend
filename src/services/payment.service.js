import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';

const PAYMENT_ENDPOINT = `${API_BASE_URL}/payments`;

/**
 * Update the payment status in the database
 * @param {string} orderCode - The order code of the payment
 * @param {string} status - The status of the payment (PAID or CANCELLED)
 * @returns {Promise} - The response from the API
 */
const updatePaymentStatus = async (orderCode, status) => {
  try {
    const response = await axiosConfig.put(`${PAYMENT_ENDPOINT}/handle-payment-callback/${orderCode}`, { status });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update payment status');
    }
    throw new Error('Network error while updating payment status');
  }
};

/**
 * List the current user's payments, optionally filtered by status (pending, success, failed, cancelled)
 */
const getMyPayments = async (status) => {
  const response = await axiosConfig.get(`${PAYMENT_ENDPOINT}/my-payments`, { params: status ? { status } : {} });
  return response.data;
};

const PaymentService = {
  updatePaymentStatus,
  getMyPayments,
};

export default PaymentService;
