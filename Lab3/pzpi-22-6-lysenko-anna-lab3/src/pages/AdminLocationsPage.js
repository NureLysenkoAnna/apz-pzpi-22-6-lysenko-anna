import { useEffect, useState } from 'react';
import Header from '../components/Header';
import LocationForm from '../components/LocationForm';
import LocationTable from '../components/LocationTable';
import {
  getAllLocations,
  updateLocation,
  createLocation,
  deleteLocation
} from '../services/locationService';

function AdminLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [editLocation, setEditLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await getAllLocations();
      setLocations(res.data);
    } catch (err) {
      console.error('Помилка при завантаженні локацій:', err);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editLocation) {
        await updateLocation(editLocation.location_id, data);
      } else {
        await createLocation(data);
      }
      setEditLocation(null);
      fetchLocations();
    } catch (err) {
      console.error('Помилка при збереженні локації:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю локацію?')) {
      await deleteLocation(id);
      fetchLocations();
    }
  };

  return (
    <div className="monitor-page">
      <Header title="Панель адміністратора системи" role="Admin" />
      <h1>Керування локаціями</h1>
      <LocationForm
        onSubmit={handleSubmit}
        initialData={editLocation}
        onCancel={() => setEditLocation(null)}
      />
      <LocationTable
        locations={locations}
        onEdit={setEditLocation}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminLocationsPage;