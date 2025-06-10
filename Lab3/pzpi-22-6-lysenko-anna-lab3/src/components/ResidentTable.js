function ResidentTable({ residents, locations, onEdit, onDelete }) {
  const getLocationName = (locationId) => {
    const location = locations.find(loc => loc.location_id === locationId);
    return location ? location.name : `ID: ${locationId}`;
  };

  return (
    <table className="resident-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Ім'я</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Локація</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {residents.map((res) => (
          <tr key={res.user_id}>
            <td>{res.user_id}</td>
            <td>{res.user_name}</td>
            <td>{res.email}</td>
            <td>{res.phone_number || '—'}</td>
            <td>{getLocationName(res.location_id)}</td>
            <td className="action-buttons">
              <button className="btn-edit" onClick={() => onEdit(res)}>
                Редагувати
              </button>
              <button className="btn-delete" onClick={() => onDelete(res.user_id)}>
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResidentTable;