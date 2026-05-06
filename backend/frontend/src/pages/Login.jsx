// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    try {
      // Talk to your backend API! Notice the https:// and the /api/auth/login
      const response = await axios.post('https://task-manager-pro-production-5eb7.up.railway.app/api/auth/login',
        { email, password },
        { withCredentials: true } // This is CRUCIAL to save the security cookie
      );

      // Save the user's name/role to local storage so we can show it on the dashboard
      localStorage.setItem('user', JSON.stringify(response.data));

      // Send them to the Dashboard!
      navigate('/dashboard');
    } catch (err) {
      // If they type the wrong password, show the error from the backend
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Task Manager Login</h2>

      {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '12px', fontSize: '16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}