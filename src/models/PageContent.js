import mongoose from 'mongoose';

// Singleton document holding the full content for every inner page section
// that isn't already covered by SiteContent (homepage teasers) or the
// dedicated Gallery/Event/Sponsor/CommitteeMember collections.
const pageContentSchema = new mongoose.Schema(
  {
    about: {
      introText: { type: String, default: '' },
      milestones: [{ year: String, title: String, text: String }],
      values: [{ icon: String, title: String, text: String }],
    },
    theme: {
      conceptText: { type: String, default: '' },
      process: [{ step: String, title: String, text: String }],
      materials: [{ icon: String, title: String, text: String }],
    },
    schedule: {
      days: [
        {
          name: String,
          date: String,
          events: [{ time: String, ritual: String, desc: String }],
        },
      ],
    },
    liveDarshan: {
      streamingSchedule: { type: String, default: '' },
    },
    map: {
      legend: [{ label: String, color: String }],
      directions: [{ icon: String, title: String, text: String }],
    },
    contact: {
      donationTiers: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model('PageContent', pageContentSchema);
