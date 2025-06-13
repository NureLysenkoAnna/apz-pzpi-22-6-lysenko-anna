import '../styles/GlobalStyles.css';

function SensorCheckTable({ checks, onEdit, onDelete }) {
  return (
    <table className="resident-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Сенсор</th>
          <th>Дата</th>
          <th>Час</th>
          <th>Результат</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {checks.map((check) => (
          <tr key={check.check_id}>
            <td>{check.check_id}</td>
            <td>{check.sensor_id}</td>
            <td>{new Date(check.check_date).toLocaleDateString('uk-UA')}</td>
            <td>
              {(() => {
                const parsed = new Date(check.check_date);
                return isNaN(parsed.getTime())
                  ? 'Invalid Date'
                  : parsed.toLocaleTimeString('uk-UA', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
              })()}
            </td>
            <td>{check.result}</td>
            <td>
              <div className="action-buttons">
                <button className="btn-edit" onClick={() => onEdit(check)}>Редагувати</button>
                <button className="btn-delete" onClick={() => onDelete(check.check_id)}>Видалити</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SensorCheckTable;
