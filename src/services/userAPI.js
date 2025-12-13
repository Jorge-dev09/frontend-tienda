import api from './axiosInstance';

const userAPI = {
  getProfile: () => api.get('/user/me'),
  updateProfile: (data) => api.put('/user/me', data),
  getSettings: () => api.get('/user/settings'),
  updateSettings: (data) => api.put('/user/settings', data),
};

export default userAPI;
