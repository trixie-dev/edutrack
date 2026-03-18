import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getStudents, saveStudents } from '../database';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (req: any, res: Response) => {
  const students = getStudents();
  const myStudents = students.filter(s => s.teacherId === req.user.id);
  return res.json(myStudents);
});

router.post('/', authenticate, (req: any, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const students = getStudents();
    const existing = students.find(s => s.email === email);
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const newStudent = {
      id: uuidv4(),
      name,
      email,
      teacherId: req.user.id,
      createdAt: new Date().toISOString()
    };

    students.push(newStudent);
    saveStudents(students);

    return res.status(201).json(newStudent);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authenticate, (req: any, res: Response) => {
  const students = getStudents();
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  return res.json(student);
});

router.delete('/:id', authenticate, (req: any, res: Response) => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  students.splice(index, 1);
  saveStudents(students);
  return res.json({ message: 'Student deleted' });
});

export default router;