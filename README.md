# EduTrack API

A REST API for tracking student progress — built with **Node.js**, **TypeScript**, and **Express**.

## What it does
Teachers can register, add students, record progress scores per subject, and view performance summaries.

## Tech Stack
- Node.js + TypeScript
- Express.js
- JWT Authentication
- JSON file storage

## API Endpoints
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Register a teacher |
| POST | `/api/auth/login` | ❌ | Login and get token |
| GET | `/api/students` | ✅ | List your students |
| POST | `/api/students` | ✅ | Add a student |
| POST | `/api/progress` | ✅ | Record progress |
| GET | `/api/progress/:studentId` | ✅ | Get student progress |
| GET | `/api/progress/:studentId/summary` | ✅ | Get performance summary |

## Getting Started
```bash
git clone https://github.com/trixie-dev/edutrack.git
cd edutrack
npm install
npm run dev
```

API runs on `http://localhost:3000`
