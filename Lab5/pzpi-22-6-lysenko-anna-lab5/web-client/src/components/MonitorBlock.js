import '../styles/GlobalStyles.css';

function MonitorBlock({
  title,
  placeholder,
  value,
  onChange,
  onSearch,
  onClear,
  show,
  data,
  renderItem,
  type = 'text'
}) {
  return (
    <div className="monitor-section">
      <h2>{title}</h2>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button onClick={onSearch}>Пошук</button>
      <button onClick={onClear}>Очистити</button>

      {show && (
        data.length > 0 ? (
          <ul>
            {data.map(renderItem)}
          </ul>
        ) : <p>Немає результатів пошуку.</p>
      )}
    </div>
  );
}

export default MonitorBlock;
