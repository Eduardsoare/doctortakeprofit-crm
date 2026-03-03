'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL + '/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL + '/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ name: '', email: '', phone: '', notes: '' });
      setShowForm(false);
      fetchContacts();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>DoctorTakeProfit Dashboard</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Contact'}
      </button>
      
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <textarea placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
          <button type="submit">Save</button>
        </form>
      )}

      <h2>Contacts ({contacts.length})</h2>
      {contacts.map((c) => (
        <div key={c.id}>{c.name} - {c.email}</div>
      ))}
    </div>
  );
}