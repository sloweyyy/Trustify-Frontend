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
      throw error.response.data.message || 'Failed to update payment status';
    }
    throw new Error('Network error while updating payment status');
  }
};

const PaymentService = {
  updatePaymentStatus,
};

export default PaymentService;
