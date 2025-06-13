function LocationTable({ locations, onEdit, onDelete }) {
  return (
    <div className="monitor-section">
      <h2>Список локацій</h2>
      <table className="resident-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Тип</th>
            <th>Поверх</th>
            <th>Площа (м²)</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.location_id}>
              <td>{loc.location_id}</td>
              <td>{loc.name}</td>
              <td>{loc.location_type}</td>
              <td>{loc.floor}</td>
              <td>{loc.area}</td>
              <td className="action-buttons">
                <button className="btn-edit" onClick={() => onEdit(loc)}>Редагувати</button>
                <button className="btn-delete" onClick={() => onDelete(loc.location_id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationTable;
