function SensorChecks({ sensorId, checks, onClose }) {
  return (
    <div className="monitor-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Перевірки для сенсора ID: {sensorId}</h2>
        <button className="close-button" onClick={onClose}>Закрити</button>
      </div>

      {checks.length === 0 ? (
        <p>Немає перевірок.</p>
      ) : (
        <ul>
          {checks.map((check) => {
            const parsedDate = new Date(check.check_time);
            const formatted = isNaN(parsedDate.getTime())
              ? "Invalid Date"
              : parsedDate.toLocaleString('uk-UA', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                });
            return (
              <li key={check.id}>
                {formatted} — {check.result}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SensorChecks;
