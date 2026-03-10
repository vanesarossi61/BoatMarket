# BoatMarket

Marketplace de embarcaciones y productos nauticos. Plataforma completa para compra, venta y busqueda de embarcaciones con tienda integrada de productos alternativos (motores, trailers, electronica, accesorios).

## Tech Stack

- **Framework:** Next.js 15+ (App Router, Server Components, Turbopack)
- **CMS:** Payload CMS 3.0 (embedded in Next.js)
- **Database:** PostgreSQL 16 + Prisma ORM 6
- **Search:** Meilisearch (faceted search, sub-50ms)
- **Auth:** NextAuth.js v5 (roles: Admin, Dealer, Seller, Buyer)
- **Payments:** Stripe (for alternative products)
- **Media:** Cloudinary (AVIF/WebP, transformations)
- **Email:** Resend (transactional emails)
- **Cache:** Redis (sessions, rate limiting)
- **UI:** Tailwind CSS 4 + Shadcn/ui + Framer Motion
- **Maps:** Mapbox GL
- **Analytics:** Google Analytics 4 + Vercel Analytics

## Quick Start

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- pnpm (recommended) or npm

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/vanesarossi61/BoatMarket.git
cd BoatMarket

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp env.example .env.local
# Edit .env.local with your values

# 4. Start infrastructure (PostgreSQL, Meilisearch, Redis)
pnpm docker:up

# 5. Generate Prisma client and run migrations
pnpm db:generate
pnpm db:migrate

# 6. Seed the database with sample data
pnpm db:seed

# 7. Setup Meilisearch indices
pnpm search:setup

# 8. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload CMS admin panel.

## Project Structure

```
boatmarket/
|-- app/                    # Next.js App Router pages
|   |-- (public)/           # Public routes (home, listings, products)
|   |-- (auth)/             # Auth routes (login, register)
|   |-- (dashboard)/        # Seller/Dealer dashboard
|   |-- (admin)/            # Payload CMS admin
|   |-- api/                # API routes + Payload endpoints
|   |-- sitemap.xml/        # Dynamic sitemap
|   +-- robots.txt/         # Dynamic robots.txt
|-- components/
|   |-- ui/                 # Shadcn base components
|   |-- layout/             # Header, Footer, Nav, Breadcrumb
|   |-- boats/              # Boat-specific components
|   |-- products/           # Product-specific components
|   |-- search/             # Search, filters, map view
|   |-- forms/              # Inquiry, listing, review forms
|   |-- seo/                # JSON-LD, meta tags, breadcrumbs
|   +-- shared/             # Gallery, price display, compare
|-- collections/            # Payload CMS collections
|-- lib/                    # Utilities and helpers
|   |-- db/                 # Prisma client
|   |-- search/             # Meilisearch client & indices
|   |-- auth/               # NextAuth config
|   |-- stripe/             # Payment helpers
|   |-- cloudinary/         # Media upload helpers
|   |-- email/              # Email templates (Resend)
|   |-- seo/                # Schema.org generators
|   +-- utils/              # Formatters, validators, constants
|-- prisma/
|   |-- schema.prisma       # Database schema (25+ models)
|   +-- seed.ts             # Sample data seeder
|-- types/                  # TypeScript type definitions
|-- hooks/                  # Custom React hooks
|-- styles/                 # Global CSS
|-- public/                 # Static assets
+-- docker-compose.yml      # Local infrastructure
```

## Key Features

### For Buyers
- Advanced faceted search (type, price, year, length, location, brand, fuel, condition)
- Interactive map view with location-based filtering
- Boat comparison tool (up to 3 side-by-side)
- Financing calculator and cost-of-ownership estimator
- Search alerts (get notified when matching boats are listed)
- Favorites and saved searches

### For Sellers/Dealers
- Comprehensive listing form with 50+ specification fields
- Dashboard with leads, analytics, and listing management
- Internal messaging with potential buyers
- Featured listing upgrades
- Verified dealer badges

### Alternative Products Store
- 11 product categories (motors, trailers, electronics, safety, etc.)
- Boat-product compatibility system
- Shopping cart with Stripe checkout
- Smart bundles and cross-selling
- Inventory management with low-stock alerts

### SEO
- JSON-LD schema markup (Product, Vehicle, LocalBusiness, FAQ, Breadcrumb)
- Dynamic sitemap with page-type priorities
- SEO-friendly URLs: /embarcaciones/lanchas/bowrider/brand-model-year-city
- AI-generated meta tags based on specifications
- Core Web Vitals optimized (LCP < 2.2s, INP < 200ms, CLS < 0.1)

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:seed` | Seed sample data |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm search:setup` | Configure Meilisearch indices |
| `pnpm docker:up` | Start PostgreSQL + Meilisearch + Redis |
| `pnpm docker:down` | Stop infrastructure |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript checks |

## Environment Variables

See `env.example` for all required and optional variables.

## License

Private - All rights reserved.
