import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { hasAdminPrivileges } from '../utils/permissions.js';
import LessonsManagement from '../components/LessonsManagement.jsx';
import TasksManagement from '../components/TasksManagement.jsx';
import QuizzesManagement from '../components/QuizzesManagement.jsx';
import ScheduleManagement from '../components/ScheduleManagement.jsx';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalLessons: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Fetch admin statistics
    // This would normally come from an API
    setStats({
      totalStudents: 150,
      totalCourses: 12,
      totalLessons: 48,
      completionRate: 75
    });
  }, []);

  if (!user || !hasAdminPrivileges(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <span className="text-6xl mb-4 block">🔒</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">غير مصرح بالدخول</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            هذه الصفحة مخصصة للمديرين والمدرسين فقط
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: '📊' },
    { id: 'lessons', label: 'إدارة الدروس', icon: '📚' },
    { id: 'tasks', label: 'إدارة المهام', icon: '📝' },
    { id: 'quizzes', label: 'إدارة الكويزات', icon: '🧠' },
    { id: 'schedule', label: 'إدارة الجدول', icon: '📅' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'lessons':
        return renderLessonsContent();
      case 'tasks':
        return renderTasksContent();
      case 'quizzes':
        return renderQuizzesContent();
      case 'schedule':
        return renderScheduleContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">👥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">إجمالي الطلاب</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalStudents}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📚</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">إجمالي الدروس</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalLessons}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📝</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">المهام النشطة</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">24</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📈</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">معدل الإكمال</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.completionRate}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">نظرة عامة سريعة</h3>
        <p className="text-gray-600 dark:text-gray-400">
          مرحباً {user?.name}! يمكنك من هنا إدارة جميع جوانب المنصة التعليمية. 
          استخدم التبويبات أعلاه للتنقل بين أقسام الإدارة المختلفة.
        </p>
      </div>
    </div>
  );

  const renderLessonsContent = () => (
    <LessonsManagement />
  );

  const renderTasksContent = () => (
    <TasksManagement />
  );

  const renderQuizzesContent = () => (
    <QuizzesManagement />
  );

  const renderScheduleContent = () => (
    <ScheduleManagement />
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة التحكم الإدارية</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">مرحباً {user?.name}، إليك نظرة عامة على المنصة</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 space-x-reverse bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">إجمالي الطلاب</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalStudents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">إجمالي الدورات</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalCourses}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🎥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">إجمالي الدروس</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalLessons}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📈</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">معدل الإكمال</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.completionRate}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">الإجراءات السريعة</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                إضافة دورة جديدة
              </button>
              <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors">
                إدارة الطلاب
              </button>
              <button className="bg-success-600 text-white px-4 py-2 rounded-lg hover:bg-success-700 transition-colors">
                عرض التقارير
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">النشاط الأخير</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm text-gray-600">طالب جديد انضم للمنصة - أحمد محمد</p>
                <span className="text-xs text-gray-400">منذ ساعتين</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="text-sm text-gray-600">تم إنشاء دورة جديدة - برمجة تطبيقات الويب</p>
                <span className="text-xs text-gray-400">منذ 4 ساعات</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <p className="text-sm text-gray-600">طالب أكمل دورة - مقدمة في البرمجة</p>
                <span className="text-xs text-gray-400">منذ يوم واحد</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;