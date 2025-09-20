import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GradeNavbar from '../components/GradeNavbar.jsx';
import LessonCard from '../components/LessonCard.jsx';
import { fetchLessonsByGrade } from '../redux/slices/lessonsSlice.js';
import { fetchTasksByGrade } from '../redux/slices/tasksSlice.js';
import { fetchQuizzesByGrade } from '../redux/slices/quizzesSlice.js';
import { fetchSchedule } from '../redux/slices/scheduleSlice.js';
import { reverseGradeMapping } from '../utils/gradeMapping.js';
import { formatDate } from '../utils/helpers.js';

const GradePage = () => {
  const { gradeSlug } = useParams();
  const [activeTab, setActiveTab] = useState('lessons');
  const dispatch = useDispatch();
  
  const gradeName = reverseGradeMapping[gradeSlug];
  const lessons = useSelector(state => state.lessons.byGrade[gradeSlug] || []);
  const tasks = useSelector(state => state.tasks.byGrade[gradeSlug] || []);
  const quizzes = useSelector(state => state.quizzes.byGrade[gradeSlug] || []);
  const schedule = useSelector(state => state.schedule.list);
  const loading = useSelector(state => 
    state.lessons.loading || state.tasks.loading || state.quizzes.loading
  );

  useEffect(() => {
    if (gradeSlug) {
      dispatch(fetchLessonsByGrade(gradeSlug));
      dispatch(fetchTasksByGrade(gradeSlug));
      dispatch(fetchQuizzesByGrade(gradeSlug));
      dispatch(fetchSchedule());
    }
  }, [dispatch, gradeSlug]);

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
      <div className="container">
        <h1>الصف غير موجود</h1>
        <Link to="/grades" className="btn btn-primary">العودة للكورسات</Link>
      </div>
    );
  }

  return (
    <div className="grade-page">
      <div className="container">
        <div className="page-header">
          <div className="breadcrumb">
            <Link to="/">الرئيسية</Link>
            <span>/</span>
            <Link to="/grades">الكورسات</Link>
            <span>/</span>
            <span>{gradeName}</span>
          </div>
          
          <h1>{gradeName}</h1>
          <Link to="/grades" className="btn btn-secondary">العودة للكورسات</Link>
        </div>

        <GradeNavbar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="tab-content">
          {loading ? (
            <div className="loading">جاري التحميل...</div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default GradePage;