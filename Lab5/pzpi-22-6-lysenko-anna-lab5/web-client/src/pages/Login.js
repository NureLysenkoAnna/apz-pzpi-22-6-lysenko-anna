import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Login.css';
import { loginUser } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const role =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        decoded.role;

      switch (role) {
        case 'Admin':
          navigate('/admin/users');
          break;
        case 'LogicAdmin':
          navigate('/logic/locations');
          break;
        case 'Manager':
          navigate('/manager/users');
          break;
        case 'Resident':
          navigate('/resident-home');
          break;
        case 'DBAdmin':
          navigate('/backup');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Невірний email або пароль');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Вхід до системи</h2>

        {error && <div className="error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}

export default Login;