import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>الصفحة غير موجودة</h2>
          <p>عذراً، الصفحة التي تبحث عنها غير موجودة</p>
          <Link to="/" className="btn btn-primary">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;