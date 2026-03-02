import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../mockdata/users.json';
import './Login.css';
import { User, Lock, Diamond, Key } from 'lucide-react';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const match = users.find(u => u.email === email && u.password === password);
    if (match) {
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <div className="login-page">
      <nav className="login-nav">
        <a href="#" className="login-logo"><Key color="white" size={24} style={{ marginRight: '8px' }} />Templify</a>
        <div className="login-nav-links">
          <a href="#" className="active">Login</a>
          <a href="#">About Us</a>
          <a href="#">Register</a>
          <a href="#">Contact</a>
        </div>
      </nav>
      <div className="login-content">
        <div className="login-icon">
          <Diamond color="white" size={48} />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <span className="login-field-icon">
              <User color="white" size={24} />
            </span>
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="login-field">
            <span className="login-field-icon">
              <Lock color="white" size={24} />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">GET STARTED</button>
          <div className="login-options">
            <label className="login-remember">
              <input type="checkbox" />
              <span>Keep Logged In</span>
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <div className="login-links">
            <a href="#">CREATE ACCOUNT</a>
            <a href="#">NEED HELP?</a>
          </div>
        </form>
      </div>
      <footer className="login-footer">
        <div className="login-footer-links">
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Use</a>
        </div>
        <p className="login-copyright">&copy; 2026 Key. All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Login;
