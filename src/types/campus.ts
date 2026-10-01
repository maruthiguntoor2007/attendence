export type TabType = 'dashboard' | 'analytics' | 'check-in' | 'leave-od' | 'schedule' | 'hall-map';

export interface StudentProfile {
  name: string;
  id: string;
  program: string;
  semester: string;
  avatarUrl: string;
  status: 'Active' | 'On Leave';
  aggregatedAttendance: number;
  attendedHours: number;
  totalHours: number;
  safeBunkTotal: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  instructorTitle?: string;
  instructorPhoto?: string;
  credits: number;
  type: 'Theory' | 'Practical/Labs' | 'Core';
  attended: number;
  total: number;
  percentage: number;
  target: number;
  status: 'Safe' | 'Critical' | 'Warning';
  bunkAllowance: number;
  neededToTarget: number;
  nextLectureTime?: string;
  location?: string;
  color?: string;
}

export interface ClassSession {
  id: string;
  courseCode: string;
  courseName: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  status: 'Attended' | 'Live Now' | 'Upcoming';
  type: 'Lecture' | '2 Hr Lab Block' | 'Guest Lecture';
  topic?: string;
  notes?: string;
  standingInfo?: string;
  canMissText?: string;
  isClearanceCritical?: boolean;
  beaconLocked?: boolean;
}

export interface HeatmapDay {
  dayNumber: number;
  dayOfWeek: string;
  status: 'present' | 'absent' | 'od' | 'holiday' | 'none';
  label?: string;
  dateStr: string;
  isToday?: boolean;
}

export interface ClassAuditLog {
  id: string;
  lectureNumber: string;
  courseCode: string;
  courseName: string;
  dateStr: string;
  timeStr: string;
  status: 'Present' | 'Absent' | 'OD Approved';
  verificationMethod: string;
  disputed?: boolean;
}

export interface LeaveRequest {
  id: string;
  category: 'medical' | 'od' | 'casual';
  title: string;
  dates: string;
  affectedLecturesCount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  statusDetails: string;
  restoredLectures?: number;
  reason: string;
  attachedFile?: string;
  fileSize?: string;
  submittedAt: string;
}

export interface ExamSeatAllocation {
  courseCode: string;
  courseName: string;
  examDate: string;
  examTime: string;
  hallName: string;
  block: string;
  level: string;
  room: string;
  deskNumber: number;
  row: number;
  col: number;
  invigilator: string;
  department: string;
  reportingTime: string;
  status: 'Confirmed' | 'Pending Clearance' | 'Locked';
}
