// src/auth/RequireAuth.js
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Anda belum login!');
    return <Navigate to="/admin/LoginAdmin" replace />;
  }

  return children;
}

export default RequireAuth;
