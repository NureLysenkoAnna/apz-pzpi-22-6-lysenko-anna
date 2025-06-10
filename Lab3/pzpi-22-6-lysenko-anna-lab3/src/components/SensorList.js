function SensorList({ sensors, onShowChecks }) {
  if (sensors.length === 0) {
    return <p>Сенсори не знайдено.</p>;
  }

  return (
    <ul>
      {sensors.map((sensor) => (
        <li key={sensor.sensor_id} className="sensor-row">
          <span>
            <strong>{sensor.type}</strong> — статус: {sensor.status}
          </span>
          <button className="sensor-button" onClick={() => onShowChecks(sensor.sensor_id)}>
            Перевірки
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SensorList;
