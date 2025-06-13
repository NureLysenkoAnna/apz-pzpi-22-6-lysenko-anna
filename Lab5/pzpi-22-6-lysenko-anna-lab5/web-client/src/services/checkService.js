import api from '../api/axiosConfig';

export const getAllChecks = () => api.get('/checks');

export const getChecksByDate = (date) => api.get(`/checks/date/${date}`);

export const getChecksByResult = (result) => api.get(`/checks/result/${result}`);

export const getChecksBySensorId = (sensorId) => api.get(`/checks/sensor/${sensorId}`);

export const createCheck = (data) => api.post('/checks', data);

export const updateCheck = (id, data) => api.put(`/checks/${id}`, data);

export const deleteCheck = (id) => api.delete(`/checks/${id}`);

