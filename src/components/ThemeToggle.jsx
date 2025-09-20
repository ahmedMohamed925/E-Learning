import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={theme === 'light' ? 'تبديل إلى الوضع المظلم' : 'تبديل إلى الوضع الفاتح'}
    >
      {theme === 'light' ? '🌓' : '☀️'}
    </button>
  );
};

export default ThemeToggle;