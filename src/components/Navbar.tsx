import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

function Navbar({ isAuthenticated, setIsAuthenticated }: NavbarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    setIsAuthenticated(false);
    navigate('/login');
  }

  if (!isAuthenticated) return null;
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/customer">Customer</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
