import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TableList from './pages/TableList';
import CreateTable from './pages/CreateTable';
import TableForm from './pages/TableForm';
import TableDataView from './pages/TableDataView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableList />} />
        <Route path="/create" element={<CreateTable />} />
        <Route path="/form/:id" element={<TableForm />} />
        <Route path="/data/:id" element={<TableDataView />} />
      </Routes>
    </Router>
  );
}

export default App;
