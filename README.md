# Block 13 Tattoo Studio

Website for **Block 13 Tattoo Studio** — a professional tattoo studio based in Germany. The platform supports booking appointments, browsing the lookbook, managing artists, selling products and gift cards, and running a full admin panel.

**Live site:** [block13tattoo.com](https://www.block13tattoo.com)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 · Shadcn UI |
| State / Data | TanStack React Query v5 |
| Forms | React Hook Form · Zod |
| i18n | next-intl (English · German) |
| Animation | Framer Motion |
| Images | Cloudinary |
| Package Manager | pnpm |

## Pages

- **Home** — hero, highlights, artist showcase
- **Lookbook** — gallery with lightbox
- **Tattoo Artists** — artist profiles
- **Booking** — appointment scheduling with date picker
- **Products** — merchandise and gift cards
- **Articles** — blog / news
- **FAQ · Contact · Terms of Service**
- **Admin panel** — appointments, artists, products, campaigns, guest artists, reviews

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm

### Installation

```bash
git clone https://github.com/Mahaan10/tattoo-studio-next.git
cd tattoo-studio-next
pnpm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (e.g. `http://localhost:3100`) |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
pnpm build
pnpm start
```

## i18n

Supported locales: **`de`** (default) · **`en`**

Translation files live in `src/messages/`.

## Project Structure

```
src/
├── app/
│   └── [locale]/          # All routes under locale segment
│       ├── booking/
│       ├── lookbook/
│       ├── tattoo-artists/
│       ├── admin/
│       └── ...
├── components/
│   ├── features/          # Feature-specific components
│   ├── services/          # Axios API services
│   └── schema & types/    # Zod schemas and TS types
├── i18n/                  # next-intl config
├── messages/              # en.json / de.json
└── lib/                   # Shared utilities
```

## Deployment

The app is deployed on **Vercel**. `vercel.json` is included in the repo.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT — see [LICENSE](LICENSE).
