import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../mockdata/users.json';

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
    <div>
      <p>Login Page</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
