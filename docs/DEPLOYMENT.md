# Beans & Beyond — Deployment Guide

## Frontend → Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com → New Project → Import repo
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` → your Railway backend URL
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
4. Deploy — Vercel auto-deploys on every `git push`
5. Set custom domain: `bbcafe.co.uk` in Vercel → Domains

---

## Backend → Railway (Recommended)

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select the `backend/` folder
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL` → your Vercel URL
   - `STRIPE_SECRET_KEY`
4. Railway auto-generates a URL (e.g. `https://beans-beyond-api.up.railway.app`)

---

## Database → MongoDB Atlas

1. Create free cluster at https://mongodb.com/atlas
2. Create database user
3. Whitelist `0.0.0.0/0` (or Railway's IP)
4. Copy connection string → paste as `MONGODB_URI`

---

## Domain Setup (bbcafe.co.uk)

1. In your domain registrar (e.g. GoDaddy, Namecheap):
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21` (Vercel)
2. Add `bbcafe.co.uk` and `www.bbcafe.co.uk` in Vercel → Domains
3. SSL is automatic via Vercel

---

## Pre-Launch Checklist

- [ ] Real food photography added
- [ ] Google Maps embed URL updated
- [ ] Real phone number in constants.ts
- [ ] Stripe live keys configured
- [ ] MongoDB Atlas production cluster
- [ ] SMTP email service connected (SendGrid / Mailgun)
- [ ] Google Analytics GA4 ID added
- [ ] Google Search Console sitemap submitted
- [ ] GDPR cookie banner added
- [ ] Privacy Policy and Terms pages populated
- [ ] Lighthouse score 90+ on all pages
- [ ] Mobile tested on real device
