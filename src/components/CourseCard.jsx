import React from 'react';
import { Link } from 'react-router-dom';
import { gradeMapping } from '../utils/gradeMapping.js';

const CourseCard = ({ grade, description, lessonCount = 0 }) => {
  const gradeSlug = gradeMapping[grade];

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>{grade}</h3>
      </div>
      
      <div className="course-card-content">
        <p>{description || `دروس شاملة في مادة الرياضة ${grade}`}</p>
        <div className="course-stats">
          <span className="lesson-count">📚 {lessonCount} درس</span>
        </div>
      </div>
      
      <div className="course-card-footer">
        <Link to={`/grades/${gradeSlug}`} className="btn btn-primary">
          ادخل الصف
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;