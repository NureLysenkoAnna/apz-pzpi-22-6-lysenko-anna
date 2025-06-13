import { useState } from 'react';
import '../styles/GlobalStyles.css';
import Header from '../components/Header';
import MonitorBlock from '../components/MonitorBlock';
import { getLocationsByType } from '../services/locationService';
import { getSensorsByStatus, getSensorsByLocation } from '../services/sensorService';
import { getChecksByDate, getChecksByResult } from '../services/checkService';

function ManagerMonitoring() {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [locationId, setLocationId] = useState('');

  const [locations, setLocations] = useState([]);
  const [sensorsByStatus, setSensorsByStatus] = useState([]);
  const [sensorsByLocation, setSensorsByLocation] = useState([]);
  const [checksByDate, setChecksByDate] = useState([]);
  const [checksByResult, setChecksByResult] = useState([]);

  const [showLocations, setShowLocations] = useState(false);
  const [showSensorsByStatus, setShowSensorsByStatus] = useState(false);
  const [showSensorsByLocation, setShowSensorsByLocation] = useState(false);
  const [showChecksByDate, setShowChecksByDate] = useState(false);
  const [showChecksByResult, setShowChecksByResult] = useState(false);

  const [notFoundMsg, setNotFoundMsg] = useState('');

  const handleNotFound = (msgSetter, showSetter, dataSetter, msg) => {
    msgSetter(msg);
    showSetter(true);
    dataSetter([]);
  };

  const fetchLocationsByType = async () => {
    try {
      const res = await getLocationsByType(type);
      setLocations(res.data);
      setShowLocations(true);
      setNotFoundMsg('');
    } catch (e) {
      console.error('Помилка отримання локацій:', e);
      handleNotFound(setNotFoundMsg, setShowLocations, setLocations, 'Локації не знайдено.');
    }
  };

  const fetchSensorsByStatus = async () => {
    try {
      const res = await getSensorsByStatus(status);
      setSensorsByStatus(res.data);
      setShowSensorsByStatus(true);
      setNotFoundMsg('');
    } catch (e) {
      console.error('Помилка отримання сенсорів за статусом:', e);
      handleNotFound(setNotFoundMsg, setShowSensorsByStatus, setSensorsByStatus, 'Сенсори не знайдено.');
    }
  };

  const fetchSensorsByLocation = async () => {
    try {
      const res = await getSensorsByLocation(locationId);
      setSensorsByLocation(res.data);
      setShowSensorsByLocation(true);
      setNotFoundMsg('');
    } catch (e) {
      console.error('Помилка отримання сенсорів за локацією:', e);
      handleNotFound(setNotFoundMsg, setShowSensorsByLocation, setSensorsByLocation, 'Сенсори за локацією не знайдено.');
    }
  };

  const fetchChecksByDate = async () => {
    try {
      const res = await getChecksByDate(date);
      setChecksByDate(res.data);
      setShowChecksByDate(true);
    } catch (e) {
      console.error('Помилка отримання перевірок за датою:', e);
      handleNotFound(setNotFoundMsg, setShowChecksByDate, setChecksByDate, 'Перевірки не знайдено.');
    }
  };

  const fetchChecksByResult = async () => {
    try {
      const res = await getChecksByResult(result);
      setChecksByResult(res.data);
      setShowChecksByResult(true);
    } catch (e) {
      console.error('Помилка отримання перевірок за результатом:', e);
      handleNotFound(setNotFoundMsg, setShowChecksByResult, setChecksByResult, 'Перевірки за результатом не знайдено.');
    }
  };

  return (
    <div className="monitor-page">
      <Header title="Панель моніторингу" role="Manager" />
      <h1>Моніторинг системи</h1>

      <MonitorBlock
        title="Локації за типом"
        placeholder="Тип локації"
        value={type}
        onChange={(e) => setType(e.target.value)}
        onSearch={fetchLocationsByType}
        onClear={() => setShowLocations(false)}
        show={showLocations}
        data={locations}
        renderItem={(loc) => <li key={loc.location_id}>{loc.name}</li>}
      />

      <MonitorBlock
        title="Сенсори за статусом"
        placeholder="Статус"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        onSearch={fetchSensorsByStatus}
        onClear={() => setShowSensorsByStatus(false)}
        show={showSensorsByStatus}
        data={sensorsByStatus}
        renderItem={(s) => <li key={s.sensor_id}>{s.type} — {s.status}</li>}
      />

      <MonitorBlock
        title="Сенсори за локацією"
        placeholder="ID локації"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        onSearch={fetchSensorsByLocation}
        onClear={() => setShowSensorsByLocation(false)}
        show={showSensorsByLocation}
        data={sensorsByLocation}
        renderItem={(s) => <li key={s.sensor_id}>{s.type} — {s.status}</li>}
      />

      <MonitorBlock
        title="Перевірки за датою"
        placeholder="Дата"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onSearch={fetchChecksByDate}
        onClear={() => setShowChecksByDate(false)}
        show={showChecksByDate}
        data={checksByDate}
        renderItem={(c) => (
          <li key={c.id}>
            {new Date(c.check_date).toLocaleString('uk-UA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} — {c.result}
          </li>
        )}
        type="date"
      />

      <MonitorBlock
        title="Перевірки за результатом"
        placeholder="Результат (OK/FAIL)"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        onSearch={fetchChecksByResult}
        onClear={() => setShowChecksByResult(false)}
        show={showChecksByResult}
        data={checksByResult}
        renderItem={(c) => (
          <li key={c.id}>
            {new Date(c.check_date).toLocaleString('uk-UA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })} — {c.result}
          </li>
        )}
      />
    </div>
  );
}

export default ManagerMonitoring;