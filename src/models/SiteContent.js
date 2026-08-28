import mongoose from 'mongoose';

// Singleton document — there is only ever one SiteContent record.
// Mirrors the text fields used across the homepage sections.
const siteContentSchema = new mongoose.Schema(
  {
    hero: {
      scriptText: { type: String, default: 'দুর্গা পূজা ২০২৬' },
      title: { type: String, default: 'Durga Puja 2026' },
      subtitle: { type: String, default: 'A tradition of devotion, a legacy of togetherness.' },
      place: { type: String, default: 'Kolkata, India' },
      mahalayaDate: { type: String, default: '2026-09-17T00:00:00' },
    },
    about: {
      eyebrow: { type: String, default: 'Our Legacy' },
      heading: { type: String, default: 'About Telipukur Yuba Sangha & Nursery Bagan Adivasi Brinda' },
      text: { type: String, default: '' },
      stats: [
        {
          value: String,
          label: String,
        },
      ],
    },
    theme: {
      eyebrow: { type: String, default: 'Theme 2026' },
      name: { type: String, default: 'Shashwat (Sanatan)' },
      tagline: { type: String, default: 'Eternal Roots. Timeless Spirit.' },
      description: { type: String, default: '' },
    },
    contact: {
      address: { type: String, default: 'Telipukur, G.T. Road, Kolkata – 700 034, India' },
      phone: { type: String, default: '+91 33745 47890' },
      email: { type: String, default: 'info@telipukuryubasangha.org' },
      officeHours: { type: String, default: 'Daily, 10 AM – 7 PM' },
    },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteContent', siteContentSchema);
