export type Department = 'Computer Science' | 'Information Technology' | 'Electronics & Comm' | 'Mechanical Eng' | 'Electrical Eng' | 'Civil Eng' | 'Business & Admin';

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// ==========================================
// 1. TIMETABLE & ATTENDANCE TYPES
// ==========================================
export interface ClassSession {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  day: DayOfWeek;
  startTime: string; // e.g., "09:00"
  endTime: string;   // e.g., "10:15"
  type: 'Lecture' | 'Lab' | 'Tutorial';
  colorTag: string;
}

export interface AttendanceRecord {
  courseCode: string;
  courseName: string;
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number; // e.g., 75
}

// ==========================================
// 2. NOTES SHARING TYPES
// ==========================================
export interface StudyNote {
  id: string;
  title: string;
  description: string;
  courseCode: string;
  courseName: string;
  department: Department;
  semester: Semester;
  unit: number;
  uploadedBy: {
    name: string;
    avatar: string;
    role: 'Student' | 'Class Representative' | 'Teaching Assistant';
  };
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'IMAGE' | 'MARKDOWN';
  downloadCount: number;
  upvotes: number;
  hasUpvoted?: boolean;
  tags: string[];
  isVerifiedByCR: boolean;
  previewContent?: string;
}

// ==========================================
// 3. LOST & FOUND TYPES
// ==========================================
export type ItemStatus = 'Active' | 'Claim Pending' | 'Resolved' | 'Handed Over to Security';
export type ItemType = 'Lost' | 'Found';

export interface LostFoundItem {
  id: string;
  type: ItemType;
  title: string;
  category: 'Electronics' | 'ID Card / Keys' | 'Books & Stationery' | 'Clothing & Bags' | 'Personal Belongings';
  location: string;
  reportedDate: string;
  timeSlot?: string;
  description: string;
  reportedBy: {
    name: string;
    contactEmail: string;
    contactPhone?: string;
  };
  imageUrl: string;
  status: ItemStatus;
  handoverLocation?: string; // e.g., "Campus Security Desk #2"
  securityVerificationQuestion?: string;
}

export interface ClaimSubmission {
  itemId: string;
  claimerName: string;
  claimerEmail: string;
  claimerPhone: string;
  proofAnswer: string;
  submittedAt: string;
}
