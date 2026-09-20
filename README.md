# Nova — Full-Stack Ecommerce Demo

A sleek, production-style ecommerce demo built for portfolio use.

## Features

- **Product Catalog** — Fetched from database, filter by category, sort
- **Product Detail** — Gallery, quantity, related products (from DB)
- **Shopping Cart** — Persistent (Zustand + localStorage)
- **Checkout** — Saves real orders + order items to the database
- **Authentication** — Register / Login with bcrypt + JWT (httpOnly cookie)
- **Roles** — USER and ADMIN
- **Admin CRUD** — Create / Delete products (protected)
- **My Orders** — View order history when logged in
- **Responsive** + Framer Motion animations

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Prisma + SQLite
- Zustand (cart)
- jose + bcryptjs (auth)
- Server Actions
- Tailwind CSS 4 + Framer Motion

## Quick Start

```bash
npm install
npm run db:setup      # creates DB + seeds products & users
npm run dev
```

Open http://localhost:3000

### Demo Accounts

| Role  | Email              | Password  |
|-------|--------------------|-----------|
| User  | demo@nova.demo     | demo123   |
| Admin | admin@nova.demo    | admin123  |

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Home (featured products from DB) |
| `/products` | Shop with filters |
| `/products/[id]` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout (persists order) |
| `/orders` | My Orders (login required) |
| `/admin` | Admin panel (admin only) |
| `/auth/login` | Login |
| `/auth/register` | Register |

## Database Commands

```bash
npm run db:generate
npm run db:push
npm run db:seed
npm run db:setup      # push + seed
```

## Notes

- After `db:setup` the 8 seed products and 2 users are available.
- Cart works offline (localStorage). Orders are saved to SQLite when you complete checkout.
- Admin routes redirect to login if not authenticated as ADMIN.

Perfect as a full-stack portfolio piece.
