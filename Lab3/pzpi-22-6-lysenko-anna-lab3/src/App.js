import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import AdminUsersPage from './pages/AdminUsersPage';
import LogicAdminPanel from './pages/LogicAdminPanel';
import SensorChecksPage from './pages/SensorChecksPage';
import SensorDataPage from './pages/SensorDataPage';
import SensorsPage from './pages/SensorsPage';
import AdminLocationsPage from './pages/AdminLocationsPage'
import ManagerUsersPage from './pages/ManagerUsersPage';
import DbBackupPage from './pages/DbBackupPage';
import ResidentPage from './pages/ResidentPage';
import ManagerMonitoring from './pages/ManagerMonitoring';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/users" element={
          <RoleProtectedRoute requiredRoles={["Admin"]}>
            <AdminUsersPage/>
            </RoleProtectedRoute>
        } />

        <Route path="/admin/locations" element={
          <RoleProtectedRoute requiredRoles={["Admin"]}>
            <AdminLocationsPage/>
            </RoleProtectedRoute>
        } />

        <Route path="/logic/locations" element={
          <RoleProtectedRoute requiredRoles={["LogicAdmin", "Admin"]}>
            <LogicAdminPanel />
          </RoleProtectedRoute>
        } />

        <Route path="/logic/checks" element={
          <RoleProtectedRoute requiredRoles={["LogicAdmin", "Admin"]}>
            <SensorChecksPage/>
          </RoleProtectedRoute>
        } />

        <Route path="/logic/sensors" element={
          <RoleProtectedRoute requiredRoles={["LogicAdmin", "Admin"]}>
            <SensorsPage/>
          </RoleProtectedRoute>
        } />

        <Route path="/logic/data" element={
          <RoleProtectedRoute requiredRoles={["LogicAdmin", "Admin"]}>
            <SensorDataPage/>
          </RoleProtectedRoute>
        } />

        <Route path="/manager/users" element={
          <RoleProtectedRoute requiredRoles={["Manager", "Admin"]}>
            <ManagerUsersPage/>
          </RoleProtectedRoute>
        } />

        <Route path="/manager/monitor" element={
          <RoleProtectedRoute requiredRoles={["Manager", "Admin"]}>
            <ManagerMonitoring/>
          </RoleProtectedRoute>
        } />

        <Route path="/resident-home" element={
          <RoleProtectedRoute requiredRoles={["Resident","Admin"]}>
            <ResidentPage />
          </RoleProtectedRoute>
        } />

        <Route path="/backup" element={
          <RoleProtectedRoute requiredRoles={["DBAdmin","Admin"]}>
            <DbBackupPage />
          </RoleProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
