import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema(
  {
    tier: {
      type: String,
      enum: ['Diamond', 'Platinum', 'Gold', 'Silver'],
      required: true,
    },
    name: { type: String, required: true },
    logoUrl: { type: String, default: '' },
    logoPublicId: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Sponsor', sponsorSchema);
