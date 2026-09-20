import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DayOfWeek, ClassSession } from '../../types';

const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TimetableModule: React.FC = () => {
  const {
    timetable,
    selectedDay,
    setSelectedDay,
    addClassSession,
    deleteClassSession,
    getCurrentAndNextClass,
    attendance,
    logAttendance,
    updateTargetAttendance,
    calculateAttendanceAdvice,
    addToast,
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'attendance'>('schedule');

  // Form State for new Class
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newInstructor, setNewInstructor] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newDay, setNewDay] = useState<DayOfWeek>(selectedDay);
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:15');
  const [newType, setNewType] = useState<'Lecture' | 'Lab' | 'Tutorial'>('Lecture');
  const [newColorTag, setNewColorTag] = useState('#3b82f6');

  const { current, next, timeUntilNext } = getCurrentAndNextClass();

  const dailySchedule = timetable
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode || !newCourseName || !newRoom) {
      addToast('Please fill in course code, name, and room!', 'warning');
      return;
    }
    addClassSession({
      courseCode: newCourseCode.toUpperCase().trim(),
      courseName: newCourseName.trim(),
      instructor: newInstructor.trim() || 'Staff Faculty',
      room: newRoom.trim(),
      day: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
      type: newType,
      colorTag: newColorTag,
    });
    setIsAddModalOpen(false);
    setNewCourseCode('');
    setNewCourseName('');
    setNewInstructor('');
    setNewRoom('');
  };

  const exportICalendar = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//UniVerse//Campus Timetable//EN\n";
    timetable.forEach((session) => {
      icsContent += `BEGIN:VEVENT\nSUMMARY:${session.courseCode}: ${session.courseName}\nLOCATION:${session.room}\nDESCRIPTION:Instructor: ${session.instructor} (${session.type})\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'campus_timetable.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Timetable exported as .ics for Google/Apple Calendar!', 'success');
  };

  return (
    <div className="module-container">
      {/* Header & Subtabs */}
      <div className="module-header">
        <div>
          <h1 className="module-title">📅 Smart Timetable & Attendance Tracker</h1>
          <p className="module-subtitle">
            Manage your weekly academic schedule, track real-time classes, and forecast attendance eligibility.
          </p>
        </div>
        <div className="action-button-group">
          <div className="segmented-control">
            <button
              className={`segmented-btn ${activeSubTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('schedule')}
            >
              Weekly Schedule
            </button>
            <button
              className={`segmented-btn ${activeSubTab === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('attendance')}
            >
              Attendance Calculator ({attendance.length})
            </button>
          </div>
          {activeSubTab === 'schedule' && (
            <>
              <button className="secondary-btn" onClick={exportICalendar}>
                📥 Export to .ICS
              </button>
              <button className="primary-btn" onClick={() => setIsAddModalOpen(true)}>
                + Add Class
              </button>
            </>
          )}
        </div>
      </div>

      {/* Live Class Ticker Widget */}
      <div className="live-status-card">
        <div className="status-box current">
          <div className="status-label">
            <span className="live-pulse"></span> HAPPENING NOW
          </div>
          {current ? (
            <div className="status-details">
              <h3 className="course-name">{current.courseCode} - {current.courseName}</h3>
              <p className="course-meta">
                📍 <strong>{current.room}</strong> &nbsp;|&nbsp; 👨‍🏫 {current.instructor} &nbsp;|&nbsp; ⏱️ {current.startTime} - {current.endTime} ({current.type})
              </p>
            </div>
          ) : (
            <p className="no-class-text">No active lecture at this moment. You are free!</p>
          )}
        </div>

        <div className="status-box next">
          <div className="status-label">
            <span>⏩</span> UP NEXT {timeUntilNext && <span className="time-badge">{timeUntilNext}</span>}
          </div>
          {next ? (
            <div className="status-details">
              <h3 className="course-name">{next.courseCode} - {next.courseName}</h3>
              <p className="course-meta">
                📍 <strong>{next.room}</strong> &nbsp;|&nbsp; ⏱️ Starts at {next.startTime} ({next.day})
              </p>
            </div>
          ) : (
            <p className="no-class-text">No further classes scheduled for today.</p>
          )}
        </div>
      </div>

      {/* SUB-VIEW 1: SCHEDULE GRID */}
      {activeSubTab === 'schedule' && (
        <div className="schedule-view">
          {/* Day Selector Pills */}
          <div className="days-nav">
            {DAYS_OF_WEEK.map((day) => {
              const count = timetable.filter((s) => s.day === day).length;
              return (
                <button
                  key={day}
                  className={`day-pill ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="day-name">{day}</span>
                  <span className="class-count">{count} {count === 1 ? 'class' : 'classes'}</span>
                </button>
              );
            })}
          </div>

          {/* Classes Timeline / Grid */}
          <div className="timeline-container">
            {dailySchedule.length === 0 ? (
              <div className="empty-state-card">
                <div className="empty-icon">🏖️</div>
                <h3>No Classes Scheduled for {selectedDay}</h3>
                <p>Enjoy your free day or click below to add lectures, labs, or tutorials.</p>
                <button className="primary-btn" onClick={() => setIsAddModalOpen(true)}>
                  + Add Class for {selectedDay}
                </button>
              </div>
            ) : (
              <div className="classes-grid">
                {dailySchedule.map((session) => (
                  <div
                    key={session.id}
                    className="class-card"
                    style={{ borderLeftColor: session.colorTag }}
                  >
                    <div className="class-header">
                      <div className="type-badge" style={{ backgroundColor: `${session.colorTag}20`, color: session.colorTag }}>
                        {session.type}
                      </div>
                      <div className="time-tag">
                        ⏱️ {session.startTime} - {session.endTime}
                      </div>
                    </div>

                    <h3 className="class-title">{session.courseCode}: {session.courseName}</h3>
                    
                    <div className="class-details">
                      <div className="detail-item">
                        <span className="icon">📍</span>
                        <span>{session.room}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">👨‍🏫</span>
                        <span>{session.instructor}</span>
                      </div>
                    </div>

                    <div className="class-footer">
                      <div className="quick-attendance-actions">
                        <button
                          className="btn-attend"
                          title="Log Attended"
                          onClick={() => logAttendance(session.courseCode, true)}
                        >
                          ✓ Attended
                        </button>
                        <button
                          className="btn-miss"
                          title="Log Missed"
                          onClick={() => logAttendance(session.courseCode, false)}
                        >
                          ✗ Missed
                        </button>
                      </div>
                      <button
                        className="btn-delete"
                        title="Delete Session"
                        onClick={() => deleteClassSession(session.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: ATTENDANCE CALCULATOR */}
      {activeSubTab === 'attendance' && (
        <div className="attendance-view">
          <div className="attendance-summary-header">
            <div>
              <h2>📊 Attendance Health & Predictive Calculator</h2>
              <p>Formula based on institutional criteria: $\frac{A + x}{T + x} \ge \text{Target \%}$</p>
            </div>
          </div>

          <div className="attendance-grid">
            {attendance.map((rec) => {
              const advice = calculateAttendanceAdvice(rec);
              return (
                <div key={rec.courseCode} className={`attendance-card ${advice.status}`}>
                  <div className="card-top">
                    <div>
                      <span className="course-code-badge">{rec.courseCode}</span>
                      <h3 className="course-title">{rec.courseName}</h3>
                    </div>
                    <div className={`percentage-pill ${advice.status}`}>
                      {advice.percentage}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${advice.status}`}
                      style={{ width: `${Math.min(100, advice.percentage)}%` }}
                    ></div>
                    <div
                      className="target-line"
                      style={{ left: `${rec.targetPercentage}%` }}
                      title={`Target: ${rec.targetPercentage}%`}
                    ></div>
                  </div>

                  <div className="stats-row">
                    <div>
                      <span className="stat-label">Attended / Total</span>
                      <span className="stat-value">{rec.attendedClasses} / {rec.totalClasses} classes</span>
                    </div>
                    <div>
                      <span className="stat-label">Min. Target</span>
                      <div className="target-editor">
                        <input
                          type="number"
                          value={rec.targetPercentage}
                          onChange={(e) => updateTargetAttendance(rec.courseCode, Number(e.target.value))}
                          className="target-input"
                          min="50"
                          max="100"
                        />
                        <span>%</span>
                      </div>
                    </div>
                  </div>

                  {/* Smart Advice Box */}
                  <div className={`advice-box ${advice.status}`}>
                    <span className="advice-icon">
                      {advice.status === 'safe' ? '🟢' : advice.status === 'warning' ? '🟡' : '🔴'}
                    </span>
                    <p className="advice-text">{advice.adviceMessage}</p>
                  </div>

                  {/* Quick Attendance Adjuster */}
                  <div className="attendance-actions">
                    <button
                      className="btn-action plus"
                      onClick={() => logAttendance(rec.courseCode, true)}
                    >
                      + Attended (+1)
                    </button>
                    <button
                      className="btn-action minus"
                      onClick={() => logAttendance(rec.courseCode, false)}
                    >
                      - Missed (+1)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Class Session Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Class to Timetable</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. CS301"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Day of Week *</label>
                  <select value={newDay} onChange={(e) => setNewDay(e.target.value as DayOfWeek)}>
                    {DAYS_OF_WEEK.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Course Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Artificial Intelligence & Heuristics"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Room / Hall *</label>
                  <input
                    type="text"
                    placeholder="e.g. Hall 402 - Tech Wing"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Instructor</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Turing"
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Session Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as any)}>
                    <option value="Lecture">Lecture</option>
                    <option value="Lab">Lab</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Card Color Tag</label>
                  <input
                    type="color"
                    value={newColorTag}
                    onChange={(e) => setNewColorTag(e.target.value)}
                    style={{ height: '42px', padding: '2px' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Class Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
