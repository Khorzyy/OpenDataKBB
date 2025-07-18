import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}


export default App;
