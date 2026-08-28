import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    month: { type: String, required: true },
    tag: { type: String, default: '' },
    title: { type: String, required: true },
    time: { type: String, default: '' },
    description: { type: String, default: '' },
    eventDate: { type: Date, required: true },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
