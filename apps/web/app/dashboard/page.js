'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('API not connected'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>DoctorTakeProfit Dashboard</h1>
      <p>Welcome to your CRM!</p>
      <p>API Status: {apiStatus}</p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem' }}>
          <h3>Contacts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '0.5rem' }}>
          <h3>Deals</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem' }}>
          <h3>Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>€0</p>
        </div>
      </div>
    </div>
  );
}
