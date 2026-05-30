import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jobs', icon: Briefcase, label: 'Job Management' },
  { to: '/pipeline', icon: Users, label: 'Candidate Pipeline' },
];

export default function Sidebar({ mobile, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar${mobile ? ' sidebar--mobile' : ''}`}>
      {mobile && (
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          &times;
        </button>
      )}

      <div className="sidebar-brand">
        <img
          src="/logo_inovtek.jpeg"
          alt="Inovtek logo"
          className="sidebar-logo-img"
          width="34"
          height="34"
        />
        <span className="sidebar-brand-name">Inovtek Recruit</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
            }
            onClick={mobile ? onClose : undefined}
          >
            <Icon size={18} className="sidebar-link-icon" />
            <span className="sidebar-link-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.charAt(0) ?? 'A'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        </div>
        <button
          className="sidebar-logout"
          onClick={handleLogout}
          id="btn-logout"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
