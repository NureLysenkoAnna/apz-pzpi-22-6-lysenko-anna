import { useState, useEffect } from 'react';

function ResidentForm({ formMode, onSubmit, onCancel, initialData, error, locations }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locationId, setLocationId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.user_name);
      setEmail(initialData.email);
      setPassword('');
      setLocationId(initialData.location_id?.toString() || '');
      setPhoneNumber(initialData.phone_number || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, password, locationId, phoneNumber });
  };

  return (
    <form className="resident-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="form-row">
        <label>Ім'я</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Пароль {formMode === 'edit' && '(опціонально)'}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Телефон</label>
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Локація</label>
        <select 
          value={locationId} 
          onChange={(e) => setLocationId(e.target.value)} 
          required
        >
          <option value="">Виберіть локацію</option>
          {locations.map((location) => (
            <option key={location.location_id} value={location.location_id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">
          {formMode === 'add' ? 'Додати' : 'Оновити'}
        </button>
        {formMode === 'edit' && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Скасувати
          </button>
        )}
      </div>
    </form>
  );
}

export default ResidentForm;