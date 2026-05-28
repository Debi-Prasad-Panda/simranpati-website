# Art & Words by Simran

A Next.js (App Router) portfolio and writing platform with admin editing, built for SEO and security.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (custom palette)
- Auth.js (Credentials)
- Vercel Postgres
- Vercel Blob
- Resend (contact form)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file using the template:

   ```bash
   cp .env.example .env.local
   ```

3. Create database tables using `sql/schema.sql`.

4. Add an admin user (example):

   ```sql
   INSERT INTO users (name, email, password_hash, role)
   VALUES ('Admin', 'admin@example.com', '<bcrypt-hash>', 'admin');
   ```

5. Start the dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - start local dev
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint

## SEO

- Metadata per page
- JSON-LD for Person and Article
- `sitemap.xml` and `robots.txt`
- Canonical URLs via `NEXT_PUBLIC_SITE_URL`

## Admin

- `/admin/login` for sign-in
- `/admin` for content editing

## Notes

- Replace placeholder images and update `NEXT_PUBLIC_SITE_URL` before launch.
- The in-memory rate limiter is per-instance. For production, consider Upstash or similar.
