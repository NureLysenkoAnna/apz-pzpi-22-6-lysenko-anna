import Header from '../components/Header';
import LocationListBlock from '../components/LocationListBlock';
import SensorCalculationBlock from '../components/SensorCalculationBlock';
import '../styles/GlobalStyles.css';

function LogicAdminPanel() {
  return (
    <div className="manager-container">
      <Header title="Панель адміністратора бізнес-логіки" role="LogicAdmin" />
      <h1 style={{ textAlign: 'center' }}>Керування локаціями</h1>
      <LocationListBlock />
      <SensorCalculationBlock />
    </div>
  );
}

export default LogicAdminPanel;
