import PageContent from '../models/PageContent.js';

const DEFAULTS = {
  about: {
    introText: 'For decades, our puja has been more than a celebration — it is a promise kept, a culture preserved, and a bond strengthened with every heartbeat of this community.',
    milestones: [
      { year: '1954', title: 'The Journey Begins', text: 'A small initiative with a big dream.' },
      { year: '1980', title: 'Growing Stronger', text: 'More hands, more purpose.' },
      { year: '2026', title: 'Continuing The Legacy', text: 'Honoring tradition, embracing the future.' },
    ],
    values: [
      { icon: '🤝', title: 'Unity', text: 'Every ritual, every rehearsal, every night of setup is a shared effort across generations of families.' },
      { icon: '🪔', title: 'Devotion', text: "The puja is planned and executed as an act of faith first." },
      { icon: '🎭', title: 'Culture', text: 'From dhaak performances to youth theatre, we treat the pandal as a living stage for Bengali heritage.' },
      { icon: '❤️', title: 'Service', text: 'Free community meals, blood donation camps, and support for local artisans.' },
    ],
  },
  theme: {
    conceptText: 'Shashwat, meaning "eternal" in Sanskrit, is a meditation on continuity.',
    process: [
      { step: '01', title: 'Concept Art', text: 'The theme committee sketched the founding idea.' },
      { step: '02', title: 'Mood Board', text: 'References were gathered to define the palette.' },
      { step: '03', title: '3D Render', text: 'A full walkthrough render for committee sign-off.' },
      { step: '04', title: 'Artist Sketch', text: 'Translated into hand-drawn construction plans.' },
      { step: '05', title: 'Behind The Scenes', text: 'Artisans and volunteers bring it to life.' },
    ],
    materials: [
      { icon: '🎋', title: 'Bamboo & Cane', text: 'Structural framework from sustainable local growers.' },
      { icon: '🏺', title: 'Terracotta & Clay', text: 'Hand-thrown panels by local artisans.' },
      { icon: '🧵', title: 'Natural Dyes', text: 'Textiles dyed using traditional plant-based pigments.' },
      { icon: '💡', title: 'Low-Energy Lighting', text: 'LED installations cutting festival power draw.' },
    ],
  },
  schedule: {
    days: [
      { name: 'Mahalaya', date: '17 September 2026, Thursday', events: [
        { time: '05:30 AM', ritual: 'Chandipath & Agomoni Recital', desc: 'Community gathering to mark the invocation.' },
      ] },
      { name: 'Shashthi', date: '22 September 2026, Tuesday', events: [
        { time: '06:00 AM', ritual: 'Mangal Aroti', desc: 'Opening prayers.' },
        { time: '05:00 PM', ritual: 'Bodhon & Amantran', desc: 'Ceremonial invitation of the Goddess.' },
      ] },
      { name: 'Saptami', date: '23 September 2026, Wednesday', events: [
        { time: '08:00 AM', ritual: 'Pushpaanjali', desc: 'Collective flower offering.' },
        { time: '07:30 PM', ritual: 'Celebrity Night', desc: 'Live cultural performance.' },
      ] },
      { name: 'Ashtami', date: '24 September 2026, Thursday', events: [
        { time: '04:00 PM', ritual: 'Sandhi Puja', desc: 'The most sacred 48-minute window.' },
      ] },
      { name: 'Navami', date: '25 September 2026, Friday', events: [
        { time: '12:30 PM', ritual: 'Maha Bhog', desc: 'The largest community feast.' },
      ] },
      { name: 'Dashami', date: '26 September 2026, Saturday', events: [
        { time: '10:00 PM', ritual: 'Immersion (Bisorjon)', desc: 'Farewell procession to the river.' },
      ] },
    ],
  },
  liveDarshan: {
    streamingSchedule: 'Shashthi – Dashami, 6:00 AM – 11:00 PM IST daily.',
  },
  map: {
    legend: [
      { label: 'Entry', color: '#e85d5d' }, { label: 'Exit', color: '#6ea8d8' },
      { label: 'Food Court', color: '#e8c281' }, { label: 'Parking', color: '#7fb3a3' },
    ],
    directions: [
      { icon: '🚇', title: 'By Metro', text: 'Nearest station: Shyambazar (12 min walk).' },
      { icon: '🚌', title: 'By Bus', text: 'Routes stop at the main gate.' },
      { icon: '🚗', title: 'By Car', text: 'Free parking at the G.T. Road lot.' },
      { icon: '🚶', title: 'On Foot', text: 'Accessible from Telipukur crossing.' },
    ],
  },
  contact: {
    donationTiers: ['₹501', '₹1,101', '₹2,501', '₹5,001'],
  },
};

async function getOrCreate() {
  let doc = await PageContent.findOne();
  if (!doc) doc = await PageContent.create(DEFAULTS);
  return doc;
}

export async function getPageContent(req, res) {
  const doc = await getOrCreate();
  res.json(doc);
}

export async function updatePageContent(req, res) {
  const doc = await getOrCreate();
  const { about, theme, schedule, liveDarshan, map, contact } = req.body;

  if (about) doc.about = about;
  if (theme) doc.theme = theme;
  if (schedule) doc.schedule = schedule;
  if (liveDarshan) doc.liveDarshan = liveDarshan;
  if (map) doc.map = map;
  if (contact) doc.contact = contact;

  await doc.save();
  res.json(doc);
}
