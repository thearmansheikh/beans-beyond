# Beans & Beyond — Local Setup Guide

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Included with Node |
| MongoDB | Atlas (free) | https://mongodb.com/atlas |
| Git | Any | https://git-scm.com |

---

## 1. Clone & Install

```bash
git clone https://github.com/your-username/beans-beyond.git
cd beans-beyond

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

---

## 2. Environment Variables

### Frontend
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

### Backend
```bash
cd backend
cp .env.example .env
```
Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/
JWT_SECRET=your_32_char_random_string_here
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
```

---

## 3. Run Development Servers

Open **two terminals**:

**Terminal 1 — Frontend:**
```bash
npm run dev
# → http://localhost:3000
```

**Terminal 2 — Backend:**
```bash
cd backend
npm run dev
# → http://localhost:5000
```

---

## 4. Admin Panel

Visit http://localhost:3000/admin

> Note: Admin auth is not yet implemented. In production, protect this route with middleware.

---

## 5. Useful Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `cd backend && npm run dev` | Start backend dev server |
| `cd backend && npm run build` | Compile TypeScript backend |
