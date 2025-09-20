import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>منصة البداية</h3>
            <p>منصة تعليمية متخصصة في تدريس مادة الرياضة للمرحلة الثانوية</p>
          </div>
          
          <div className="footer-section">
            <h4>الروابط السريعة</h4>
            <ul>
              <li><a href="/grades">الكورسات</a></li>
              <li><a href="/profile">الملف الشخصي</a></li>
              <li><a href="/settings">الإعدادات</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <p>📧 البريد الإلكتروني: info@bidaya-platform.com</p>
            <p>📞 الهاتف: +20 100 123 4567</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 منصة البداية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;