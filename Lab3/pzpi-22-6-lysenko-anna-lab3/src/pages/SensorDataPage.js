import { useEffect, useState } from 'react';
import Header from '../components/Header';
import SensorDataTable from '../components/SensorDataTable';
import { getAllSensorData } from '../services/sensorDataService';
import '../styles/GlobalStyles.css';

function SensorDataPage() {
  const [sensorDataList, setSensorDataList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllSensorData();
  }, []);

  const fetchAllSensorData = async () => {
    try {
      const response = await getAllSensorData();
      setSensorDataList(response.data);
    } catch {
      setError('Не вдалося отримати дані з сенсорів.');
    }
  };

  return (
    <div className="manager-container">
      <Header title="Панель адміністратора бізнес-логіки" role="LogicAdmin" />
      <h1>Сенсорні дані</h1>
      {error && <p className="error">{error}</p>}
      <SensorDataTable dataList={sensorDataList} />
    </div>
  );
}

export default SensorDataPage;