import { Home, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Users, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import './Navbar.css';

interface NavbarProps {
  setIsAuthenticated: (value: boolean) => void;
  navMode: 'expanded' | 'icons' | 'hidden';
  setNavMode: (mode: 'expanded' | 'icons' | 'hidden') => void;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

function Navbar({
  setIsAuthenticated,
  navMode,
  setNavMode,
  isMobile,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: NavbarProps) {
  const navigate = useNavigate();

  function handleModeToggle() {
    if (navMode === 'expanded') {
      setNavMode('icons');
      return;
    }

    if (navMode === 'icons') {
      setNavMode('hidden');
      return;
    }

    setNavMode('expanded');
  }

  function handleNavSelect() {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
    navigate('/login');
  }

  const isLabelVisible = navMode === 'expanded';

  return (
    <>
      {isMobile && !isMobileMenuOpen && (
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      )}

      <nav
        className={`app-sidebar mode-${navMode} ${isMobileMenuOpen ? 'mobile-open' : 'mobile-closed'} ${isMobile ? 'is-mobile' : 'is-desktop'}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={isMobile ? () => setIsMobileMenuOpen(false) : handleModeToggle}
            aria-label={isMobile ? 'Close navigation' : 'Toggle navigation mode'}
          >
            {isMobile ? (
              <X size={18} />
            ) : navMode === 'expanded' ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>
          {isLabelVisible && <span className="sidebar-brand">Templify</span>}
        </div>

        <div className="sidebar-links">
          <NavLink
            to="/home"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavSelect}
          >
            <Home size={18} />
            {isLabelVisible && <span>Home</span>}
          </NavLink>
          <NavLink
            to="/customer"
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={handleNavSelect}
          >
            <Users size={18} />
            {isLabelVisible && <span>Customer</span>}
          </NavLink>
        </div>

        <button type="button" className="sidebar-link sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          {isLabelVisible && <span>Logout</span>}
        </button>
      </nav>
    </>
  );
}

export default Navbar;
