import SiteContent from '../models/SiteContent.js';

// There is only ever one SiteContent document. Create it with defaults
// on first read if it doesn't exist yet.
async function getOrCreateContent() {
  let doc = await SiteContent.findOne();
  if (!doc) {
    doc = await SiteContent.create({});
  }
  return doc;
}

export async function getContent(req, res) {
  const doc = await getOrCreateContent();
  res.json(doc);
}

export async function updateContent(req, res) {
  const doc = await getOrCreateContent();
  const { hero, about, theme, contact, social } = req.body;

  if (hero) doc.hero = { ...doc.hero.toObject(), ...hero };
  if (about) doc.about = { ...doc.about.toObject(), ...about };
  if (theme) doc.theme = { ...doc.theme.toObject(), ...theme };
  if (contact) doc.contact = { ...doc.contact.toObject(), ...contact };
  if (social) doc.social = { ...doc.social.toObject(), ...social };

  await doc.save();
  res.json(doc);
}
