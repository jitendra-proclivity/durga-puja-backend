import mongoose from 'mongoose';

const committeeMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    photoPublicId: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('CommitteeMember', committeeMemberSchema);
