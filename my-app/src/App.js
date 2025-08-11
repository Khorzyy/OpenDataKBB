import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/DetailPage';
import AdminLogin from './admin/LoginAdmin';
import AdminDashboard from './admin/AdminDashboard';
import AddDataExcel from './admin/AddDataExcel';
import EditFile from './admin/EditFile';
import NotFound from './pages/not-found';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/admin/LoginAdmin" element={<AdminLogin />} />
      <Route path="/admin/tambah" element={<AddDataExcel />} />
      <Route path="/admin/EditFile/:id" element={<EditFile />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/NotFound" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
