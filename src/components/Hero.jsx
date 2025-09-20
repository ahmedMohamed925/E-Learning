import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    '🚀 منصة البداية',
    'تعلم مادة الرياضة مع الأستاذ مجدي جمال - خبرة في تدريس المرحلة الثانوية'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        <img src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="المعلم" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-logo">
          <img src="https://drive.google.com/uc?id=1IOJX6XEEgmVHEmiXiE5B0AKtaS3K95UC" alt="منصة البداية" />
        </div>
        
        <h1 className="hero-text">
          {texts[currentText]}
        </h1>
        
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">سجل الآن</Link>
          <Link to="/grades" className="btn btn-secondary">عرض الكورسات</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;