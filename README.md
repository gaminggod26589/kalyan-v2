# Kalyan Physiotherapy — Full-Stack Website

A production-ready clinic website for **Kalyan Physiotherapy**, built with Next.js 15, Tailwind CSS v4, Framer Motion, Node.js (Express), and MongoDB.

---

## Project Structure

```
API folder/
├── kalyan-v2/              ← Frontend (Next.js)
│   ├── app/
│   │   ├── layout.js       ← Root layout (Navbar + Footer, fonts, SEO)
│   │   ├── globals.css     ← Design system (colours, tokens, utilities)
│   │   ├── page.js         ← Home page
│   │   ├── about/page.js   ← About page
│   │   ├── services/page.js← Services page
│   │   ├── appointments/page.js ← Booking form
│   │   └── contact/page.js ← Contact + map
│   └── components/
│       ├── Navbar.js        ← Sticky nav + mobile drawer
│       ├── Footer.js        ← 4-col footer
│       └── AnimatedSection.js ← Framer Motion scroll wrapper
│
└── kalyan-backend/         ← Backend (Express + MongoDB)
    ├── server.js            ← All API endpoints in one file
    ├── package.json
    └── .env.example
```

---

## Frontend Setup

```bash
cd "kalyan-v2"
npm install
npm run dev
```

Open **http://localhost:3000**

### Environment Variables (Frontend)

Create `kalyan-v2/.env.local`:

```env
# URL of your deployed backend (leave blank to use http://localhost:5000)
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## Backend Setup

```bash
cd "kalyan-backend"
npm install

# Copy environment file and fill in your values
cp .env.example .env
```

Edit `.env` with your **MongoDB URI** and **JWT secret**, then:

```bash
npm run dev    # development (nodemon, auto-restart)
npm start      # production
```

The server starts on **http://localhost:5000**

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/health` | Public | Server health check |
| `POST` | `/api/auth/login` | Public | Admin login → returns JWT |
| `POST` | `/api/appointments` | Public | Create appointment booking |
| `GET` | `/api/appointments` | JWT Bearer | List all appointments |

### Example: Book Appointment

```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "phone": "+91 98765 43210",
    "email": "rajesh@example.com",
    "service": "Spine & Back Care",
    "date": "2025-03-01",
    "time": "10:00 AM",
    "message": "Chronic lower back pain for 6 months"
  }'
```

---

## Deployment

### Frontend — Vercel (Recommended, free)

1. Push `kalyan-v2/` to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
3. Set root directory to `kalyan-v2`
4. Add env var: `NEXT_PUBLIC_API_URL=<your backend URL>`
5. Click **Deploy** ✅

### Backend — Render (Recommended, free tier)

1. Push `kalyan-backend/` to GitHub
2. Go to [render.com](https://render.com) → **New Web Service** → Connect repo
3. Set **Build Command**: `npm install` | **Start Command**: `node server.js`
4. Add all variables from `.env.example` in the dashboard
5. Deploy ✅

> **Tip**: Copy the Render URL and set it as `NEXT_PUBLIC_API_URL` in Vercel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Fonts | Inter + Playfair Display |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Deployment | Vercel + Render |

---

## Customisation

| What to change | Where |
|---------------|-------|
| Address, phone, email | `components/Footer.js`, `app/contact/page.js` |
| Doctor names & bios | `app/about/page.js` |
| Services offered | `app/services/page.js`, `app/page.js` |
| Google Maps embed | `app/contact/page.js` → replace `iframe src` URL |
| Brand colours | `app/globals.css` → `:root` variables |
| Admin credentials | `kalyan-backend/.env` |
