import React, { useState } from 'react';
import SensorUpdateChecker from './SensorUpdateChecker';

function SensorTable({ sensors, onEdit, onDelete, locationMap }) {
  const [expandedSensorId, setExpandedSensorId] = useState(null);

  const toggleChecker = (id) => {
    setExpandedSensorId(expandedSensorId === id ? null : id);
  };

  return (
    <table className="resident-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Тип</th>
          <th>Статус</th>
          <th>Локація</th>
          <th>Дата встановлення</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {sensors.map((sensor) => (
          <React.Fragment key={sensor.sensor_id}>
            <tr>
              <td>{sensor.sensor_id}</td>
              <td>{sensor.type}</td>
              <td>{sensor.status}</td>
              <td>{locationMap[sensor.location_id] || 'Невідомо'}</td>
              <td>{new Date(sensor.installation_date).toLocaleDateString('uk-UA')}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-edit" onClick={() => onEdit(sensor)}>Редагувати</button>
                  <button className="btn-delete" onClick={() => onDelete(sensor.sensor_id)}>Видалити</button>
                  <button className="btn-check-toggle" onClick={() => toggleChecker(sensor.sensor_id)}>
                    {expandedSensorId === sensor.sensor_id ? '✖' : 'Перевірити'}
                  </button>
                </div>
              </td>
            </tr>
            {expandedSensorId === sensor.sensor_id && (
              <tr>
                <td colSpan="6">
                    <div className="sensor-checker-wrapper">
                    <SensorUpdateChecker sensorId={sensor.sensor_id} />
                    </div>
                </td>
            </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default SensorTable;
