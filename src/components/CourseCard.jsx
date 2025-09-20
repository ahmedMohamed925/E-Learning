import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gradeMapping } from '../utils/gradeMapping.js';
import { canUserAccessGrade, getGradeAccessMessage } from '../utils/permissions.js';

const CourseCard = ({ grade, description, lessonCount = 0 }) => {
  const gradeSlug = gradeMapping[grade];
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // دالة للحصول على الصورة المناسبة لكل صف
  const getGradeImage = (grade) => {
    if (grade.includes('الأول')) return '/firstGrade.jpg';
    if (grade.includes('الثاني') && grade.includes('علمي')) return '/socendGrade1.jpg';
    if (grade.includes('الثاني') && grade.includes('ادبي')) return '/socendGrade1.jpg';
    if (grade.includes('الثالث') && grade.includes('علمي')) return '/ThiedGrade1.jpg';
    if (grade.includes('الثالث') && grade.includes('ادبي')) return '/ThiedGrade2.jpg';
    return '/firstGrade.jpg'; // صورة افتراضية
  };

  // فحص صلاحيات الوصول للصف
  const hasAccess = canUserAccessGrade(user, grade);
  const isLocked = isAuthenticated && !hasAccess;
  const accessMessage = getGradeAccessMessage(isAuthenticated, user, grade);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transform hover:-translate-y-1 group">
      {/* صورة الصف */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={getGradeImage(grade)} 
          alt={grade}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* مؤشر الحالة في الأعلى */}
        {isAuthenticated && (
          <div className="absolute top-4 right-4">
            {hasAccess ? (
              <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 space-x-reverse">
                <span>✅</span>
                <span>متاح</span>
              </div>
            ) : (
              <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 space-x-reverse">
                <span>🔒</span>
                <span>محظور</span>
              </div>
            )}
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{grade}</h3>
          <div className="flex items-center space-x-2 space-x-reverse text-white/80">
            <span className="text-lg">🎯</span>
            <span className="text-sm">مرحلة ثانوية</span>
          </div>
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
        {!isAuthenticated ? (
          // المستخدم غير مسجل دخول
          <Link 
            to="/login" 
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 space-x-reverse"
          >
            <span>🔐</span>
            <span>سجل دخول للوصول</span>
          </Link>
        ) : isLocked ? (
          // المستخدم مسجل دخول لكن ليس له صلاحية
          <div className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 space-x-reverse opacity-75 cursor-not-allowed">
            <span>🚫</span>
            <span>غير متاح لصفك</span>
          </div>
        ) : (
          // المستخدم له صلاحية الوصول
          <Link 
            to={`/grades/${gradeSlug}`} 
            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 space-x-reverse group-hover:shadow-xl"
          >
            <span>🚀</span>
            <span>ادخل الصف</span>
          </Link>
        )}
        
        {/* مؤشر الحالة */}
        {isAuthenticated && (
          <div className="mt-3 text-center">
            {hasAccess ? (
              <div className="flex items-center justify-center space-x-2 space-x-reverse text-green-600 dark:text-green-400">
                <span className="text-sm">✅</span>
                <span className="text-xs font-medium">متاح لك</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 space-x-reverse text-red-600 dark:text-red-400">
                <span className="text-sm">🔒</span>
                <span className="text-xs font-medium">محظور لصفك الحالي</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;