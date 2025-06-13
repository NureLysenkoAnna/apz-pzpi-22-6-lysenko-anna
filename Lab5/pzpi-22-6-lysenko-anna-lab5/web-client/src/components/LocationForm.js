import { useEffect, useState } from 'react';

function LocationForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    location_type: 'Residential',
    floor: '',
    area: ''
  });

  const locationTypes = ['Residential', 'Commercial', 'Industrial'];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        location_type: initialData.location_type || 'Residential',
        floor: initialData.floor || '',
        area: initialData.area || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      floor: Number(formData.floor),
      area: Number(formData.area)
    });
    if (!initialData) {
      setFormData({ name: '', location_type: 'Residential', floor: '', area: '' });
    }
  };

  return (
    <div className="sensor-form-wrapper">
      <form className="sensor-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Назва локації"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select
          name="location_type"
          value={formData.location_type}
          onChange={handleChange}
        >
          {locationTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          name="floor"
          type="number"
          placeholder="Поверх"
          value={formData.floor}
          onChange={handleChange}
        />
        <input
          name="area"
          type="number"
          placeholder="Площа (м²)"
          value={formData.area}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {initialData ? 'Оновити' : 'Додати'} локацію
          </button>
          {initialData && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                onCancel();
                setFormData({ name: '', location_type: 'Residential', floor: '', area: '' });
              }}
            >Скасувати</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LocationForm;