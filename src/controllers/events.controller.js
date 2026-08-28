import Event from '../models/Event.js';
import { uploadBuffer, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

export async function listEvents(req, res) {
  const events = await Event.find().sort({ order: 1, eventDate: 1 });
  res.json(events);
}

export async function createEvent(req, res) {
  const { day, month, tag, title, time, description, eventDate, order } = req.body;
  if (!day || !month || !title || !eventDate) {
    return res.status(400).json({ error: 'day, month, title, and eventDate are required' });
  }

  let imageUrl = '';
  let imagePublicId = '';
  if (req.file) {
    const uploaded = await uploadBuffer(req.file.buffer, 'durga-puja-2026/events');
    imageUrl = uploaded.url;
    imagePublicId = uploaded.publicId;
  }

  const event = await Event.create({
    day, month, tag, title, time, description, eventDate, order,
    imageUrl, imagePublicId,
  });
  res.status(201).json(event);
}

export async function updateEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ error: 'Event not found' });

  const { day, month, tag, title, time, description, eventDate, order } = req.body;
  Object.assign(event, {
    day: day ?? event.day,
    month: month ?? event.month,
    tag: tag ?? event.tag,
    title: title ?? event.title,
    time: time ?? event.time,
    description: description ?? event.description,
    eventDate: eventDate ?? event.eventDate,
    order: order ?? event.order,
  });

  if (req.file) {
    await deleteFromCloudinary(event.imagePublicId);
    const uploaded = await uploadBuffer(req.file.buffer, 'durga-puja-2026/events');
    event.imageUrl = uploaded.url;
    event.imagePublicId = uploaded.publicId;
  }

  await event.save();
  res.json(event);
}

export async function deleteEvent(req, res) {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ error: 'Event not found' });

  await deleteFromCloudinary(event.imagePublicId);
  await event.deleteOne();
  res.json({ success: true });
}
