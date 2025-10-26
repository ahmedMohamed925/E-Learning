import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
                         <img src="/FirstLogo.jpg" alt="منصة البداية" className="h-12 w-12 rounded-lg object-cover shadow-md" />

              <h3 className="text-2xl font-bold">منصة البداية</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              منصة تعليمية متخصصة في تدريس مادة الرياضيات للمرحلة الثانوية مع الأستاذ مجدي جمال. 
              نقدم تعليماً عالي الجودة بأسلوب مبتكر وممتع.
            </p>
            <div className="flex space-x-4 space-x-reverse">
             
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="text-2xl">📱</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="text-2xl">🌐</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">🔗 الروابط السريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/grades" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse">
                  <span>📚</span>
                  <span>الكورسات</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse">
                  <span>👤</span>
                  <span>الملف الشخصي</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse">
                  <span>⚙️</span>
                  <span>الإعدادات</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">📞 تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <span className="text-lg">📧</span>
               
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <span className="text-lg">📞</span>
                <div>
                  <div className="text-sm text-gray-400">الهاتف</div>
                  <div>+20 100 533 5464</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <span className="text-lg">📍</span>
                <div>
                  <div className="text-sm text-gray-400">العنوان</div>
                  <div>قنا,الاجايوه غرب</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-right">
              &copy; 2025 منصة البداية. جميع الحقوق محفوظة.
            </p>
          </div>
          {/* عبارة الإنشاء وروابط LinkedIn */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            تم إنشاء المنصة بواسطة:
            <a
              href="https://www.linkedin.com/in/ahmed-mohmed-707603256/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-primary-400 hover:text-primary-200 underline"
            >
              أحمد محمد
            </a>
            
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
