import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/DetailPage';
import AdminLogin from './admin/LoginAdmin';
import AdminDashboard from './admin/AdminDashboard';
import AddDataExcel from './admin/AddDataExcel';
import EditFile from './admin/EditFile';
import CreateAccount from './admin/CreateAccount';
import RequireAuth from './auth/RequireAuth';
import AdminView from './admin/AdminView';
import Layout from './components/Layout';
import NotFound from './pages/not-found';
import Sejarah from './pages/Sejarah';
import VisiMisi from './pages/visimisi';
import Logo from './pages/Logo';
import DataSet from './pages/DataSet';

function App() {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          {/* Public routes dibungkus Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />
          <Route path="/admin/LoginAdmin" element={<AdminLogin />} />

          {/* Admin-only routes pakai RequireAuth */}
          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/tambah"
            element={
              <RequireAuth>
                <AddDataExcel />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/EditFile/:id"
            element={
              <RequireAuth>
                <EditFile />
              </RequireAuth>
            }
          />
          <Route
            path="/owner/akun"
            element={
              <RequireAuth>
                <CreateAccount />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/view/:id"
            element={
              <RequireAuth>
                <AdminView />
              </RequireAuth>
            }
          />
          <Route
            path='/sejarah'
            element={
              <Layout>
                <Sejarah />
              </Layout>
            }
          />
          <Route
            path='/visimisi'
            element={
              <Layout>
                <VisiMisi />
              </Layout>
            }
          />
          <Route
            path='/logo'
            element={
              <Layout>
                <Logo />
              </Layout>
            }
          />
          <Route
            path='/dataSet'
            element={
              <Layout>
                <DataSet />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;