import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../components/Hero.jsx';
import TeacherIntro from '../components/TeacherIntro.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { fetchCourses } from '../redux/slices/coursesSlice.js';
import { gradeMapping } from '../utils/gradeMapping.js';

const Home = () => {
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
    <div className="home">
      <Hero />
      <TeacherIntro />
      
      <section id="courses" className="courses-section">
        <div className="container">
          <h2>الكورسات المتاحة</h2>
          
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
      </section>
    </div>
  );
};

export default Home;