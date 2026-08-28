import mongoose from 'mongoose';

// One document per page, keyed by a fixed `page` slug.
const seoMetaSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      enum: ['home', 'about', 'theme', 'schedule', 'gallery', 'live-darshan', 'map', 'events', 'contact'],
    },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: String, default: '' },
    ogImageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('SeoMeta', seoMetaSchema);
