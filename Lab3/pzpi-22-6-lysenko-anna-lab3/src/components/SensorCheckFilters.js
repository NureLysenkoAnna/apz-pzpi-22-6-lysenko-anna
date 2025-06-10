import '../styles/ManagerDashboard.css';

function SensorCheckFilters({ search, setSearch, onSearch, onReset }) {
  return (
    <div className="filters">
      <input
        placeholder="ID сенсора"
        value={search.sensorId}
        onChange={(e) => setSearch({ ...search, sensorId: e.target.value })}
      />
      <button onClick={onSearch.sensor}>Пошук</button>

      <input
        placeholder="Результат (Success/Failed)"
        value={search.result}
        onChange={(e) => setSearch({ ...search, result: e.target.value })}
      />
      <button onClick={onSearch.result}>Пошук</button>

      <input
        type="date"
        value={search.date}
        onChange={(e) => setSearch({ ...search, date: e.target.value })}
      />
      <button onClick={onSearch.date}>Пошук</button>

      <button onClick={onReset}>Скинути</button>
    </div>
  );
}

export default SensorCheckFilters;
