import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonById } from '../redux/slices/lessonsSlice.js';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const LessonPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentLesson, loading, error } = useSelector(state => state.lessons);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(id));
    }
  }, [dispatch, id]);

  // محاكاة تقدم مشاهدة الفيديو
  const handleVideoProgress = (progress) => {
    setVideoProgress(progress);
    if (progress >= 90 && !isCompleted) {
      setIsCompleted(true);
    }
  };

  // محاكاة اكتمال الدرس
  const markAsComplete = () => {
    setIsCompleted(true);
    // هنا يمكن إضافة API call لحفظ تقدم الطالب
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل الدرس...</p>
        </div>
      </div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            الدرس غير موجود
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'لم يتم العثور على الدرس المطلوب'}
          </p>
          <Link 
            to="/grades" 
            className="inline-block bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            العودة للكورسات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">الرئيسية</Link>
              <span>/</span>
              <Link to="/grades" className="hover:text-primary-600 dark:hover:text-primary-400">الكورسات</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{currentLesson.title}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentLesson.title}
                </h1>
                <div className="flex items-center space-x-4 space-x-reverse text-gray-600 dark:text-gray-400">
                  <span className="flex items-center space-x-1 space-x-reverse">
                    <span>📚</span>
                    <span>الدرس {currentLesson.order || 1}</span>
                  </span>
                  <span className="flex items-center space-x-1 space-x-reverse">
                    <span>⏱️</span>
                    <span>{currentLesson.duration || '45 دقيقة'}</span>
                  </span>
                  {isCompleted && (
                    <span className="flex items-center space-x-1 space-x-reverse text-green-600 dark:text-green-400">
                      <span>✅</span>
                      <span>مكتمل</span>
                    </span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => navigate(-1)}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
              >
                ← رجوع
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Video Container */}
                <div className="relative bg-black aspect-video">
                  {currentLesson.videoUrl ? (
                    <video 
                      controls 
                      className="w-full h-full"
                      onTimeUpdate={(e) => {
                        const progress = (e.target.currentTime / e.target.duration) * 100;
                        handleVideoProgress(progress);
                      }}
                    >
                      <source src={currentLesson.videoUrl} type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو
                    </video>
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="text-center">
                        <span className="text-6xl mb-4 block">🎥</span>
                        <p className="text-lg">قريباً: فيديو الدرس</p>
                        <p className="text-sm text-gray-300 mt-2">سيتم إضافة الفيديو قريباً</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {videoProgress > 0 && (
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>تقدم المشاهدة</span>
                      <span>{Math.round(videoProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    محتوى الدرس
                  </h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {currentLesson.description || currentLesson.content || 'لا يوجد محتوى متاح لهذا الدرس حالياً.'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {!isCompleted && videoProgress >= 90 && (
                      <button 
                        onClick={markAsComplete}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 space-x-reverse"
                      >
                        <span>✅</span>
                        <span>اكتمل الدرس</span>
                      </button>
                    )}
                    
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 space-x-reverse">
                      <span>📝</span>
                      <span>تدوين ملاحظة</span>
                    </button>
                    
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 space-x-reverse">
                      <span>💾</span>
                      <span>حفظ للمراجعة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Lesson Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    معلومات الدرس
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">رقم الدرس:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {currentLesson.order || 1}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">المدة:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {currentLesson.duration || '45 دقيقة'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">الحالة:</span>
                      <span className={`font-medium ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                        {isCompleted ? 'مكتمل' : 'قيد المشاهدة'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    إجراءات سريعة
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <span className="ml-2">❓</span>
                      طرح سؤال
                    </button>
                    <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <span className="ml-2">📚</span>
                      مواد إضافية
                    </button>
                    <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <span className="ml-2">🏆</span>
                      اختبار الدرس
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    التنقل
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 opacity-50 cursor-not-allowed">
                      <span className="ml-2">⬅️</span>
                      الدرس السابق
                    </button>
                    <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                      <span className="ml-2">➡️</span>
                      الدرس التالي
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default LessonPage;