import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkTheme(isDark);
      applyThemeStyles(isDark);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply theme styles
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    applyThemeStyles(isDarkTheme);
  }, [isDarkTheme]);

  const applyThemeStyles = (isDark) => {
    document.body.style.backgroundColor = isDark ? '#333' : '#fff';
    document.body.style.color = isDark ? '#fff' : '#000';
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const headerStyles = {
    color: isDarkTheme ? '#fff' : '#000',
    padding: '0 1rem',
    height: '3.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
  };

  const linkStyles = {
    color: isDarkTheme ? '#fff' : '#000',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    margin: '0 1rem',
  };

  const buttonStyles = {
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
    color: isDarkTheme ? '#fff' : '#000',
    backgroundColor: isDarkTheme ? '#666' : '#ddd',
  };

  const signInButtonStyles = {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '0.5rem 1.25rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <header style={headerStyles}>
      <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '1.25rem' }}>
          <Link href="/" style={linkStyles}>Home</Link>
          <Link href="/Add" style={linkStyles}>Add</Link>
          <Link href="/View" style={linkStyles}>View</Link>
          <Link href="/About" style={linkStyles}>About</Link>
          <Link href="/Contact" style={linkStyles}>Contact</Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={handleThemeToggle} style={buttonStyles}>
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>
        <Link href="/SignIn">
          <button style={signInButtonStyles}>Sign In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
