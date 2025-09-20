import React from 'react';
import { getYouTubeEmbedUrl } from '../utils/helpers.js';

const LessonPlayer = ({ lesson, onMarkComplete, onDownloadNotes }) => {
  const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  return (
    <div className="lesson-player">
      <div className="video-container">
        <iframe
          src={embedUrl}
          title={lesson.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="lesson-info">
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        
        <div className="lesson-actions">
          <button 
            onClick={onMarkComplete}
            className="btn btn-success"
            disabled={lesson.completed}
          >
            {lesson.completed ? '✅ مكتمل' : 'علامة كمُنجَز'}
          </button>
          
          {lesson.materials && (
            <button onClick={onDownloadNotes} className="btn btn-secondary">
              تحميل الملاحظات
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;