import CommitteeMember from '../models/CommitteeMember.js';
import { uploadBuffer, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

export async function listMembers(req, res) {
  const members = await CommitteeMember.find().sort({ order: 1, createdAt: 1 });
  res.json(members);
}

export async function createMember(req, res) {
  const { name, role = '', order = 0 } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  let photoUrl = '';
  let photoPublicId = '';
  if (req.file) {
    const uploaded = await uploadBuffer(req.file.buffer, 'durga-puja-2026/committee');
    photoUrl = uploaded.url;
    photoPublicId = uploaded.publicId;
  }

  const member = await CommitteeMember.create({ name, role, order, photoUrl, photoPublicId });
  res.status(201).json(member);
}

export async function updateMember(req, res) {
  const { id } = req.params;
  const member = await CommitteeMember.findById(id);
  if (!member) return res.status(404).json({ error: 'Member not found' });

  const { name, role, order } = req.body;
  Object.assign(member, {
    name: name ?? member.name,
    role: role ?? member.role,
    order: order ?? member.order,
  });

  if (req.file) {
    await deleteFromCloudinary(member.photoPublicId);
    const uploaded = await uploadBuffer(req.file.buffer, 'durga-puja-2026/committee');
    member.photoUrl = uploaded.url;
    member.photoPublicId = uploaded.publicId;
  }

  await member.save();
  res.json(member);
}

export async function deleteMember(req, res) {
  const { id } = req.params;
  const member = await CommitteeMember.findById(id);
  if (!member) return res.status(404).json({ error: 'Member not found' });

  await deleteFromCloudinary(member.photoPublicId);
  await member.deleteOne();
  res.json({ success: true });
}
