import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import './Layout.css';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Desktop sidebar — always visible */}
      <div className="layout-sidebar-desktop">
        <Sidebar />
      </div>

      {/* Mobile sidebar — slide-in */}
      {sidebarOpen && (
        <div
          className="layout-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`layout-sidebar-mobile${sidebarOpen ? ' layout-sidebar-mobile--open' : ''}`}
      >
        <Sidebar mobile onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="layout-main">
        <header className="layout-topbar">
          <button
            className="layout-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            id="btn-open-menu"
          >
            <Menu size={20} color="#fff" />
          </button>
          <div className="layout-topbar-brand">
            <img
              src="/logo_inovtek.jpeg"
              alt="Inovtek"
              className="layout-topbar-logo"
              width="28"
              height="28"
            />
            <span>Inovtek Recruit</span>
          </div>
        </header>

        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
}
