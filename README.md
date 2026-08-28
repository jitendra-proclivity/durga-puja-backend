# Durga Puja 2026 — Backend API

Express + MongoDB + Cloudinary API that powers the admin panel and (eventually) the
public website's content, images, events, sponsors, and SEO metadata.

## Folder structure
```
src/
  config/         MongoDB + Cloudinary connection setup
  middleware/      auth check + error handling
  models/          Mongoose schemas (Admin, SiteContent, SeoMeta, GalleryImage, Event, Sponsor)
  controllers/     the actual logic for each route
  routes/          route definitions (which URL maps to which controller)
  utils/           Cloudinary upload helper + admin seed script
  server.js        entry point — starts everything
```

## 1. Create accounts (do this first)

### MongoDB Atlas (free database)
1. Go to https://www.mongodb.com/cloud/atlas/register and sign up
2. Create a free (M0) cluster
3. Under **Database Access**, create a database user with a username/password
4. Under **Network Access**, click **Add IP Address** → **Allow Access From Anywhere** (0.0.0.0/0) — simplest for now, can be tightened later
5. Click **Connect** → **Drivers** → copy the connection string, it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the database user you created, and add `/durga-puja` before the `?` so it targets a database named `durga-puja`

### Cloudinary (free image hosting)
1. Go to https://cloudinary.com/users/register/free and sign up
2. On your Dashboard homepage, copy: **Cloud Name**, **API Key**, **API Secret**

## 2. Configure environment variables
```bash
cd durga-puja-backend
cp .env.example .env
```
Open `.env` and fill in:
- `MONGODB_URI` — from Atlas, step above
- `JWT_SECRET` — any long random string (e.g. generate one at https://randomkeygen.com)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from Cloudinary
- `SEED_ADMIN_USERNAME` / `SEED_ADMIN_PASSWORD` — the login you'll use for the admin panel. Pick a real password, not the placeholder.
- `CORS_ORIGIN` — the URL(s) of your admin panel and/or public site that are allowed to call this API. For local dev, the default (`http://localhost:5173,http://localhost:5174`) is fine.

## 3. Install and run locally
```bash
npm install
npm run seed      # creates your first admin login (run this once)
npm run dev        # starts the API on http://localhost:5000
```

Check it's alive: open http://localhost:5000/api/health in a browser — you should see `{"status":"ok"}`.

## 4. Deploy the backend (Render — recommended, has a free tier)
1. Push this `durga-puja-backend` folder to its own GitHub repo
2. Go to https://render.com → sign up → **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add all the same environment variables from your `.env` file under **Environment** in Render's dashboard (don't upload the `.env` file itself — Render doesn't need it, just the variables)
6. Deploy. Render gives you a URL like `https://durga-puja-backend.onrender.com`
7. Run the seed command once via Render's **Shell** tab: `npm run seed`
8. Update `CORS_ORIGIN` in Render's environment variables to include your real admin panel and site URLs once you know them (e.g. `https://durga-puja-2026-admin.vercel.app,https://durga-puja-2026.vercel.app`)

**Note:** Render's free tier "sleeps" after 15 minutes of no traffic and takes ~30s to wake up on the next request. Fine for a low-traffic admin panel; upgrade to a paid tier if that delay is a problem.

## API overview
All routes are prefixed with `/api`.

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/login` | — | Log in, returns a JWT |
| GET | `/auth/me` | ✓ | Check current logged-in admin |
| GET | `/content` | — | Get all site text content |
| PUT | `/content` | ✓ | Update site text content |
| GET | `/seo` | — | Get SEO data for all pages |
| GET | `/seo/:page` | — | Get SEO data for one page |
| PUT | `/seo/:page` | ✓ | Update SEO data for one page |
| GET | `/gallery` | — | List all gallery images |
| POST | `/gallery` | ✓ | Upload a new gallery image (multipart, field: `image`) |
| PUT | `/gallery/:id` | ✓ | Update an image's label/category |
| DELETE | `/gallery/:id` | ✓ | Delete an image |
| GET | `/events` | — | List all events |
| POST | `/events` | ✓ | Create an event (multipart, field: `image`) |
| PUT | `/events/:id` | ✓ | Update an event |
| DELETE | `/events/:id` | ✓ | Delete an event |
| GET | `/sponsors` | — | List all sponsors |
| POST | `/sponsors` | ✓ | Create a sponsor (multipart, field: `logo`) |
| PUT | `/sponsors/:id` | ✓ | Update a sponsor |
| DELETE | `/sponsors/:id` | ✓ | Delete a sponsor |

✓ = requires `Authorization: Bearer <token>` header (the admin panel handles this automatically once logged in).
