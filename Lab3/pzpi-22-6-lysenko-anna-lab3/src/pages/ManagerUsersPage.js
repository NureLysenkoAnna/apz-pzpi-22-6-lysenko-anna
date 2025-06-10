import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import ResidentForm from '../components/ResidentForm';
import ResidentTable from '../components/ResidentTable';
import '../styles/GlobalStyles.css';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { getAllLocations } from '../services/locationService';

function ManagerUsersPage() {
  const [residents, setResidents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState('add');
  const [currentResident, setCurrentResident] = useState(null);

  const fetchAllResidents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllUsers();
      const onlyResidents = response.data.filter(user => user.role === 'Resident');
      setResidents(onlyResidents);
    } catch (err) {
      console.error(err);
      setError('Не вдалося завантажити список мешканців.');
    } finally {
      setLoading(false);
    }
  };

  const fetchResidentialLocations = async () => {
    try {
      const response = await getAllLocations();
      const residentialLocations = response.data.filter(location => location.location_type === 'Residential');
      setLocations(residentialLocations);
    } catch (err) {
      console.error('Помилка завантаження локацій:', err);
      setError('Не вдалося завантажити список локацій.');
    }
  };

  useEffect(() => {
    fetchAllResidents();
    fetchResidentialLocations();
  }, []);

  const resetForm = () => {
    setCurrentResident(null);
    setFormMode('add');
    setError('');
  };

  const handleAddOrUpdate = async ({ name, email, password, locationId, phoneNumber }) => {
    if (!name || !email || !locationId) {
      setError('Заповніть обов’язкові поля.');
      return;
    }
    try {
      const user = {
        user_name: name.trim(),
        email: email.trim(),
        role: 'Resident',
        location_id: Number(locationId),
        phone_number: phoneNumber?.trim() || null
      };
      if (formMode === 'edit' && currentResident) {
        if (password?.trim()) user.password = password;
        await updateUser(currentResident.user_id, user);
      } else {
        user.password = password;
        await createUser(user);
      }
      resetForm();
      fetchAllResidents();
    } catch (err) {
      console.error('Помилка:', err);
      setError(err.response?.data?.message || 'Помилка сервера.');
    }
  };

  const handleEditClick = (resident) => {
    setFormMode('edit');
    setCurrentResident(resident);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цього мешканця?')) return;
    try {
      await deleteUser(id);
      fetchAllResidents();
    } catch (err) {
      console.error('Помилка видалення мешканця:', err);
      setError('Не вдалося видалити мешканця.');
    }
  };

  return (
    <div className="manager-container">
      <Header title="Панель управління мешканцями" role="Manager" />
      <section className="form-section">
        <h2>{formMode === 'add' ? 'Додати нового мешканця' : 'Редагувати мешканця'}</h2>
        <ResidentForm
          formMode={formMode}
          initialData={currentResident}
          onSubmit={handleAddOrUpdate}
          onCancel={resetForm}
          error={error}
          locations={locations}
        />
      </section>
      <section className="list-section">
        <h2>Список мешканців</h2>
        {loading ? <p>Завантаження...</p> : 
          <ResidentTable 
            residents={residents}
            locations={locations}
            onEdit={handleEditClick} 
            onDelete={handleDelete} 
          />
        }
      </section>
    </div>
  );
}

export default ManagerUsersPage;