import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Marketplace</h1>
        <div style={{ display: 'flex', gap: 20 }}>
          <Login onLogin={(t) => setToken(t)} />
          <Register onRegister={(t) => setToken(t)} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Listings</h2>
        <button onClick={() => setToken(null)}>Logout</button>
      </header>
      <Listings token={token} />
    </div>
  );
}

export default App;
