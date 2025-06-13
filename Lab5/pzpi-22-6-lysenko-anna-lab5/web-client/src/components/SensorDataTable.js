function SensorDataTable({ dataList }) {
  return (
    <table className="resident-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Сенсор</th>
          <th>Рівень газу</th>
          <th>Температура</th>
          <th>Тиск</th>
          <th>Час</th>
        </tr>
      </thead>
      <tbody>
        {[...dataList]
          .sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp))
          .map((data) => (
            <tr key={data.data_id}>
              <td>{data.data_id}</td>
              <td>{data.sensor_id}</td>
              <td>{data.gas_level}</td>
              <td>{data.temperature}</td>
              <td>{data.pressure}</td>
              <td>
                {new Date(data.time_stamp).toLocaleString('uk-UA', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SensorDataTable;
