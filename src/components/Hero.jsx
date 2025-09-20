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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="المعلم" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-8 animate-bounce-gentle">
          <img 
            src="https://drive.google.com/uc?id=1IOJX6XEEgmVHEmiXiE5B0AKtaS3K95UC" 
            alt="منصة البداية" 
            className="h-24 w-24 mx-auto rounded-2xl shadow-2xl"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight animate-fade-in">
          {texts[currentText]}
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link 
            to="/register" 
            className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🚀 سجل الآن
          </Link>
          <Link 
            to="/grades" 
            className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
          >
            📚 عرض الكورسات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;