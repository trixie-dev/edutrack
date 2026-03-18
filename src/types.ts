export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  teacherId: string;
  createdAt: string;
}

export interface Progress {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  notes: string;
  date: string;
}