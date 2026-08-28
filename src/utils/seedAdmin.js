import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';
import mongoose from 'mongoose';

async function run() {
  const username = process.env.SEED_ADMIN_USERNAME;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('Set SEED_ADMIN_USERNAME and SEED_ADMIN_PASSWORD in .env before seeding.');
    process.exit(1);
  }

  await connectDB();

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" already exists — nothing to do.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ username, passwordHash });
    console.log(`Created admin user "${username}". You can log in with this username and the password from .env.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run();
