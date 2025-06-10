import '../styles/GlobalStyles.css';

function SensorCheckForm({ formData, setFormData, onSubmit, isEditing, onCancel }) {
  return (
    <div>
      <h2>{isEditing ? 'Редагування перевірки' : 'Нова перевірка'}</h2>
      <div className="sensor-check-form">
        <input
          placeholder="ID сенсора"
          value={formData.sensor_id}
          onChange={(e) => setFormData({ ...formData, sensor_id: e.target.value })}
        />
        <input
          type="date"
          value={formData.check_date}
          onChange={(e) => setFormData({ ...formData, check_date: e.target.value })}
        />
        <input
          type="time"
          value={formData.check_time}
          onChange={(e) => setFormData({ ...formData, check_time: e.target.value })}
        />
        <input
          placeholder="Результат (Success/Failed)"
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
        />
        <button onClick={onSubmit}>{isEditing ? 'Оновити' : 'Додати'}</button>
        {isEditing && <button onClick={onCancel}>Скасувати</button>}
      </div>
    </div>
  );
}

export default SensorCheckForm;

