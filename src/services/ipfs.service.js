import axios from 'axios';

/**
 * Fetches the metadata JSON from IPFS and extracts the actual file URI
 * @param {string} metadataUrl - The URL to the metadata JSON
 * @returns {Promise<string>} - The URL to the actual file
 */
const getFileUrlFromMetadata = async (metadataUrl) => {
  try {
    const response = await axios.get(metadataUrl);
    const metadata = response.data;

    if (metadata.properties && metadata.properties.files && metadata.properties.files.length > 0) {
      return metadata.properties.files[0].uri;
    }

    if (metadata.image) {
      return metadata.image;
    }

    throw new Error('No file URI found in metadata');
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error;
  }
};

const IPFSService = {
  getFileUrlFromMetadata,
};

export default IPFSService;
