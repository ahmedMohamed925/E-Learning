import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice.js';
import ThemeToggle from './ThemeToggle.jsx';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="https://drive.google.com/uc?id=1IOJX6XEEgmVHEmiXiE5B0AKtaS3K95UC" alt="منصة البداية" className="logo-img" />
          <span>منصة البداية</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
          <Link to="/grades" onClick={() => setMenuOpen(false)}>الكورسات</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>الملف الشخصي</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>الإعدادات</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>لوحة الإدارة</Link>
              )}
              <button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>تسجيل الدخول</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>التسجيل</Link>
            </>
          )}
          
          <ThemeToggle />
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="قائمة التنقل"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;