import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice.js';
import { showToast } from '../utils/helpers.js';
import { gradeMapping } from '../utils/gradeMapping.js';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    grade: user?.grade || '',
    location: user?.location || ''
  });

  const grades = Object.keys(gradeMapping);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would call an API to update profile
    dispatch(updateProfile(formData));
    showToast('تم حفظ البيانات بنجاح', 'success');
  };

  if (!user) {
    return (
      <div className="container">
        <div className="loading">جاري تحميل الملف الشخصي...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>الملف الشخصي</h1>

        <div className="profile-content">
          <div className="profile-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">الاسم</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div className="form-group">
                <label htmlFor="grade">الصف الدراسي</label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                >
                  <option value="">اختر الصف الدراسي</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">الموقع</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="المحافظة أو المدينة"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                💾 حفظ التغييرات
              </button>
            </form>
          </div>

          <div className="profile-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p className="user-role">{user.role === 'admin' ? 'مدير' : 'طالب'}</p>
            </div>

            <div className="user-stats">
              <h4>إحصائيات سريعة</h4>
              <div className="stat">
                <span>📚</span>
                <div>
                  <strong>5</strong>
                  <small>دروس مكتملة</small>
                </div>
              </div>
              <div className="stat">
                <span>🎯</span>
                <div>
                  <strong>3</strong>
                  <small>كويزات مكتملة</small>
                </div>
              </div>
              <div className="stat">
                <span>⏱️</span>
                <div>
                  <strong>12</strong>
                  <small>ساعة دراسة</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;