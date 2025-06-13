import api from '../api/axiosConfig';

export const getSensorsByStatus = (status) => api.get(`/sensors/status/${status}`);

export const getSensorsByLocation = (locationId) => api.get(`/sensors/location/${locationId}`);

export const getAllSensors = () => api.get('/sensors');

export const createSensor = (data) => api.post('/sensors', data);

export const updateSensor = (id, data) => api.put(`/sensors/${id}`, data);

export const deleteSensor = (id) => api.delete(`/sensors/${id}`);

export const checkSensorOutdated = (sensorId, recommendedLifetime) =>
  api.get(`/sensors/outdated_check/${sensorId}`, {
    params: { recommendedLifetime },
  });
