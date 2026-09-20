import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClassSession,
  AttendanceRecord,
  StudyNote,
  LostFoundItem,
  ClaimSubmission,
  DayOfWeek,
  Department,
  Semester,
} from '../types';
import {
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE,
  INITIAL_NOTES,
  INITIAL_LOST_FOUND,
} from '../data/mockData';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Timetable
  timetable: ClassSession[];
  selectedDay: DayOfWeek;
  setSelectedDay: (day: DayOfWeek) => void;
  addClassSession: (session: Omit<ClassSession, 'id'>) => void;
  deleteClassSession: (id: string) => void;
  getCurrentAndNextClass: () => { current: ClassSession | null; next: ClassSession | null; timeUntilNext: string | null };

  // Attendance
  attendance: AttendanceRecord[];
  logAttendance: (courseCode: string, attended: boolean) => void;
  updateTargetAttendance: (courseCode: string, target: number) => void;
  calculateAttendanceAdvice: (record: AttendanceRecord) => {
    percentage: number;
    status: 'safe' | 'warning' | 'critical';
    adviceMessage: string;
    actionNumber: number;
  };

  // Notes
  notes: StudyNote[];
  selectedDepartment: Department | 'All';
  setSelectedDepartment: (dept: Department | 'All') => void;
  selectedSemester: Semester | 'All';
  setSelectedSemester: (sem: Semester | 'All') => void;
  searchNotesQuery: string;
  setSearchNotesQuery: (query: string) => void;
  toggleUpvoteNote: (noteId: string) => void;
  addNote: (note: Omit<StudyNote, 'id' | 'uploadDate' | 'downloadCount' | 'upvotes' | 'hasUpvoted'>) => void;
  activePreviewNote: StudyNote | null;
  setActivePreviewNote: (note: StudyNote | null) => void;

  // Lost & Found
  lostFoundItems: LostFoundItem[];
  lostFoundFilter: 'All' | 'Lost' | 'Found';
  setLostFoundFilter: (filter: 'All' | 'Lost' | 'Found') => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  reportItem: (item: Omit<LostFoundItem, 'id' | 'reportedDate' | 'status'>) => void;
  submitClaim: (claim: ClaimSubmission) => void;
  activeClaimItem: LostFoundItem | null;
  setActiveClaimItem: (item: LostFoundItem | null) => void;

  // Toasts
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  TIMETABLE: 'campus_utility_timetable_v1',
  ATTENDANCE: 'campus_utility_attendance_v1',
  NOTES: 'campus_utility_notes_v1',
  LOST_FOUND: 'campus_utility_lostfound_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Timetable State
  const [timetable, setTimetable] = useState<ClassSession[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TIMETABLE);
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');

  // Attendance State
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  // Notes State
  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTES);
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });
  const [selectedDepartment, setSelectedDepartment] = useState<Department | 'All'>('All');
  const [selectedSemester, setSelectedSemester] = useState<Semester | 'All'>('All');
  const [searchNotesQuery, setSearchNotesQuery] = useState('');
  const [activePreviewNote, setActivePreviewNote] = useState<StudyNote | null>(null);

  // Lost & Found State
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LOST_FOUND);
    return saved ? JSON.parse(saved) : INITIAL_LOST_FOUND;
  });
  const [lostFoundFilter, setLostFoundFilter] = useState<'All' | 'Lost' | 'Found'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeClaimItem, setActiveClaimItem] = useState<LostFoundItem | null>(null);

  // Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOST_FOUND, JSON.stringify(lostFoundItems));
  }, [lostFoundItems]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Timetable Actions
  const addClassSession = (session: Omit<ClassSession, 'id'>) => {
    const newSession: ClassSession = {
      ...session,
      id: 'tt-' + Date.now(),
    };
    setTimetable((prev) => [...prev, newSession]);
    addToast(`Added ${session.courseCode} to ${session.day} schedule!`, 'success');
  };

  const deleteClassSession = (id: string) => {
    setTimetable((prev) => prev.filter((s) => s.id !== id));
    addToast('Class session removed from timetable.', 'info');
  };

  const getCurrentAndNextClass = () => {
    const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const currentDayIndex = now.getDay(); // 0 is Sunday
    const currentDayName = (currentDayIndex >= 1 && currentDayIndex <= 6) ? days[currentDayIndex - 1] : 'Monday';
    
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const todaysClasses = timetable
      .filter((s) => s.day === currentDayName)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    let current: ClassSession | null = null;
    let next: ClassSession | null = null;
    let timeUntilNext: string | null = null;

    for (const session of todaysClasses) {
      const [startH, startM] = session.startTime.split(':').map(Number);
      const [endH, endM] = session.endTime.split(':').map(Number);
      const sessionStart = startH * 60 + startM;
      const sessionEnd = endH * 60 + endM;

      if (currentMinutes >= sessionStart && currentMinutes <= sessionEnd) {
        current = session;
      } else if (currentMinutes < sessionStart && !next) {
        next = session;
        const diff = sessionStart - currentMinutes;
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        timeUntilNext = hours > 0 ? `in ${hours}h ${mins}m` : `in ${mins} minutes`;
      }
    }

    return { current, next, timeUntilNext };
  };

  // Attendance Actions
  const logAttendance = (courseCode: string, attended: boolean) => {
    setAttendance((prev) =>
      prev.map((rec) => {
        if (rec.courseCode === courseCode) {
          return {
            ...rec,
            attendedClasses: attended ? rec.attendedClasses + 1 : rec.attendedClasses,
            totalClasses: rec.totalClasses + 1,
          };
        }
        return rec;
      })
    );
    addToast(attended ? `Marked attended for ${courseCode}` : `Marked absent for ${courseCode}`, attended ? 'success' : 'warning');
  };

  const updateTargetAttendance = (courseCode: string, target: number) => {
    setAttendance((prev) =>
      prev.map((rec) => (rec.courseCode === courseCode ? { ...rec, targetPercentage: target } : rec))
    );
    addToast(`Target for ${courseCode} updated to ${target}%`, 'info');
  };

  const calculateAttendanceAdvice = (record: AttendanceRecord) => {
    const { attendedClasses, totalClasses, targetPercentage } = record;
    if (totalClasses === 0) {
      return {
        percentage: 100,
        status: 'safe' as const,
        adviceMessage: 'No classes recorded yet. You are fully on track!',
        actionNumber: 0,
      };
    }

    const currentPct = (attendedClasses / totalClasses) * 100;
    const targetFraction = targetPercentage / 100;

    if (currentPct >= targetPercentage) {
      // How many classes can be missed without dropping below target:
      // (attendedClasses) / (totalClasses + m) >= targetFraction
      // attendedClasses >= targetFraction * (totalClasses + m)
      // attendedClasses / targetFraction - totalClasses >= m
      const canMiss = Math.floor(attendedClasses / targetFraction - totalClasses);
      return {
        percentage: Number(currentPct.toFixed(1)),
        status: canMiss > 0 ? ('safe' as const) : ('warning' as const),
        adviceMessage: canMiss > 0
          ? `You can safely bunk ${canMiss} upcoming class${canMiss > 1 ? 'es' : ''} and still maintain ≥ ${targetPercentage}% attendance.`
          : `On the margin! Don't miss your next lecture to stay above ${targetPercentage}%.`,
        actionNumber: canMiss,
      };
    } else {
      // How many consecutive classes need to be attended:
      // (attendedClasses + a) / (totalClasses + a) >= targetFraction
      // attendedClasses + a >= targetFraction * totalClasses + targetFraction * a
      // a * (1 - targetFraction) >= targetFraction * totalClasses - attendedClasses
      // a >= (targetFraction * totalClasses - attendedClasses) / (1 - targetFraction)
      const needed = Math.ceil((targetFraction * totalClasses - attendedClasses) / (1 - targetFraction));
      return {
        percentage: Number(currentPct.toFixed(1)),
        status: 'critical' as const,
        adviceMessage: `Attendance below requirement! Attend the next ${needed} consecutive class${needed > 1 ? 'es' : ''} to reach ${targetPercentage}%.`,
        actionNumber: needed,
      };
    }
  };

  // Notes Actions
  const toggleUpvoteNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          const nextHasUpvoted = !n.hasUpvoted;
          return {
            ...n,
            hasUpvoted: nextHasUpvoted,
            upvotes: nextHasUpvoted ? n.upvotes + 1 : n.upvotes - 1,
          };
        }
        return n;
      })
    );
  };

  const addNote = (note: Omit<StudyNote, 'id' | 'uploadDate' | 'downloadCount' | 'upvotes' | 'hasUpvoted'>) => {
    const newNote: StudyNote = {
      ...note,
      id: 'note-' + Date.now(),
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 1,
      upvotes: 0,
      hasUpvoted: false,
    };
    setNotes((prev) => [newNote, ...prev]);
    addToast(`"${note.title}" published to campus repository!`, 'success');
  };

  // Lost & Found Actions
  const reportItem = (item: Omit<LostFoundItem, 'id' | 'reportedDate' | 'status'>) => {
    const newItem: LostFoundItem = {
      ...item,
      id: 'lf-' + Date.now(),
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    setLostFoundItems((prev) => [newItem, ...prev]);
    addToast(`Item "${item.title}" reported to Campus Lost & Found!`, 'success');
  };

  const submitClaim = (claim: ClaimSubmission) => {
    setLostFoundItems((prev) =>
      prev.map((item) => (item.id === claim.itemId ? { ...item, status: 'Claim Pending' } : item))
    );
    setActiveClaimItem(null);
    addToast('Claim submitted! Security and finder have been notified for verification.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
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
        notes,
        selectedDepartment,
        setSelectedDepartment,
        selectedSemester,
        setSelectedSemester,
        searchNotesQuery,
        setSearchNotesQuery,
        toggleUpvoteNote,
        addNote,
        activePreviewNote,
        setActivePreviewNote,
        lostFoundItems,
        lostFoundFilter,
        setLostFoundFilter,
        selectedCategory,
        setSelectedCategory,
        reportItem,
        submitClaim,
        activeClaimItem,
        setActiveClaimItem,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
