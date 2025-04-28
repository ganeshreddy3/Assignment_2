import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon" role="img" aria-label="clipboard">📋</span>
        <h1>Student Management System</h1>
      </div>
      <div className="header-actions">
        <button className="refresh-btn" aria-label="Refresh data">
          <span className="refresh-icon" role="img" aria-label="refresh">🔄</span>
          Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
