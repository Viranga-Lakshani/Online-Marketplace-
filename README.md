# Online Marketplace 

Full-stack JavaScript marketplace starter:
- Frontend: Vite + React
- Backend: Node.js + Express + TypeScript
- DB: PostgreSQL + Prisma
- Auth: Email/password (bcrypt) + JWT
- Payments: Stripe ready (keys in env), not wired to production flows yet

Features included:
- User registration and login (JWT)
- User profile model
- Listing model (create/read)
- Prisma migrations and seed helper
- Docker compose for local Postgres + backend
- Minimal React UI for auth and listings

Quick start (development)
1. Copy env files:
   - backend/.env.example -> backend/.env
   - frontend/.env.example -> frontend/.env

2. Start Postgres (locally or with docker-compose):
   - docker-compose up -d

3. Backend
   - cd backend
   - npm install
   - npx prisma migrate dev --name init
   - npm run dev

4. Frontend
   - cd frontend
   - npm install
   - npm run dev

Environment variables
- backend/.env (example)
  - DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketplace
  - JWT_SECRET=change_me
  - PORT=4000
  - STRIPE_SECRET_KEY=sk_test_...

- frontend/.env (example)
  - VITE_API_URL=http://localhost:4000/api

Notes
- This is a starter. Add validations, rate limiting, password reset, uploads (S3), Stripe Checkout + Connect, admin UI, tests, and CI as next steps.
- If you want, I can push this repo to GitHub under your account and add CI/workflows.
