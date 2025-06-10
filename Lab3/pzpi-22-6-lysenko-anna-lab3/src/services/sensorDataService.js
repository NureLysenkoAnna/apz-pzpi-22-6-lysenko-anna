import api from '../api/axiosConfig';

export const getAllSensorData = () => api.get('/data');
