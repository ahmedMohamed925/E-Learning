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
      <div className="container">
        <h1>غير مسموح بالدخول</h1>
        <p>هذه الصفحة مخصصة للمديرين فقط</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>لوحة الإدارة</h1>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
          >
            📚 الدروس
          </button>
          <button
            className={`admin-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            📝 الواجبات
          </button>
          <button
            className={`admin-tab ${activeTab === 'quizzes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quizzes')}
          >
            🧠 الكويزات
          </button>
          <button
            className={`admin-tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            📅 الجدول
          </button>
        </div>

        {activeTab === 'lessons' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>إدارة الدروس</h2>
              <div className="section-controls">
                <select 
                  value={selectedGrade} 
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="grade-select"
                >
                  {grades.map(([gradeAr, gradeEn]) => (
                    <option key={gradeEn} value={gradeEn}>{gradeAr}</option>
                  ))}
                </select>
                <button onClick={handleCreateLesson} className="btn btn-primary">
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