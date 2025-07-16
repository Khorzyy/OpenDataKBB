import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TableList from './pages/TableList';
import CreateTable from './pages/CreateTable';
import TableForm from './pages/TableForm';
import TableDataView from './pages/TableDataView';
import UploadExcelCreateTable from './pages/UploadExcelCreateTable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableList />} />
        <Route path="/create" element={<CreateTable />} />
        <Route path="/form/:id" element={<TableForm />} />
        <Route path="/data/:id" element={<TableDataView />} />
        <Route path="/upload-excel" element={<UploadExcelCreateTable />} />
      </Routes>
    </Router>
  );
}

export default App;
