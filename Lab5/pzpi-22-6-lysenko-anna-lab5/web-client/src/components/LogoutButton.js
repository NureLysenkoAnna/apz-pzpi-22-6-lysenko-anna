import { useNavigate } from 'react-router-dom';
import '../styles/LogoutButton.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return <button className="logout-button" onClick={handleLogout}>Вийти</button>;
}

export default LogoutButton;
