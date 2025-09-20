import React from 'react';

const GradeNavbar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'lessons', label: 'الحصص', icon: '📚' },
    { id: 'schedule', label: 'الجدول الدراسي', icon: '📅' },
    { id: 'tasks', label: 'الواجبات', icon: '📝' },
    { id: 'materials', label: 'المواد التعليمية', icon: '📂' },
    { id: 'quizzes', label: 'الكوويزات', icon: '🧠' }
  ];

  return (
    <nav className="grade-navbar">
      <div className="grade-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`grade-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default GradeNavbar;