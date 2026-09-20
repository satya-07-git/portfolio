import { ClassSession, AttendanceRecord, StudyNote, LostFoundItem } from '../types';

export const INITIAL_TIMETABLE: ClassSession[] = [
  {
    id: 'tt-1',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    instructor: 'Prof. Alan Thorne',
    room: 'Hall 402 - Main Block',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:15',
    type: 'Lecture',
    colorTag: '#3b82f6', // blue
  },
  {
    id: 'tt-2',
    courseCode: 'CS304',
    courseName: 'Database Management Systems',
    instructor: 'Dr. Sarah Connor',
    room: 'CS Lab 2 - Tech Wing',
    day: 'Monday',
    startTime: '10:30',
    endTime: '12:30',
    type: 'Lab',
    colorTag: '#10b981', // emerald
  },
  {
    id: 'tt-3',
    courseCode: 'MA201',
    courseName: 'Discrete Mathematics',
    instructor: 'Prof. Ramanujan K.',
    room: 'Hall 201 - Math Wing',
    day: 'Monday',
    startTime: '13:30',
    endTime: '14:45',
    type: 'Lecture',
    colorTag: '#8b5cf6', // purple
  },
  {
    id: 'tt-4',
    courseCode: 'CS302',
    courseName: 'Operating Systems Internals',
    instructor: 'Dr. Linus Vance',
    room: 'Hall 305 - Main Block',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:15',
    type: 'Lecture',
    colorTag: '#f59e0b', // amber
  },
  {
    id: 'tt-5',
    courseCode: 'CS305',
    courseName: 'Computer Networks',
    instructor: 'Prof. Cerf Andrews',
    room: 'Hall 108 - Tech Wing',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '12:15',
    type: 'Lecture',
    colorTag: '#ec4899', // pink
  },
  {
    id: 'tt-6',
    courseCode: 'CS301',
    courseName: 'Data Structures Lab',
    instructor: 'Prof. Alan Thorne',
    room: 'CS Lab 1',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '11:00',
    type: 'Lab',
    colorTag: '#3b82f6',
  },
  {
    id: 'tt-7',
    courseCode: 'CS303',
    courseName: 'Software Engineering & Agile',
    instructor: 'Dr. Grace Hopper',
    room: 'Seminar Hall 3',
    day: 'Wednesday',
    startTime: '11:30',
    endTime: '12:45',
    type: 'Lecture',
    colorTag: '#06b6d4', // cyan
  },
  {
    id: 'tt-8',
    courseCode: 'CS304',
    courseName: 'Database Management Systems',
    instructor: 'Dr. Sarah Connor',
    room: 'Hall 402 - Main Block',
    day: 'Thursday',
    startTime: '10:00',
    endTime: '11:15',
    type: 'Lecture',
    colorTag: '#10b981',
  },
  {
    id: 'tt-9',
    courseCode: 'CS305',
    courseName: 'Computer Networks Lab',
    instructor: 'Prof. Cerf Andrews',
    room: 'Network Lab 3',
    day: 'Thursday',
    startTime: '13:30',
    endTime: '15:30',
    type: 'Lab',
    colorTag: '#ec4899',
  },
  {
    id: 'tt-10',
    courseCode: 'CS302',
    courseName: 'Operating Systems Problem Session',
    instructor: 'Dr. Linus Vance',
    room: 'Tutorial Room 102',
    day: 'Friday',
    startTime: '09:30',
    endTime: '10:45',
    type: 'Tutorial',
    colorTag: '#f59e0b',
  },
  {
    id: 'tt-11',
    courseCode: 'CS303',
    courseName: 'Software Engineering Project Lab',
    instructor: 'Dr. Grace Hopper',
    room: 'Innovation Center Lab',
    day: 'Friday',
    startTime: '11:15',
    endTime: '13:15',
    type: 'Lab',
    colorTag: '#06b6d4',
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    attendedClasses: 22,
    totalClasses: 25,
    targetPercentage: 75, // Current: 88%
  },
  {
    courseCode: 'CS304',
    courseName: 'Database Management Systems',
    attendedClasses: 14,
    totalClasses: 20,
    targetPercentage: 75, // Current: 70% (Below target warning)
  },
  {
    courseCode: 'CS302',
    courseName: 'Operating Systems Internals',
    attendedClasses: 19,
    totalClasses: 24,
    targetPercentage: 75, // Current: 79.1%
  },
  {
    courseCode: 'CS305',
    courseName: 'Computer Networks',
    attendedClasses: 21,
    totalClasses: 22,
    targetPercentage: 75, // Current: 95.4%
  },
  {
    courseCode: 'CS303',
    courseName: 'Software Engineering & Agile',
    attendedClasses: 17,
    totalClasses: 21,
    targetPercentage: 75, // Current: 80.9%
  },
  {
    courseCode: 'MA201',
    courseName: 'Discrete Mathematics',
    attendedClasses: 15,
    totalClasses: 22,
    targetPercentage: 75, // Current: 68.1% (Critical warning)
  },
];

export const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: 'Unit 3: B-Trees, Red-Black Trees & AVL Complete Cheat Sheet',
    description: 'Detailed rotation steps, tree balance factor formulas, and time complexity comparisons for Midterm Exam preparation.',
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    department: 'Computer Science',
    semester: 5,
    unit: 3,
    uploadedBy: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'Class Representative',
    },
    uploadDate: '2026-09-15',
    fileSize: '4.2 MB',
    fileType: 'PDF',
    downloadCount: 342,
    upvotes: 89,
    hasUpvoted: false,
    tags: ['Algorithms', 'Exam Prep', 'Handwritten', 'Trees'],
    isVerifiedByCR: true,
    previewContent: `## AVL Trees & Self-Balancing
Balance Factor = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, 1}

### Four Standard Rotation Cases:
1. LL Rotation: Right rotate node A
2. RR Rotation: Left rotate node A
3. LR Rotation: Left rotate child B, then right rotate node A
4. RL Rotation: Right rotate child B, then left rotate node A

### Time Complexities:
- Search: O(log N)
- Insertion: O(log N)
- Deletion: O(log N)`,
  },
  {
    id: 'note-2',
    title: 'DBMS Normalization & SQL Query Optimization Handbook',
    description: '1NF to BCNF step-by-step dependency diagrams, indexing strategies (B+ Tree indexes vs Hash), and execution plans.',
    courseCode: 'CS304',
    courseName: 'Database Management Systems',
    department: 'Computer Science',
    semester: 5,
    unit: 2,
    uploadedBy: {
      name: 'Rohan Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Teaching Assistant',
    },
    uploadDate: '2026-09-18',
    fileSize: '6.8 MB',
    fileType: 'PDF',
    downloadCount: 512,
    upvotes: 145,
    hasUpvoted: true,
    tags: ['SQL', 'Normalization', 'Indexes', 'Midsem Ready'],
    isVerifiedByCR: true,
    previewContent: `## Functional Dependencies & Normal Forms
- 1NF: Atomic attributes, no repeating groups.
- 2NF: 1NF + No Partial Dependency (every non-prime attribute fully functionally dependent on Candidate Key).
- 3NF: 2NF + No Transitive Dependency (X -> Y: X is Super Key or Y is Prime attribute).
- BCNF: For every functional dependency X -> Y, X must be a Super Key.`,
  },
  {
    id: 'note-3',
    title: 'Operating Systems: Deadlock Handling & Bankers Algorithm Solved Problems',
    description: 'Includes 12 solved numericals on resource allocation graphs, safety algorithm verification, and paging formulas.',
    courseCode: 'CS302',
    courseName: 'Operating Systems Internals',
    department: 'Computer Science',
    semester: 5,
    unit: 4,
    uploadedBy: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Student',
    },
    uploadDate: '2026-09-19',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    downloadCount: 220,
    upvotes: 67,
    hasUpvoted: false,
    tags: ['Deadlocks', 'Bankers Algorithm', 'Paging', 'Numericals'],
    isVerifiedByCR: false,
    previewContent: `## Banker's Algorithm Data Structures
- Available[m]: Available instances of resource type Rj
- Max[n][m]: Maximum demand of process Pi for Rj
- Allocation[n][m]: Currently allocated instances
- Need[n][m] = Max[n][m] - Allocation[n][m]

### Safety Criterion:
Work = Available
Finish[i] = false for all i
Find index i such that: Finish[i] == false AND Need[i] <= Work`,
  },
  {
    id: 'note-4',
    title: 'Computer Networks: TCP vs UDP & Subnetting Masterclass',
    description: 'CIDR calculation cheat table, 3-way handshake flowcharts, and flow control (Sliding Window / Go-Back-N / Selective Repeat).',
    courseCode: 'CS305',
    courseName: 'Computer Networks',
    department: 'Information Technology',
    semester: 5,
    unit: 3,
    uploadedBy: {
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Class Representative',
    },
    uploadDate: '2026-09-12',
    fileSize: '5.5 MB',
    fileType: 'PDF',
    downloadCount: 418,
    upvotes: 112,
    hasUpvoted: false,
    tags: ['Subnetting', 'TCP', 'OSI Layers', 'Formulas'],
    isVerifiedByCR: true,
    previewContent: `## Subnet Calculation Formula
Given IP: 192.168.1.0/26
- Number of subnet bits borrowed = 26 - 24 = 2 bits
- Number of subnets = 2^2 = 4 subnets
- Host bits remaining = 32 - 26 = 6 bits
- Usable hosts per subnet = 2^6 - 2 = 62 hosts
- Block Size = 256 - 192 = 64`,
  },
];

export const INITIAL_LOST_FOUND: LostFoundItem[] = [
  {
    id: 'lf-1',
    type: 'Found',
    title: 'Apple AirPods Pro (2nd Gen) with MagSafe Case',
    category: 'Electronics',
    location: 'Central Library, 2nd Floor Silent Study Pod #4',
    reportedDate: '2026-09-20',
    timeSlot: '16:45',
    description: 'Found inside a matte black Spigen protective case. Left unattended on study table #4.',
    reportedBy: {
      name: 'Vikram Seth',
      contactEmail: 'vikram.s@campus.edu',
      contactPhone: '+91 98765 43210',
    },
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=80',
    status: 'Handed Over to Security',
    handoverLocation: 'Library Front Helpdesk / Security Post B',
    securityVerificationQuestion: 'What engraving or specific sticker is on the inner lid or case?',
  },
  {
    id: 'lf-2',
    type: 'Lost',
    title: 'Blue Herschel Backpack with HP Pavilion Laptop',
    category: 'Clothing & Bags',
    location: 'Campus Cafeteria - Near Booth 14',
    reportedDate: '2026-09-19',
    timeSlot: '13:15',
    description: 'Navy blue Herschel bag containing my laptop (with GitHub stickers), lab notebooks, and silver spectacles case.',
    reportedBy: {
      name: 'Aditi Rao',
      contactEmail: 'aditi.r@campus.edu',
      contactPhone: '+91 98111 22334',
    },
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    securityVerificationQuestion: 'Describe the stickers on the back of the laptop or notebook title.',
  },
  {
    id: 'lf-3',
    type: 'Found',
    title: 'Student ID Card & Dormitory Access Fob',
    category: 'ID Card / Keys',
    location: 'Sports Complex - Badminton Court 2',
    reportedDate: '2026-09-20',
    timeSlot: '18:30',
    description: 'Found a student smart ID card on the spectator bench along with a blue RFID access key ring.',
    reportedBy: {
      name: 'Karan Joshi',
      contactEmail: 'karan.j@campus.edu',
    },
    imageUrl: 'https://images.unsplash.com/photo-1578873375969-d60fa62c6e61?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    handoverLocation: 'Student Council Room (Admin Bldg Rm 104)',
    securityVerificationQuestion: 'What is the student Roll Number and Department listed on the card?',
  },
  {
    id: 'lf-4',
    type: 'Found',
    title: 'Casio fx-991EX Classwiz Scientific Calculator',
    category: 'Electronics',
    location: 'Engineering Block Lecture Hall 305',
    reportedDate: '2026-09-18',
    timeSlot: '11:30',
    description: 'Found on the last bench after the morning Maths lecture. Has custom green tape on the sliding cover.',
    reportedBy: {
      name: 'Meera Nambiar',
      contactEmail: 'meera.n@campus.edu',
    },
    imageUrl: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?w=500&auto=format&fit=crop&q=80',
    status: 'Resolved',
    handoverLocation: 'Returned to Owner via Security',
  },
];
