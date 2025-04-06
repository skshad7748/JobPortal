import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { User } from '../models/user.model.js';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});

    // Read JSON files
    const usersData = JSON.parse(
      await fs.readFile(join(__dirname, '../data/users.json'), 'utf-8')
    );
    const companiesData = JSON.parse(
      await fs.readFile(join(__dirname, '../data/companies.json'), 'utf-8')
    );
    const jobsData = JSON.parse(
      await fs.readFile(join(__dirname, '../data/jobs.json'), 'utf-8')
    );

    // Hash passwords for users
    const hashedUsers = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await bcrypt.hash('password123', 10)
      }))
    );

    // Insert users
    const users = await User.insertMany(hashedUsers);
    console.log('Users seeded successfully');

    // Get recruiter user
    const recruiter = users.find(user => user.role === 'recruiter');

    // Add userId to companies and insert
    const companiesWithUser = companiesData.map(company => ({
      ...company,
      userId: recruiter._id
    }));
    const companies = await Company.insertMany(companiesWithUser);
    console.log('Companies seeded successfully');

    // Update recruiter with company
    await User.findByIdAndUpdate(recruiter._id, {
      'profile.company': companies[0]._id
    });

    // Add company and created_by to jobs and insert
    const jobsWithRelations = jobsData.map((job, index) => ({
      ...job,
      company: companies[index % companies.length]._id,
      created_by: recruiter._id
    }));
    await Job.insertMany(jobsWithRelations);
    console.log('Jobs seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 