export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f3f4f6'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1>?? DoctorTakeProfit CRM</h1>
        <p>Trading Education Management System</p>
        <a href="/dashboard" style={{
          background: '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '1rem'
        }}>
          Enter Dashboard
        </a>
      </div>
    </div>
  );
}
