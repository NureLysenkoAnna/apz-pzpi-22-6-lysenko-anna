import { useState } from 'react';
import { checkSensorOutdated } from '../services/sensorService';

function SensorUpdateChecker({ sensorId }) {
  const [lifetime, setLifetime] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = async () => {
    if (!lifetime) {
      setResult('Введіть рекомендований термін експлуатації.');
      return;
    }

    try {
      const response = await checkSensorOutdated(sensorId, lifetime);
      setResult(response.data);
    } catch {
      setResult('Не вдалося перевірити ресурс сенсора.');
    }
  };

  return (
    <div className="sensor-checker">
      <input
        type="number"
        placeholder="Роки експлуатації"
        value={lifetime}
        onChange={(e) => setLifetime(e.target.value)}
      />
      <button className="btn-check" onClick={handleCheck}>Перевірити</button>
      {result && <p className="check-result">{result}</p>}
    </div>
  );
}

export default SensorUpdateChecker;
