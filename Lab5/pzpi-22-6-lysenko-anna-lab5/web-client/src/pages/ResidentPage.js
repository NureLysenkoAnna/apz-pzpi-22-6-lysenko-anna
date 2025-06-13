import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import SensorList from '../components/SensorList';
import SensorChecks from '../components/SensorChecks';
import '../styles/GlobalStyles.css';
import { getSensorsByLocation } from '../services/sensorService';
import { getChecksBySensorId } from '../services/checkService';

function ResidentPage() {
  const [locationId, setLocationId] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [selectedSensorChecks, setSelectedSensorChecks] = useState([]);
  const [selectedSensorId, setSelectedSensorId] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const locId = decoded.location_id;
        if (!locId) {
          setError("Ваш обліковий запис не закріплено за жодною локацією.");
          return;
        }
        setLocationId(locId);
        fetchSensors(locId);
      } catch (e) {
        console.error('JWT decode error:', e);
        setError('Помилка визначення локації користувача.');
      }
    }
  }, [token]);

  const fetchSensors = async (locId) => {
    try {
      const response = await getSensorsByLocation(locId);
      setSensors(response.data);
    } catch (e) {
      console.error('Помилка отримання сенсорів:', e);
      setError('Не вдалося отримати сенсори.');
    }
  };

  const fetchSensorChecks = async (sensorId) => {
    try {
      const response = await getChecksBySensorId(sensorId);
      setSelectedSensorId(sensorId);
      setSelectedSensorChecks(response.data);
    } catch (e) {
      console.error('Помилка отримання перевірок:', e);
      setError(`Не вдалося отримати перевірки для сенсора ${sensorId}`);
      setSelectedSensorChecks([]);
    }
  };

  const handleCloseChecks = () => {
    setSelectedSensorId(null);
    setSelectedSensorChecks([]);
  };

  return (
    <div className="monitor-page">
      <Header title="Головна сторінка мешканця" role="Resident" />
      <h1>Сенсори вашої локації</h1>

      {error && <div className="error">{error}</div>}

      <div className="monitor-section">
        <SensorList sensors={sensors} onShowChecks={fetchSensorChecks} />
      </div>

      {selectedSensorId && (
        <SensorChecks
          sensorId={selectedSensorId}
          checks={selectedSensorChecks}
          onClose={handleCloseChecks}
        />
      )}
    </div>
  );
}

export default ResidentPage;