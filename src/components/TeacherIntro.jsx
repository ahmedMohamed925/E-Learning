import React from 'react';

const TeacherIntro = () => {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="teacher-intro">
      <div className="container">
        <h2>تعريف المعلم</h2>
        
        <div className="teacher-content">
          <div className="teacher-text">
            <p>
              الأستاذ مجدي جمال هو مدرس مادة الرياضة المتخصص، يشرح لطلاب الصف الأول والثاني والثالث الثانوي 
              بأسلوب واضح وممتع يساعد على الفهم السهل والتفوق كما قال المستر الواحد مننا بالف.
            </p>
            
            <button onClick={scrollToCourses} className="btn btn-primary">
              تعرف أكثر
            </button>
          </div>
          
          <div className="teacher-image">
            <img 
              src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=1" 
              alt="الأستاذ مجدي جمال" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherIntro;