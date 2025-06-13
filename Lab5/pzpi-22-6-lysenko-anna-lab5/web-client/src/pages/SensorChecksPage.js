import { useEffect, useState } from 'react';
import Header from '../components/Header';
import SensorCheckForm from '../components/SensorCheckForm';
import SensorCheckTable from '../components/SensorCheckTable';
import SensorCheckFilters from '../components/SensorCheckFilters';
import '../styles/GlobalStyles.css';

import {
  getAllChecks,
  getChecksBySensorId,
  getChecksByResult,
  getChecksByDate,
  createCheck,
  updateCheck,
  deleteCheck
} from '../services/checkService';

function SensorChecksPage() {
  const [checks, setChecks] = useState([]);
  const [formData, setFormData] = useState({
    sensor_id: '',
    check_date: '',
    check_time: '',
    result: ''
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState({ sensorId: '', result: '', date: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllChecks();
  }, []);

  const fetchAllChecks = async () => {
    try {
      const res = await getAllChecks();
      setChecks(res.data);
    } catch (e) {
      setError('Не вдалося завантажити перевірки.');
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const fullDateTime = new Date(`${formData.check_date}T${formData.check_time}`);
      const requestData = {
        sensor_id: formData.sensor_id,
        check_date: fullDateTime.toISOString(),
        result: formData.result,
      };

      if (editId) {
        await updateCheck(editId, requestData);
      } else {
        await createCheck(requestData);
      }

      fetchAllChecks();
      resetForm();
    } catch (e) {
      setError('Помилка при збереженні.');
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити перевірку?')) return;
    try {
      await deleteCheck(id);
      fetchAllChecks();
    } catch (e) {
      setError('Не вдалося видалити перевірку.');
    }
  };

  const handleEdit = (check) => {
    setEditId(check.check_id);
    setFormData({
      sensor_id: check.sensor_id,
      check_date: check.check_date.split('T')[0],
      check_time: check.check_time,
      result: check.result
    });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      sensor_id: '',
      check_date: '',
      check_time: '',
      result: ''
    });
  };

  const searchBySensor = async () => {
    if (!search.sensorId) return;
    try {
      const res = await getChecksBySensorId(search.sensorId);
      setChecks(res.data);
    } catch {
      setError('Перевірки для вказаного сенсора не знайдено.');
    }
  };

  const searchByResult = async () => {
    if (!search.result) return;
    try {
      const res = await getChecksByResult(search.result);
      setChecks(res.data);
    } catch {
      setError('Перевірки за результатом не знайдено.');
    }
  };

  const searchByDate = async () => {
    if (!search.date) return;
    try {
      const res = await getChecksByDate(search.date);
      setChecks(res.data);
    } catch {
      setError('Перевірки за датою не знайдено.');
    }
  };

  const resetSearch = () => {
    setSearch({ sensorId: '', result: '', date: '' });
    fetchAllChecks();
  };

  return (
    <div className="manager-container">
      <Header title="Панель адміністратора бізнес-логіки" role="LogicAdmin" />

      <SensorCheckForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateOrUpdate}
        isEditing={!!editId}
        onCancel={resetForm}
      />

      {error && <div className="error">{error}</div>}

      <h1>Перевірки сенсорів</h1>

      <SensorCheckFilters
        search={search}
        setSearch={setSearch}
        onSearch={{ sensor: searchBySensor, result: searchByResult, date: searchByDate }}
        onReset={resetSearch}
      />

      <SensorCheckTable
        checks={checks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default SensorChecksPage;