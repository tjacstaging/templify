import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Customer from './pages/Customer/Customer';
import './index.css'
import './App.css';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

type NavMode = 'expanded' | 'icons' | 'hidden';

function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

interface AppContentProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

function AppContent({ isAuthenticated, setIsAuthenticated }: AppContentProps) {
  const location = useLocation();
  const [navMode, setNavMode] = useState<NavMode>('expanded');
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(max-width: 767px)').matches;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    function handleMediaQueryChange(event: MediaQueryListEvent) {
      setIsMobile(event.matches);
      if (!event.matches) {
        setIsMobileMenuOpen(false);
      }
    }

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  const showNavbar = location.pathname !== '/login';

  return (
    <div
      className={`app-layout ${showNavbar ? 'with-navbar' : 'no-navbar'} sidebar-${navMode} ${isMobileMenuOpen ? 'mobile-open' : 'mobile-closed'}`}
    >
      {showNavbar && (
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          navMode={navMode}
          setNavMode={setNavMode}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      {showNavbar && !isMobile && navMode === 'hidden' && (
        <button
          type="button"
          className="sidebar-reopen-button"
          onClick={() => setNavMode('expanded')}
          aria-label="Reopen navigation"
        >
          ☰
        </button>
      )}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Customer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <BrowserRouter>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </BrowserRouter>
  );
}

export default App;
