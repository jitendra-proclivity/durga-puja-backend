import GalleryImage from '../models/GalleryImage.js';
import { uploadBuffer, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

export async function listImages(req, res) {
  const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
  res.json(images);
}

export async function createImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded (field name: "image")' });
  }
  const { label = '', category = 'Pandal', order = 0 } = req.body;

  const { url, publicId } = await uploadBuffer(req.file.buffer, 'durga-puja-2026/gallery');
  const image = await GalleryImage.create({ url, publicId, label, category, order });
  res.status(201).json(image);
}

export async function updateImage(req, res) {
  const { id } = req.params;
  const { label, category, order } = req.body;
  const image = await GalleryImage.findByIdAndUpdate(
    id,
    { $set: { label, category, order } },
    { new: true }
  );
  if (!image) return res.status(404).json({ error: 'Image not found' });
  res.json(image);
}

export async function deleteImage(req, res) {
  const { id } = req.params;
  const image = await GalleryImage.findById(id);
  if (!image) return res.status(404).json({ error: 'Image not found' });

  await deleteFromCloudinary(image.publicId);
  await image.deleteOne();
  res.json({ success: true });
}
