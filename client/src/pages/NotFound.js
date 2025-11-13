import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: 'white' }}>404</h1>
      <h2 style={{ fontSize: '24px', margin: '20px 0', color: 'white' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'white', marginBottom: '30px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/dashboard" 
        style={{
          padding: '12px 24px',
          background: 'white',
          color: '#667eea',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600'
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;