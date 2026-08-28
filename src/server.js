import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.routes.js';
import contentRoutes from './routes/content.routes.js';
import seoRoutes from './routes/seo.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import eventsRoutes from './routes/events.routes.js';
import sponsorsRoutes from './routes/sponsors.routes.js';
import pageContentRoutes from './routes/pageContent.routes.js';
import committeeRoutes from './routes/committee.routes.js';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
}));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', service: 'durga-puja-2026 API' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sponsors', sponsorsRoutes);
app.use('/api/page-content', pageContentRoutes);
app.use('/api/committee', committeeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
