import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
}

function Navbar({ isAuthenticated }: NavbarProps) {
  if (!isAuthenticated) return null;
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/customer">Customer</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

export default Navbar;
