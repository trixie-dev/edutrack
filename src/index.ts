import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import studentRoutes from './routes/students';
import progressRoutes from './routes/progress';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/progress', progressRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'EduTrack API is running 🎓',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      students: '/api/students',
      progress: '/api/progress'
    }
  });
});

app.listen(PORT, () => {
  console.log(`EduTrack server running on http://localhost:${PORT}`);
});

export default app;