# Job Portal Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) job portal application where students can find jobs and recruiters can post job opportunities.

## Quick Start

1. Install MongoDB locally or use MongoDB Atlas
2. Set up environment variables in `backend/.env`:

   ```
   MONGO_URI=mongodb://localhost:27017/jobportal
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   ```

3. Install dependencies and run servers:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Run backend server
   npm run dev

   # Install frontend dependencies (in a new terminal)
   cd frontend
   npm install

   # Run frontend server
   npm run dev
   ```

## Sample Login Credentials

### Student Accounts

1. First Student

   - Email: john.doe@example.com
   - Password: password123
   - Role: Student
   - Skills: JavaScript, React, Node.js

2. Second Student
   - Email: jane.smith@example.com
   - Password: password123
   - Role: Student
   - Skills: Python, Django, PostgreSQL

### Recruiter Account

1. TechCorp Recruiter
   - Email: mike.johnson@techcorp.com
   - Password: password123
   - Role: Recruiter
   - Company: TechCorp

## Available Job Listings

1. Full Stack Developer

   - Company: TechCorp
   - Location: New York, NY
   - Salary: $95,000
   - Experience: 3 years

2. Senior Python Developer

   - Company: InnovateSoft
   - Location: San Francisco, CA
   - Salary: $120,000
   - Experience: 5 years

3. Data Scientist
   - Company: DataTech Solutions
   - Location: Boston, MA
   - Salary: $110,000
   - Experience: 4 years

## Features

- User authentication (Student/Recruiter)
- Job posting (Recruiter)
- Job application (Student)
- Company profiles
- User profiles with skills and resume upload
- Job search and filtering

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
