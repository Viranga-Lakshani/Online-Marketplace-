import React, { useState, useEffect } from 'react';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function Listings({ token }) {
  const [listings, setListings] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  async function load() {
    const res = await fetch(`${API}/listings`);
    const data = await res.json();
    setListings(data.listings || []);
  }

  useEffect(() => { load(); }, []);

  async function create(e) {
    e.preventDefault();
    const res = await fetch(`${API}/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, priceCents: Math.round(parseFloat(price || '0') * 100) })
    });
    const data = await res.json();
    if (data.listing) {
      setTitle('');
      setPrice('');
      load();
    } else {
      alert(data.error || 'Create failed');
    }
  }

  return (
    <div>
      <form onSubmit={create} style={{ marginBottom: 20 }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Price (e.g. 9.99)" value={price} onChange={e => setPrice(e.target.value)} />
        <button type="submit">Create Listing</button>
      </form>

      <div>
        {listings.map(l => (
          <div key={l.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <strong>{l.title}</strong> — ${(l.priceCents / 100).toFixed(2)}
            <div style={{ fontSize: 12, color: '#666' }}>By: {l.owner?.email}</div>
            <div>{l.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
