import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function RoleProtectedRoute({ children, requiredRoles }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!requiredRoles.includes(role)) return <Navigate to="/unauthorized" />;
    return children;
  } catch (err) {
    return <Navigate to="/" />;
  }
}

export default RoleProtectedRoute;

