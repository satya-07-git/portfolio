import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  activeTab: 'dashboard' | 'timetable' | 'notes' | 'lost-found';
  setActiveTab: (tab: 'dashboard' | 'timetable' | 'notes' | 'lost-found') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { timetable, notes, lostFoundItems, getCurrentAndNextClass } = useApp();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const { current } = getCurrentAndNextClass();

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand & Identity */}
        <div className="navbar-brand" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">🎓</div>
          <div>
            <div className="brand-title">UniVerse</div>
            <div className="brand-subtitle">Campus Utility & Life OS</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="tab-icon">⚡</span> Overview
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveTab('timetable')}
          >
            <span className="tab-icon">📅</span> Timetable
            <span className="badge-pill">{timetable.length}</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <span className="tab-icon">📚</span> Notes Sharing
            <span className="badge-pill">{notes.length}</span>
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'lost-found' ? 'active' : ''}`}
            onClick={() => setActiveTab('lost-found')}
          >
            <span className="tab-icon">🔍</span> Lost & Found
            <span className="badge-pill warning">{lostFoundItems.filter((i) => i.status === 'Active').length}</span>
          </button>
        </nav>

        {/* Live Status & Clock */}
        <div className="navbar-right">
          {current ? (
            <div className="live-lecture-pill">
              <span className="pulse-dot"></span>
              <span className="live-text">Live: <strong>{current.courseCode}</strong> ({current.room})</span>
            </div>
          ) : (
            <div className="status-idle-pill">
              <span className="idle-dot"></span> No Active Class
            </div>
          )}
          <div className="live-clock">
            {currentTime}
          </div>
        </div>
      </div>
    </header>
  );
};
