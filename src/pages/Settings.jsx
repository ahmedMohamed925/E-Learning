import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice.js';
import { showToast, validatePassword } from '../utils/helpers.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

const Settings = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    showToast('تم حفظ بيانات الحساب بنجاح', 'success');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'كلمة المرور الحالية مطلوبة';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'كلمة المرور الجديدة مطلوبة';
    } else if (!validatePassword(passwordData.newPassword)) {
      newErrors.newPassword = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'كلمتا المرور غير متطابقتان';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In a real app, this would call API to change password
    showToast('تم تغيير كلمة المرور بنجاح', 'success');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="settings-page">
      <div className="container">
        <h1>الإعدادات</h1>

        <div className="settings-content">
          <section className="settings-section">
            <h2>تعديل بيانات الحساب</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="name">الاسم</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="أدخل اسمك"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                💾 حفظ التغييرات
              </button>
            </form>
          </section>

          <section className="settings-section">
            <h2>تغيير كلمة المرور</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">كلمة المرور الحالية</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={errors.currentPassword ? 'error' : ''}
                  placeholder="أدخل كلمة المرور الحالية"
                />
                {errors.currentPassword && (
                  <span className="field-error">{errors.currentPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={errors.newPassword ? 'error' : ''}
                  placeholder="أدخل كلمة المرور الجديدة"
                />
                {errors.newPassword && (
                  <span className="field-error">{errors.newPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                />
                {errors.confirmPassword && (
                  <span className="field-error">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                🔒 تغيير كلمة المرور
              </button>
            </form>
          </section>

          <section className="settings-section">
            <h2>🎨 المظهر</h2>
            <div className="theme-setting">
              <div className="setting-item">
                <label>🌓 تبديل المظهر</label>
                <ThemeToggle />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;