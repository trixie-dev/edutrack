import fs from 'fs';
import path from 'path';
import { User, Student, Progress } from './types';

const DB_PATH = path.join(__dirname, '../data');
const USERS_FILE = path.join(DB_PATH, 'users.json');
const STUDENTS_FILE = path.join(DB_PATH, 'students.json');
const PROGRESS_FILE = path.join(DB_PATH, 'progress.json');

// Create data folder and files if they don't exist
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH);
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

if (!fs.existsSync(STUDENTS_FILE)) {
  fs.writeFileSync(STUDENTS_FILE, '[]');
}

if (!fs.existsSync(PROGRESS_FILE)) {
  fs.writeFileSync(PROGRESS_FILE, '[]');
}

export const getUsers = (): User[] => {
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
};

export const saveUsers = (users: User[]): void => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

export const getStudents = (): Student[] => {
  return JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf-8'));
};

export const saveStudents = (students: Student[]): void => {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
};

export const getProgress = (): Progress[] => {
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
};

export const saveProgress = (progress: Progress[]): void => {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
};