import api from '../api/axiosConfig';

export const createBackup = async () => {
  return await api.post('/Backup/create');
};
