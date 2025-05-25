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

const NFTService = {
  getNFTMetadata,
};

export default NFTService;
