import { useState, useEffect } from 'react';
import '../styles/GlobalStyles.css';

function SensorForm({ onSubmit, editSensor, resetForm }) {
  const [formData, setFormData] = useState({
    type: '',
    status: '',
    location_name: '',
    installation_date: ''
  });

  useEffect(() => {
    if (editSensor) {
      setFormData({
        type: editSensor.type || '',
        status: editSensor.status || '',
        location_name: editSensor.location?.name || '',
        installation_date: editSensor.installation_date?.slice(0, 10) || ''
      });
    } else {
      setFormData({
        type: '',
        status: '',
        location_name: '',
        installation_date: ''
      });
    }
  }, [editSensor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="sensor-form-wrapper">
      <h2>{editSensor ? 'Редагування сенсора' : 'Додавання нового сенсора'}</h2>
      <p style={{ marginBottom: '1rem', color: '#555' }}>
        {editSensor
          ? 'Внесіть зміни до полів та натисніть "Оновити".'
          : 'Заповніть форму, щоб додати новий сенсор.'}
      </p>

      <form onSubmit={handleSubmit} className="sensor-form">
        <input
          name="type"
          placeholder="Тип (наприклад, Detector)"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          name="status"
          placeholder="Статус (наприклад, activate)"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <input
          name="location_name"
          placeholder="Локація (назва)"
          value={formData.location_name}
          onChange={handleChange}
          required
        />
        <input
          name="installation_date"
          type="date"
          value={formData.installation_date}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editSensor ? 'Оновити' : 'Додати'}
          </button>
          {editSensor && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setFormData({
                  type: '',
                  status: '',
                  location_name: '',
                  installation_date: ''
                });
                resetForm();
              }}
            >
              Скасувати
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SensorForm;
