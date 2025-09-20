import React from 'react';
import { Link } from 'react-router-dom';
import { gradeMapping } from '../utils/gradeMapping.js';

const CourseCard = ({ grade, description, lessonCount = 0 }) => {
  const gradeSlug = gradeMapping[grade];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transform hover:-translate-y-1 group">
      <div className="p-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <h3 className="text-xl font-bold mb-2 relative z-10">{grade}</h3>
        <div className="flex items-center space-x-2 space-x-reverse text-white/80 relative z-10">
          <span className="text-lg">🎯</span>
          <span className="text-sm">مرحلة ثانوية</span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {description || `دروس شاملة في مادة الرياضة ${grade} مع شرح مفصل وأمثلة تطبيقية`}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 space-x-reverse text-gray-500 dark:text-gray-400">
            <span className="text-lg">📚</span>
            <span className="text-sm font-medium">{lessonCount} درس</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse text-gray-500 dark:text-gray-400">
            <span className="text-lg">⏱️</span>
            <span className="text-sm font-medium">{lessonCount * 45} دقيقة</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse mb-4">
          <div className="flex -space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold">
              أ
            </div>
            <div className="w-8 h-8 bg-secondary-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold">
              ب
            </div>
            <div className="w-8 h-8 bg-success-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold">
              ج
            </div>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">+{Math.floor(Math.random() * 100) + 50} طالب</span>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <Link 
          to={`/grades/${gradeSlug}`} 
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 space-x-reverse group-hover:shadow-xl"
        >
          <span>🚀</span>
          <span>ادخل الصف</span>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;