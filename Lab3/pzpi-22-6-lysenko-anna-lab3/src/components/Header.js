import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import LogoutButton from './LogoutButton';

function Header({ title, role }) {
  const location = useLocation();

  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <span className="user-role">Роль: {role}</span>
      </div>

      {role === 'Admin' && (
        <nav className="nav-menu">
          <Link to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>
            Користувачі системи
          </Link>
          <Link to="/admin/locations" className={location.pathname === '/admin/locations' ? 'active' : ''}>
            Локації
          </Link>
          <div className="dropdown">
            <button className="dropbtn">Інші сторінки ▾</button>
            <div className="dropdown-content">
              <Link to="/manager/monitor">Моніторинг</Link>
              <Link to="/logic/checks">Перевірки</Link>
              <Link to="/logic/sensors">Сенсори</Link>
              <Link to="/logic/data">Дані з сенсорів</Link>
              <Link to="/backup">Резервне копіювання БД</Link>
            </div>
          </div>
        </nav>
      )}

      {role === 'Manager' && (
        <nav className="nav-menu">
          <Link to="/manager/users" className={location.pathname === '/manager/users' ? 'active' : ''}>Користувачі</Link>
          <Link to="/manager/monitor" className={location.pathname === '/manager/monitor' ? 'active' : ''}>Моніторинг</Link>
        </nav>
      )}

      {role === 'LogicAdmin' && (
        <nav className="nav-menu">
          <Link to="/logic/locations" className={location.pathname === '/logic/locations' ? 'active' : ''}>Локації</Link>
          <Link to="/logic/checks" className={location.pathname === '/logic/checks' ? 'active' : ''}>Перевірки</Link>
          <Link to="/logic/sensors" className={location.pathname === '/logic/sensors' ? 'active' : ''}>Сенсори</Link>
          <Link to="/logic/data" className={location.pathname === '/logic/data' ? 'active' : ''}>Дані з сенсорів</Link>
        </nav>
      )}

      <div className="header-right">
        <LogoutButton />
      </div>
    </header>
  );
}

export default Header;
