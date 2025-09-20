import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLessonAdmin, updateLessonAdmin, deleteLessonAdmin } from '../redux/slices/adminSlice.js';
import { fetchLessonsByGrade } from '../redux/slices/lessonsSlice.js';
import { showToast } from '../utils/helpers.js';
import { gradeMapping } from '../utils/gradeMapping.js';
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('first-secondary');
  
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    order: 1,
    duration: 30,
    videoUrl: '',
    grade: 'first-secondary'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { success, loading, error } = useSelector(state => state.admin);
  const lessons = useSelector(state => state.lessons.byGrade[selectedGrade] || []);

  const grades = Object.entries(gradeMapping);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    dispatch(fetchLessonsByGrade(selectedGrade));
  }, [user, navigate, dispatch, selectedGrade]);

  useEffect(() => {
    if (success) {
      setShowModal(false);
      setSelectedItem(null);
      dispatch(fetchLessonsByGrade(selectedGrade));
      showToast('تم حفظ البيانات بنجاح', 'success');
    }
  }, [success, dispatch, selectedGrade]);

  const handleCreateLesson = () => {
    setModalType('create');
    setLessonForm({
      title: '',
      description: '',
      order: lessons.length + 1,
      duration: 30,
      videoUrl: '',
      grade: selectedGrade
    });
    setShowModal(true);
  };

  const handleEditLesson = (lesson) => {
    setModalType('edit');
    setSelectedItem(lesson);
    setLessonForm({
      title: lesson.title,
      description: lesson.description,
      order: lesson.order,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl,
      grade: lesson.grade
    });
    setShowModal(true);
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      dispatch(deleteLessonAdmin(lessonId));
    }
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'create') {
      dispatch(createLessonAdmin(lessonForm));
    } else {
      dispatch(updateLessonAdmin({
        id: selectedItem.id,
        lessonData: lessonForm
      }));
    }
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLessonForm(prev => ({
      ...prev,
      [name]: name === 'order' || name === 'duration' ? parseInt(value) : value
    }));
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">غير مسموح بالدخول</h1>
          <p className="text-gray-600 dark:text-gray-400">هذه الصفحة مخصصة للمديرين فقط</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">لوحة الإدارة</h1>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'lessons'
                ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500'
            }`}
            onClick={() => setActiveTab('lessons')}
          >
            📚 الدروس
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'tasks'
                ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            📝 الواجبات
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'quizzes'
                ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500'
            }`}
            onClick={() => setActiveTab('quizzes')}
          >
            🧠 الكويزات
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'schedule'
                ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500'
            }`}
            onClick={() => setActiveTab('schedule')}
          >
            📅 الجدول
          </button>
        </div>

        {activeTab === 'lessons' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">إدارة الدروس</h2>
              <div className="flex items-center space-x-3 space-x-reverse">
                <select 
                  value={selectedGrade} 
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  {grades.map(([gradeAr, gradeEn]) => (
                    <option key={gradeEn} value={gradeEn}>{gradeAr}</option>
                  ))}
                </select>
                <button 
                  onClick={handleCreateLesson} 
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 font-medium flex items-center space-x-2 space-x-reverse"
                >
                  <span>➕</span>
                  <span>إضافة درس</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-4 bg-error-50 dark:bg-error-900 border border-error-200 dark:border-error-700 text-error-800 dark:text-error-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الترتيب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">عنوان الدرس</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">المدة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {lessons.map(lesson => (
                    <tr key={lesson.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{lesson.order}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{lesson.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{lesson.duration} دقيقة</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 space-x-reverse">
                        <button 
                          onClick={() => handleEditLesson(lesson)}
                          className="px-3 py-1.5 text-xs bg-secondary-600 text-white rounded hover:bg-secondary-700 transition-colors duration-200"
                        >
                          ✏️ تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="px-3 py-1.5 text-xs bg-error-600 text-white rounded hover:bg-error-700 transition-colors duration-200"
                        >
                          🗑️ حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'lessons' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-400">هذا القسم قيد التطوير</p>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {modalType === 'create' ? 'إضافة درس جديد' : 'تعديل الدرس'}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleLessonSubmit} className="p-6 space-y-6">
              <div className="form-group">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عنوان الدرس</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={lessonForm.title}
                  onChange={handleLessonChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                  placeholder="أدخل عنوان الدرس"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">وصف الدرس</label>
                <textarea
                  id="description"
                  name="description"
                  value={lessonForm.description}
                  onChange={handleLessonChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                  placeholder="أدخل وصف الدرس"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الترتيب</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={lessonForm.order}
                    onChange={handleLessonChange}
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المدة (دقيقة)</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={lessonForm.duration}
                    onChange={handleLessonChange}
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رابط الفيديو (YouTube)</label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  value={lessonForm.videoUrl}
                  onChange={handleLessonChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-700 dark:text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
                  ➕ إضافة درس
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}

            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>الترتيب</th>
                    <th>عنوان الدرس</th>
                    <th>المدة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map(lesson => (
                    <tr key={lesson.id}>
                      <td>{lesson.order}</td>
                      <td>{lesson.title}</td>
                      <td>{lesson.duration} دقيقة</td>
                      <td>
                        <button 
                          onClick={() => handleEditLesson(lesson)}
                          className="btn btn-sm btn-secondary"
                        >
                          ✏️ تعديل
                        </button>
                        <button 
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="btn btn-sm btn-danger"
                        >
                          🗑️ حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'lessons' && (
          <div className="admin-section">
            <p>هذا القسم قيد التطوير</p>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalType === 'create' ? 'إضافة درس جديد' : 'تعديل الدرس'}</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">✕</button>
            </div>
            
            <form onSubmit={handleLessonSubmit}>
              <div className="form-group">
                <label htmlFor="title">عنوان الدرس</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={lessonForm.title}
                  onChange={handleLessonChange}
                  required
                  placeholder="أدخل عنوان الدرس"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">وصف الدرس</label>
                <textarea
                  id="description"
                  name="description"
                  value={lessonForm.description}
                  onChange={handleLessonChange}
                  rows="3"
                  placeholder="أدخل وصف الدرس"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="order">الترتيب</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={lessonForm.order}
                    onChange={handleLessonChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">المدة (دقيقة)</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={lessonForm.duration}
                    onChange={handleLessonChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="videoUrl">رابط الفيديو (YouTube)</label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  value={lessonForm.videoUrl}
                  onChange={handleLessonChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;