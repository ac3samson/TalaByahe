import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import RoutesPage from './pages/Routes';
import Fares from './pages/Fares';
import Monitoring from './pages/Monitoring';
import Reports from './pages/Reports';

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem('talabyahe_admin'));

  const login = (email) => {
    localStorage.setItem('talabyahe_admin', email);
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem('talabyahe_admin');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <Layout onLogout={logout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/fares" element={<Fares />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
