import { useState } from 'react';
import { calculateRequiredSensors } 
from '../services/locationService';

function SensorCalculationBlock() {
  const [locationId, setLocationId] = useState('');
  const [minRequired, setMinRequired] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = async () => {
    try {
      const res = await calculateRequiredSensors(locationId, minRequired);
      setResult(res.data.requiredSensors);
      setError('');
    } catch (e) {
      setError(e.response?.data?.Message || 'Помилка обчислення.');
      setResult(null);
    }
  };

  return (
    <div className="form-section">
      <h2>Обчислення кількості сенсорів</h2>

      {error && <div className="error">{error}</div>}
      {result !== null && (
        <p>Необхідна кількість сенсорів: <strong>{result}</strong></p>
      )}

      <div className="form-row">
        <label>ID локації</label>
        <input
          type="number"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Мінімально необхідна кількість (необов'язково)</label>
        <input
          type="number"
          value={minRequired}
          onChange={(e) => setMinRequired(e.target.value)}
        />
      </div>

      <button className="btn-primary calculate-btn" onClick={calculate}>Обчислити</button>
    </div>
  );
}

export default SensorCalculationBlock;
