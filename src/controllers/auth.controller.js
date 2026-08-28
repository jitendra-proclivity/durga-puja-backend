import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, username: admin.username });
}

// Lets the admin panel verify a stored token is still valid on load.
export async function me(req, res) {
  const admin = await Admin.findById(req.adminId).select('username');
  if (!admin) return res.status(404).json({ error: 'Admin not found' });
  res.json({ username: admin.username });
}
