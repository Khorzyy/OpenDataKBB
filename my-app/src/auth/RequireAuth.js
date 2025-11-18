// src/auth/RequireAuth.js
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const expiryTime = localStorage.getItem('tokenExpiry');

  // check if token exist 
  if (!token) {
    alert('Anda belum login!');
    return <Navigate to="/admin/LoginAdmin" replace />;
  }

  // check if token is expired
  const now = Date.now();
  if (expiryTime && now > parseInt(expiryTime, 10)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    alert('Sesi anda telah habis, silahkan login kembali.')
    return <Navigate to="/admin/LoginAdmin" replace />;
  }
  return children;
}

export default RequireAuth;
