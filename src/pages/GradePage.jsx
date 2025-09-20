import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GradeNavbar from '../components/GradeNavbar.jsx';
import LessonCard from '../components/LessonCard.jsx';
import GradeProtectedRoute from '../components/GradeProtectedRoute.jsx';
import { fetchLessonsByGrade } from '../redux/slices/lessonsSlice.js';
import { fetchTasksByGrade } from '../redux/slices/tasksSlice.js';
import { fetchQuizzesByGrade } from '../redux/slices/quizzesSlice.js';
import { fetchScheduleByGrade } from '../redux/slices/scheduleSlice.js';
import { 
  reverseGradeMapping, 
  lessonsGradeMapping,
  tasksQuizzesGradeMapping,
  scheduleGradeMapping
} from '../utils/gradeMapping.js';
import { formatDate } from '../utils/helpers.js';

const GradePage = () => {
  const { gradeSlug } = useParams();
  const [activeTab, setActiveTab] = useState('lessons');
  const dispatch = useDispatch();
  
  const gradeName = reverseGradeMapping[gradeSlug];
  
  // Get the correct API parameters for each service
  const lessonsParam = gradeName ? lessonsGradeMapping[gradeName] : null;
  const tasksQuizzesParam = gradeName ? tasksQuizzesGradeMapping[gradeName] : null;
  const scheduleParam = gradeName ? scheduleGradeMapping[gradeName] : null;
  
  // Get data from Redux state using the correct parameters as keys
  const lessons = useSelector(state => state.lessons.byGrade[lessonsParam] || []);
  const tasks = useSelector(state => state.tasks.byGrade[tasksQuizzesParam] || []);
  const quizzes = useSelector(state => state.quizzes.byGrade[tasksQuizzesParam] || []);
  const schedule = useSelector(state => state.schedule.byGrade[scheduleParam] || []);
  const loading = useSelector(state => 
    state.lessons.loading || state.tasks.loading || state.quizzes.loading || state.schedule.loading
  );

  useEffect(() => {
    if (gradeName && lessonsParam && tasksQuizzesParam && scheduleParam) {
      dispatch(fetchLessonsByGrade(lessonsParam));
      dispatch(fetchTasksByGrade(tasksQuizzesParam));
      dispatch(fetchQuizzesByGrade(tasksQuizzesParam));
      dispatch(fetchScheduleByGrade(scheduleParam));
    }
  }, [dispatch, gradeName, lessonsParam, tasksQuizzesParam, scheduleParam]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'lessons':
        return (
          <div className="lessons-grid">
            {lessons.length > 0 ? (
              lessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <p className="empty-state">لا توجد دروس متاحة حالياً</p>
            )}
          </div>
        );

      case 'schedule':
        return (
          <div className="schedule-table">
            <h3>الجدول الدراسي</h3>
            {schedule.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>اليوم</th>
                    <th>الوقت</th>
                    <th>الموضوع</th>
                    <th>نوع الحصة</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map(item => (
                    <tr key={item.id}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.time}</td>
                      <td>{item.subject}</td>
                      <td>{item.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-state">لا يوجد جدول دراسي متاح حالياً</p>
            )}
          </div>
        );

      case 'tasks':
        return (
          <div className="tasks-list">
            <h3>الواجبات</h3>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id} className="task-card">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span>📅 تسليم: {formatDate(task.dueDate)}</span>
                    <span className={`status status-${task.status}`}>
                      {task.status === 'completed' ? '✅ مكتمل' : '⏳ مطلوب'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">لا توجد واجبات متاحة حالياً</p>
            )}
          </div>
        );

      case 'materials':
        return (
          <div className="materials-list">
            <h3>المواد التعليمية</h3>
            <p className="empty-state">المواد التعليمية ستكون متاحة قريباً</p>
          </div>
        );

      case 'quizzes':
        return (
          <div className="quizzes-list">
            <h3>الكويزات</h3>
            {quizzes.length > 0 ? (
              quizzes.map(quiz => (
                <div key={quiz.id} className="quiz-card">
                  <h4>{quiz.title}</h4>
                  <p>{quiz.description}</p>
                  <div className="quiz-meta">
                    <span>🎯 {quiz.questions?.length || 0} سؤال</span>
                    <span>⏱️ {quiz.duration} دقيقة</span>
                  </div>
                  <button className="btn btn-primary">ابدأ الكويز</button>
                </div>
              ))
            ) : (
              <p className="empty-state">لا توجد كويزات متاحة حالياً</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!gradeName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الصف غير موجود</h1>
          <Link to="/grades" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">العودة للكورسات</Link>
        </div>
      </div>
    );
  }

  return (
    <GradeProtectedRoute requiredGradeSlug={gradeSlug}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">الرئيسية</Link>
              <span>/</span>
              <Link to="/grades" className="hover:text-primary-600 dark:hover:text-primary-400">الكورسات</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{gradeName}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">{gradeName}</h1>
              <Link 
                to="/grades" 
                className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200 font-medium"
              >
                ← العودة للكورسات
              </Link>
            </div>
          </div>

          <GradeNavbar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 ml-3"></div>
                <span className="text-gray-600 dark:text-gray-400">جاري التحميل...</span>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </GradeProtectedRoute>
  );
};

export default GradePage;