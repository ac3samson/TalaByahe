import { NavLink } from 'react-router-dom';
import './Layout.css';

const links = [
  { to: '/', label: 'Dashboard', icon: 'fa-table-columns' },
  { to: '/employees', label: 'Employees', icon: 'fa-user-tie' },
  { to: '/routes', label: 'Routes', icon: 'fa-route' },
  { to: '/fares', label: 'Fares', icon: 'fa-money-bill' },
  { to: '/monitoring', label: 'Monitoring', icon: 'fa-display' },
  { to: '/reports', label: 'Reports', icon: 'fa-chart-column' },
];

export default function Layout({ onLogout, children }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <img src="/portal-logo.png" alt="" className="brand-logo" />
          <div>
            <h1>TalaByahe</h1>
            <p>Admin Portal</p>
          </div>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <i className={`fa-solid ${link.icon} nav-icon`} aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button type="button" onClick={onLogout} className="btn-outline">
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
