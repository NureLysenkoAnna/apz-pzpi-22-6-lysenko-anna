import api from '../api/axiosConfig';

export const getAllLocations = () => api.get('/locations');

export const getLocationsByType = (type) => api.get(`/locations/type/${type}`);

export const createLocation = (data) => api.post('/locations', data);

export const updateLocation = (id, data) => api.put(`/locations/${id}`, data);

export const deleteLocation = (id) => api.delete(`/locations/${id}`);

export const calculateRequiredSensors = (locationId, minRequired) =>
  api.get(`/locations/calculate_sensors/${locationId}`, {
    params: { minRequiredSensors: minRequired || null }
  });