function UserTable({ users, onEdit, onDelete, locations }) {
  const getLocationName = (id) => {
    const loc = locations.find((l) => l.location_id === id);
    return loc ? loc.name : '—';
  };

  return (
    <div className="monitor-section">
      <h2>Список користувачів</h2>
      <table className="resident-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ім’я</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Роль</th>
            <th>Локація</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.user_name}</td>
              <td>{u.email}</td>
              <td>{u.phone_number}</td>
              <td>{u.role}</td>
              <td>{getLocationName(u.location_id)}</td>
              <td className="action-buttons">
                <button className="btn-edit" onClick={() => onEdit(u)}>Редагувати</button>
                <button className="btn-delete" onClick={() => onDelete(u.user_id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
