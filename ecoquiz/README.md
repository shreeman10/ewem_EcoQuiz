# E-Waste IQ — Think Smart. Dispose Right.

A production-ready, dark-themed educational quiz web application for mastering electronic waste management, debunking e-waste myths, understanding environmental toxicology, and building responsible disposal habits.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma ORM, **Supabase PostgreSQL**, and **Supabase Auth (Google OAuth)**.

---

## 🌟 Key Features

1. **Two Core Quiz Modes**:
   - **Mode 1: Myth vs Facts** (400 questions): Fast-paced evaluation of common misconceptions about data erasure, battery fires, landfill degradation, and informal scrap hazards.
   - **Mode 2: General MCQ Quiz** (600 questions): Deep multiple-choice questions across three specialized categories:
     - *General E-Waste Principles*: Circular economy, WEEE directives, certified e-Stewards, right-to-repair.
     - *Device-Based Knowledge*: Smartphones, CRT monitors, mercury fluorescent backlights, enterprise SSD sanitization.
     - *Environmental Impact*: Heavy metal groundwater leaching, bioaccumulation, conflict minerals (3TG), and carbon footprints.

2. **1,000 Validated Questions Bank**:
   - Stored in `data/questions.json` with strict Zod schema validation.
   - Every question contains an unambiguous correct answer, stable unique ID, and scientific educational explanation.

3. **Dynamic Randomization & Anti-Repetition**:
   - Server-side Fisher-Yates unbiased shuffle for both question orders and MCQ answer options.
   - Answer correctness evaluated by stable values, never option position.
   - Tracks seen questions to avoid immediate repetition.

4. **Supabase Authentication (Google OAuth Only)**:
   - Configured with Supabase SSR (`@supabase/ssr`) and Google OAuth.
   - Protected user routes: `/dashboard`, `/quiz`, and `/profile`.
   - Automatic OAuth callback handler (`/auth/callback`).

5. **Persistence & Performance Tracking (Supabase PostgreSQL)**:
   - Prisma ORM data models: `UserProfile`, `QuizAttempt`, and `QuizAttemptAnswer`.
   - Configured with `DATABASE_URL` (transaction pooler for Vercel serverless) and `DIRECT_URL` (session pooler for migrations).
   - Milestone badges: *Recycling Rookie*, *Myth Buster*, *Eco Expert*, and *Daily Champion*.

---

## 🚀 Vercel Deployment Guide

### Step 1: Push Code to GitHub
Push this repository to your GitHub account:
```bash
git add .
git commit -m "Configure Supabase Auth, PostgreSQL DB, and Vercel compatibility"
git push origin main
```

### Step 2: Import into Vercel
1. Go to [Vercel](https://vercel.com) and click **"Add New Project"** > **"Import Git Repository"**.
2. Select the repository and set the **Root Directory** to `ecoquiz`.

### Step 3: Add Environment Variables in Vercel
In the Vercel project settings, add the following Environment Variables under **Settings > Environment Variables**:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-supabase-anon-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-supabase-service-role-key` |
| `DATABASE_URL` | `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres` |

### Step 4: Configure Supabase Redirect URLs
1. In your **Supabase Dashboard**, navigate to **Authentication** > **URL Configuration**.
2. Set the **Site URL** to your Vercel URL (e.g. `https://your-project.vercel.app` or `http://localhost:3000` for local dev).
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback`
   - `https://your-project.vercel.app/auth/callback`
   - `https://*.vercel.app/auth/callback` (for preview deployments)
4. Under **Authentication** > **Providers** > **Google**:
   - Ensure Google provider is enabled with your Google Cloud OAuth Client ID & Client Secret.

---

## 💻 Local Development

```bash
cd ecoquiz
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

To run validation and tests:
```bash
npm run validate:questions
npm test
```
