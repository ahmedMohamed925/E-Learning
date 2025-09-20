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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <span className="text-gray-600 dark:text-gray-400 text-lg">جاري تحميل الدرس...</span>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الدرس غير موجود</h1>
          <Link 
            to="/grades" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            العودة للكورسات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">الرئيسية</Link>
            <span>/</span>
            <Link to="/grades" className="hover:text-primary-600 dark:hover:text-primary-400">الكورسات</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">الدرس {currentLesson.order}</span>
          </div>
        </div>

        <LessonPlayer
          lesson={currentLesson}
          onMarkComplete={handleMarkComplete}
          onDownloadNotes={handleDownloadNotes}
        />

        <div className="flex justify-between items-center mt-8">
          {currentLesson.previousId && (
            <Link 
              to={`/lessons/${currentLesson.previousId}`} 
              className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200 font-medium"
            >
              <span className="ml-2">←</span>
              <span>الدرس السابق</span>
            </Link>
          )}
          
          <div className="flex-1"></div>
          
          {currentLesson.nextId && (
            <Link 
              to={`/lessons/${currentLesson.nextId}`} 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              <span>الدرس التالي</span>
              <span className="mr-2">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;