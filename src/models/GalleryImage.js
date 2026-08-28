import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    label: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Pandal', 'Idol', 'Culture', 'Drone Shots', 'Videos'],
      default: 'Pandal',
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryImage', galleryImageSchema);
