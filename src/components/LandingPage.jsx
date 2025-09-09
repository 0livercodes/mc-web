import React from 'react';

const LandingPage = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#fffbe6'
  }}>
    <img
      src="/src/assets/mc-logo.svg"
      alt="Bakery Logo"
      style={{ width: 180, marginBottom: 32 }}
    />
    <h1 style={{ color: '#a0522d', marginBottom: 16 }}>Welcome to Mister Chu</h1>
    <p style={{ fontSize: 18, color: '#6b4226', marginBottom: 32 }}>
      Freshly baked goods delivered to your door!
    </p>
    <a href="/shop">
      <button
        style={{
          padding: '12px 32px',
          fontSize: 18,
          background: '#a0522d',
          color: '#fffbe6',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer'
        }}
      >
        Shop Now
      </button>
    </a>
  </div>
);

export default LandingPage;