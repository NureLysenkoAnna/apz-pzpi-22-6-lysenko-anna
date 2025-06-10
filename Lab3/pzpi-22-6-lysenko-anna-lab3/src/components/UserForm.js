import { useEffect, useState } from 'react';

function UserForm({ onSubmit, initialData, onCancel, locations = [] }) {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'Resident',
    location_id: ''
  });

  const roles = ['Admin', 'Manager', 'LogicAdmin', 'DBAdmin', 'Resident'];

  useEffect(() => {
    if (initialData) {
      setFormData({
        user_name: initialData.user_name || '',
        email: initialData.email || '',
        phone_number: initialData.phone_number || '',
        password: '',
        role: initialData.role || 'Resident',
        location_id: initialData.location_id || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        user_name: '',
        email: '',
        phone_number: '',
        password: '',
        role: 'Resident',
        location_id: ''
      });
    }
  };

  return (
    <div className="sensor-form-wrapper">
      <form className="sensor-form" onSubmit={handleSubmit}>
        <input
          name="user_name"
          placeholder="Ім’я"
          value={formData.user_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone_number"
          placeholder="Телефон"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder={initialData ? 'Змінити пароль (не обов’язково)' : 'Пароль'}
          value={formData.password}
          onChange={handleChange}
          required={!initialData}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          name="location_id"
          value={formData.location_id}
          onChange={handleChange}
        >
          <option value="">Оберіть локацію</option>
          {locations.map((loc) => (
            <option key={loc.location_id} value={loc.location_id}>
              {loc.name}
            </option>
          ))}
        </select>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {initialData ? 'Оновити' : 'Додати'}
          </button>
          {initialData && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                onCancel();
                setFormData({
                  user_name: '',
                  email: '',
                  phone_number: '',
                  password: '',
                  role: 'Resident',
                  location_id: ''
                });
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

export default UserForm;
