import { useEffect, useState } from 'react';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from '../services/userService';
import { getAllLocations } from '../services/locationService';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchLocations();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Помилка при завантаженні користувачів:', err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await getAllLocations();
      setLocations(res.data);
    } catch (err) {
      console.error('Помилка при завантаженні локацій:', err);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editUser) {
        await updateUser(editUser.user_id, data);
      } else {
        await createUser(data);
      }
      fetchUsers();
      setEditUser(null);
    } catch (err) {
      console.error('Помилка при збереженні:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="monitor-page">
      <Header title="Панель адміністратора системи" role="Admin" />
      <h1>Користувачі системи</h1>

      <UserForm
        onSubmit={handleSubmit}
        initialData={editUser}
        onCancel={() => setEditUser(null)}
        locations={locations}
      />
      <UserTable
        users={users}
        locations={locations}
        onEdit={setEditUser}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminUsersPage;
