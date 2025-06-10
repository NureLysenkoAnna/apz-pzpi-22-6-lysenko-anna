import '../styles/GlobalStyles.css';
import Header from '../components/Header';
import { createBackup } from '../services/backupService';

function DbBackupPage() {
  const handleBackup = async () => {
    try {
      const res = await createBackup();
      alert(`✅ Бекап створено: ${res.data.message}`);
    } catch (err) {
      alert(`❌ Помилка при створенні бекапу: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="monitor-page">
      <Header title="Панель адміністратора бази даних" role="DBAdmin" />
      <h1>Резервне копіювання бази даних</h1>
      <p>Натисніть кнопку нижче, щоб створити повну копію бази даних.</p>
      <button className="btn-primary" onClick={handleBackup}>Створити бекап</button>
    </div>
  );
}

export default DbBackupPage;
