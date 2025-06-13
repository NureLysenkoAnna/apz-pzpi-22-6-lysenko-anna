import { useEffect, useState } from 'react';
import Header from '../components/Header';
import SensorTable from '../components/SensorTable';
import SensorForm from '../components/SensorForm';
import '../styles/GlobalStyles.css';
import {
  getAllSensors,
  createSensor,
  updateSensor,
  deleteSensor
} from '../services/sensorService';
import { getAllLocations } from '../services/locationService';

function SensorsPage() {
  const [sensors, setSensors] = useState([]);
  const [editSensor, setEditSensor] = useState(null);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchAllSensors();
    fetchLocations();
  }, []);

  const fetchAllSensors = async () => {
    try {
      const response = await getAllSensors();
      setSensors(response.data);
    } catch (e) {
      setError('Не вдалося отримати сенсори.');
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await getAllLocations();
      setLocations(response.data);
    } catch (e) {
      console.error('Не вдалося отримати локації.');
    }
  };

  const locationMap = {};
  locations.forEach((loc) => {
    locationMap[loc.location_id] = loc.name;
  });

  const handleSubmit = async (data) => {
    try {
      const matchedLocation = locations.find(loc => loc.name === data.location_name);
      const location_id = matchedLocation ? matchedLocation.location_id : null;

      if (!location_id) {
        setError("Локацію не знайдено.");
        return;
      }

      const sensorToSend = {
        type: data.type,
        status: data.status,
        installation_date: data.installation_date,
        location_id: location_id
      };

      if (editSensor) {
        await updateSensor(editSensor.sensor_id, sensorToSend);
      } else {
        await createSensor(sensorToSend);
      }

      fetchAllSensors();
      resetForm();
    } catch (e) {
      setError('Помилка при збереженні сенсора.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSensor(id);
      fetchAllSensors();
    } catch (e) {
      setError('Помилка при видаленні сенсора.');
    }
  };

  const resetForm = () => setEditSensor(null);

  return (
    <div className="manager-container">
      <Header title="Панель адміністратора бізнес-логіки" role="LogicAdmin" />
      <h1 style={{ textAlign: 'center' }}>Встановлені сенсори</h1>

      <SensorForm onSubmit={handleSubmit} editSensor={editSensor} resetForm={resetForm} />

      {error && <p className="error">{error}</p>}

      <SensorTable
        sensors={sensors}
        onEdit={setEditSensor}
        onDelete={handleDelete}
        locationMap={locationMap}
      />
    </div>
  );
}

export default SensorsPage;
