import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';

/**
 * Get processing sessions and documents metrics
 * @returns {Promise<Object>} The metrics data
 */
const getProcessingMetrics = async () => {
  const response = await axiosConfig.get(`${API_BASE_URL}/notary/metrics/processing`);
  return response.data;
};

/**
 * Get digital signature sessions and documents metrics
 * @returns {Promise<Object>} The metrics data
 */
const getDigitalSignatureMetrics = async () => {
  const response = await axiosConfig.get(`${API_BASE_URL}/notary/metrics/digitalSignature`);
  return response.data;
};

/**
 * Get notary approvals metrics
 * @returns {Promise<Object>} The metrics data
 */
const getNotaryApprovals = async () => {
  const response = await axiosConfig.get(`${API_BASE_URL}/notary/metrics/notaryApprovals`);
  return response.data;
};

/**
 * Get acceptance rate metrics
 * @returns {Promise<Object>} The metrics data
 */
const getAcceptanceRate = async () => {
  const response = await axiosConfig.get(`${API_BASE_URL}/notary/metrics/acceptanceRate`);
  return response.data;
};

const notaryService = {
  getProcessingMetrics,
  getDigitalSignatureMetrics,
  getNotaryApprovals,
  getAcceptanceRate,
};

export default notaryService;
