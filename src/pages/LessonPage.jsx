import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LessonPlayer from '../components/LessonPlayer.jsx';
import { fetchLessonById } from '../redux/slices/lessonsSlice.js';
import { showToast } from '../utils/helpers.js';

const LessonPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentLesson, loading } = useSelector(state => state.lessons);

  useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [dispatch, id]);

  const handleMarkComplete = () => {
    // In a real app, this would call an API to mark lesson as complete
    showToast('تم تسجيل الدرس كمكتمل', 'success');
  };

  const handleDownloadNotes = () => {
    // In a real app, this would download lesson materials
    showToast('جاري تحميل الملاحظات...', 'info');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">جاري تحميل الدرس...</div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="container">
        <h1>الدرس غير موجود</h1>
        <Link to="/grades" className="btn btn-primary">العودة للكورسات</Link>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <div className="container">
        <div className="page-header">
          <div className="breadcrumb">
            <Link to="/">الرئيسية</Link>
            <span>/</span>
            <Link to="/grades">الكورسات</Link>
            <span>/</span>
            <span>الدرس {currentLesson.order}</span>
          </div>
        </div>

        <LessonPlayer
          lesson={currentLesson}
          onMarkComplete={handleMarkComplete}
          onDownloadNotes={handleDownloadNotes}
        />

        <div className="lesson-navigation">
          {currentLesson.previousId && (
            <Link 
              to={`/lessons/${currentLesson.previousId}`} 
              className="btn btn-secondary"
            >
              ← الدرس السابق
            </Link>
          )}
          
          {currentLesson.nextId && (
            <Link 
              to={`/lessons/${currentLesson.nextId}`} 
              className="btn btn-primary"
            >
              الدرس التالي →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;