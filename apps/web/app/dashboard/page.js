'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL + '/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
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
      console.error('Error creating contact:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>DoctorTakeProfit Dashboard</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ 
            background: '#3b82f6', 
            color: 'white', 
            padding: '0.75rem 1.5rem', 
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : '+ Add Contact'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ 
          background: '#f3f4f6', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h3>New Contact</h3>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
            />
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
            />
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
            />
            <button type="submit" style={{ 
              background: '#10b981', 
              color: 'white', 
              padding: '0.75rem', 
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}>
              Save Contact
            </button>
          </div>
        </form>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <h3>Contacts</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{contacts.length}</p>
        </div>
        <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <h3>Deals</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>0</p>
        </div>
        <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <h3>Revenue</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>€0</p>
        </div>
      </div>

      <h2>Contacts</h2>
      <div style={{ marginTop: '1rem' }}>
        {contacts.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No contacts yet. Add your first contact!</p>
        ) : (
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {contacts.map((contact) => (
              <div key={contact.id} style={{ 
                background: 'white', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{contact.name}</strong>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {contact.email} {contact.phone && `| ${contact.phone}`}
                  </div>
                  {contact.notes && (
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {contact.notes}
                    </div>
                  )}
                </div>
                <span style={{ 
                  background: contact.status === 'new' ? '#dbeafe' : '#dcfce7',
                  color: contact.status === 'new' ? '#1e40af' : '#166534',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase'
                }}>
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
