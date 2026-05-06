import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Replace the plain text with our new Dashboard component */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;