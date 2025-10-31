import React, { useState } from 'react';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();
    if (data.token) onRegister(data.token);
    else alert(data.error || 'Register failed');
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 12, width: 320 }}>
      <h3>Register</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button type="submit">Register</button>
    </form>
  );
}
