import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../components/CourseCard.jsx';
import { fetchCourses } from '../redux/slices/coursesSlice.js';
import { gradeMapping } from '../utils/gradeMapping.js';

const Grades = () => {
  const dispatch = useDispatch();
  const { list: courses, loading } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const grades = [
    'الصف الأول الثانوي',
    'الصف الثاني الثانوي علمي',
    'الصف الثاني الثانوي ادبي', 
    'الصف الثالث الثانوي علمي',
    'الصف الثالث الثانوي ادبي'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">الكورسات المتاحة</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">اختر الصف الدراسي الخاص بك وابدأ رحلة التعلم</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-4"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 ml-3"></div>
            <span className="text-gray-600 dark:text-gray-400">جاري التحميل...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grades.map(grade => {
              const course = courses.find(c => c.grade === grade);
              return (
                <CourseCard
                  key={grade}
                  grade={grade}
                  description={course?.description}
                  lessonCount={course?.lessonCount || 0}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grades;