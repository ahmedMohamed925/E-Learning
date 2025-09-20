import React from 'react';
import { Link } from 'react-router-dom';

const LessonCard = ({ lesson }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')} ساعة` : `${mins} دقيقة`;
  };

  return (
    <div className="lesson-card">
      <div className="lesson-header">
        <h3>{lesson.title}</h3>
        <span className="lesson-order">الدرس {lesson.order}</span>
      </div>
      
      <div className="lesson-content">
        <p>{lesson.description}</p>
        
        <div className="lesson-meta">
          <span className="duration">⏱️ {formatDuration(lesson.duration)}</span>
          {lesson.completed && (
            <span className="completed">✅ مكتمل</span>
          )}
        </div>
      </div>
      
      <div className="lesson-footer">
        <Link to={`/lessons/${lesson.id}`} className="btn btn-primary">
          مشاهدة الدرس
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;