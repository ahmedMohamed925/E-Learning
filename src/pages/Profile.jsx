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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">الملف الشخصي</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">تعديل البيانات الشخصية</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                      placeholder="أدخل اسمك"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الصف الدراسي</label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">اختر الصف الدراسي</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الموقع</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                      placeholder="المحافظة أو المدينة"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 flex items-center space-x-2 space-x-reverse"
                >
                  <span>💾</span>
                  <span>حفظ التغييرات</span>
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{user.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
              <span className="text-sm text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full font-medium">
                {user.role === 'admin' ? 'مدير' : 'طالب'}
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">إحصائيات سريعة</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-2xl">📚</span>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">دروس مكتملة</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">كويزات مكتملة</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ساعة دراسة</div>
                  </div>
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