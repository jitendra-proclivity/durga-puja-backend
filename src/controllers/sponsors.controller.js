import Sponsor from '../models/Sponsor.js';
import { uploadBuffer, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

export async function listSponsors(req, res) {
  const sponsors = await Sponsor.find().sort({ order: 1, tier: 1 });
  res.json(sponsors);
}

export async function createSponsor(req, res) {
  const { tier, name, order } = req.body;
  if (!tier || !name) {
    return res.status(400).json({ error: 'tier and name are required' });
  }

  let logoUrl = '';
  let logoPublicId = '';
  if (req.file) {
    const uploaded = await uploadBuffer(req.file.buffer, 'durga-puja-2026/sponsors');
    logoUrl = uploaded.url;
    logoPublicId = uploaded.publicId;
  }

  const sponsor = await Sponsor.create({ tier, name, order, logoUrl, logoPublicId });
  res.status(201).json(sponsor);
}

export async function updateSponsor(req, res) {
  const { id } = req.params;
  const sponsor = await Sponsor.findById(id);
  if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });

  const { tier, name, order } = req.body;
  Object.assign(sponsor, {
    tier: tier ?? sponsor.tier,
    name: name ?? sponsor.name,
    order: order ?? sponsor.order,
  });

  if (req.file) {
    await deleteFromCloudinary(sponsor.logoPublicId);
    const uploaded = await uploadBuffer(req.file.buffer, 'durga-puja-2026/sponsors');
    sponsor.logoUrl = uploaded.url;
    sponsor.logoPublicId = uploaded.publicId;
  }

  await sponsor.save();
  res.json(sponsor);
}

export async function deleteSponsor(req, res) {
  const { id } = req.params;
  const sponsor = await Sponsor.findById(id);
  if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });

  await deleteFromCloudinary(sponsor.logoPublicId);
  await sponsor.deleteOne();
  res.json({ success: true });
}
