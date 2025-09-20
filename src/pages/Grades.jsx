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
    <div className="grades-page">
      <div className="container">
        <div className="page-header">
          <h1>الكورسات المتاحة</h1>
          <p>اختر الصف الدراسي الخاص بك وابدأ رحلة التعلم</p>
        </div>

        {loading ? (
          <div className="loading">جاري التحميل...</div>
        ) : (
          <div className="courses-grid">
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