import SeoMeta from '../models/SeoMeta.js';

const PAGES = ['home', 'about', 'theme', 'schedule', 'gallery', 'live-darshan', 'map', 'events', 'contact'];

// Returns SEO docs for all pages, creating empty defaults for any page
// that doesn't have one yet.
export async function getAllSeo(req, res) {
  const existing = await SeoMeta.find();
  const byPage = Object.fromEntries(existing.map((d) => [d.page, d]));

  const missing = PAGES.filter((p) => !byPage[p]);
  if (missing.length) {
    await SeoMeta.insertMany(missing.map((page) => ({ page })));
  }

  const all = await SeoMeta.find().sort({ page: 1 });
  res.json(all);
}

export async function getSeoByPage(req, res) {
  const { page } = req.params;
  let doc = await SeoMeta.findOne({ page });
  if (!doc) doc = await SeoMeta.create({ page });
  res.json(doc);
}

export async function updateSeoByPage(req, res) {
  const { page } = req.params;
  if (!PAGES.includes(page)) {
    return res.status(400).json({ error: `Unknown page: ${page}` });
  }
  const { title, description, keywords, ogImageUrl } = req.body;

  const doc = await SeoMeta.findOneAndUpdate(
    { page },
    { $set: { title, description, keywords, ogImageUrl } },
    { new: true, upsert: true }
  );
  res.json(doc);
}
