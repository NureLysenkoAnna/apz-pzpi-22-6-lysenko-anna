import { useState } from 'react';
import { getAllLocations, getLocationsByType } from '../services/locationService';

function LocationListBlock() {
  const [type, setType] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const res = await getAllLocations();
      setLocations(res.data);
      setError('');
    } catch (e) {
      setError('Помилка отримання локацій.');
    }
  };

  const fetchByType = async () => {
    try {
      const res = await getLocationsByType(type);
      setLocations(res.data);
      setError('');
    } catch (e) {
      setError('Локації не знайдені або сталася помилка.');
    }
  };

  return (
    <div className="list-section">
      <h2>Список локацій</h2>

      {error && <div className="error">{error}</div>}

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Тип локації"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button className="btn-primary" onClick={fetchByType}>Знайти за типом</button>
        <button className="btn-secondary" onClick={fetchAll}>Показати всі</button>
      </div>

      {locations.length > 0 && (
        <table className="resident-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Тип</th>
              <th>Поверх</th>
              <th>Площа (м²)</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(loc => (
              <tr key={loc.location_id}>
                <td>{loc.location_id}</td>
                <td>{loc.name}</td>
                <td>{loc.location_type}</td>
                <td>{loc.floor}</td>
                <td>{loc.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LocationListBlock;