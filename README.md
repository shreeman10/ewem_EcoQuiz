# E-Waste IQ

### Think smart. Dispose right.

E-Waste IQ is a short, interactive quiz that makes electronic waste management easier to understand. Learn how everyday disposal choices affect people and the planet, then track your progress as you improve.

<p align="center">
  <img src="ecoquiz/public/img/Screenshot%202026-10-14%20195328.png" width="28%" alt="E-Waste IQ landing page" />
  <img src="ecoquiz/public/img/Screenshot%202026-10-14%20195451.png" width="28%" alt="Quiz setup screen" />
  <img src="ecoquiz/public/img/Screenshot%202026-10-14%20195635.png" width="28%" alt="Personal dashboard" />
</p>

## The quiz

Choose a mode, category, difficulty, and question count:

- **Myth vs Facts** covers common misconceptions about batteries, data wiping, toxic materials, landfills, and recycling.
- **General MCQ Quiz** explores responsible device handling, circular economy principles, conflict minerals, and environmental impact.

Questions and answer choices are randomized. Every answer includes an explanation, turning each attempt into a quick lesson. Signed-in users can review their history, scores, streaks, and progress from the dashboard.

## Features

- 1,000 validated questions
- Google sign-in and protected user routes
- Adjustable quiz sessions with instant explanations
- Persistent history, statistics, and milestone badges
- Built with Next.js, TypeScript, Prisma, Supabase, and Tailwind CSS

## Run locally

```bash
cd ecoquiz
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning.

Validate the question bank and run tests with:

```bash
npm run validate:questions
npm test
```

## Deployment

The app is ready for Vercel. Use `ecoquiz` as the project root, add the Supabase and PostgreSQL environment variables, and configure Google OAuth with the `/auth/callback` URL.
