import React from 'react';
import { Link } from 'react-router-dom';

const LessonCard = ({ lesson }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')} ساعة` : `${mins} دقيقة`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0">{lesson.title}</h3>
        <span className="text-sm text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900 px-2 py-1 rounded-full font-medium">
          الدرس {lesson.order}
        </span>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{lesson.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1 space-x-reverse">
            <span>⏱️</span>
            <span>{formatDuration(lesson.duration)}</span>
          </div>
          {lesson.completed && (
            <span className="text-success-600 dark:text-success-400 font-medium">✅ مكتمل</span>
          )}
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <Link 
          to={`/lessons/${lesson.id}`} 
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
        >
          مشاهدة الدرس
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;