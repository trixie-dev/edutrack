import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getProgress, saveProgress, getStudents } from '../database';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, (req: any, res: Response) => {
  try {
    const { studentId, subject, score, notes } = req.body;

    if (!studentId || !subject || score === undefined) {
      return res.status(400).json({ message: 'studentId, subject and score are required' });
    }

    const students = getStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const newProgress = {
      id: uuidv4(),
      studentId,
      subject,
      score,
      notes: notes || '',
      date: new Date().toISOString()
    };

    const progress = getProgress();
    progress.push(newProgress);
    saveProgress(progress);

    return res.status(201).json(newProgress);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:studentId', authenticate, (req: any, res: Response) => {
  const progress = getProgress();
  const studentProgress = progress.filter(
    p => p.studentId === req.params.studentId
  );
  return res.json(studentProgress);
});

router.get('/:studentId/summary', authenticate, (req: any, res: Response) => {
  const progress = getProgress();
  const studentProgress = progress.filter(
    p => p.studentId === req.params.studentId
  );

  if (studentProgress.length === 0) {
    return res.json({ message: 'No progress records found' });
  }

  const subjects: { [key: string]: number[] } = {};
  studentProgress.forEach(p => {
    if (!subjects[p.subject]) subjects[p.subject] = [];
    subjects[p.subject].push(p.score);
  });

  const summary = Object.keys(subjects).map(subject => ({
    subject,
    averageScore: (subjects[subject].reduce((a, b) => a + b, 0) / subjects[subject].length).toFixed(1),
    totalSessions: subjects[subject].length,
    highestScore: Math.max(...subjects[subject]),
    lowestScore: Math.min(...subjects[subject])
  }));

  return res.json({ studentId: req.params.studentId, summary });
});

export default router;