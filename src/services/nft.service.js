import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';

const NFT_ENDPOINT = `${API_BASE_URL}/nft`;

/**
 * Get NFT metadata by mint address
 * @param {string} mintAddress - The mint address of the NFT
 * @returns {Promise} - The response from the API
 */
const getNFTMetadata = async (mintAddress) => {
  try {
    const response = await axiosConfig.get(`${NFT_ENDPOINT}/metadata/${mintAddress}`);
    return response.data;
  } catch (error) {
    console.log('NFT metadata error:', error);

    // Immediately return a standardized error response
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'NFT không tồn tại hoặc không hợp lệ',
      error: true,
    };
  }
};

/**
 * Check a file against the SHA-256 fingerprint recorded for a mint address.
 * The server only hashes the file; it does not store it.
 * @returns {Promise<{match: boolean|null, fileHash: string, recordedHash: string|null, notarizedAt: string|null}>}
 */
const verifyFile = async (mintAddress, file) => {
  const form = new FormData();
  form.append('mintAddress', mintAddress);
  form.append('file', file);
  const response = await axiosConfig.post(`${NFT_ENDPOINT}/verify-file`, form);
  return response.data;
};

const NFTService = {
  getNFTMetadata,
  verifyFile,
};

export default NFTService;
