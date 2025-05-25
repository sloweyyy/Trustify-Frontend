import axiosConfig from '../utils/axiosConfig';
import { API_BASE_URL } from './config';
import Cookies from 'js-cookie';
import TokenService from './token.service';
import UserService from './user.service';

const SESSION_ENDPOINT = `${API_BASE_URL}/session`;

const createSession = async (session) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/createSession`, session);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const getAllSessions = async (sortBy = null, limit, page) => {
  try {
    const response = await axiosConfig.get(`${SESSION_ENDPOINT}/getAllSessions`, {
      params: {
        sortBy,
        limit,
        page: page + 1,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const deleteUserOutOfSession = async (sessionId, email) => {
  try {
    const response = await axiosConfig.patch(`${SESSION_ENDPOINT}/deleteUser/${sessionId}`, { email });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const addUser = async (sessionId, emails) => {
  try {
    const response = await axiosConfig.patch(`${SESSION_ENDPOINT}/addUser/${sessionId}`, { emails });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const getSessionsByUserId = async () => {
  try {
    const response = await axiosConfig.get(`${SESSION_ENDPOINT}/getSessionsByUserId`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const uploadSessionDocument = async (sessionId, document) => {
  try {
    const sessionResponse = await axiosConfig.get(`${SESSION_ENDPOINT}/getSessionsByUserId`);
    const userSession = sessionResponse.data.results.find((session) => session._id === sessionId);

    if (!userSession) {
      return { status: 404, message: 'Session not found' };
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      return { status: 401, message: 'Access token is missing or invalid' };
    }
    const userId = TokenService.decodeToken(token).sub;
    const currentUser = await UserService.getUserById(userId);
    const isCreator = userSession.creator && userSession.creator.email === currentUser.email;

    if (!isCreator) {
      const currentUserInfo = userSession.users.find((user) => user.status === 'accepted');

      if (!currentUserInfo) {
        return { status: 403, message: 'You must accept the session invitation before uploading documents' };
      }
    }

    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/upload-session-document/${sessionId}`, document);
    return response.data;
  } catch (error) {
    return { status: error.response?.status, message: error.response?.data?.message };
  }
};

const joinSession = async (sessionId, action) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/joinSession/${sessionId}`, { action });
    return response.data;
  } catch (error) {
    return { status: error.response.status, message: error.response.data.message };
  }
};

const getSessionsByStatus = async ({ status, page, limit }) => {
  try {
    const response = await axiosConfig.get(`${SESSION_ENDPOINT}/get-sessions-by-status`, {
      params: { status, page, limit },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return error.message;
  }
};

const forwardSessionStatus = async (sessionId, formData) => {
  try {
    const response = await axiosConfig.patch(`${SESSION_ENDPOINT}/forward-session-status/${sessionId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const deleteSessionFile = async (sessionId, fileId) => {
  try {
    const response = await axiosConfig.delete(`${SESSION_ENDPOINT}/${sessionId}/files/${fileId}`);
    return response.data;
  } catch (error) {
    return { status: error.response.status, message: error.response.data.message };
  }
};

const approveSignatureSessionByUser = async (formData) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/approve-signature-session-by-user`, formData);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const approveSignatureSessionByNotary = async (sessionId) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/approve-signature-session-by-notary`, { sessionId });
    return response;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const sendSessionForNotarization = async (sessionId) => {
  try {
    const response = await axiosConfig.post(`${SESSION_ENDPOINT}/send-session-for-notarization/${sessionId}`);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    return { status, message };
  }
};

const SessionService = {
  createSession,
  getAllSessions,
  getSessionsByUserId,
  deleteUserOutOfSession,
  addUser,
  getSessionsByUserId,
  uploadSessionDocument,
  joinSession,
  deleteSessionFile,
  approveSignatureSessionByUser,
  getSessionsByStatus,
  forwardSessionStatus,
  approveSignatureSessionByNotary,
  sendSessionForNotarization,
};

export default SessionService;
